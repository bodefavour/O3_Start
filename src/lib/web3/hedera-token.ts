import {
    Client,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TransferTransaction,
    AccountBalanceQuery,
    TokenAssociateTransaction,
    PrivateKey,
    AccountId,
    Hbar,
} from '@hashgraph/sdk';
import { getHederaClient } from './provider';

/**
 * Create a Hedera-native stablecoin token (HTS)
 * This will be used as the demo stablecoin
 */
export async function createStablecoin(
    name: string = 'BorderlessPay USD',
    symbol: string = 'BPUSD',
    decimals: number = 2,
    initialSupply: number = 1000000
): Promise<{ tokenId: string; transactionId: string }> {
    const client = getHederaClient();
    const operatorId = client.operatorAccountId!;
    const operatorKey = client.operatorPublicKey!;

    try {
        // Create token
        const tokenCreateTx = await new TokenCreateTransaction()
            .setTokenName(name)
            .setTokenSymbol(symbol)
            .setDecimals(decimals)
            .setInitialSupply(initialSupply * Math.pow(10, decimals)) // Convert to smallest unit
            .setTreasuryAccountId(operatorId)
            .setAdminKey(operatorKey)
            .setSupplyKey(operatorKey)
            .setTokenType(TokenType.FungibleCommon)
            .setSupplyType(TokenSupplyType.Infinite)
            .setMaxTransactionFee(new Hbar(30))
            .freezeWith(client);

        // Sign with the operator's private key from environment
        const operatorPrivateKeyString = process.env.HEDERA_OPERATOR_KEY!;
        const keyString = operatorPrivateKeyString.startsWith('0x') 
            ? operatorPrivateKeyString.slice(2) 
            : operatorPrivateKeyString;
        
        let operatorPrivateKey: PrivateKey;
        try {
            operatorPrivateKey = PrivateKey.fromStringECDSA(keyString);
        } catch {
            try {
                operatorPrivateKey = PrivateKey.fromStringED25519(keyString);
            } catch {
                operatorPrivateKey = PrivateKey.fromString(operatorPrivateKeyString);
            }
        }

        const tokenCreateSign = await tokenCreateTx.sign(operatorPrivateKey);
        const tokenCreateSubmit = await tokenCreateSign.execute(client);
        const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
        const tokenId = tokenCreateRx.tokenId!.toString();

        console.log(`✅ Created token ${symbol} with ID: ${tokenId}`);

        return {
            tokenId,
            transactionId: tokenCreateSubmit.transactionId.toString(),
        };
    } catch (error) {
        console.error('Token creation error:', error);
        throw error;
    } finally {
        client.close();
    }
}

/**
 * Transfer HTS token between accounts
 */
export async function transferToken(
    tokenId: string,
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    decimals: number = 2,
    memo?: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    const client = getHederaClient();

    try {
        // Convert amount to smallest unit
        const transferAmount = amount * Math.pow(10, decimals);

        const transaction = new TransferTransaction()
            .addTokenTransfer(tokenId, fromAccountId, -transferAmount)
            .addTokenTransfer(tokenId, toAccountId, transferAmount);

        if (memo) {
            transaction.setTransactionMemo(memo);
        }

        const response = await transaction.execute(client);
        const receipt = await response.getReceipt(client);

        console.log(
            `✅ Transferred ${amount} tokens from ${fromAccountId} to ${toAccountId}`
        );

        return {
            success: true,
            transactionId: response.transactionId.toString(),
        };
    } catch (error: any) {
        console.error('Token transfer error:', error);
        return {
            success: false,
            error: error.message,
        };
    } finally {
        client.close();
    }
}

/**
 * Get token balance for an account
 */
export async function getTokenBalance(
    accountId: string,
    tokenId: string
): Promise<number> {
    const client = getHederaClient();

    try {
        const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
        const balance = await balanceQuery.execute(client);
        const tokenBalance = balance.tokens?.get(tokenId);

        return tokenBalance ? Number(tokenBalance.toString()) : 0;
    } catch (error) {
        console.error('Balance query error:', error);
        return 0;
    } finally {
        client.close();
    }
}

