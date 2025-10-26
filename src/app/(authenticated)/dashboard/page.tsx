"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";
import { walletApi, transactionApi, analyticsApi } from "@/lib/api";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Wallet as WalletIcon,
  DollarSign,
  Receipt,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Repeat,
} from "lucide-react";
import { ReceiveModal } from "@/components/wallet/ReceiveModal";
import { SendModal } from "@/components/wallet/SendModal";
import { SwapModal } from "@/components/wallet/SwapModal";

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

const weeklyData = [
  { week: "Week1", amount: 45000 },
  { week: "Week2", amount: 32000 },
  { week: "Week3", amount: 38000 },
  { week: "Week4", amount: 52000 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useUser();
  const { userId } = useCurrentUser();
  const [balance, setBalance] = useState("0");
  const [monthlyVolume, setMonthlyVolume] = useState("0");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  // Mock wallet data for modals - will be replaced with first real wallet
  const defaultWallet = wallets.length > 0 ? {
    currency: wallets[0].currency,
    symbol: wallets[0].currency,
    address: wallets[0].address || "0x742a35Cc8634C0532925a3b848cBe97595f0bEb",
    balance: wallets[0].balance,
    name: wallets[0].currency,
  } : {
    currency: "USD Coin",
    symbol: "USDC",
    address: "0x742a35Cc8634C0532925a3b848cBe97595f0bEb",
    balance: "0",
    name: "USD Coin",
  };

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      setLoadingData(true);
      try {
        const [walletsRes, transactionsRes] = await Promise.all([
          walletApi.getAll(userId),
          transactionApi.getAll(userId)
        ]);

        const fetchedWallets = walletsRes.wallets || [];
        const fetchedTransactions = transactionsRes.transactions || [];

        setWallets(fetchedWallets);
        setTransactions(fetchedTransactions);

        // Calculate total balance across all wallets
        const totalBalance = fetchedWallets.reduce((sum: number, w: any) => {
          return sum + parseFloat(w.balance);
        }, 0);
        setBalance(totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        // Calculate monthly volume (sum of all transactions this month)
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        const monthlyTxns = fetchedTransactions.filter((t: any) => {
          const txDate = new Date(t.timestamp);
          return txDate.getMonth() === thisMonth && txDate.getFullYear() === thisYear;
        });

        const monthlyVol = monthlyTxns.reduce((sum: number, t: any) => {
          return sum + Math.abs(parseFloat(t.amount));
        }, 0);
        setMonthlyVolume(monthlyVol.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleOpenSendModal = () => {
    setSendModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setSendModalOpen(false);
  };

  const handleOpenReceiveModal = () => {
    setReceiveModalOpen(true);
  };

  const handleCloseReceiveModal = () => {
    setReceiveModalOpen(false);
  };

  const handleOpenSwapModal = () => {
    setSwapModalOpen(true);
  };

  const handleCloseSwapModal = () => {
    setSwapModalOpen(false);
  };

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00c48c] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0b1f3a] text-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-white/10 px-6 py-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-[#00c48c]" />
              <span className="text-lg font-bold">BorderlessPay</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-4 py-3 text-sm font-semibold transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/wallet"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <WalletIcon className="h-5 w-5" />
              Wallet
            </Link>
            <Link
              href="/payments"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <Send className="h-5 w-5" />
              Payments
            </Link>
            <Link
              href="/invoicing"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <Receipt className="h-5 w-5" />
              Invoicing
            </Link>
            <Link
              href="/payroll"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <Users className="h-5 w-5" />
              Payroll
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <TrendingUp className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>

          {/* User Profile */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00c48c] text-sm font-bold text-white">
                {user?.businessName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">
                  {user?.businessName || "User"}
                </p>
                <p className="truncate text-xs text-gray-400">Premium Account</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="mt-2 w-full justify-start gap-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1f3a]">Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome back to BorderlessPay
            </p>
          </div>
        </header>

        <div className="p-8">
          {/* Balance Cards */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {/* Total Balance */}
            <Card className="overflow-hidden border-none bg-gradient-to-br from-[#0b1f3a] to-[#0b3f69] text-white shadow-lg">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                  <DollarSign className="h-4 w-4" />
                  Total Balance
                </div>
                <div className="mb-2 text-4xl font-extrabold">
                  ${balance}
                </div>
                <p className="text-xs text-gray-400">Across all wallets</p>
              </CardContent>
            </Card>

            {/* Monthly Volume */}
            <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <TrendingUp className="h-4 w-4 text-[#00c48c]" />
                  Monthly Volume
                </div>
                <div className="mb-2 text-4xl font-extrabold text-[#0b1f3a]">
                  ${monthlyVolume}
                </div>
                <p className="flex items-center gap-1 text-xs text-[#00c48c]">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#0b1f3a]">
              Quick Actions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                onClick={handleOpenSendModal}
                className="h-auto justify-start gap-3 rounded-xl bg-[#00c48c] p-4 text-left hover:bg-[#00b37d]"
              >
                <Send className="h-5 w-5" />
                <span className="font-semibold">Send Money</span>
              </Button>
              <Button
                onClick={handleOpenReceiveModal}
                variant="outline"
                className="h-auto justify-start gap-3 rounded-xl border-2 p-4 text-left"
              >
                <Download className="h-5 w-5" />
                <span className="font-semibold">Receive</span>
              </Button>
              <Button
                onClick={handleOpenSwapModal}
                variant="outline"
                className="h-auto justify-start gap-3 rounded-xl border-2 p-4 text-left"
              >
                <Repeat className="h-5 w-5" />
                <span className="font-semibold">Swap</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto justify-start gap-3 rounded-xl border-2 p-4 text-left"
              >
                <Link href="/invoicing/create">
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold">Create Invoice</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Transaction Analytics & Recent Transactions */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Transaction Analytics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6 text-lg font-bold text-[#0b1f3a]">
                  Transaction Analytics
                </h3>
                <div className="flex items-end justify-between gap-2">
                  {weeklyData.map((data, index) => {
                    const height = (data.amount / maxAmount) * 200;
                    return (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div
                          className="w-full rounded-t-lg bg-[#00c48c] transition-all hover:opacity-80"
                          style={{ height: `${height}px` }}
                        />
                        <span className="text-xs font-medium text-gray-600">
                          {data.week}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0b1f3a]">
                    Recent Transactions
                  </h3>
                  <Link
                    href="/payments"
                    className="flex items-center gap-1 text-sm font-medium text-[#00c48c] hover:underline"
                  >
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => {
                    const isIncoming = parseFloat(transaction.amount) > 0;
                    const amount = Math.abs(parseFloat(transaction.amount));
                    const txDate = new Date(transaction.timestamp);
                    const timeAgo = getTimeAgo(txDate);

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${isIncoming
                              ? "bg-green-100"
                              : "bg-red-100"
                              }`}
                          >
                            {isIncoming ? (
                              <TrendingDown className="h-5 w-5 text-green-600" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#0b1f3a]">
                              {transaction.type === 'swap'
                                ? `Swap ${transaction.fromCurrency} → ${transaction.toCurrency}`
                                : transaction.type === 'send'
                                  ? `To ${transaction.toAddress?.slice(0, 12)}...`
                                  : transaction.note || 'Transaction'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {transaction.transactionHash?.slice(0, 16)}... • {timeAgo}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-bold ${isIncoming
                              ? "text-green-600"
                              : "text-gray-900"
                              }`}
                          >
                            {isIncoming ? '+' : '-'}{transaction.currency}{amount.toLocaleString()}
                          </p>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${transaction.status === "completed"
                              ? "bg-[#00c48c]/10 text-[#00c48c]"
                              : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Send Modal */}
      <SendModal
        isOpen={sendModalOpen}
        onClose={handleCloseSendModal}
        currency={defaultWallet.currency}
        currencySymbol={defaultWallet.symbol}
        walletAddress={defaultWallet.address}
        availableBalance={defaultWallet.balance}
        walletName={defaultWallet.name}
      />

      {/* Receive Modal */}
      <ReceiveModal
        isOpen={receiveModalOpen}
        onClose={handleCloseReceiveModal}
        currency={defaultWallet.currency}
        currencySymbol={defaultWallet.symbol}
        walletAddress={defaultWallet.address}
      />

      {/* Swap Modal */}
      <SwapModal
        isOpen={swapModalOpen}
        onClose={handleCloseSwapModal}
      />
    </div>
  );
}
