/**
 * Wallet Hook - Fetch and manage wallet data
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, useToast } from '@/contexts/auth-provider';

interface WalletBalance {
    accountId: string;
    balance: string;
    currency: string;
}

export function useWallet() {
    const { user } = useUser();
    const { showToast } = useToast();
    const [balance, setBalance] = useState<WalletBalance | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = async () => {
        if (!user?.accountId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/wallet/balance?accountId=${user.accountId}`);
            const data = await response.json();

            if (data.success) {
                setBalance(data.data);
            } else {
                setError(data.error || 'Failed to fetch balance');
                showToast(data.error || 'Failed to fetch balance', 'error');
            }
        } catch (err: any) {
            setError(err.message);
            showToast('Network error. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const sendMoney = async (recipientId: string, amount: number, note?: string) => {
        if (!user?.accountId) {
            showToast('Please login first', 'error');
            return { success: false };
        }

        setLoading(true);

        try {
            const response = await fetch('/api/payments/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient: recipientId,
                    amount,
                    currency: 'HBAR',
                    note,
                }),
            });

            const data = await response.json();

            if (data.success) {
                showToast('Payment sent successfully!', 'success');
                // Refresh balance
                await fetchBalance();
                return { success: true, data: data.data };
            } else {
                showToast(data.error || 'Payment failed', 'error');
                return { success: false, error: data.error };
            }
        } catch (err: any) {
            showToast('Network error. Please try again.', 'error');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.accountId) {
            fetchBalance();
        }
    }, [user?.accountId]);

    return {
        balance,
        loading,
        error,
        fetchBalance,
        sendMoney,
    };
}
