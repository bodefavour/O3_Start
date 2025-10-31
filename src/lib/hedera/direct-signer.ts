/**
 * Direct Hedera Signer
 * 
 * WARNING: This bypasses WalletConnect and uses a raw private key.
 * NEVER commit real private keys or use this in production.
 * For development/demo purposes only.
 */

import {
    Client,
    PrivateKey,
    AccountId,
    TransferTransaction,
    Hbar,
    AccountBalanceQuery,
} from "@hashgraph/sdk";

/**
 * Initialize a Hedera client with a private key
 * Set NEXT_PUBLIC_HEDERA_OPERATOR_KEY and NEXT_PUBLIC_HEDERA_OPERATOR_ID in your .env.local
 */
export function getHederaClient(): Client {
    const operatorKey = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_KEY;
    const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;

    if (!operatorKey || !operatorId) {
        throw new Error(
            "Missing Hedera credentials. Set NEXT_PUBLIC_HEDERA_OPERATOR_KEY and NEXT_PUBLIC_HEDERA_OPERATOR_ID"
        );
    }

    const client = Client.forTestnet();
    client.setOperator(AccountId.fromString(operatorId), PrivateKey.fromString(operatorKey));

    return client;
}

/**
 * Send HBAR from the operator account to a recipient
 */
export async function sendHbar(recipientId: string, amount: number): Promise<{
    success: boolean;
    transactionId?: string;
    explorerUrl?: string;
    error?: string;
}> {
    try {
        const client = getHederaClient();
        const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID!;

        const transaction = new TransferTransaction()
            .addHbarTransfer(operatorId, Hbar.fromTinybars(-amount * 100_000_000)) // Convert HBAR to tinybars
            .addHbarTransfer(recipientId, Hbar.fromTinybars(amount * 100_000_000))
            .setTransactionMemo(`Transfer from BorderlessPay`);

        const txResponse = await transaction.execute(client);
        const receipt = await txResponse.getReceipt(client);

        const transactionId = txResponse.transactionId.toString();
        const explorerUrl = `https://hashscan.io/testnet/transaction/${transactionId}`;

        return {
            success: receipt.status.toString() === "SUCCESS",
            transactionId,
            explorerUrl,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Hedera transfer failed:", message);
        return {
            success: false,
            error: message,
        };
    }
}

/**
 * Get account balance
 */
export async function getAccountBalance(accountId: string): Promise<{
    balance?: number;
    error?: string;
}> {
    try {
        const client = getHederaClient();
        const query = new AccountBalanceQuery().setAccountId(AccountId.fromString(accountId));
        const balance = await query.execute(client);

        return {
            balance: balance.hbars.toTinybars().toNumber() / 100_000_000, // Convert tinybars to HBAR
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            error: message,
        };
    }
}
