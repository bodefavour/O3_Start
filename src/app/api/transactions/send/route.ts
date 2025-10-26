import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions, wallets } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

// POST /api/transactions/send - Process send transaction
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, fromWalletId, toAddress, amount, currency, note } = body;

        if (!userId || !fromWalletId || !toAddress || !amount || !currency) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get the wallet
        const [wallet] = await db
            .select()
            .from(wallets)
            .where(eq(wallets.id, fromWalletId));

        if (!wallet) {
            return NextResponse.json(
                { error: 'Wallet not found' },
                { status: 404 }
            );
        }

        // Check balance
        const balance = parseFloat(wallet.balance);
        const sendAmount = parseFloat(amount);
        const networkFee = 0.001; // Mock network fee

        if (balance < sendAmount + networkFee) {
            return NextResponse.json(
                { error: 'Insufficient balance' },
                { status: 400 }
            );
        }

        // TODO: Integrate with Hedera for real blockchain transaction
        // For now, simulate transaction hash
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;

        // Create transaction record
        const [transaction] = await db
            .insert(transactions)
            .values({
                userId,
                type: 'outgoing',
                status: 'completed',
                amount: sendAmount.toString(),
                currency,
                fromAddress: wallet.address,
                toAddress,
                networkFee: networkFee.toString(),
                note,
                hash: txHash,
                metadata: { walletId: fromWalletId },
            })
            .returning();

        // Update wallet balance
        await db
            .update(wallets)
            .set({
                balance: (balance - sendAmount - networkFee).toString(),
                updatedAt: new Date(),
            })
            .where(eq(wallets.id, fromWalletId));

        return NextResponse.json({
            success: true,
            transaction,
            hash: txHash,
        });
    } catch (error) {
        console.error('Error processing send transaction:', error);
        return NextResponse.json(
            { error: 'Failed to process transaction' },
            { status: 500 }
        );
    }
}
