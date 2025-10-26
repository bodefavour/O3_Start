"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Building2,
    Shield,
    Bell,
    Code,
    Wallet as WalletIcon,
    BarChart3,
    Settings as SettingsIcon,
    LogOut,
    Users,
    Receipt,
    Send,
    CheckCircle,
    AlertCircle,
    Copy,
    Plus,
} from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<
        "profile" | "business" | "security" | "notifications" | "api"
    >("profile");

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
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Analytics
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-3 py-2.5 text-sm font-medium text-white"
                        >
                            <SettingsIcon className="h-5 w-5" />
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0b1f3a]">Settings</h1>
                    <p className="mt-1 text-gray-600">Manage your account and preferences</p>
                </div>

                <div className="flex gap-6">
                    {/* Settings Navigation */}
                    <Card className="h-fit w-80">
                        <CardContent className="p-4">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === "profile"
                                            ? "bg-[#00c48c] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <User className="h-5 w-5" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab("business")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === "business"
                                            ? "bg-[#00c48c] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Building2 className="h-5 w-5" />
                                    Business
                                </button>
                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === "security"
                                            ? "bg-[#00c48c] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Shield className="h-5 w-5" />
                                    Security
                                </button>
                                <button
                                    onClick={() => setActiveTab("notifications")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === "notifications"
                                            ? "bg-[#00c48c] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Bell className="h-5 w-5" />
                                    Notifications
                                </button>
                                <button
                                    onClick={() => setActiveTab("api")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === "api"
                                            ? "bg-[#00c48c] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Code className="h-5 w-5" />
                                    API & Integration
                                </button>
                            </nav>
                        </CardContent>
                    </Card>

                    {/* Settings Content */}
                    <div className="flex-1">
                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <Card className="bg-green-50">
                                <CardContent className="p-8">
                                    <div className="mb-8 flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-[#0b1f3a]">
                                            Profile Settings
                                        </h2>
                                        <Button
                                            variant="outline"
                                            className="border-[#00c48c] text-[#00c48c] hover:bg-[#00c48c] hover:text-white"
                                        >
                                            Edit Profile
                                        </Button>
                                    </div>

                                    {/* Profile Picture */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Profile Picture
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00c48c] text-2xl font-bold text-white">
                                                MC
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Upload a new profile picture
                                                </p>
                                                <p className="text-xs text-gray-500">Change Avatar</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Personal Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Preferences
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Timezone
                                                </label>
                                                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]">
                                                    <option>Africa/Lagos (WAT)</option>
                                                    <option>America/New_York (EST)</option>
                                                    <option>Europe/London (GMT)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Language
                                                </label>
                                                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]">
                                                    <option>English</option>
                                                    <option>French</option>
                                                    <option>Spanish</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Status */}
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Account Status
                                        </h3>
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-semibold text-blue-900">
                                                        Verified Account
                                                    </p>
                                                    <p className="text-sm text-blue-700">
                                                        Your account is fully verified and active
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Business Tab */}
                        {activeTab === "business" && (
                            <Card className="bg-green-50">
                                <CardContent className="p-8">
                                    <div className="mb-8 flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-[#0b1f3a]">
                                            Business Settings
                                        </h2>
                                        <Button
                                            variant="outline"
                                            className="border-[#00c48c] text-[#00c48c] hover:bg-[#00c48c] hover:text-white"
                                        >
                                            Edit Business Info
                                        </Button>
                                    </div>

                                    {/* Business Information */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Business Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Business Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Business Type
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Registration Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Tax ID
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your business name"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Address */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Business Address
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Country
                                                </label>
                                                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]">
                                                    <option>Nigeria</option>
                                                    <option>Kenya</option>
                                                    <option>Ghana</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Africa/Lagos (WAT)"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Country
                                                </label>
                                                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]">
                                                    <option>Nigeria</option>
                                                    <option>Kenya</option>
                                                    <option>Ghana</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Status */}
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Account Status
                                        </h3>
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-semibold text-blue-900">
                                                        Verified Account
                                                    </p>
                                                    <p className="text-sm text-blue-700">
                                                        Your account is fully verified and active
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <Card className="bg-green-50">
                                <CardContent className="p-8">
                                    <h2 className="mb-8 text-2xl font-bold text-[#0b1f3a]">
                                        Security Settings
                                    </h2>

                                    {/* Change Password */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Change Password
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    Registration Number
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <Button className="rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                                                Update Password
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Two-Factor Authentication */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Two-Factor Authentication
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Authenticator App
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Use an authenticator app to generate verification codes
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div className="rounded-lg bg-green-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="font-semibold text-green-900">
                                                            Two-factor authentication is enabled
                                                        </p>
                                                        <p className="text-sm text-green-700">
                                                            Your account is protected with 2FA
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Preferences */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Security Preferences
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Login Notifications
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Get notified when someone logs into your account
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Session Timeout
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Automatically log out after inactivity
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Sessions */}
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Active Sessions
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">MacBook Pro</p>
                                                    <p className="text-xs text-gray-600">Lagos, Nigeria</p>
                                                    <p className="text-xs text-gray-500">
                                                        Last active: 2024-01-15 14:30
                                                    </p>
                                                </div>
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                    Active
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">iPhone 15</p>
                                                    <p className="text-xs text-gray-600">Lagos, Nigeria</p>
                                                    <p className="text-xs text-gray-500">
                                                        Last active: 2024-01-15 12:15
                                                    </p>
                                                </div>
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                    Revoke
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Chrome Browser
                                                    </p>
                                                    <p className="text-xs text-gray-600">Nairobi, Kenya</p>
                                                    <p className="text-xs text-gray-500">
                                                        Last active: 2024-01-14 09:45
                                                    </p>
                                                </div>
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                    Revoke
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <Card className="bg-green-50">
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-[#0b1f3a]">
                                            Notification Settings
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Manage how you receive notifications
                                        </p>
                                    </div>

                                    {/* Email Notifications */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="rounded-lg bg-green-100 p-2">
                                                <Bell className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#0b1f3a]">
                                                    Email Notifications
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Receive notifications via email
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3 pl-14">
                                            {[
                                                {
                                                    title: "Transaction Alerts",
                                                    desc: "Get notified about all transactions",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Payment Received",
                                                    desc: "When you receive payments",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Payment Failed",
                                                    desc: "When payment fail or are declined",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Weekly Reports",
                                                    desc: "Summary of your weekly activity",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Monthly Statements",
                                                    desc: "Greater monthly financial statements",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Security Alerts",
                                                    desc: "Important security notifications",
                                                    enabled: true,
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={item.enabled}
                                                        className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Push Notifications */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="rounded-lg bg-blue-100 p-2">
                                                <Bell className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#0b1f3a]">
                                                    Push Notifications
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Receive notifications on your devices
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3 pl-14">
                                            {[
                                                {
                                                    title: "Transaction Updates",
                                                    desc: "Real-time transaction notifications",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Payment Notifications",
                                                    desc: "Payment status updates",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Security Alerts",
                                                    desc: "Security-related notifications",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Marketing Updates",
                                                    desc: "Product updates and promotions",
                                                    enabled: false,
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={item.enabled}
                                                        className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SMS Notifications */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="rounded-lg bg-purple-100 p-2">
                                                <Bell className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#0b1f3a]">
                                                    SMS Notifications
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Receive notifications via text message
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3 pl-14">
                                            {[
                                                {
                                                    title: "Transaction Alerts",
                                                    desc: "SMS alerts for transactions",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Security Alerts",
                                                    desc: "Critical security notifications",
                                                    enabled: true,
                                                },
                                                {
                                                    title: "Marketing Messages",
                                                    desc: "Promotional messages and updates",
                                                    enabled: false,
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={item.enabled}
                                                        className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notification Schedule */}
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Notification Schedule
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        Weekend Notifications
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Receive notifications on weekends
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-5 w-5 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <p className="mb-2 font-medium text-gray-900">Quiet Hours</p>
                                                <p className="mb-3 text-sm text-gray-600">
                                                    Disable notifications during these hours
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="time"
                                                        defaultValue="22:00"
                                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                    />
                                                    <span className="text-gray-600">to</span>
                                                    <input
                                                        type="time"
                                                        defaultValue="07:00"
                                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* API & Integration Tab */}
                        {activeTab === "api" && (
                            <Card className="bg-green-50">
                                <CardContent className="p-8">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#0b1f3a]">API Keys</h2>
                                        </div>
                                        <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                                            <Plus className="h-5 w-5" />
                                            Add New Key
                                        </Button>
                                    </div>

                                    {/* API Keys List */}
                                    <div className="mb-8 space-y-4">
                                        {[
                                            {
                                                url: "https://api.yourapp.com/webhooks/payments",
                                                date: "2024-01-15 14:30",
                                                events: ["payment.created", "payment.failed"],
                                            },
                                            {
                                                url: "https://api.yourapp.com/webhooks/transactions",
                                                date: "2024-01-10 09:15",
                                                events: ["transaction.created", "transaction.success"],
                                            },
                                        ].map((webhook, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border border-gray-300 bg-white p-4"
                                            >
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">
                                                            {webhook.url}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Last delivery: {webhook.date}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                            Active
                                                        </Badge>
                                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                            Delete
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {webhook.events.map((event, i) => (
                                                        <span
                                                            key={i}
                                                            className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                                                        >
                                                            {event}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* API & Integrations Section */}
                                    <div className="mb-8">
                                        <h3 className="mb-4 text-2xl font-bold text-[#0b1f3a]">
                                            API & Integrations
                                        </h3>
                                        <p className="mb-6 text-sm text-gray-600">
                                            Manage your API keys and webhook integrations
                                        </p>

                                        <h4 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            API Keys
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    title: "Production API Key",
                                                    date: "2024-01-01",
                                                    key: "pk_live_eX12345678901234567890abcdef",
                                                    permissions: "1200",
                                                    lastUsed: "Last used: 2024-01-14",
                                                },
                                                {
                                                    title: "Development API Key",
                                                    date: "2024-01-10",
                                                    key: "pk_test_eX9Qd60f824567890",
                                                    permissions: "500",
                                                    lastUsed: "Last used: 2024-01-14",
                                                },
                                            ].map((apiKey, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-lg border border-gray-300 bg-white p-6"
                                                >
                                                    <div className="mb-4 flex items-start justify-between">
                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                {apiKey.title}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Created: {apiKey.date}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                                Active
                                                            </Badge>
                                                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                                                Revoke
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                                                        <code className="flex-1 text-sm font-mono text-gray-900">
                                                            {apiKey.key}
                                                        </code>
                                                        <button className="text-gray-600 hover:text-gray-900">
                                                            <Copy className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            Permissions: <strong>{apiKey.permissions}</strong>
                                                        </span>
                                                        <span className="text-gray-600">
                                                            {apiKey.lastUsed}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* API Documentation */}
                                    <div className="mb-8">
                                        <h4 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            BorderlessPay API Documentation
                                        </h4>
                                        <div className="rounded-lg border border-blue-300 bg-blue-50 p-6">
                                            <div className="mb-4 flex items-start gap-3">
                                                <AlertCircle className="h-6 w-6 text-blue-600" />
                                                <div>
                                                    <p className="font-semibold text-blue-900">
                                                        Complete guide to integrating with our payment and
                                                        financial services API
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                                >
                                                    View Documentation
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                                >
                                                    Code Samples
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                                >
                                                    Postman Collection
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rate Limits */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-[#0b1f3a]">
                                            Rate Limits
                                        </h4>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            {[
                                                {
                                                    limit: "1,000",
                                                    type: "Requests / hour",
                                                    used: "150/used",
                                                },
                                                {
                                                    limit: "10,000",
                                                    type: "Requests / day",
                                                    used: "2,500/used",
                                                },
                                                {
                                                    limit: "100,000",
                                                    type: "Requests / month",
                                                    used: "12,000 /used",
                                                },
                                            ].map((rate, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-lg border border-gray-300 bg-white p-4 text-center"
                                                >
                                                    <p className="text-2xl font-bold text-[#0b1f3a]">
                                                        {rate.limit}
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {rate.type}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{rate.used}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
