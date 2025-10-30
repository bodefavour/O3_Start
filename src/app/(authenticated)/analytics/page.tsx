"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Receipt,
    Clock,
    CheckCircle,
    XCircle,
    Ban,
    Wallet as WalletIcon,
    BarChart3,
    Settings,
    LogOut,
    Users,
    Send,
    ChevronDown,
    Download,
} from "lucide-react";

export default function AnalyticsPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<
        "overview" | "transactions" | "geographic" | "currencies"
    >("overview");

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
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
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
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-3 py-2.5 text-sm font-medium text-white"
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
                        <h1 className="text-3xl font-bold text-[#0b1f3a]">Analytics</h1>
                        <p className="mt-1 text-gray-600">
                            Insights into your financial operations
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            All Status
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                            <Download className="h-5 w-5" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Transaction Volume</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        $2,450,000
                                    </p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    +18.2%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Transaction Count</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">1,247</p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    +12.5%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Average Transaction Size</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">$1,965</p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    +5.1%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Fees Saved</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">$45,670</p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    +23.8%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6 border-b">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "overview"
                                        ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("transactions")}
                                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "transactions"
                                        ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Transactions
                            </button>
                            <button
                                onClick={() => setActiveTab("geographic")}
                                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "geographic"
                                        ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Geographic
                            </button>
                            <button
                                onClick={() => setActiveTab("currencies")}
                                className={`pb-3 text-sm font-medium transition-colors ${activeTab === "currencies"
                                        ? "border-b-2 border-[#00c48c] text-[#00c48c]"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Currencies
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Top Countries */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                    Top Countries by Volume
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            code: "NG",
                                            name: "Nigeria",
                                            amount: "$890,000",
                                            percentage: "36.3%",
                                        },
                                        {
                                            code: "KE",
                                            name: "Kenya",
                                            amount: "$650,000",
                                            percentage: "26.5%",
                                        },
                                        {
                                            code: "GH",
                                            name: "Ghana",
                                            amount: "$420,000",
                                            percentage: "17.1%",
                                        },
                                        {
                                            code: "ZA",
                                            name: "South Africa",
                                            amount: "$290,000",
                                            percentage: "11.8%",
                                        },
                                        {
                                            code: "UG",
                                            name: "Uganda",
                                            amount: "$200,000",
                                            percentage: "8.2%",
                                        },
                                    ].map((country) => (
                                        <div
                                            key={country.code}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                    {country.code}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {country.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {country.amount}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-green-600">
                                                {country.percentage}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Trends */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Recent Trends & Insights
                            </h3>
                            <div className="grid gap-4 md:grid-cols-4">
                                {[
                                    {
                                        title: "Cross-border Transfers",
                                        value: "+19%",
                                        desc: "Increased international payments",
                                    },
                                    {
                                        title: "Local Currency Usage",
                                        value: "+18%",
                                        desc: "More NGN and KES transactions",
                                    },
                                    {
                                        title: "Transaction Speed",
                                        value: "+22%",
                                        desc: "Faster processing times",
                                    },
                                    {
                                        title: "Customer Satisfaction",
                                        value: "+15%",
                                        desc: "Improved user experience",
                                    },
                                ].map((trend, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-4">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="text-xl font-bold text-green-600">
                                                    {trend.value}
                                                </span>
                                                <ArrowUpRight className="h-4 w-4 text-green-600" />
                                            </div>
                                            <p className="mb-1 font-semibold text-gray-900">
                                                {trend.title}
                                            </p>
                                            <p className="text-xs text-gray-600">{trend.desc}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions Tab */}
                {activeTab === "transactions" && (
                    <div className="space-y-6">
                        {/* Transaction Categories */}
                        <div className="grid gap-4 md:grid-cols-4">
                            {[
                                {
                                    title: "Cross-border Transfer",
                                    count: "456",
                                    volume: "$1,390,000",
                                    avgSize: "$3,041",
                                    badge: "green",
                                },
                                {
                                    title: "Local Payment",
                                    count: "342",
                                    volume: "$690,000",
                                    avgSize: "$1,988",
                                    badge: "blue",
                                },
                                {
                                    title: "Currency Exchange",
                                    count: "289",
                                    volume: "$470,000",
                                    avgSize: "$1,444",
                                    badge: "red",
                                },
                                {
                                    title: "Wallet Top-up",
                                    count: "160",
                                    volume: "$100,000",
                                    avgSize: "$625",
                                    badge: "purple",
                                },
                            ].map((category, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-900">
                                                {category.title}
                                            </h4>
                                            <div
                                                className={`h-3 w-3 rounded-full ${category.badge === "green"
                                                        ? "bg-green-500"
                                                        : category.badge === "blue"
                                                            ? "bg-blue-500"
                                                            : category.badge === "red"
                                                                ? "bg-red-500"
                                                                : "bg-purple-500"
                                                    }`}
                                            />
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Count:</span>
                                                <span className="font-medium">{category.count}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Volume:</span>
                                                <span className="font-medium">{category.volume}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Avg Size:</span>
                                                <span className="font-medium">{category.avgSize}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Transaction Status Distribution */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                    Transaction Status Distribution
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            status: "Completed",
                                            count: "1,090",
                                            percentage: "87.3%",
                                            icon: CheckCircle,
                                            color: "green",
                                        },
                                        {
                                            status: "Pending",
                                            count: "90",
                                            percentage: "7.2%",
                                            icon: Clock,
                                            color: "yellow",
                                        },
                                        {
                                            status: "Failed",
                                            count: "51",
                                            percentage: "4.1%",
                                            icon: XCircle,
                                            color: "red",
                                        },
                                        {
                                            status: "Cancelled",
                                            count: "16",
                                            percentage: "1.3%",
                                            icon: Ban,
                                            color: "purple",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.status}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon
                                                    className={`h-5 w-5 ${item.color === "green"
                                                            ? "text-green-600"
                                                            : item.color === "yellow"
                                                                ? "text-yellow-600"
                                                                : item.color === "red"
                                                                    ? "text-red-600"
                                                                    : "text-purple-600"
                                                        }`}
                                                />
                                                <span className="font-medium text-gray-900">
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-gray-600">
                                                    {item.count}
                                                </span>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {item.percentage}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Metrics */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Performance Metrics
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        title: "Success Rate",
                                        value: "96.4%",
                                        change: "+2.1% from last period",
                                        icon: ArrowUpRight,
                                    },
                                    {
                                        title: "Avg Processing Time",
                                        value: "2.3 min",
                                        change: "-15% faster than before",
                                        icon: ArrowDownRight,
                                    },
                                    {
                                        title: "Peak Hour Volume",
                                        value: "$156K",
                                        change: "+200 PM daily peak",
                                        icon: ArrowUpRight,
                                    },
                                ].map((metric, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-sm text-gray-600">{metric.title}</p>
                                                <metric.icon className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <p className="mb-1 text-2xl font-bold text-[#0b1f3a]">
                                                {metric.value}
                                            </p>
                                            <p className="text-xs text-gray-600">{metric.change}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Geographic Tab */}
                {activeTab === "geographic" && (
                    <div className="space-y-6">
                        {/* Regional Performance */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Regional Performance
                            </h3>
                            <div className="grid gap-4 md:grid-cols-4">
                                {[
                                    {
                                        region: "West Africa",
                                        volume: "$1,490,000",
                                        transactions: "689",
                                        countries: "Nigeria, Ghana, Senegal, Mali",
                                        growth: "+24.5%",
                                    },
                                    {
                                        region: "Southern Africa",
                                        volume: "$320,000",
                                        transactions: "156",
                                        countries: "South Africa, Botswana, Zambia",
                                        growth: "+12.6%",
                                    },
                                    {
                                        region: "East Africa",
                                        volume: "$890,000",
                                        transactions: "423",
                                        countries: "Kenya, Uganda, Tanzania, Rwanda",
                                        growth: "+18.2%",
                                    },
                                    {
                                        region: "North Africa",
                                        volume: "$180,000",
                                        transactions: "89",
                                        countries: "Egypt, Morocco, Tunisia",
                                        growth: "+8.4%",
                                    },
                                ].map((region, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="mb-3 flex items-center justify-between">
                                                <h4 className="font-semibold text-gray-900">
                                                    {region.region}
                                                </h4>
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                    {region.growth}
                                                </Badge>
                                            </div>
                                            <div className="mb-3 space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Volume:</span>
                                                    <span className="font-medium">
                                                        {region.volume}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        Transactions:
                                                    </span>
                                                    <span className="font-medium">
                                                        {region.transactions}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                {region.countries}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Top Cities and Corridors */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                        Top Cities by Volume
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                code: "NG",
                                                city: "Lagos",
                                                country: "Nigeria",
                                                amount: "$250,000",
                                            },
                                            {
                                                code: "KE",
                                                city: "Nairobi",
                                                country: "Kenya",
                                                amount: "$245,000",
                                            },
                                            {
                                                code: "GH",
                                                city: "Accra",
                                                country: "Ghana",
                                                amount: "$230,000",
                                            },
                                            {
                                                code: "ZA",
                                                city: "Cape Town",
                                                country: "South Africa",
                                                amount: "$224,000",
                                            },
                                            {
                                                code: "UG",
                                                city: "Kampala",
                                                country: "Uganda",
                                                amount: "$225,000",
                                            },
                                        ].map((city) => (
                                            <div
                                                key={city.code}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                        {city.code}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {city.city}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {city.country}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {city.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                        Top Transaction Corridors
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                from: "NG → KE",
                                                route: "Nigeria → Kenya",
                                                amount: "$245,000",
                                            },
                                            {
                                                from: "GH → SA",
                                                route: "Ghana → South Africa",
                                                amount: "$188,000",
                                            },
                                            {
                                                from: "KE → UG",
                                                route: "Kenya → Uganda",
                                                amount: "$156,000",
                                            },
                                            {
                                                from: "NG → GH",
                                                route: "Nigeria → Ghana",
                                                amount: "$134,000",
                                            },
                                            {
                                                from: "SA → NG",
                                                route: "South Africa → Nigeria",
                                                amount: "$98,000",
                                            },
                                        ].map((corridor, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {corridor.from}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {corridor.route}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {corridor.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Geographic Insights */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Geographic Insights
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        title: "Fastest Growing Region",
                                        value: "West Africa",
                                        detail: "+24.5% month-on-month",
                                    },
                                    {
                                        title: "Most Active Corridor",
                                        value: "Nigeria → Kenya",
                                        detail: "$245K in transactions",
                                    },
                                    {
                                        title: "Emerging Market",
                                        value: "Rwanda",
                                        detail: "+42% new user growth",
                                    },
                                ].map((insight, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="mb-2 flex items-center gap-2">
                                                <ArrowUpRight className="h-5 w-5 text-green-600" />
                                            </div>
                                            <p className="mb-1 text-sm text-gray-600">
                                                {insight.title}
                                            </p>
                                            <p className="mb-1 text-lg font-bold text-[#0b1f3a]">
                                                {insight.value}
                                            </p>
                                            <p className="text-xs text-gray-600">{insight.detail}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Currencies Tab */}
                {activeTab === "currencies" && (
                    <div className="space-y-6">
                        {/* Currency Distribution */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Currency Distribution
                            </h3>
                            <div className="grid gap-4 md:grid-cols-4">
                                {[
                                    {
                                        currency: "USD",
                                        volume: "$1,490,000",
                                        transactions: "456",
                                        share: "58.2%",
                                        growth: "+24.5%",
                                    },
                                    {
                                        currency: "NGN",
                                        volume: "₦890,000,000",
                                        transactions: "423",
                                        share: "24.3%",
                                        growth: "+24.5%",
                                    },
                                    {
                                        currency: "KES",
                                        volume: "KSh640,000,000",
                                        transactions: "289",
                                        share: "17.1%",
                                        growth: "+24.9%",
                                    },
                                    {
                                        currency: "GHS",
                                        volume: "₵1,450,000",
                                        transactions: "178",
                                        share: "58.2%",
                                        growth: "+24.5%",
                                    },
                                ].map((currency, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="mb-3 flex items-center justify-between">
                                                <h4 className="text-lg font-bold text-[#0b1f3a]">
                                                    {currency.currency}
                                                </h4>
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                    {currency.growth}
                                                </Badge>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Volume:</span>
                                                    <span className="font-medium">
                                                        {currency.volume}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Transactions:
                                                    </span>
                                                    <span className="font-medium">
                                                        {currency.transactions}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Share:</span>
                                                    <span className="font-medium">
                                                        {currency.share}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Exchange Rates and Volatility */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                        Current Exchange Rates
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                pair: "USD/NGN",
                                                rate: "1,650.50",
                                                change: "+0.75%",
                                                positive: true,
                                            },
                                            {
                                                pair: "USD/KES",
                                                rate: "156.76",
                                                change: "-0.12%",
                                                positive: false,
                                            },
                                            {
                                                pair: "GHS/USD",
                                                rate: "12.45",
                                                change: "+0.06%",
                                                positive: true,
                                            },
                                            {
                                                pair: "NGN/KES",
                                                rate: "0.095",
                                                change: "+0.15%",
                                                positive: true,
                                            },
                                        ].map((rate, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {rate.pair}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{rate.rate}</p>
                                                </div>
                                                <Badge
                                                    className={
                                                        rate.positive
                                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                            : "bg-red-100 text-red-700 hover:bg-red-100"
                                                    }
                                                >
                                                    {rate.change}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                        Currency Volatility
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                currency: "USD",
                                                risk: "Low Risk",
                                                value: "2.1",
                                                color: "green",
                                            },
                                            {
                                                currency: "NGN",
                                                risk: "Medium Risk",
                                                value: "4.8",
                                                color: "yellow",
                                            },
                                            {
                                                currency: "GHS",
                                                risk: "Medium Risk",
                                                value: "3.5",
                                                color: "yellow",
                                            },
                                            {
                                                currency: "ZAR",
                                                risk: "High Risk",
                                                value: "6.2",
                                                color: "red",
                                            },
                                        ].map((vol, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {vol.currency}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{vol.risk}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-20 w-32 bg-gray-100" />
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {vol.value}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Currency Insights */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#0b1f3a]">
                                Currency Insights
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        title: "Most Stable",
                                        value: "USD",
                                        detail: "Lowest volatility score: 2.1",
                                    },
                                    {
                                        title: "Highest Growth",
                                        value: "NGN",
                                        detail: "+18.7% transaction growth",
                                    },
                                    {
                                        title: "Best Performer",
                                        value: "GHS",
                                        detail: "+15.2% value appreciation",
                                    },
                                ].map((insight, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <p className="mb-1 text-sm text-gray-600">{insight.title}</p>
                                            <p className="mb-1 text-xl font-bold text-[#0b1f3a]">
                                                {insight.value}
                                            </p>
                                            <p className="text-xs text-gray-600">{insight.detail}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
