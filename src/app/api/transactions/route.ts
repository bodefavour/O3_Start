import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions, wallets } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

// GET /api/transactions - Get transaction history
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const limit = parseInt(searchParams.get('limit') || '50');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        try {
            let query = db
                .select()
                .from(transactions)
                .where(eq(transactions.userId, userId))
                .orderBy(desc(transactions.createdAt))
                .limit(limit);

            const userTransactions = await query;

            // Apply filters in memory for now (can optimize with SQL later)
            let filtered = userTransactions;
            if (status) {
                filtered = filtered.filter((t) => t.status === status);
            }
            if (type) {
                filtered = filtered.filter((t) => t.type === type);
            }

            return NextResponse.json({ transactions: filtered });
        } catch (dbError) {
            // Database might not be set up or table doesn't exist
            console.warn('Database query failed, returning empty transactions:', dbError);
            return NextResponse.json({ transactions: [] });
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        // Return empty array instead of error to handle gracefully
        return NextResponse.json({ transactions: [] });
    }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            userId,
            type,
            amount,
            currency,
            fromAddress,
            toAddress,
            networkFee,
            note,
            metadata,
        } = body;

        if (!userId || !type || !amount || !currency) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Start a transaction
        const [newTransaction] = await db
            .insert(transactions)
            .values({
                userId,
                type,
                status: 'pending',
                amount: amount.toString(),
                currency,
                fromAddress,
                toAddress,
                networkFee: networkFee?.toString(),
                note,
                metadata,
            })
            .returning();

        return NextResponse.json({ transaction: newTransaction }, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { error: 'Failed to create transaction' },
            { status: 500 }
        );
    }
}
