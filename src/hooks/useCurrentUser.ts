import { useState, useEffect } from 'react';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// For demo purposes, we'll use the seeded user
// In production, this would come from Better Auth session
export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the demo user from database
    async function fetchUser() {
      try {
        // For now, we'll use a hardcoded approach
        // In production, you'd get this from the auth session
        const response = await fetch('/api/user/current');
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        } else {
          // Fallback: use demo user email to get ID
          setUserId('demo-user-id');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // Use a placeholder for demo
        setUserId('demo-user-id');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { userId, loading };
}
