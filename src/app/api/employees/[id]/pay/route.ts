import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { employees, transactions, wallets } from '@/db/schema';
import { eq } from 'drizzle-orm';

// POST /api/employees/[id]/pay - Process payroll payment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { walletId, note } = body;

    // Get employee
    const [employee] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, params.id));

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    // Get wallet
    const [wallet] = await db
      .select()
      .from(wallets)
      .where(eq(wallets.id, walletId));

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    const salary = parseFloat(employee.salary);
    const balance = parseFloat(wallet.balance);

    if (balance < salary) {
      return NextResponse.json(
        { error: 'Insufficient balance in wallet' },
        { status: 400 }
      );
    }

    // Create payroll transaction
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    const [transaction] = await db
      .insert(transactions)
      .values({
        userId: employee.userId,
        type: 'outgoing',
        status: 'completed',
        amount: salary.toString(),
        currency: employee.currency,
        fromAddress: wallet.address,
        toAddress: employee.email, // In real app, would be employee's wallet address
        note: note || `Payroll payment to ${employee.firstName} ${employee.lastName}`,
        hash: txHash,
        metadata: {
          employeeId: employee.id,
          employeeNumber: employee.employeeId,
          paymentType: 'payroll',
        },
      })
      .returning();

    // Update wallet balance
    await db
      .update(wallets)
      .set({
        balance: (balance - salary).toString(),
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, walletId));

    return NextResponse.json({
      success: true,
      transaction,
      hash: txHash,
      employee: {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        amount: salary,
      },
    });
  } catch (error) {
    console.error('Error processing payroll:', error);
    return NextResponse.json(
      { error: 'Failed to process payroll payment' },
      { status: 500 }
    );
  }
}
