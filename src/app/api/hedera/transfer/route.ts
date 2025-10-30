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

        // Execute transfer on Hedera
        const result = await transferToken(
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
                hash: result.transactionId,
                metadata: {
                    tokenId,
                    hederaTransaction: true,
                },
            });
        }

        const network = process.env.HEDERA_NETWORK || 'testnet';

        return NextResponse.json({
            success: true,
            data: {
                transactionId: result.transactionId,
                fromAccountId,
                toAccountId,
                amount,
                tokenId,
                explorerUrl: getExplorerUrl(result.transactionId!, network),
                mirrorNodeUrl: `https://${network}.mirrornode.hedera.com/api/v1/transactions/${result.transactionId}`,
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
