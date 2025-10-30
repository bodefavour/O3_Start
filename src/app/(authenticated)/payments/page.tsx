"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Check,
    Wallet as WalletIcon,
    BarChart3,
    Settings,
    LogOut,
    Users,
    Receipt,
    Send,
    CreditCard,
    Lock,
} from "lucide-react";

export default function PaymentsPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const [loading, setLoading] = useState(true);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [selectedPlan, setSelectedPlan] = useState<"starter" | "business" | "enterprise">(
        "enterprise"
    );
    const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");

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

    const plans = [
        {
            id: "starter",
            name: "Starter",
            price: billingCycle === "monthly" ? 29 : 290,
            features: [
                "Up to $10k monthly volume",
                "5 team members",
                "Basic analytics",
                "Email support",
                "Standard transfers",
            ],
        },
        {
            id: "business",
            name: "Business",
            price: billingCycle === "monthly" ? 99 : 990,
            features: [
                "Up to $100,000 monthly volume",
                "25 team members",
                "Advanced analytics",
                "Priority support",
                "Instant transfers",
                "API access",
            ],
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: billingCycle === "monthly" ? 299 : 2990,
            features: [
                "Unlimited monthly volume",
                "Unlimited team members",
                "Custom analytics",
                "Dedicated support",
                "White-label options",
                "Custom integrations",
            ],
        },
    ];

    const selectedPlanData = plans.find((p) => p.id === selectedPlan);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00c48c] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0b1f3a] via-[#0f2943] to-[#00c48c]">
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
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-3 py-2.5 text-sm font-medium text-white"
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
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-white">Choose Your Plan</h1>
                    <p className="text-lg text-gray-300">
                        Start your global business banking journey with BorderlessPay
                    </p>
                </div>

                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr,400px]">
                    {/* Plans Section */}
                    <div>
                        {/* Billing Toggle */}
                        <div className="mb-8 flex justify-center">
                            <div className="inline-flex rounded-lg bg-white/10 p-1">
                                <button
                                    onClick={() => setBillingCycle("monthly")}
                                    className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${billingCycle === "monthly"
                                        ? "bg-[#00c48c] text-white"
                                        : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle("yearly")}
                                    className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${billingCycle === "yearly"
                                        ? "bg-[#00c48c] text-white"
                                        : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        {/* Plan Cards */}
                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <Card
                                    key={plan.id}
                                    className={`cursor-pointer transition-all ${selectedPlan === plan.id
                                        ? "border-2 border-[#00c48c] bg-white/10"
                                        : "border-white/20 bg-white/5 hover:bg-white/10"
                                        }`}
                                    onClick={() =>
                                        setSelectedPlan(plan.id as "starter" | "business" | "enterprise")
                                    }
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="mb-2 text-xl font-bold text-white">
                                                    {plan.name}
                                                </h3>
                                                <div className="mb-4 flex items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-white">
                                                        ${plan.price}
                                                    </span>
                                                    <span className="text-gray-400">
                                                        /{billingCycle === "monthly" ? "month" : "year"}
                                                    </span>
                                                </div>
                                                <ul className="space-y-2">
                                                    {plan.features.map((feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-2 text-sm text-gray-300"
                                                        >
                                                            <Check className="h-4 w-4 text-[#00c48c]" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div
                                                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${selectedPlan === plan.id
                                                    ? "border-[#00c48c] bg-[#00c48c]"
                                                    : "border-white/40"
                                                    }`}
                                            >
                                                {selectedPlan === plan.id && (
                                                    <div className="h-3 w-3 rounded-full bg-white" />
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div>
                        <Card className="bg-white/10 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-xl font-bold text-white">
                                    Payment Details
                                </h2>
                                <p className="mb-6 text-sm text-gray-300">
                                    Complete your subscription to BorderlessPay
                                </p>

                                {/* Order Summary */}
                                <div className="mb-6">
                                    <h3 className="mb-3 font-semibold text-white">Order Summary</h3>
                                    <div className="space-y-2 rounded-lg bg-white/5 p-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">
                                                {selectedPlanData?.name} plan ({billingCycle})
                                            </span>
                                            <span className="font-medium text-white">
                                                ${selectedPlanData?.price}
                                            </span>
                                        </div>
                                        <div className="border-t border-white/10 pt-2">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-white">Total</span>
                                                <span className="font-bold text-white">
                                                    ${selectedPlanData?.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-6">
                                    <h3 className="mb-3 font-semibold text-white">Payment Method</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${paymentMethod === "card"
                                                ? "border-[#00c48c] bg-[#00c48c] text-white"
                                                : "border-white/20 text-gray-300 hover:border-white/40"
                                                }`}
                                        >
                                            <CreditCard className="h-4 w-4" />
                                            Credit Card
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("crypto")}
                                            className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${paymentMethod === "crypto"
                                                ? "border-[#00c48c] bg-[#00c48c] text-white"
                                                : "border-white/20 text-gray-300 hover:border-white/40"
                                                }`}
                                        >
                                            <WalletIcon className="h-4 w-4" />
                                            Crypto
                                        </button>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                {paymentMethod === "card" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="you@your-email"
                                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 777 333"
                                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                                Card Holder Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Jhon Tracy"
                                                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "crypto" && (
                                    <div className="rounded-lg bg-white/5 p-6 text-center">
                                        <WalletIcon className="mx-auto mb-4 h-12 w-12 text-[#00c48c]" />
                                        <p className="mb-2 font-semibold text-white">
                                            Connect Your Crypto Wallet
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Pay securely with cryptocurrency
                                        </p>
                                    </div>
                                )}

                                {/* Complete Payment Button */}
                                <Button className="mt-6 w-full gap-2 rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d]">
                                    Complete Payment · ${selectedPlanData?.price}
                                </Button>

                                {/* Security Notice */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <Lock className="h-3 w-3" />
                                    <span>Secured by 256-bit SSL encryption</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
