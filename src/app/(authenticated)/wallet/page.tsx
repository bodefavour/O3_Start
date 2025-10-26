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
    Copy,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet as WalletIcon,
    DollarSign,
    Receipt,
    Users,
    BarChart3,
    Settings,
    LogOut,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    Clock,
    Repeat,
} from "lucide-react";
import { useToast } from "@/contexts";
import { ReceiveModal } from "@/components/wallet/ReceiveModal";
import { SendModal } from "@/components/wallet/SendModal";

// Mock wallet data - will be replaced with Hedera API
const mockWallets = [
  {
    id: "1",
    name: "USD Coin",
    symbol: "USDC",
    balance: "25,000",
    balanceUSD: "25,000.00",
    address: "0x742a35Cc8634C0532925a3b848cBe97595f0bEb",
    type: "Stablecoin",
    icon: "💵",
  },
  {
    id: "2",
    name: "Tether",
    symbol: "USDT",
    balance: "15,345",
    balanceUSD: "15,345.00",
    address: "0x8f3Cf7ad23Cd3CaBbD9735AF19802239c6A",
    type: "Stablecoin",
    icon: "💲",
  },
  {
    id: "3",
    name: "HUSD Stablecoin",
    symbol: "HUSD",
    balance: "5,000",
    balanceUSD: "5,000.00",
    address: "0x4Fab6145d64652a48d7853303f6E23f6A6237C2",
    type: "Stablecoin",
    icon: "🏦",
  },
];

// Mock local currency wallets
const mockLocalWallets = [
  {
    id: "4",
    name: "NGN",
    fullName: "Nigerian Naira",
    balance: "12,500,000",
    balanceUSD: "8,064.52",
    address: "NGN-WALLET-001",
    type: "Local",
    icon: "🇳🇬",
    badge: "-0.52%",
    badgeColor: "red",
  },
  {
    id: "5",
    name: "KES",
    fullName: "Kenyan Shilling",
    balance: "850,000",
    balanceUSD: "6,538.46",
    address: "KES-WALLET-002",
    type: "Local",
    icon: "🇰🇪",
    badge: "+11%",
    badgeColor: "green",
  },
  {
    id: "6",
    name: "GHS",
    fullName: "Ghanaian Cedi",
    balance: "45,000",
    balanceUSD: "3,750.00",
    address: "GHS-WALLET-003",
    type: "Local",
    icon: "�🇭",
    badge: "+0.3%",
    badgeColor: "green",
  },
];

const mockTransactions = [
    {
        id: "1",
        name: "John Smith (Winxal)",
        date: "Jan 15, 11:23 AM",
        amount: "+2,500 USDC",
        status: "completed",
        type: "incoming",
        hash: "hash1c742a35Cc8634C053292...",
    },
    {
        id: "2",
        name: "Lagos Office",
        date: "Jan 15, 11:22 AM",
        amount: "-500 USDT",
        fee: "Fee: $2.6",
        status: "completed",
        type: "outgoing",
        hash: "hash1c742a35Cc8634C053292...",
    },
    {
        id: "3",
        name: "Swapped to NGN",
        date: "Jan 15, 10:14 AM",
        amount: "-500 USDC",
        fee: "Fee: $4",
        status: "completed",
        type: "swap",
        hash: "hash1c9c4b21c1099ceb432932...",
    },
    {
        id: "4",
        name: "Mary Johnson (Ghana)",
        date: "Jan 12, 03:42 PM",
        amount: "-79.5 HUSD",
        fee: "Fee: $1.23",
        status: "failed",
        type: "outgoing",
        hash: "hash1c9c4b21c1099ceb432932...",
    },
    {
        id: "5",
        name: "Invoice Payment #INV-001",
        date: "Jan 11, 12:01 PM",
        amount: "+2,000 USDC",
        status: "refund",
        type: "incoming",
        hash: "hash1c9c4b21c1099ceb432932...",
    },
];