/**
 * Associate token with account (required before receiving tokens)
 */
export async function associateToken(
    accountId: string,
    tokenId: string,
    privateKey: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    const client = getHederaClient();

    try {
        const transaction = await new TokenAssociateTransaction()
            .setAccountId(accountId)
            .setTokenIds([tokenId])
            .freezeWith(client);

        // Handle hex-encoded private key
        const keyString = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
        let privKey: PrivateKey;
        try {
            privKey = PrivateKey.fromStringECDSA(keyString);
        } catch {
            try {
                privKey = PrivateKey.fromStringED25519(keyString);
            } catch {
                privKey = PrivateKey.fromString(privateKey);
            }
        }

        const signTx = await transaction.sign(privKey);
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);

        console.log(`✅ Associated token ${tokenId} with account ${accountId}`);

        return {
            success: true,
            transactionId: txResponse.transactionId.toString(),
        };
    } catch (error: any) {
        console.error('Token association error:', error);
        
        // Check if already associated
        if (error.message?.includes('TOKEN_ALREADY_ASSOCIATED')) {
            return {
                success: true,
                error: 'TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT',
            };
        }
        
        return {
            success: false,
            error: error.message,
        };
    } finally {
        client.close();
    }
}

/**
 * Mint additional tokens (requires supply key)
 */
export async function mintTokens(
    tokenId: string,
    amount: number,
    decimals: number = 2
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    const client = getHederaClient();

    try {
        const mintAmount = amount * Math.pow(10, decimals);

        const transaction = await new TokenMintTransaction()
            .setTokenId(tokenId)
            .setAmount(mintAmount)
            .freezeWith(client);

        // Handle hex-encoded private key
        const operatorPrivateKeyString = process.env.HEDERA_OPERATOR_KEY!;
        const keyString = operatorPrivateKeyString.startsWith('0x') 
            ? operatorPrivateKeyString.slice(2) 
            : operatorPrivateKeyString;
        
        let privKey: PrivateKey;
        try {
            privKey = PrivateKey.fromStringECDSA(keyString);
        } catch {
            try {
                privKey = PrivateKey.fromStringED25519(keyString);
            } catch {
                privKey = PrivateKey.fromString(operatorPrivateKeyString);
            }
        }

        const signTx = await transaction.sign(privKey);
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);

        console.log(`✅ Minted ${amount} tokens for ${tokenId}`);

        return {
            success: true,
            transactionId: txResponse.transactionId.toString(),
        };
    } catch (error: any) {
        console.error('Token mint error:', error);
        return {
            success: false,
            error: error.message,
        };
    } finally {
        client.close();
    }
}

/**
 * Get token info from Mirror Node API
 */
export async function getTokenInfo(tokenId: string): Promise<any> {
    try {
        const network = process.env.HEDERA_NETWORK || 'testnet';
        const mirrorNodeUrl =
            network === 'mainnet'
                ? 'https://mainnet-public.mirrornode.hedera.com'
                : 'https://testnet.mirrornode.hedera.com';

        const response = await fetch(`${mirrorNodeUrl}/api/v1/tokens/${tokenId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Token info query error:', error);
        return null;
    }
}

/**
 * Get transaction info from Mirror Node
 */
export async function getTransactionInfo(transactionId: string): Promise<any> {
    try {
        const network = process.env.HEDERA_NETWORK || 'testnet';
        const mirrorNodeUrl =
            network === 'mainnet'
                ? 'https://mainnet-public.mirrornode.hedera.com'
                : 'https://testnet.mirrornode.hedera.com';

        const response = await fetch(
            `${mirrorNodeUrl}/api/v1/transactions/${transactionId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Transaction info query error:', error);
        return null;
    }
}

/**
 * Get HashScan explorer URL for transaction
 */
export function getExplorerUrl(
    transactionId: string,
    network: string = 'testnet'
): string {
    return `https://hashscan.io/${network}/transaction/${transactionId}`;
}
