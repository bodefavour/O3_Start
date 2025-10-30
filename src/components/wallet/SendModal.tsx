"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useToast, useUser } from "@/contexts/auth-provider";
import { TransactionLink } from "@/components/hedera/TransactionLink";

interface SendModalProps {
    isOpen: boolean;
    onClose: () => void;
    currency: string;
    currencySymbol: string;
    availableBalance: string;
    walletName: string;
}

export function SendModal({
    isOpen,
    onClose,
    currencySymbol,
    availableBalance,
    walletName,
}: SendModalProps) {
    const { showToast } = useToast();
    const { user } = useUser();
    const [step, setStep] = useState(1); // 1: Details, 2: Review, 3: Success
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [priority, setPriority] = useState<"standard" | "fast">("standard");
    const [note, setNote] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [sending, setSending] = useState(false);

    if (!isOpen) return null;

    const networkFee = priority === "fast" ? 1.5 : 1.0;
    const total = amount ? (parseFloat(amount) + networkFee).toFixed(2) : "0.00";

    const handleContinue = () => {
        if (!recipientAddress || !amount) {
            toast.error("Please fill in all required fields");
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSendNow = async () => {
        setSending(true);

        toast.success("Transaction sent successfully!");
        setStep(3);
        // Don't auto-close anymore, let user see the success screen
        try {
            // Get Hedera token ID from environment
            const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

            if (!tokenId) {
                // Fallback to mock for demo if not configured
                console.warn('Hedera token not configured, using mock transaction');
                const mockHash = `0.0.${Date.now()}@${Math.random().toString(36).substring(7)}`;
                setTransactionHash(mockHash);
                showToast("Demo transaction created!", "success");
                setStep(3);
                setSending(false);
                return;
            }

            // Call Hedera transfer API
            const response = await fetch('/api/hedera/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenId,
                    fromAccountId: user?.accountId || '0.0.0', // Will use operator account
                    toAccountId: recipientAddress,
                    amount: parseFloat(amount),
                    memo: note || `Send ${amount} ${currencySymbol}`,
                    userId: user?.accountId,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setTransactionHash(result.data.transactionId);
                showToast("Transaction sent successfully!", "success");
                setStep(3);
            } else {
                showToast(result.error || "Transaction failed", "error");
            }
        } catch (error: any) {
            console.error('Send error:', error);
            showToast(error.message || "Failed to send transaction", "error");
        } finally {
            setSending(false);
        }
    };

    const handleClose = () => {
        onClose();
        // Reset form
        setStep(1);
        setRecipientAddress("");
        setAmount("");
        setPriority("standard");
        setNote("");
        setTransactionHash("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl my-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-[#0b1f3a]">
                        Send {currencySymbol}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                        {/* Step 1 */}
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${step === 1
                                    ? "bg-[#00c48c] text-white"
                                    : step > 1
                                        ? "bg-[#00c48c] text-white"
                                        : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                1
                            </div>
                            <div className="h-0.5 w-16 bg-gray-300" />
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${step === 2
                                    ? "bg-[#00c48c] text-white"
                                    : step > 2
                                        ? "bg-[#00c48c] text-white"
                                        : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                2
                            </div>
                            <div className="h-0.5 w-16 bg-gray-300" />
                        </div>

                        {/* Step 3 */}
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${step === 3
                                ? "bg-[#00c48c] text-white"
                                : "bg-gray-300 text-gray-600"
                                }`}
                        >
                            3
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
                    {/* Step 1: Details */}
                    {step === 1 && (
                        <div>
                            {/* Recipient Address */}
                            <div className="mb-6">
                                <label className="mb-2 block text-base font-semibold text-gray-900">
                                    Recipient Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    placeholder="0x4Fabb145d64652a948d72533023f6E7A623C7C2"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                />
                            </div>

                            {/* Amount */}
                            <div className="mb-4">
                                <label className="mb-2 block text-base font-semibold text-gray-900">
                                    Amount <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
                                        {currencySymbol}
                                    </span>
                                </div>
                            </div>
                            <p className="mb-6 text-sm text-gray-600">
                                Available: {availableBalance} {currencySymbol}
                            </p>

                            {/* Transaction Priority */}
                            <div className="mb-6">
                                <label className="mb-3 block text-base font-semibold text-gray-900">
                                    Transaction Priority
                                </label>
                                <div className="space-y-3">
                                    {/* Standard */}
                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${priority === "standard"
                                            ? "border-[#00c48c] bg-[#00c48c]/5"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value="standard"
                                                checked={priority === "standard"}
                                                onChange={(e) => setPriority(e.target.value as "standard" | "fast")}
                                                className="h-4 w-4 text-[#00c48c] focus:ring-[#00c48c]"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Standard</p>
                                                <p className="text-xs text-gray-600">Lower fees, standard processing</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">~2-5 minutes</span>
                                    </label>

                                    {/* Fast */}
                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${priority === "fast"
                                            ? "border-[#00c48c] bg-[#00c48c]/5"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value="fast"
                                                checked={priority === "fast"}
                                                onChange={(e) => setPriority(e.target.value as "standard" | "fast")}
                                                className="h-4 w-4 text-[#00c48c] focus:ring-[#00c48c]"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Fast</p>
                                                <p className="text-xs text-gray-600">Higher fees, priority processing</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">~30 seconds</span>
                                    </label>
                                </div>
                            </div>

                            {/* Note */}
                            <div className="mb-6">
                                <label className="mb-2 block text-base font-semibold text-gray-900">
                                    Note (Optional)
                                </label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add a note for this transaction....."
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c] resize-none"
                                />
                            </div>

                            {/* Continue Button */}
                            <Button
                                onClick={handleContinue}
                                className="w-full gap-2 rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d]"
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Review */}
                    {step === 2 && (
                        <div>
                            <div className="mb-6 text-center">
                                <h3 className="mb-2 text-xl font-bold text-[#0b1f3a]">
                                    Review Transaction
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Please confirm the details below
                                </p>
                            </div>

                            {/* Transaction Details */}
                            <div className="mb-6 space-y-4 border-b border-gray-200 pb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-base text-gray-600">From</span>
                                    <span className="text-base font-semibold text-gray-900">
                                        {walletName}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-base text-gray-600">To</span>
                                    <span className="text-base font-medium text-gray-900">
                                        {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-base text-gray-600">Amount</span>
                                    <span className="text-base font-semibold text-gray-900">
                                        {amount} {currencySymbol}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-base text-gray-600">Network Fee</span>
                                    <span className="text-base font-medium text-gray-900">
                                        ${networkFee.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mb-6 flex items-center justify-between border-t border-gray-200 pt-4">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-lg font-bold text-gray-900">
                                    {total} {currencySymbol}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    className="flex-1 rounded-xl py-6 text-base font-semibold"
                                    disabled={sending}
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSendNow}
                                    className="flex-1 gap-2 rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d] disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={sending}
                                >
                                    {sending ? 'Sending...' : 'Send Now'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="flex flex-col items-center py-8">
                            {/* Success Icon */}
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#00c48c]/20">
                                <Check className="h-12 w-12 text-[#00c48c]" strokeWidth={3} />
                            </div>

                            {/* Success Message */}
                            <h3 className="mb-2 text-2xl font-bold text-[#0b1f3a]">
                                Transaction Sent!
                            </h3>
                            <p className="mb-8 text-center text-sm text-gray-600 px-8">
                                Your transaction has been submitted to Hedera network and will be confirmed shortly
                            </p>

                            {/* Transaction Hash with Link to Mirror Node */}
                            <div className="w-full rounded-lg bg-gray-100 px-6 py-4 mb-6">
                                <p className="mb-3 text-center text-sm font-semibold text-gray-700">
                                    Transaction ID
                                </p>
                                <div className="flex justify-center">
                                    <TransactionLink
                                        transactionId={transactionHash}
                                        network={process.env.HEDERA_NETWORK as 'testnet' | 'mainnet' || 'testnet'}
                                    />
                                </div>
                            </div>

                            {/* Close Button */}
                            <Button
                                onClick={handleClose}
                                className="w-full rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d]"
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
