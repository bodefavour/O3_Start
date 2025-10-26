import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { transactions, wallets, invoices, employees } from '@/db/schema';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';

// GET /api/analytics/overview
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

        // Get all user data
        const [userWallets, userTransactions, userInvoices, userEmployees] = await Promise.all([
            db.select().from(wallets).where(eq(wallets.userId, userId)),
            db.select().from(transactions).where(eq(transactions.userId, userId)).orderBy(desc(transactions.createdAt)).limit(100),
            db.select().from(invoices).where(eq(invoices.userId, userId)),
            db.select().from(employees).where(eq(employees.userId, userId)),
        ]);

        // Calculate total balance
        const totalBalance = userWallets.reduce(
            (sum, wallet) => sum + parseFloat(wallet.balance),
            0
        );

        // Calculate transaction volumes
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const recentTransactions = userTransactions.filter(
            (tx) => new Date(tx.createdAt) >= last30Days
        );

        const totalVolume = recentTransactions.reduce(
            (sum, tx) => sum + parseFloat(tx.amount),
            0
        );

        const incoming = recentTransactions
            .filter((tx) => tx.type === 'incoming')
            .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

        const outgoing = recentTransactions
            .filter((tx) => tx.type === 'outgoing')
            .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

        // Group by currency
        const byCurrency: Record<string, number> = {};
        userWallets.forEach((wallet) => {
            const balance = parseFloat(wallet.balance);
            if (byCurrency[wallet.symbol]) {
                byCurrency[wallet.symbol] += balance;
            } else {
                byCurrency[wallet.symbol] = balance;
            }
        });

        // Invoice stats
        const invoiceStats = {
            total: userInvoices.length,
            paid: userInvoices.filter((inv) => inv.status === 'paid').length,
            pending: userInvoices.filter((inv) => inv.status === 'sent').length,
            overdue: userInvoices.filter((inv) => inv.status === 'overdue').length,
            totalAmount: userInvoices.reduce(
                (sum, inv) => sum + parseFloat(inv.amount),
                0
            ),
        };

        // Employee stats
        const employeeStats = {
            total: userEmployees.length,
            active: userEmployees.filter((emp) => emp.status === 'active').length,
            totalPayroll: userEmployees.reduce(
                (sum, emp) => sum + parseFloat(emp.salary),
                0
            ),
        };

        return NextResponse.json({
            overview: {
                totalBalance,
                totalVolume,
                incoming,
                outgoing,
                transactionCount: userTransactions.length,
                recentTransactionCount: recentTransactions.length,
            },
            byCurrency,
            invoices: invoiceStats,
            employees: employeeStats,
        });
    } catch (error) {
        console.error('Error fetching analytics overview:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
