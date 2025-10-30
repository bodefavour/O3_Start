/**
 * API Endpoint to create Hedera-native stablecoin token
 * POST /api/hedera/create-token
 */

import { NextRequest, NextResponse } from 'next/server';
import { createStablecoin } from '@/lib/web3/hedera-token';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name = 'BorderlessPay USD',
            symbol = 'BPUSD',
            decimals = 2,
            initialSupply = 1000000,
        } = body;

        // Create the token on Hedera
        const result = await createStablecoin(name, symbol, decimals, initialSupply);

        return NextResponse.json({
            success: true,
            data: {
                tokenId: result.tokenId,
                transactionId: result.transactionId,
                name,
                symbol,
                decimals,
                initialSupply,
                explorerUrl: `https://hashscan.io/testnet/token/${result.tokenId}`,
            },
        });
    } catch (error: any) {
        console.error('Token creation error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to create token',
            },
            { status: 500 }
        );
    }
}
