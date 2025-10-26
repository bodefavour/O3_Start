// API utility functions for frontend

const API_BASE = '/api';

// Helper to get demo user ID (in production, this would come from auth session)
export const DEMO_USER_ID = 'demo-user';

// Wallet API
export const walletApi = {
    getAll: async (userId: string) => {
        const res = await fetch(`${API_BASE}/wallets?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch wallets');
        return res.json();
    },

    getOne: async (id: string) => {
        const res = await fetch(`${API_BASE}/wallets/${id}`);
        if (!res.ok) throw new Error('Failed to fetch wallet');
        return res.json();
    },

    create: async (data: any) => {
        const res = await fetch(`${API_BASE}/wallets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create wallet');
        return res.json();
    },
};

// Transaction API
export const transactionApi = {
    getAll: async (userId: string, filters?: { status?: string; type?: string; limit?: number }) => {
        const params = new URLSearchParams({ userId });
        if (filters?.status) params.append('status', filters.status);
        if (filters?.type) params.append('type', filters.type);
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const res = await fetch(`${API_BASE}/transactions?${params}`);
        if (!res.ok) throw new Error('Failed to fetch transactions');
        return res.json();
    },

    send: async (data: {
        userId: string;
        fromWalletId: string;
        toAddress: string;
        amount: string;
        currency: string;
        note?: string;
    }) => {
        const res = await fetch(`${API_BASE}/transactions/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to send transaction');
        return res.json();
    },

    swap: async (data: {
        userId: string;
        fromWalletId: string;
        toWalletId: string;
        fromAmount: string;
        fromCurrency: string;
        toCurrency: string;
    }) => {
        const res = await fetch(`${API_BASE}/transactions/swap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to swap');
        return res.json();
    },
};

// Invoice API
export const invoiceApi = {
    getAll: async (userId: string, filters?: { status?: string; search?: string }) => {
        const params = new URLSearchParams({ userId });
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);

        const res = await fetch(`${API_BASE}/invoices?${params}`);
        if (!res.ok) throw new Error('Failed to fetch invoices');
        return res.json();
    },

    getStats: async (userId: string) => {
        const res = await fetch(`${API_BASE}/invoices/stats?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch invoice stats');
        return res.json();
    },

    create: async (data: any) => {
        const res = await fetch(`${API_BASE}/invoices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create invoice');
        return res.json();
    },

    update: async (id: string, data: any) => {
        const res = await fetch(`${API_BASE}/invoices/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update invoice');
        return res.json();
    },

    delete: async (id: string) => {
        const res = await fetch(`${API_BASE}/invoices/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete invoice');
        return res.json();
    },
};

// Employee API
export const employeeApi = {
    getAll: async (userId: string, filters?: { department?: string; status?: string; search?: string }) => {
        const params = new URLSearchParams({ userId });
        if (filters?.department) params.append('department', filters.department);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);

        const res = await fetch(`${API_BASE}/employees?${params}`);
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
    },

    create: async (data: any) => {
        const res = await fetch(`${API_BASE}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create employee');
        return res.json();
    },

    update: async (id: string, data: any) => {
        const res = await fetch(`${API_BASE}/employees/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update employee');
        return res.json();
    },

    pay: async (id: string, data: { walletId: string; note?: string }) => {
        const res = await fetch(`${API_BASE}/employees/${id}/pay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to process payment');
        return res.json();
    },
};

// Analytics API
export const analyticsApi = {
    getOverview: async (userId: string) => {
        const res = await fetch(`${API_BASE}/analytics/overview?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch analytics');
        return res.json();
    },
};
