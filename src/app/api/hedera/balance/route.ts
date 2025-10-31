/**
 * API Endpoint to get Hedera account balance (HBAR and tokens)
 * GET /api/hedera/balance?accountId=0.0.xxxxx
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const accountId = searchParams.get('accountId');

        if (!accountId) {
            return NextResponse.json(
                { success: false, error: 'Account ID is required' },
                { status: 400 }
            );
        }

        const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';
        const mirrorNodeUrl = `https://${network}.mirrornode.hedera.com`;

        // Fetch account info (includes HBAR balance)
        const accountResponse = await fetch(
            `${mirrorNodeUrl}/api/v1/accounts/${accountId}`
        );

        if (!accountResponse.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to fetch account data' },
                { status: accountResponse.status }
            );
        }

        const accountData = await accountResponse.json();

        // Fetch tokens
        const tokensResponse = await fetch(
            `${mirrorNodeUrl}/api/v1/accounts/${accountId}/tokens?limit=100`
        );

        const tokensData = await tokensResponse.json();

        // Format HBAR balance (tinybars to HBAR)
        const hbarBalance = (parseFloat(accountData.balance.balance) / 100000000).toFixed(2);

        // Format token balances with full token info
        const tokens = await Promise.all(
            tokensData.tokens?.map(async (token: any) => {
                // Fetch full token info to get proper name and symbol
                try {
                    const tokenInfoResponse = await fetch(
                        `${mirrorNodeUrl}/api/v1/tokens/${token.token_id}`
                    );

                    if (tokenInfoResponse.ok) {
                        const tokenInfo = await tokenInfoResponse.json();
                        return {
                            tokenId: token.token_id,
                            symbol: tokenInfo.symbol || token.symbol || 'Unknown',
                            name: tokenInfo.name || token.name || `Token ${token.token_id}`,
                            balance: (parseFloat(token.balance) / Math.pow(10, token.decimals || 0)).toFixed(2),
                            decimals: token.decimals || 0,
                        };
                    }
                } catch (error) {
                    console.warn(`Failed to fetch info for token ${token.token_id}:`, error);
                }

                // Fallback to basic info if token info fetch fails
                return {
                    tokenId: token.token_id,
                    symbol: token.symbol || 'Unknown',
                    name: token.name || `Token ${token.token_id}`,
                    balance: (parseFloat(token.balance) / Math.pow(10, token.decimals || 0)).toFixed(2),
                    decimals: token.decimals || 0,
                };
            }) || []
        );

        return NextResponse.json({
            success: true,
            data: {
                accountId,
                hbarBalance,
                tokens,
                totalTokens: tokens.length,
            },
        });
    } catch (error: any) {
        console.error('Balance fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to fetch balance',
            },
            { status: 500 }
        );
    }
}
