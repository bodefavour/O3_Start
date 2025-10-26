"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";
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
} from "lucide-react";

// Mock data - will be replaced with real API calls
const mockTransactions = [
  {
    id: "TXN01",
    name: "TechCorp Ltd",
    description: "2 minutes ago",
    amount: "+2,500 USDC",
    status: "completed",
    type: "incoming",
  },
  {
    id: "TXN02",
    name: "Lagos Office",
    description: "1 hour ago",
    amount: "-₦450,000",
    status: "completed",
    type: "outgoing",
  },
  {
    id: "TXN03",
    name: "Global Suppliers",
    description: "3 hours ago",
    amount: "+1,200 USDT",
    status: "completed",
    type: "incoming",
  },
  {
    id: "INV-2024-001",
    name: "Client Invoice",
    description: "5 hours ago",
    amount: "+2,500 USDC",
    status: "completed",
    type: "incoming",
  },
  {
    id: "TXN05",
    name: "Vendor Payment",
    description: "5 hours ago",
    amount: "-300 USD",
    status: "pending",
    type: "outgoing",
  },
];

const weeklyData = [
  { week: "Week1", amount: 45000 },
  { week: "Week2", amount: 32000 },
  { week: "Week3", amount: 38000 },
  { week: "Week4", amount: 52000 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useUser();
  const [balance, setBalance] = useState("67,980.76");
  const [monthlyVolume, setMonthlyVolume] = useState("186,450");
  const [loading, setLoading] = useState(true);

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

    // TODO: Fetch real data from Hedera
    // fetchWalletBalance();
    // fetchMonthlyVolume();
    // fetchTransactions();
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
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
            <div className="grid gap-4 sm:grid-cols-3">
              <Button
                asChild
                className="h-auto justify-start gap-3 rounded-xl bg-[#00c48c] p-4 text-left hover:bg-[#00b37d]"
              >
                <Link href="/wallet?action=send">
                  <Send className="h-5 w-5" />
                  <span className="font-semibold">Send Money</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto justify-start gap-3 rounded-xl border-2 p-4 text-left"
              >
                <Link href="/wallet?action=receive">
                  <Download className="h-5 w-5" />
                  <span className="font-semibold">Receive</span>
                </Link>
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
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            transaction.type === "incoming"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "incoming" ? (
                            <TrendingDown className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0b1f3a]">
                            {transaction.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.id} • {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${
                            transaction.type === "incoming"
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                            transaction.status === "completed"
                              ? "bg-[#00c48c]/10 text-[#00c48c]"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {transaction.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
