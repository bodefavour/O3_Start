/**
 * API Endpoint to transfer Hedera tokens
 * POST /api/hedera/transfer
 */

import { NextRequest, NextResponse } from 'next/server';
import { transferToken, getExplorerUrl } from '@/lib/web3/hedera-token';
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
        if (!tokenId || !fromAccountId || !toAccountId || !amount) {
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

        // If transaction was already signed and executed by wallet, skip execution
        if (walletSigned && transactionId) {
            console.log('Wallet-signed transaction detected:', transactionId);
            result = {
                success: true,
                transactionId,
            };
        } else {
            // Execute transfer on Hedera using operator account (backend signing)
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

        // Store transaction in database
        if (userId) {
            await db.insert(transactions).values({
                userId,
                type: 'outgoing',
                status: 'completed',
                amount: amount.toString(),
                currency: 'BPUSD',
                fromAddress: fromAccountId,
                toAddress: toAccountId,
                note: memo,
                hash: txId,
                metadata: {
                    tokenId,
                    hederaTransaction: true,
                    walletSigned,
                },
            });
        }

        const network = process.env.HEDERA_NETWORK || 'testnet';

        return NextResponse.json({
            success: true,
            data: {
                transactionId: txId,
                fromAccountId,
                toAccountId,
                amount,
                tokenId,
                explorerUrl: getExplorerUrl(txId!, network),
                mirrorNodeUrl: `https://${network}.mirrornode.hedera.com/api/v1/transactions/${txId}`,
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
