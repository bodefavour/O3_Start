/**
 * API Endpoint to transfer Hedera tokens or HBAR
 * POST /api/hedera/transfer
 */

import { NextRequest, NextResponse } from 'next/server';
import { transferToken, getExplorerUrl, formatTransactionIdForMirrorNode } from '@/lib/web3/hedera-token';
import { transferHbar } from '@/lib/web3/provider';
import { db } from '@/db';
import { transactions } from '@/db/schema';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            tokenId,
            fromAccountId,
            toAccountId,
            amount,
            decimals = 2,
            memo,
            userId,
            transactionId, // Optional: If transaction was already signed by wallet
            walletSigned = false, // Flag to indicate wallet-signed transaction
        } = body;

        // Validate inputs
        if (!fromAccountId || !toAccountId || !amount) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                },
                { status: 400 }
            );
        }

        let txId = transactionId;
        let result;
        const isHbarTransfer = !tokenId || tokenId === 'HBAR';

        // If transaction was already signed and executed by wallet, skip execution
        if (walletSigned && transactionId) {
            console.log('Wallet-signed transaction detected:', transactionId);
            result = {
                success: true,
                transactionId,
            };
        } else {
            // Execute transfer on Hedera using operator account (backend signing)
            if (isHbarTransfer) {
                // Transfer native HBAR
                console.log(`Transferring ${amount} HBAR from ${fromAccountId} to ${toAccountId}`);
                txId = await transferHbar(fromAccountId, toAccountId, amount, memo);
                result = {
                    success: true,
                    transactionId: txId,
                };
            } else {
                // Transfer HTS token
                console.log(`Transferring ${amount} of token ${tokenId} from ${fromAccountId} to ${toAccountId}`);
                result = await transferToken(
                    tokenId,
                    fromAccountId,
                    toAccountId,
                    amount,
                    decimals,
                    memo
                );

                if (!result.success) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: result.error || 'Transfer failed',
                        },
                        { status: 500 }
                    );
                }

                txId = result.transactionId;
            }
        }

        // Store transaction in database (only for authenticated users with valid UUID)
        // For backend signing mode without userId, transactions are fetched from Mirror Node
        if (userId && userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            try {
                await db.insert(transactions).values({
                    userId,
                    type: 'outgoing',
                    status: 'completed',
                    amount: amount.toString(),
                    currency: isHbarTransfer ? 'HBAR' : tokenId.split('.').pop() || 'TOKEN',
                    fromAddress: fromAccountId,
                    toAddress: toAccountId,
                    note: memo,
                    hash: txId,
                    metadata: {
                        tokenId: isHbarTransfer ? null : tokenId,
                        hederaTransaction: true,
                        walletSigned,
                        transferType: isHbarTransfer ? 'HBAR' : 'HTS',
                    },
                });
                console.log('✅ Transaction stored in database');
            } catch (dbError: any) {
                console.warn('⚠️ Failed to store transaction in database:', dbError.message);
                console.log('Transaction succeeded on Hedera blockchain - database storage is optional');
            }
        } else {
            console.log('ℹ️ Backend signing mode: Transactions available via Mirror Node API');
        }

        const network = process.env.HEDERA_NETWORK || 'testnet';
        const formattedTxId = formatTransactionIdForMirrorNode(txId!);

        return NextResponse.json({
            success: true,
            data: {
                transactionId: txId,
                fromAccountId,
                toAccountId,
                amount,
                tokenId: isHbarTransfer ? null : tokenId,
                transferType: isHbarTransfer ? 'HBAR' : 'HTS',
                explorerUrl: getExplorerUrl(txId!, network),
                mirrorNodeUrl: `https://${network}.mirrornode.hedera.com/api/v1/transactions/${formattedTxId}`,
            },
        });
    } catch (error: any) {
        console.error('Transfer error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Transfer failed',
            },
            { status: 500 }
        );
    }
}
