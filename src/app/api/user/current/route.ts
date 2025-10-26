import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/user/current - Get current user
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return the demo user
    // In production, you'd get the user from the auth session
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, 'demo@o3.com'))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      userId: user.id,
      email: user.email,
      businessName: user.businessName,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
