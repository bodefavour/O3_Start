/**
 * API Endpoint to get transaction history from Hedera Mirror Node
 * GET /api/hedera/transactions?accountId=0.0.xxxxx&limit=20
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const accountId = searchParams.get('accountId');
        const limit = searchParams.get('limit') || '20';

        if (!accountId) {
            return NextResponse.json(
                { success: false, error: 'Account ID is required' },
                { status: 400 }
            );
        }

        const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';
        const mirrorNodeUrl = `https://${network}.mirrornode.hedera.com`;

        // Fetch transactions from Mirror Node
        const response = await fetch(
            `${mirrorNodeUrl}/api/v1/transactions?account.id=${accountId}&limit=${limit}&order=desc`
        );

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to fetch transactions' },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Format transactions for display
        const transactions = await Promise.all(data.transactions?.map(async (tx: any) => {
            // Check for token transfers first
            const tokenTransfer = tx.token_transfers?.find((transfer: any) =>
                transfer.account === accountId
            );

            let amount = 0;
            let currency = 'HBAR';
            let tokenSymbol = 'HBAR';
            let tokenName = 'Hedera';
            let isCredit = false;
            let decimals = 8;

            if (tokenTransfer) {
                // Token transfer - fetch token info for proper decimals and name
                currency = tokenTransfer.token_id;
                isCredit = parseInt(tokenTransfer.amount) > 0;

                try {
                    const tokenInfoResponse = await fetch(
                        `${mirrorNodeUrl}/api/v1/tokens/${currency}`
                    );

                    if (tokenInfoResponse.ok) {
                        const tokenInfo = await tokenInfoResponse.json();
                        decimals = tokenInfo.decimals || 0;
                        tokenSymbol = tokenInfo.symbol || currency;
                        tokenName = tokenInfo.name || tokenSymbol;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch token info for ${currency}`);
                    decimals = 0;
                }

                amount = Math.abs(parseInt(tokenTransfer.amount)) / Math.pow(10, decimals);
            } else {
                // HBAR transfer
                const accountTransfer = tx.transfers?.find((transfer: any) =>
                    transfer.account === accountId
                );
                if (accountTransfer) {
                    amount = Math.abs(parseInt(accountTransfer.amount)) / 100000000;
                    isCredit = parseInt(accountTransfer.amount) > 0;
                }
            }

            // Determine transaction type
            const type = isCredit ? 'incoming' : 'outgoing';

            // Get counterparty (the other account in the transfer)
            let counterparty = 'Unknown';
            if (tokenTransfer) {
                counterparty = tx.token_transfers?.find((transfer: any) =>
                    transfer.account !== accountId && transfer.token_id === currency
                )?.account || 'Unknown';
            } else {
                counterparty = tx.transfers?.find((transfer: any) =>
                    transfer.account !== accountId && parseInt(transfer.amount) !== 0
                )?.account || 'Unknown';
            }

            return {
                id: tx.transaction_id,
                hash: tx.transaction_id,
                type,
                status: tx.result === 'SUCCESS' ? 'completed' : 'failed',
                amount: amount.toFixed(decimals > 2 ? 2 : decimals),
                currency: tokenSymbol,
                fromAddress: type === 'outgoing' ? accountId : counterparty,
                toAddress: type === 'incoming' ? accountId : counterparty,
                createdAt: new Date(parseFloat(tx.consensus_timestamp) * 1000).toISOString(),
                networkFee: (parseInt(tx.charged_tx_fee) / 100000000).toFixed(8),
                note: tx.memo_base64 ? Buffer.from(tx.memo_base64, 'base64').toString('utf-8') : undefined,
                metadata: {
                    consensusTimestamp: tx.consensus_timestamp,
                    result: tx.result,
                    hederaTransaction: true,
                    tokenTransfer: !!tokenTransfer,
                    tokenId: currency,
                    tokenName,
                    decimals,
                },
            };
        }) || []);

        return NextResponse.json({
            success: true,
            data: {
                transactions,
                total: transactions.length,
            },
        });
    } catch (error: any) {
        console.error('Transaction fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch transactions',
            },
            { status: 500 }
        );
    }
}
