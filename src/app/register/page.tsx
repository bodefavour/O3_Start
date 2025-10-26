"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
    Globe,
    Shield,
    Zap,
    DollarSign,
    BarChart3,
    Clock,
} from "lucide-react";

const countries = [
    "Nigeria",
    "Kenya",
    "South Africa",
    "Ghana",
    "Egypt",
    "Morocco",
    "United States",
    "United Kingdom",
    "Other",
];

const businessTypes = [
    "E-commerce",
    "Freelancing",
    "Import/Export",
    "Software/Tech",
    "Consulting",
    "Manufacturing",
    "Retail",
    "Other",
];

const features = [
    {
        icon: Globe,
        title: "Global Reach",
        description:
            "Send money to 50+ countries instantly with stablecoins and local currencies",
    },
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description:
            "Blockchain-powered transactions with enterprise-level compliance and KYC",
    },
    {
        icon: Zap,
        title: "Instant Transfers",
        description:
            "Sub-second transaction speeds powered by Hedera's distributed ledger",
    },
    {
        icon: DollarSign,
        title: "Low Fees",
        description:
            "Save up to 90% on traditional banking fees for international transfers",
    },
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description:
            "Track your business finances with powerful insights and reporting tools",
    },
    {
        icon: Clock,
        title: "24/7 Operations",
        description:
            "Process payments any time, any day - no banking hours restrictions",
    },
];

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: "",
        businessEmail: "",
        country: "",
        businessType: "",
        phoneNumber: "",
        website: "",
        employeeCountry: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (
            !formData.businessName ||
            !formData.businessEmail ||
            !formData.country ||
            !formData.businessType ||
            !formData.phoneNumber
        ) {
            toast.error("Please fill in all required fields");
            setLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.businessEmail)) {
            toast.error("Please enter a valid email address");
            setLoading(false);
            return;
        }

        try {
            // TODO: Implement actual registration API call
            // For now, simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            toast.success(
                "Registration successful! Redirecting to verification..."
            );

            // Store business data temporarily (in production, this would be in backend)
            localStorage.setItem("pendingRegistration", JSON.stringify(formData));

            // Redirect to verification page
            setTimeout(() => {
                router.push("/verify");
            }, 1500);
        } catch (error) {
            toast.error(`Registration failed: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-[#d6e4f2]">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-[#00c48c]" />
                        <span className="text-base font-semibold text-[#0b1f3a] sm:text-lg">
                            BorderlessPay
                        </span>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#010f1f] via-[#062a4f] to-[#0b3f69] py-12 text-white sm:py-16">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-10%] top-[-20%] h-[320px] w-[320px] rounded-full bg-[#00c48c]/30 blur-[140px]" />
                    <div className="absolute bottom-[-15%] right-[-5%] h-[360px] w-[360px] rounded-full bg-[#00c48c]/20 blur-[140px]" />
                </div>

                <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        Bank Beyond <span className="text-[#00c48c]">Borders</span>
                    </h1>
                    <p className="max-w-2xl text-sm font-medium text-[#d7e6ff] sm:text-base">
                        Fast, transparent, and low-cost cross-border payments for African
                        businesses. Send money globally, instantly.
                    </p>

                    <div className="mt-4 grid w-full gap-3 sm:grid-cols-3 sm:gap-4">
                        <div className="flex flex-col items-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur">
                            <span className="text-2xl font-extrabold text-[#00c48c]">
                                24+
                            </span>
                            <span className="text-xs font-semibold text-white/90">
                                Countries
                            </span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur">
                            <span className="text-2xl font-extrabold text-[#00c48c]">
                                &lt;2s
                            </span>
                            <span className="text-xs font-semibold text-white/90">
                                Transfer Time
                            </span>
                        </div>
                        <div className="flex flex-col items-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur">
                            <span className="text-2xl font-extrabold text-[#00c48c]">
                                90%
                            </span>
                            <span className="text-xs font-semibold text-white/90">
                                Free Savings
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
                <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-extrabold text-[#0b1f3a] sm:text-4xl">
                        Register Your Business
                    </h2>
                    <p className="text-base font-semibold text-[#1f3a5c]">
                        Let's start by getting to know your business better
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Business Name */}
                        <div>
                            <label
                                htmlFor="businessName"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Business Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                placeholder="Enter your business name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            />
                        </div>

                        {/* Business Email */}
                        <div>
                            <label
                                htmlFor="businessEmail"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Business Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="businessEmail"
                                name="businessEmail"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                placeholder="Enter your business email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label
                                htmlFor="country"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            >
                                <option value="">Select your country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Business Type */}
                        <div>
                            <label
                                htmlFor="businessType"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Business Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="businessType"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            >
                                <option value="">Select business type</option>
                                {businessTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+234**********"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            />
                        </div>

                        {/* Website (Optional) */}
                        <div>
                            <label
                                htmlFor="website"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Website (optional)
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="http://yourwebsite.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                            />
                        </div>

                        {/* Employee Country */}
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="employeeCountry"
                                className="mb-2 block text-sm font-semibold text-[#0b1f3a]"
                            >
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="employeeCountry"
                                name="employeeCountry"
                                value={formData.employeeCountry}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]/20"
                                required
                            >
                                <option value="">Select employee country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-[#00c48c] px-8 py-3 text-sm font-semibold text-white hover:bg-[#00b37d] disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Processing...
                                </span>
                            ) : (
                                "Continue to Verification →"
                            )}
                        </Button>
                    </div>
                </form>
            </section>

            {/* Why Choose BorderlessPay */}
            <section className="bg-gray-50 px-4 py-12 sm:py-16">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-center text-2xl font-extrabold text-[#0b1f3a] sm:text-3xl">
                        Why choose BorderlessPay?
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className="rounded-2xl border border-[#00c48c33] bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <CardContent className="flex flex-col gap-3 p-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c48c]/10">
                                            <Icon className="h-6 w-6 text-[#00c48c]" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-lg font-extrabold text-[#0b1f3a]">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm font-medium text-[#1f3a5c]">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-[#010f1f] py-6 text-center text-sm text-white/70">
                <p>
                    © 2025 BorderlessPay. Powered by blockchain technology, bank beyond
                    borders.
                </p>
            </footer>
        </div>
    );
}
