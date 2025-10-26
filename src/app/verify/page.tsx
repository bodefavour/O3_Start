"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/contexts";
import { useUser } from "@/contexts";
import { CheckCircle2, Upload, FileText, Clock } from "lucide-react";

export default function VerifyPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const [businessData, setBusinessData] = useState<any>(null);
    const [documents, setDocuments] = useState({
        businessRegistration: null as File | null,
        taxId: null as File | null,
        identityProof: null as File | null,
    });

    useEffect(() => {
        // Load pending registration data
        const pendingData = localStorage.getItem("pendingRegistration");
        if (pendingData) {
            setBusinessData(JSON.parse(pendingData));
        } else {
            // If no pending registration, redirect to register page
            router.push("/register");
        }
    }, [router]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        docType: keyof typeof documents
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                showToast("File size must be less than 10MB", "error");
                return;
            }
            setDocuments({ ...documents, [docType]: file });
            showToast("File uploaded successfully", "success");
        }
    };

    const handleSkipVerification = () => {
        // For hackathon demo, allow skip verification
        // In production, this would be removed or have limits
        showToast("Skipping verification - Demo Mode", "info");

        // Create a temporary Hedera account ID for demo
        const demoAccountId = `0.0.${Math.floor(Math.random() * 1000000)}`;

        // Login user
        login(demoAccountId, businessData?.businessName);

        // Redirect to dashboard
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Implement actual document upload and verification API
            // For now, simulate verification process
            await new Promise((resolve) => setTimeout(resolve, 2500));

            // Create Hedera wallet account
            // In production, this would call your backend API
            const mockAccountId = `0.0.${Math.floor(Math.random() * 1000000)}`;

            showToast("Verification successful! Creating your wallet...", "success");

            // Store user session
            login(mockAccountId, businessData?.businessName);

            // Clear pending registration
            localStorage.removeItem("pendingRegistration");

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } catch (error) {
            showToast("Verification failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!businessData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00c48c] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-[#00c48c]" />
                        <span className="text-base font-semibold text-[#0b1f3a] sm:text-lg">
                            BorderlessPay
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                {/* Progress Indicator */}
                <div className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00c48c]">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="h-1 w-16 bg-[#00c48c]" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00c48c] bg-white">
                        <span className="text-sm font-bold text-[#00c48c]">2</span>
                    </div>
                    <div className="h-1 w-16 bg-gray-300" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                        <span className="text-sm font-bold text-gray-400">3</span>
                    </div>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-extrabold text-[#0b1f3a] sm:text-4xl">
                        Verify Your Business
                    </h1>
                    <p className="text-base font-medium text-[#1f3a5c]">
                        Upload required documents to complete your verification
                    </p>
                </div>

                {/* Security Notice */}
                <div className="mb-8 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <svg
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-900">
                            Your data is secure
                        </p>
                        <p className="text-xs text-blue-700">
                            All documents are encrypted and stored securely. We comply with international data protection standards.
                        </p>
                    </div>
                </div>

                {/* Document Upload Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        {/* Business Registration */}
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#00c48c]/50">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-[#0b1f3a]">
                                        Business Registration Certificate*
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        Official evidence of business or required from your country
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, "businessRegistration")}
                                    className="hidden"
                                    id="businessRegistration"
                                />
                                <label
                                    htmlFor="businessRegistration"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-[#00c48c] hover:bg-[#00c48c]/5"
                                >
                                    <Upload className="mb-3 h-8 w-8 text-gray-400" />
                                    <p className="mb-1 text-sm font-semibold text-[#0b1f3a]">
                                        {documents.businessRegistration
                                            ? documents.businessRegistration.name
                                            : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, JPG, PNG up to 10MB
                                    </p>
                                </label>
                            </div>
                        </div>

                        {/* Tax ID */}
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#00c48c]/50">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-[#0b1f3a]">
                                        Tax Identification Certificate*
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        Tax registration or VAT certificate
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, "taxId")}
                                    className="hidden"
                                    id="taxId"
                                />
                                <label
                                    htmlFor="taxId"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-[#00c48c] hover:bg-[#00c48c]/5"
                                >
                                    <Upload className="mb-3 h-8 w-8 text-gray-400" />
                                    <p className="mb-1 text-sm font-semibold text-[#0b1f3a]">
                                        {documents.taxId
                                            ? documents.taxId.name
                                            : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, JPG, PNG up to 10MB
                                    </p>
                                </label>
                            </div>
                        </div>

                        {/* Identity Proof */}
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#00c48c]/50">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-[#0b1f3a]">
                                        Director/Owner ID*
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        Government-issued ID of business owner or director
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, "identityProof")}
                                    className="hidden"
                                    id="identityProof"
                                />
                                <label
                                    htmlFor="identityProof"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-[#00c48c] hover:bg-[#00c48c]/5"
                                >
                                    <Upload className="mb-3 h-8 w-8 text-gray-400" />
                                    <p className="mb-1 text-sm font-semibold text-[#0b1f3a]">
                                        {documents.identityProof
                                            ? documents.identityProof.name
                                            : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PDF, JPG, PNG up to 10MB
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00c48c] focus:ring-[#00c48c]"
                            required
                        />
                        <label htmlFor="terms" className="text-xs text-gray-700">
                            I agree to the Terms of Service and Privacy Policy. I confirm the information I provided is accurate and the documents are valid.
                        </label>
                    </div>

                    {/* Verification Timeline */}
                    <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                            <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">
                                Verification Timeline
                            </p>
                            <p className="text-xs text-blue-700">
                                Verification typically takes 24-48 hours after submission. You'll receive email updates on your verification status.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleSkipVerification}
                            className="w-full rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-[#0b1f3a] hover:bg-gray-50 sm:w-auto"
                        >
                            Skip for Now (Demo)
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#00c48c] px-8 py-3 text-sm font-semibold text-white hover:bg-[#00b37d] disabled:opacity-50 sm:w-auto"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Processing...
                                </span>
                            ) : (
                                "Complete Verification →"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
