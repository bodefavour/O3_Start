"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-provider";
import { walletApi, transactionApi } from "@/lib/api";
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
import { SignInButton } from "@/components/thirdweb/signin-form";
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

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, address, isHederaWallet } = useAuthContext();

  const { userId } = useCurrentUser();
  const [balance, setBalance] = useState("0");
  const [monthlyVolume, setMonthlyVolume] = useState("0");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const [loadingData, setLoadingData] = useState(true);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);




  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isAuthenticated, router]);

  // Use connected wallet address for modals
  const defaultWallet = address ? {
    currency: isHederaWallet ? "Hedera" : "USD Coin",
    symbol: isHederaWallet ? "HBAR" : "USDC",
    address: address,
    balance: balance,
    name: isHederaWallet ? "Hedera Account" : "USD Coin",
  } : null;

  // useEffect(() => {
  //   // Check authentication
  //   if (!isAuthenticated) {
  //     router.push("/signin");
  //     return;
  //   }

  //   // Simulate loading data
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   // TODO: Fetch real data from Hedera
  //   // fetchWalletBalance();
  //   // fetchMonthlyVolume();
  //   // fetchTransactions();
  // }, [isAuthenticated, router]);


  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const backendSigningEnabled = process.env.NEXT_PUBLIC_BACKEND_SIGNING_ENABLED === 'true';
        const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;

        // Fetch wallets and transactions separately to handle errors individually
        let fetchedWallets = [];
        let fetchedTransactions = [];

        // Try to fetch wallets
        try {
          const walletsRes = await walletApi.getAll(userId);
          fetchedWallets = walletsRes.wallets || [];
        } catch (walletError) {
          console.warn('No wallets found for user, starting fresh');
          fetchedWallets = [];
        }

        // Try to fetch transactions
        try {
          const transactionsRes = await transactionApi.getAll(userId);
          fetchedTransactions = transactionsRes.transactions || [];
        } catch (txError) {
          console.warn('No transactions found for user, starting fresh');
          fetchedTransactions = [];
        }

        // Fetch Hedera data if backend signing enabled
        if (backendSigningEnabled && operatorId) {
          try {
            // Fetch real-time HBAR price
            const priceResponse = await fetch('/api/hedera/price');
            const priceResult = await priceResponse.json();
            const hbarPrice = priceResult.success ? priceResult.data.hbarPrice : 0.05;
            
            console.log('✅ HBAR Price for dashboard:', hbarPrice, 'USD');

            // Fetch Hedera balance
            const balanceResponse = await fetch(`/api/hedera/balance?accountId=${operatorId}`);
            const balanceResult = await balanceResponse.json();
            
            if (balanceResult.success) {
              const hbarAmount = parseFloat(balanceResult.data.hbarBalance || '0');
              let totalValue = hbarAmount * hbarPrice;
              
              // Calculate token values properly
              balanceResult.data.tokens?.forEach((token: any) => {
                const tokenBalance = parseFloat(token.balance || '0');
                const tokenSymbol = token.symbol.toUpperCase();
                
                // Stablecoins are worth $1 each
                if (tokenSymbol.includes('USD') || tokenSymbol.includes('USDC') || 
                    tokenSymbol.includes('USDT') || tokenSymbol === 'BPUSD') {
                  totalValue += tokenBalance;
                } else {
                  // Other tokens: only add value if balance is reasonable
                  if (tokenBalance < 10000) {
                    totalValue += tokenBalance * 0.01; // $0.01 per token
                  }
                  // Ignore huge balances (test tokens)
                }
              });
              
              setBalance(totalValue.toFixed(2));
            }

            // Fetch Hedera transactions
            const txResponse = await fetch(`/api/hedera/transactions?accountId=${operatorId}&limit=10`);
            const txResult = await txResponse.json();
            
            if (txResult.success) {
              fetchedTransactions = [...(txResult.data.transactions || []), ...fetchedTransactions];
              console.log('✅ Fetched Hedera transactions for dashboard:', txResult.data.transactions.length);
            }
          } catch (hederaError) {
            console.warn('Failed to fetch Hedera data:', hederaError);
          }
        } else {
          // Calculate total balance from database wallets only
          const totalBalance = fetchedWallets.reduce((sum: number, w: any) => {
            return sum + parseFloat(w.balance || '0');
          }, 0);
          setBalance(totalBalance.toFixed(2));
        }

        setWallets(fetchedWallets);
        setTransactions(fetchedTransactions);

        // Calculate monthly volume from transactions
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const monthlyTx = fetchedTransactions.filter((tx: any) => 
          new Date(tx.createdAt) >= oneMonthAgo
        );
        const volume = monthlyTx.reduce((sum: number, tx: any) => 
          sum + parseFloat(tx.amount || '0'), 0
        );
        setMonthlyVolume(volume.toFixed(2));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setBalance('0.00');
        setMonthlyVolume('0.00');
      }
    };

    fetchData();
  }, [userId]);


  const handleLogout = () => {
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
                {"U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">
                  {"User"}
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
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1f3a]">Dashboard</h1>
            <p className="text-sm text-gray-600">
              Welcome back to BorderlessPay
            </p>
          </div>
          <SignInButton />
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
            {/* Transaction Analytics - TODO: Implement real analytics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6 text-lg font-bold text-[#0b1f3a]">
                  Transaction Analytics
                </h3>
                <div className="flex items-center justify-center h-48 text-gray-500">
                  <p>Analytics data will be available soon</p>
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
      {defaultWallet && (
        <SendModal
          isOpen={sendModalOpen}
          onClose={handleCloseSendModal}
          currency={defaultWallet.currency}
          currencySymbol={defaultWallet.symbol}
          // walletAddress={defaultWallet.address}
          availableBalance={defaultWallet.balance}
          walletName={defaultWallet.name}
        />
      )}

      {/* Receive Modal */}
      {defaultWallet && (
        <ReceiveModal
          isOpen={receiveModalOpen}
          onClose={handleCloseReceiveModal}
          currency={defaultWallet.currency}
          currencySymbol={defaultWallet.symbol}
          walletAddress={defaultWallet.address}
        />
      )}

      {/* Swap Modal */}
      <SwapModal
        isOpen={swapModalOpen}
        onClose={handleCloseSwapModal}
      />
    </div>
  );
}
