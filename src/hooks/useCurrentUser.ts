import { useState, useEffect } from 'react';

// For demo purposes, we'll use the operator account or demo user
// In production, this would come from Better Auth session
export function useCurrentUser() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if backend signing is enabled
        const backendSigningEnabled = process.env.NEXT_PUBLIC_BACKEND_SIGNING_ENABLED === 'true';
        const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;

        if (backendSigningEnabled && operatorId) {
            // Use operator account as userId in dev mode
            console.log('🔧 Using operator account as userId:', operatorId);
            setUserId(operatorId);
            setLoading(false);
            return;
        }

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
