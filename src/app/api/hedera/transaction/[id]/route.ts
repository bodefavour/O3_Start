/**
 * API Endpoint to get single transaction details from Hedera Mirror Node
 * GET /api/hedera/transaction/[id]
 * 
 * Transaction ID format: 0.0.4826582@1761927693.915611221
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Decode URL-encoded transaction ID (e.g., %40 becomes @)
        const transactionId = decodeURIComponent(params.id);

        if (!transactionId) {
            return NextResponse.json(
                { success: false, error: 'Transaction ID is required' },
                { status: 400 }
            );
        }

        const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';
        const mirrorNodeUrl = `https://${network}.mirrornode.hedera.com`;

        // Convert transaction ID format for Mirror Node
        // From: 0.0.4826582@1761929088.725746098
        // To: 0.0.4826582-1761929088-725746098
        // Step 1: Replace @ with -
        let formattedId = transactionId.replace('@', '-');
        // Step 2: Replace the last . (before nanoseconds) with -
        const lastDotIndex = formattedId.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            formattedId = formattedId.substring(0, lastDotIndex) + '-' + formattedId.substring(lastDotIndex + 1);
        }

        console.log('🔍 Transaction ID conversion:', {
            original: transactionId,
            formatted: formattedId,
            url: `${mirrorNodeUrl}/api/v1/transactions/${formattedId}`
        });

        // Fetch transaction from Mirror Node
        const response = await fetch(
            `${mirrorNodeUrl}/api/v1/transactions/${formattedId}`
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Mirror Node error:', errorData);
            return NextResponse.json(
                { success: false, error: 'Transaction not found', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        const tx = data.transactions?.[0];

        if (!tx) {
            return NextResponse.json(
                { success: false, error: 'Transaction not found' },
                { status: 404 }
            );
        }

        // Parse transaction details
        const tokenTransfers = tx.token_transfers?.map((transfer: any) => ({
            account: transfer.account,
            amount: transfer.amount,
            tokenId: transfer.token_id,
        })) || [];

        const hbarTransfers = tx.transfers?.map((transfer: any) => ({
            account: transfer.account,
            amount: (parseInt(transfer.amount) / 100000000).toFixed(8),
        })) || [];

        // Fetch token info for any token transfers
        const tokensInfo = await Promise.all(
            tokenTransfers.map(async (transfer: any) => {
                try {
                    const tokenResponse = await fetch(
                        `${mirrorNodeUrl}/api/v1/tokens/${transfer.tokenId}`
                    );
                    if (tokenResponse.ok) {
                        const tokenData = await tokenResponse.json();
                        return {
                            tokenId: transfer.tokenId,
                            symbol: tokenData.symbol,
                            name: tokenData.name,
                            decimals: tokenData.decimals,
                            amount: (Math.abs(parseInt(transfer.amount)) / Math.pow(10, tokenData.decimals || 0)).toFixed(2),
                        };
                    }
                } catch (error) {
                    console.warn(`Failed to fetch token ${transfer.tokenId}`);
                }
                return null;
            })
        );

        const transactionDetails = {
            transactionId: tx.transaction_id,
            consensusTimestamp: tx.consensus_timestamp,
            transactionHash: tx.transaction_hash,
            result: tx.result,
            name: tx.name,
            memo: tx.memo_base64 ? Buffer.from(tx.memo_base64, 'base64').toString('utf-8') : null,
            chargedTxFee: (parseInt(tx.charged_tx_fee) / 100000000).toFixed(8),
            maxFee: tx.max_fee,
            validStart: tx.valid_start_timestamp,
            validDuration: tx.valid_duration_seconds,
            nodeAccount: tx.node,
            hbarTransfers,
            tokenTransfers: tokensInfo.filter(Boolean),
            explorerUrl: `https://hashscan.io/${network}/transaction/${transactionId}`,
            mirrorNodeUrl: `${mirrorNodeUrl}/api/v1/transactions/${formattedId}`,
        };

        return NextResponse.json({
            success: true,
            data: transactionDetails,
        });
    } catch (error: any) {
        console.error('Transaction detail fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch transaction details',
            },
            { status: 500 }
        );
    }
}
