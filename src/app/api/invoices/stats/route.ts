import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

// GET /api/invoices/stats - Get invoice statistics
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

        const userInvoices = await db
            .select()
            .from(invoices)
            .where(eq(invoices.userId, userId));

        // Calculate stats
        const stats = {
            total: userInvoices.length,
            paid: userInvoices.filter((inv) => inv.status === 'paid').length,
            sent: userInvoices.filter((inv) => inv.status === 'sent').length,
            overdue: userInvoices.filter((inv) => inv.status === 'overdue').length,
            draft: userInvoices.filter((inv) => inv.status === 'draft').length,
            totalAmount: userInvoices.reduce(
                (sum, inv) => sum + parseFloat(inv.amount),
                0
            ),
            paidAmount: userInvoices
                .filter((inv) => inv.status === 'paid')
                .reduce((sum, inv) => sum + parseFloat(inv.amount), 0),
            pendingAmount: userInvoices
                .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
                .reduce((sum, inv) => sum + parseFloat(inv.amount), 0),
        };

        return NextResponse.json({ stats });
    } catch (error) {
        console.error('Error fetching invoice stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoice stats' },
            { status: 500 }
        );
    }
}