export default function WalletPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"stablecoins" | "local" | "history">("stablecoins");
    const [filterStatus, setFilterStatus] = useState<"all" | "sent" | "received" | "swapped">("all");
    const [receiveModalOpen, setReceiveModalOpen] = useState(false);
    const [sendModalOpen, setSendModalOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<{
        currency: string;
        symbol: string;
        address: string;
        balance: string;
        name: string;
    } | null>(null);
  
    const totalPortfolioValue = [...mockWallets, ...mockLocalWallets].reduce(
        (sum, wallet) => sum + parseFloat(wallet.balanceUSD.replace(/,/g, "")),
        0
    );

    const totalWallets = mockWallets.length + mockLocalWallets.length;    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/signin");
            return;
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);

        // TODO: Fetch real wallet data from Hedera
        // fetchWalletBalances();
        // fetchTransactionHistory();
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        showToast("Address copied to clipboard!", "success");
    };

    const handleOpenReceiveModal = (currency: string, symbol: string, address: string) => {
        setSelectedWallet({ currency, symbol, address, balance: "", name: "" });
        setReceiveModalOpen(true);
    };

    const handleCloseReceiveModal = () => {
        setReceiveModalOpen(false);
        setSelectedWallet(null);
    };

    const handleOpenSendModal = (currency: string, symbol: string, address: string, balance: string, name: string) => {
        setSelectedWallet({ currency, symbol, address, balance, name });
        setSendModalOpen(true);
    };

    const handleCloseSendModal = () => {
        setSendModalOpen(false);
        setSelectedWallet(null);
    };

    const filteredTransactions = mockTransactions.filter((tx) => {
        if (filterStatus === "all") return true;
        if (filterStatus === "sent") return tx.type === "outgoing";
        if (filterStatus === "received") return tx.type === "incoming";
        if (filterStatus === "swapped") return tx.type === "swap";
        return true;
    });

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
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/wallet"
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-4 py-3 text-sm font-semibold transition-colors"
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#0b1f3a]">Wallets</h1>
                            <p className="text-sm text-gray-600">
                                Manage your multi-currency wallets
                            </p>
                        </div>
                        <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                            <Plus className="h-4 w-4" />
                            Wallet
                        </Button>
                    </div>
                </header>

                <div className="p-8">
                    {/* Portfolio Summary */}
                    <div className="mb-8 grid gap-6 sm:grid-cols-2">
                        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#0b1f3a] to-[#0b3f69] text-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <DollarSign className="h-4 w-4" />
                                    Total Portfolio Value
                                </div>
                                <div className="mb-2 text-4xl font-extrabold">
                                    ${totalPortfolioValue.toLocaleString()}
                                </div>
                                <p className="text-xs text-gray-400">Across all currencies</p>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                            <CardContent className="p-6">
                                <div className="mb-2 text-sm font-medium text-gray-600">
                                    Active Wallets
                                </div>
                                <div className="mb-2 text-4xl font-extrabold text-[#0b1f3a]">
                                    {totalWallets}
                                </div>
                                <p className="text-xs text-gray-600">
                                    {mockWallets.length} Stablecoins • {mockLocalWallets.length} Local
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 flex gap-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("stablecoins")}
                            className={`pb-3 text-sm font-semibold transition-colors ${activeTab === "stablecoins"
                                    ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Stablecoins
                        </button>
                        <button
                            onClick={() => setActiveTab("local")}
                            className={`pb-3 text-sm font-semibold transition-colors ${activeTab === "local"
                                    ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Local Currencies
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`pb-3 text-sm font-semibold transition-colors ${activeTab === "history"
                                    ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Transaction History
                        </button>
                    </div>

                    {/* Stablecoins Tab */}
                    {activeTab === "stablecoins" && (
                        <div className="space-y-4">
                            {mockWallets.map((wallet) => (
                                <Card key={wallet.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                                    {wallet.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-[#0b1f3a]">
                                                        {wallet.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{wallet.symbol}</p>
                                                </div>
                                            </div>
                                            <span className="rounded-full bg-[#00c48c]/10 px-3 py-1 text-xs font-semibold text-[#00c48c]">
                                                {wallet.type}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-600">Balance</p>
                                            <p className="text-2xl font-bold text-[#0b1f3a]">
                                                {wallet.balance} {wallet.symbol}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                ≈ ${wallet.balanceUSD} USD
                                            </p>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2 text-sm font-medium text-gray-600">
                                                Wallet Address
                                            </p>
                                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3">
                                                <code className="flex-1 truncate text-sm text-gray-700">
                                                    {wallet.address}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(wallet.address)}
                                                    className="flex-shrink-0 rounded p-1 hover:bg-gray-200"
                                                >
                                                    <Copy className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => handleOpenSendModal(wallet.name, wallet.symbol, wallet.address, wallet.balance, wallet.name)}
                                                className="flex-1 gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
                                            >
                                                <Send className="h-4 w-4" />
                                                Send Money
                                            </Button>
                                            <Button
                                                onClick={() => handleOpenReceiveModal(wallet.name, wallet.symbol, wallet.address)}
                                                variant="outline"
                                                className="flex-1 gap-2 rounded-xl"
                                            >
                                                <Download className="h-4 w-4" />
                                                Receive
                                            </Button>
                                            <Button variant="outline" className="rounded-xl px-4">
                                                <Repeat className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Quick Actions */}
                            <div className="mb-6 mt-8">
                                <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                    Quick Actions
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <Button
                                        asChild
                                        className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
                                    >
                                        <Link href="/wallet/send">
                                            <Send className="h-4 w-4" />
                                            Send Money
                                        </Link>
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenReceiveModal("Stablecoin", "USDC/USDT", "Select a wallet first")}
                                        variant="outline"
                                        className="gap-2 rounded-xl"
                                    >
                                        <Download className="h-4 w-4" />
                                        Receive
                                    </Button>
                                    <Button variant="outline" className="gap-2 rounded-xl">
                                        <Repeat className="h-4 w-4" />
                                        Swap
                                    </Button>
                                </div>
                            </div>

                            {/* Transaction History */}
                            <div className="mb-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0b1f3a]">
                                            Transactions History
                                        </h3>
                                        <p className="text-sm text-gray-600">Recent wallet activity</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setFilterStatus("all")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "all"
                                                    ? "bg-[#00c48c] text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("sent")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "sent"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Sent
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("received")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "received"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Received
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("swapped")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "swapped"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Swapped
                                        </button>
                                    </div>
                                </div>

                                <Card>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-gray-100">
                                            {filteredTransactions.map((transaction) => (
                                                <div
                                                    key={transaction.id}
                                                    className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                                                transaction.type === "incoming"
                                                                    ? "bg-green-100"
                                                                    : transaction.type === "outgoing"
                                                                    ? "bg-red-100"
                                                                    : "bg-blue-100"
                                                            }`}
                                                        >
                                                            {transaction.type === "incoming" ? (
                                                                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                                                            ) : transaction.type === "outgoing" ? (
                                                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                                                            ) : (
                                                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#0b1f3a]">
                                                                {transaction.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {transaction.date}{" "}
                                                                <span
                                                                    className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                        transaction.status === "completed"
                                                                            ? "bg-[#00c48c]/10 text-[#00c48c]"
                                                                            : transaction.status === "failed"
                                                                            ? "bg-red-100 text-red-600"
                                                                            : "bg-blue-100 text-blue-600"
                                                                    }`}
                                                                >
                                                                    {transaction.status === "completed" && "completed"}
                                                                    {transaction.status === "failed" && "failed"}
                                                                    {transaction.status === "refund" && "refund"}
                                                                </span>
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {transaction.hash}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p
                                                            className={`font-bold ${
                                                                transaction.type === "incoming"
                                                                    ? "text-green-600"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {transaction.amount}
                                                        </p>
                                                        {transaction.fee && (
                                                            <p className="text-xs text-gray-500">
                                                                {transaction.fee}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Load More */}
                                <div className="mt-6 text-center">
                                    <Button variant="outline" className="rounded-xl">
                                        Load More Transactions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Local Currencies Tab */}
                    {activeTab === "local" && (
                        <div className="space-y-4">
                            {mockLocalWallets.map((wallet) => (
                                <Card key={wallet.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                                                    {wallet.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-[#0b1f3a]">
                                                        {wallet.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{wallet.fullName}</p>
                                                </div>
                                            </div>
                                            <span 
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    wallet.badgeColor === "green" 
                                                        ? "bg-[#00c48c]/10 text-[#00c48c]" 
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                            >
                                                {wallet.badge}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-600">Balance</p>
                                            <p className="text-2xl font-bold text-[#0b1f3a]">
                                                {wallet.name} {wallet.balance}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                ≈ ${wallet.balanceUSD} USD
                                            </p>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2 text-sm font-medium text-gray-600">
                                                Wallet Address
                                            </p>
                                            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3">
                                                <code className="flex-1 truncate text-sm text-gray-700">
                                                    {wallet.address}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(wallet.address)}
                                                    className="flex-shrink-0 rounded p-1 hover:bg-gray-200"
                                                >
                                                    <Copy className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => handleOpenSendModal(wallet.fullName, wallet.name, wallet.address, wallet.balance, wallet.fullName)}
                                                className="flex-1 gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
                                            >
                                                <Send className="h-4 w-4" />
                                                Send Money
                                            </Button>
                                            <Button
                                                onClick={() => handleOpenReceiveModal(wallet.fullName, wallet.name, wallet.address)}
                                                variant="outline"
                                                className="flex-1 gap-2 rounded-xl"
                                            >
                                                <Download className="h-4 w-4" />
                                                Receive
                                            </Button>
                                            <Button variant="outline" className="rounded-xl px-4">
                                                <Repeat className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Quick Actions */}
                            <div className="mb-6 mt-8">
                                <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                    Quick Actions
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <Button
                                        asChild
                                        className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
                                    >
                                        <Link href="/wallet/send">
                                            <Send className="h-4 w-4" />
                                            Send Money
                                        </Link>
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenReceiveModal("Local Currency", "NGN/KES/GHS", "Select a wallet first")}
                                        variant="outline"
                                        className="gap-2 rounded-xl"
                                    >
                                        <Download className="h-4 w-4" />
                                        Receive
                                    </Button>
                                    <Button variant="outline" className="gap-2 rounded-xl">
                                        <Repeat className="h-4 w-4" />
                                        Swap
                                    </Button>
                                </div>
                            </div>

                            {/* Transaction History */}
                            <div className="mb-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0b1f3a]">
                                            Transactions History
                                        </h3>
                                        <p className="text-sm text-gray-600">Recent wallet activity</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setFilterStatus("all")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "all"
                                                    ? "bg-[#00c48c] text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("sent")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "sent"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Sent
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("received")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "received"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Received
                                        </button>
                                        <button
                                            onClick={() => setFilterStatus("swapped")}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                filterStatus === "swapped"
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            Swapped
                                        </button>
                                    </div>
                                </div>

                                <Card>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-gray-100">
                                            {filteredTransactions.map((transaction) => (
                                                <div
                                                    key={transaction.id}
                                                    className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                                                transaction.type === "incoming"
                                                                    ? "bg-green-100"
                                                                    : transaction.type === "outgoing"
                                                                    ? "bg-red-100"
                                                                    : "bg-blue-100"
                                                            }`}
                                                        >
                                                            {transaction.type === "incoming" ? (
                                                                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                                                            ) : transaction.type === "outgoing" ? (
                                                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                                                            ) : (
                                                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#0b1f3a]">
                                                                {transaction.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {transaction.date}{" "}
                                                                <span
                                                                    className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                        transaction.status === "completed"
                                                                            ? "bg-[#00c48c]/10 text-[#00c48c]"
                                                                            : transaction.status === "failed"
                                                                            ? "bg-red-100 text-red-600"
                                                                            : "bg-blue-100 text-blue-600"
                                                                    }`}
                                                                >
                                                                    {transaction.status === "completed" && "completed"}
                                                                    {transaction.status === "failed" && "failed"}
                                                                    {transaction.status === "refund" && "refund"}
                                                                </span>
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {transaction.hash}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p
                                                            className={`font-bold ${
                                                                transaction.type === "incoming"
                                                                    ? "text-green-600"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {transaction.amount}
                                                        </p>
                                                        {transaction.fee && (
                                                            <p className="text-xs text-gray-500">
                                                                {transaction.fee}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Load More */}
                                <div className="mt-6 text-center">
                                    <Button variant="outline" className="rounded-xl">
                                        Load More Transactions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Transaction History Tab */}
                    {activeTab === "history" && (
                        <div>
                            {/* Quick Actions */}
                            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                                <Button
                                    asChild
                                    className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
                                >
                                    <Link href="/wallet/send">
                                        <Send className="h-4 w-4" />
                                        Send Money
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => handleOpenReceiveModal("Transaction History", "All Currencies", "Select a wallet first")}
                                    variant="outline"
                                    className="gap-2 rounded-xl"
                                >
                                    <Download className="h-4 w-4" />
                                    Receive
                                </Button>
                                <Button variant="outline" className="gap-2 rounded-xl">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Button>
                            </div>

                            {/* Transactions Header */}
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-[#0b1f3a]">
                                    Transactions History
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilterStatus("all")}
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filterStatus === "all"
                                                ? "bg-[#00c48c] text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("sent")}
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filterStatus === "sent"
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        Sent
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("received")}
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filterStatus === "received"
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        Received
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus("swapped")}
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filterStatus === "swapped"
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        Swapped
                                    </button>
                                </div>
                            </div>

                            {/* Transaction List */}
                            <Card>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-gray-100">
                                        {filteredTransactions.map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${transaction.type === "incoming"
                                                                ? "bg-green-100"
                                                                : transaction.type === "outgoing"
                                                                    ? "bg-red-100"
                                                                    : "bg-blue-100"
                                                            }`}
                                                    >
                                                        {transaction.type === "incoming" ? (
                                                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                                                        ) : transaction.type === "outgoing" ? (
                                                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                                                        ) : (
                                                            <TrendingUp className="h-5 w-5 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#0b1f3a]">
                                                            {transaction.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {transaction.date}{" "}
                                                            <span
                                                                className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${transaction.status === "completed"
                                                                        ? "bg-[#00c48c]/10 text-[#00c48c]"
                                                                        : transaction.status === "failed"
                                                                            ? "bg-red-100 text-red-600"
                                                                            : "bg-blue-100 text-blue-600"
                                                                    }`}
                                                            >
                                                                {transaction.status === "completed" && "completed"}
                                                                {transaction.status === "failed" && "failed"}
                                                                {transaction.status === "refund" && "refund"}
                                                            </span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {transaction.hash}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className={`font-bold ${transaction.type === "incoming"
                                                                ? "text-green-600"
                                                                : "text-gray-900"
                                                            }`}
                                                    >
                                                        {transaction.amount}
                                                    </p>
                                                    {transaction.fee && (
                                                        <p className="text-xs text-gray-500">
                                                            {transaction.fee}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Load More */}
                            <div className="mt-6 text-center">
                                <Button variant="outline" className="rounded-xl">
                                    Load More Transactions
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Receive Modal */}
            {selectedWallet && (
                <ReceiveModal
                    isOpen={receiveModalOpen}
                    onClose={handleCloseReceiveModal}
                    currency={selectedWallet.currency}
                    currencySymbol={selectedWallet.symbol}
                    walletAddress={selectedWallet.address}
                />
            )}

            {/* Send Modal */}
            {selectedWallet && (
                <SendModal
                    isOpen={sendModalOpen}
                    onClose={handleCloseSendModal}
                    currency={selectedWallet.currency}
                    currencySymbol={selectedWallet.symbol}
                    walletAddress={selectedWallet.address}
                    availableBalance={selectedWallet.balance}
                    walletName={selectedWallet.name}
                />
            )}
        </div>
    );
}
