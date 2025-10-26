/**
 * Invoices Hook - Fetch and manage invoices
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, useToast } from '@/contexts/auth-provider';
import type { Invoice } from '@/lib/web3/types';

export function useInvoices() {
    const { user } = useUser();
    const { showToast } = useToast();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);

    const createInvoice = async (
        client: string,
        amount: number,
        description: string
    ) => {
        if (!user?.accountId) {
            showToast('Please login first', 'error');
            return { success: false };
        }

        setLoading(true);

        try {
            const response = await fetch('/api/invoicing/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client,
                    amount,
                    currency: 'HBAR',
                    description,
                }),
            });

            const data = await response.json();

            if (data.success) {
                showToast('Invoice created successfully!', 'success');
                return { success: true, data: data.data };
            } else {
                showToast(data.error || 'Failed to create invoice', 'error');
                return { success: false, error: data.error };
            }
        } catch (err: any) {
            showToast('Network error. Please try again.', 'error');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const getInvoice = async (invoiceId: string) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/invoicing/${invoiceId}`);
            const data = await response.json();

            if (data.success) {
                return { success: true, data: data.data };
            } else {
                showToast(data.error || 'Failed to fetch invoice', 'error');
                return { success: false, error: data.error };
            }
        } catch (err: any) {
            showToast('Network error. Please try again.', 'error');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        invoices,
        loading,
        createInvoice,
        getInvoice,
    };
}
