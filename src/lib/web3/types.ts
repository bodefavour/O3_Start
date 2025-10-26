export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface Payment {
  id: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  transactionId?: string;
  memo?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: number;
  createdAt: number;
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
}

export interface PayrollEntry {
  employeeId: string;
  employeeName: string;
  accountId: string;
  amount: string;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  processedAt?: number;
}

export interface TransactionAnalytics {
  totalVolume: string;
  transactionCount: number;
  averageTransaction: string;
  successRate: number;
  topCurrencies: Array<{
    currency: string;
    volume: string;
    count: number;
  }>;
  dailyVolume: Array<{
    date: string;
    volume: string;
    count: number;
  }>;
}

export interface WalletBalance {
  accountId: string;
  balance: string;
  currency: string;
}
