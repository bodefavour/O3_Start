import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wallets } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/wallets/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [wallet] = await db
            .select()
            .from(wallets)
            .where(eq(wallets.id, id));

        if (!wallet) {
            return NextResponse.json(
                { error: 'Wallet not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ wallet });
    } catch (error) {
        console.error('Error fetching wallet:', error);
        return NextResponse.json(
            { error: 'Failed to fetch wallet' },
            { status: 500 }
        );
    }
}

// PATCH /api/wallets/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, isActive } = body;

        const updates: any = { updatedAt: new Date() };
        if (name !== undefined) updates.name = name;
        if (isActive !== undefined) updates.isActive = isActive;

        const [updatedWallet] = await db
            .update(wallets)
            .set(updates)
            .where(eq(wallets.id, id))
            .returning();

        if (!updatedWallet) {
            return NextResponse.json(
                { error: 'Wallet not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ wallet: updatedWallet });
    } catch (error) {
        console.error('Error updating wallet:', error);
        return NextResponse.json(
            { error: 'Failed to update wallet' },
            { status: 500 }
        );
    }
}
