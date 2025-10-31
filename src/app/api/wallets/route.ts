import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wallets } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// GET /api/wallets - Get all wallets for a user
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        try {
            const userWallets = await db
                .select()
                .from(wallets)
                .where(and(eq(wallets.userId, userId), eq(wallets.isActive, true)));

            return NextResponse.json({ wallets: userWallets });
        } catch (dbError) {
            // Database might not be set up or table doesn't exist
            console.warn('Database query failed, returning empty wallets:', dbError);
            return NextResponse.json({ wallets: [] });
        }
    } catch (error) {
        console.error('Error fetching wallets:', error);
        // Return empty array instead of error to handle gracefully
        return NextResponse.json({ wallets: [] });
    }
}

// POST /api/wallets - Create a new wallet
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, name, symbol, type, address } = body;

        if (!userId || !name || !symbol || !type || !address) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const [newWallet] = await db
            .insert(wallets)
            .values({
                userId,
                name,
                symbol,
                type,
                address,
                balance: '0',
                isActive: true,
            })
            .returning();

        return NextResponse.json({ wallet: newWallet }, { status: 201 });
    } catch (error) {
        console.error('Error creating wallet:', error);
        return NextResponse.json(
            { error: 'Failed to create wallet' },
            { status: 500 }
        );
    }
}
