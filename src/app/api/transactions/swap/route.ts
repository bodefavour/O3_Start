import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions, wallets, exchangeRates } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// POST /api/transactions/swap - Currency swap
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, fromWalletId, toWalletId, fromAmount, fromCurrency, toCurrency } = body;

        if (!userId || !fromWalletId || !toWalletId || !fromAmount || !fromCurrency || !toCurrency) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get wallets
        const [fromWallet] = await db
            .select()
            .from(wallets)
            .where(eq(wallets.id, fromWalletId));

        const [toWallet] = await db
            .select()
            .from(wallets)
            .where(eq(wallets.id, toWalletId));

        if (!fromWallet || !toWallet) {
            return NextResponse.json(
                { error: 'Wallet not found' },
                { status: 404 }
            );
        }

        // Check balance
        const balance = parseFloat(fromWallet.balance);
        const swapAmount = parseFloat(fromAmount);

        if (balance < swapAmount) {
            return NextResponse.json(
                { error: 'Insufficient balance' },
                { status: 400 }
            );
        }

        // Get exchange rate
        const [rate] = await db
            .select()
            .from(exchangeRates)
            .where(
                and(
                    eq(exchangeRates.fromCurrency, fromCurrency),
                    eq(exchangeRates.toCurrency, toCurrency)
                )
            )
            .orderBy(desc(exchangeRates.timestamp))
            .limit(1);

        // Use mock rate if not found
        const exchangeRate = rate ? parseFloat(rate.rate) : 1.0;
        const toAmount = swapAmount * exchangeRate;
        const networkFee = swapAmount * 0.001; // 0.1% fee

        // Create swap transaction
        const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;

        const [transaction] = await db
            .insert(transactions)
            .values({
                userId,
                type: 'swap',
                status: 'completed',
                amount: swapAmount.toString(),
                currency: fromCurrency,
                fromAddress: fromWallet.address,
                toAddress: toWallet.address,
                networkFee: networkFee.toString(),
                hash: txHash,
                metadata: {
                    fromWalletId,
                    toWalletId,
                    fromCurrency,
                    toCurrency,
                    toAmount: toAmount.toString(),
                    exchangeRate: exchangeRate.toString(),
                },
            })
            .returning();

        // Update wallet balances
        await db
            .update(wallets)
            .set({
                balance: (balance - swapAmount - networkFee).toString(),
                updatedAt: new Date(),
            })
            .where(eq(wallets.id, fromWalletId));

        const toWalletBalance = parseFloat(toWallet.balance);
        await db
            .update(wallets)
            .set({
                balance: (toWalletBalance + toAmount).toString(),
                updatedAt: new Date(),
            })
            .where(eq(wallets.id, toWalletId));

        return NextResponse.json({
            success: true,
            transaction,
            hash: txHash,
            toAmount,
            exchangeRate,
        });
    } catch (error) {
        console.error('Error processing swap:', error);
        return NextResponse.json(
            { error: 'Failed to process swap' },
            { status: 500 }
        );
    }
}
