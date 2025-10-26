"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    Download,
    FileText,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    Clock,
    XCircle,
    FileCheck,
    Wallet as WalletIcon,
    BarChart3,
    Settings,
    LogOut,
    Users,
    Receipt,
    DollarSign,
    Send,
    ChevronDown,
} from "lucide-react";
import { invoiceApi } from "@/lib/api";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/contexts";

// Mock invoice data
const mockInvoices = [
    {
        id: "INV-001",
        description: "Web Development Services",
        client: "Acme Corporation",
        amount: "$15,750 USD",
        status: "Paid",
        date: "2024-01-15",
        color: "green",
    },
    {
        id: "INV-002",
        description: "Mobile App Development",
        client: "TechStart Ltd",
        amount: "$8,900 USD",
        status: "Sent",
        date: "2024-01-20",
        color: "blue",
    },
    {
        id: "INV-003",
        description: "Consulting Services",
        client: "Global Ventures",
        amount: "$12,300 USD",
        status: "Overdue",
        date: "2024-01-10",
        color: "red",
    },
    {
        id: "INV-004",
        description: "UI/UX Design Services",
        client: "Innovation Hub",
        amount: "$5,670 USD",
        status: "Draft",
        date: "2024-01-25",
        color: "cyan",
    },
    {
        id: "INV-005",
        description: "Software Integration",
        client: "Digital Solutions",
        amount: "$9,800 USD",
        status: "Sent",
        date: "2024-01-30",
        color: "blue",
    },
];

export default function InvoicingPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const { showToast } = useToast();
    const { userId, loading: userLoading } = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    // Real data from API
    const [invoices, setInvoices] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loadingData, setLoadingData] = useState(true);

    // Fetch real data
    useEffect(() => {
        if (!userId || userLoading) return;

        async function fetchData() {
            try {
                setLoadingData(true);
                const [invoicesRes, statsRes] = await Promise.all([
                    invoiceApi.getAll(userId),
                    invoiceApi.getStats(userId),
                ]);

                setInvoices(invoicesRes.invoices || []);
                setStats(statsRes.stats || null);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                showToast('Failed to load invoices', 'error');
            } finally {
                setLoadingData(false);
            }
        }

        fetchData();
    }, [userId, userLoading]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/signin");
            return;
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "All Status" ||
            invoice.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "paid":
                return "bg-green-100 text-green-700 hover:bg-green-100";
            case "sent":
                return "bg-blue-100 text-blue-700 hover:bg-blue-100";
            case "overdue":
                return "bg-red-100 text-red-700 hover:bg-red-100";
            case "Draft":
                return "bg-cyan-100 text-cyan-700 hover:bg-cyan-100";
            default:
                return "bg-gray-100 text-gray-700 hover:bg-gray-100";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Paid":
                return <CheckCircle className="h-4 w-4" />;
            case "Sent":
                return <Clock className="h-4 w-4" />;
            case "Overdue":
                return <XCircle className="h-4 w-4" />;
            case "Draft":
                return <FileCheck className="h-4 w-4" />;
            default:
                return null;
        }
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
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/wallet"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <WalletIcon className="h-5 w-5" />
                            Wallet
                        </Link>
                        <Link
                            href="/payments"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Send className="h-5 w-5" />
                            Payments
                        </Link>
                        <Link
                            href="/invoicing"
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-3 py-2.5 text-sm font-medium text-white"
                        >
                            <Receipt className="h-5 w-5" />
                            Invoicing
                        </Link>
                        <Link
                            href="/payroll"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Users className="h-5 w-5" />
                            Payroll
                        </Link>
                        <Link
                            href="/analytics"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Analytics
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>

                    {/* User Profile */}
                    <div className="border-t border-white/10 p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00c48c] text-sm font-bold">
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
                            variant="outline"
                            className="w-full gap-2 border-white/20 bg-transparent text-white hover:bg-white/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0b1f3a]">Invoicing</h1>
                        <p className="mt-1 text-gray-600">Manage your invoices and payments</p>
                    </div>
                    <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                        <Plus className="h-5 w-5" />
                        Create Invoice
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Invoices</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        {stats?.total || invoices.length}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-3">
                                    <FileText className="h-6 w-6 text-gray-700" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Paid Amount</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        ${stats?.paidAmount?.toLocaleString() || '0'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-green-100 p-3">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending Amount</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        ${stats?.pendingAmount?.toLocaleString() || '0'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-blue-100 p-3">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Overdue Amount</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        ${invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-red-100 p-3">
                                    <XCircle className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="search invoices"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    {statusFilter}
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <Button variant="outline" className="gap-2">
                                    Export
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Invoices Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Invoice
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Client
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-[#0b1f3a]">
                                                        {invoice.invoiceNumber}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {invoice.description || 'No description'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {invoice.clientName}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#0b1f3a]">
                                                {invoice.currency}{parseFloat(invoice.amount).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    className={`${getStatusColor(invoice.status)} gap-1 capitalize`}
                                                >
                                                    {invoice.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(invoice.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="rounded p-1 text-gray-600 hover:bg-gray-100">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="rounded p-1 text-gray-600 hover:bg-gray-100">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="rounded p-1 text-gray-600 hover:bg-gray-100">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                    <button className="rounded p-1 text-red-600 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
