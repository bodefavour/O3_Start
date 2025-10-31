/**
 * API Endpoint to get HBAR price in USD
 * GET /api/hedera/price
 * 
 * Fetches real-time HBAR price from CoinGecko or other price feeds
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Fetch HBAR price from CoinGecko (free API, no key needed)
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd',
            {
                next: { revalidate: 60 } // Cache for 60 seconds
            }
        );

        if (!response.ok) {
            // Fallback to approximate price if API fails
            return NextResponse.json({
                success: true,
                data: {
                    hbarPrice: 0.05,
                    source: 'fallback',
                    timestamp: Date.now()
                }
            });
        }

        const data = await response.json();
        const hbarPrice = data['hedera-hashgraph']?.usd || 0.05;

        return NextResponse.json({
            success: true,
            data: {
                hbarPrice,
                source: 'coingecko',
                timestamp: Date.now()
            }
        });
    } catch (error: any) {
        console.error('Price fetch error:', error);

        // Return fallback price on error
        return NextResponse.json({
            success: true,
            data: {
                hbarPrice: 0.05,
                source: 'fallback',
                timestamp: Date.now()
            }
        });
    }
}
