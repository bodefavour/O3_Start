/**
 * Payments Hook - Fetch and manage payment history
 */

'use client';

import { useState, useEffect } from 'react';
import { useUser, useToast } from '@/contexts';
import type { Payment, PaginatedResponse } from '@/lib/web3/types';

export function usePayments() {
    const { user } = useUser();
    const { showToast } = useToast();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        hasMore: false,
    });

    const fetchPayments = async (page = 1) => {
        if (!user?.accountId) return;

        setLoading(true);

        try {
            const response = await fetch(
                `/api/payments/history?accountId=${user.accountId}&page=${page}&limit=10`
            );
            const data: PaginatedResponse<Payment> = await response.json();

            if (data.success) {
                if (page === 1) {
                    setPayments(data.data);
                } else {
                    setPayments((prev) => [...prev, ...data.data]);
                }
                setPagination(data.pagination);
            } else {
                showToast('Failed to fetch payments', 'error');
            }
        } catch (err) {
            showToast('Network error. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (pagination.hasMore && !loading) {
            fetchPayments(pagination.page + 1);
        }
    };

    useEffect(() => {
        if (user?.accountId) {
            fetchPayments();
        }
    }, [user?.accountId]);

    return {
        payments,
        loading,
        pagination,
        fetchPayments,
        loadMore,
    };
}
