import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { employees } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/employees - Get all employees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userEmployees = await db
      .select()
      .from(employees)
      .where(eq(employees.userId, userId))
      .orderBy(desc(employees.createdAt));

    // Apply filters
    let filtered = userEmployees;
    if (department && department !== 'all') {
      filtered = filtered.filter((emp) => emp.department === department);
    }
    if (status) {
      filtered = filtered.filter((emp) => emp.status === status);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchLower) ||
          emp.lastName.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower) ||
          emp.employeeId.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ employees: filtered });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST /api/employees - Add employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      firstName,
      lastName,
      email,
      position,
      department,
      salary,
      currency,
      joinedDate,
    } = body;

    if (!userId || !firstName || !lastName || !email || !position || !department || !salary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate employee ID
    const employeeId = `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const [newEmployee] = await db
      .insert(employees)
      .values({
        userId,
        employeeId,
        firstName,
        lastName,
        email,
        position,
        department,
        salary: salary.toString(),
        currency: currency || 'USD',
        status: 'active',
        joinedDate: joinedDate ? new Date(joinedDate) : new Date(),
      })
      .returning();

    return NextResponse.json({ employee: newEmployee }, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}
