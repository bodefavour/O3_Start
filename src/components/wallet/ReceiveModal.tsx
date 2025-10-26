"use client";

import { useState } from "react";
import { X, Copy, QrCode, Share2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/contexts";

interface ReceiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    currency: string;
    currencySymbol: string;
    walletAddress: string;
}

export function ReceiveModal({
    isOpen,
    onClose,
    currency,
    currencySymbol,
    walletAddress,
}: ReceiveModalProps) {
    const { showToast } = useToast();
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    if (!isOpen) return null;

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(walletAddress);
        showToast("Address copied to clipboard!", "success");
    };

    const handleShare = () => {
        const shareText = `Send ${amount ? amount + ' ' : ''}${currencySymbol} to:\n${walletAddress}${note ? '\nNote: ' + note : ''}`;
        if (navigator.share) {
            navigator.share({
                title: `Receive ${currencySymbol}`,
                text: shareText,
            });
        } else {
            navigator.clipboard.writeText(shareText);
            showToast("Payment request copied to clipboard!", "success");
        }
    };

    const handleEmail = () => {
        const subject = `Payment Request: ${amount ? amount + ' ' : ''}${currencySymbol}`;
        const body = `Please send ${amount ? amount + ' ' : ''}${currencySymbol} to the following wallet address:\n\n${walletAddress}${note ? '\n\nNote: ' + note : ''}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl my-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-[#0b1f3a]">
                        Receive {currencySymbol}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    {/* QR Code */}
                    <div className="mb-6 flex flex-col items-center">
                        <div className="mb-3 flex h-40 w-40 items-center justify-center rounded-xl bg-white border-2 border-gray-200">
                            <QrCode className="h-32 w-32 text-gray-800" />
                        </div>
                        <p className="text-sm text-gray-600">
                            Scan this QR code to send {currencySymbol} to this wallet
                        </p>
                    </div>

                    {/* Wallet Address */}
                    <div className="mb-6">
                        <label className="mb-2 block text-base font-semibold text-gray-900">
                            Wallet Address
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={walletAddress}
                                readOnly
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700"
                            />
                            <button
                                onClick={handleCopyAddress}
                                className="flex items-center justify-center rounded-lg bg-[#00c48c] p-3 hover:bg-[#00b37d] transition-colors"
                            >
                                <Copy className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Request Specific Amount */}
                    <div className="mb-6">
                        <label className="mb-2 block text-base font-semibold text-gray-900">
                            Request Specific Amount (Optional)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                {currencySymbol}
                            </span>
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
                            placeholder="What's this payment for?"
                            rows={3}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c] resize-none"
                        />
                    </div>

                    {/* Share Payment Request */}
                    <div className="mb-6">
                        <label className="mb-3 block text-base font-semibold text-gray-900">
                            Share Payment Request
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={handleCopyAddress}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <Copy className="h-5 w-5 text-gray-700" />
                                <span className="text-sm font-medium text-gray-900">Copy</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <Share2 className="h-5 w-5 text-gray-700" />
                                <span className="text-sm font-medium text-gray-900">Share</span>
                            </button>
                            <button
                                onClick={handleEmail}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <Mail className="h-5 w-5 text-gray-700" />
                                <span className="text-sm font-medium text-gray-900">Email</span>
                            </button>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="rounded-lg bg-blue-50 p-4">
                        <div className="flex gap-2">
                            <div className="flex-shrink-0">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
                                    i
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-1 text-sm font-semibold text-blue-900">
                                    Security Notice
                                </h3>
                                <p className="text-xs text-blue-800">
                                    Only share your wallet address with trusted parties. Never share your
                                    private keys or seed phrase.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
