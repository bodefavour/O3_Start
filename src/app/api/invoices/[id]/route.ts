import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/invoices/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const [invoice] = await db
            .select()
            .from(invoices)
            .where(eq(invoices.id, params.id));

        if (!invoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ invoice });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invoice' },
            { status: 500 }
        );
    }
}

// PATCH /api/invoices/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { status, paidAt, clientName, description, amount, dueDate } = body;

        const updates: any = { updatedAt: new Date() };
        if (status !== undefined) {
            updates.status = status;
            if (status === 'paid' && !paidAt) {
                updates.paidAt = new Date();
            }
        }
        if (paidAt !== undefined) updates.paidAt = paidAt ? new Date(paidAt) : null;
        if (clientName !== undefined) updates.clientName = clientName;
        if (description !== undefined) updates.description = description;
        if (amount !== undefined) updates.amount = amount.toString();
        if (dueDate !== undefined) updates.dueDate = dueDate ? new Date(dueDate) : null;

        const [updatedInvoice] = await db
            .update(invoices)
            .set(updates)
            .where(eq(invoices.id, params.id))
            .returning();

        if (!updatedInvoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ invoice: updatedInvoice });
    } catch (error) {
        console.error('Error updating invoice:', error);
        return NextResponse.json(
            { error: 'Failed to update invoice' },
            { status: 500 }
        );
    }
}

// DELETE /api/invoices/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const [deletedInvoice] = await db
            .delete(invoices)
            .where(eq(invoices.id, params.id))
            .returning();

        if (!deletedInvoice) {
            return NextResponse.json(
                { error: 'Invoice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        return NextResponse.json(
            { error: 'Failed to delete invoice' },
            { status: 500 }
        );
    }
}
