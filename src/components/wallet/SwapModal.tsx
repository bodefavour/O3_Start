"use client";

import { useState } from "react";
import { X, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ConversionRate } from "@/components/hedera/ConversionRate";

interface SwapModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Currency {
    symbol: string;
    name: string;
}

// Hackathon MVP: Focus on HBAR <-> BPUSD conversion
const availableCurrencies: Currency[] = [
    { symbol: "HBAR", name: "Hedera" },
    { symbol: "BPUSD", name: "BorderlessPay USD" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "USDT", name: "Tether USD" },
];

export function SwapModal({ isOpen, onClose }: SwapModalProps) {
    const [fromCurrency, setFromCurrency] = useState<Currency>(availableCurrencies[0]);
    const [toCurrency, setToCurrency] = useState<Currency>(availableCurrencies[1]);
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [slippage, setSlippage] = useState("0.5");
    const [swapping, setSwapping] = useState(false);

    if (!isOpen) return null;

    // Calculate conversion based on real rates
    const calculateToAmount = (amount: string) => {
        if (!amount || isNaN(parseFloat(amount))) {
            setToAmount("");
            return;
        }

        // Hackathon demo rates (1 HBAR = $0.052)
        const rates: { [key: string]: number } = {
            'HBAR-BPUSD': 0.052,
            'HBAR-USDC': 0.052,
            'HBAR-USDT': 0.052,
            'BPUSD-HBAR': 19.23,
            'USDC-HBAR': 19.23,
            'USDT-HBAR': 19.23,
            'BPUSD-USDC': 1.0,
            'USDC-BPUSD': 1.0,
        };

        const key = `${fromCurrency.symbol}-${toCurrency.symbol}`;
        const rate = rates[key] || 1;
        const result = (parseFloat(amount) * rate).toFixed(4);
        setToAmount(result);
    };

    const handleFromAmountChange = (value: string) => {
        setFromAmount(value);
        calculateToAmount(value);
    };

    const handleSwapCurrencies = () => {
        const tempFrom = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempFrom);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    const handleSwap = async () => {
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setSwapping(true);

        try {
            // Hackathon MVP: Show the conversion workflow
            toast.info("Initiating swap transaction...");

            // Simulate swap (in production, this would call Hedera swap API or DEX)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo: Show success with mock transaction ID
            const mockTxId = `0.0.4826582@${Date.now() / 1000}.${Math.floor(Math.random() * 999999999)}`;

            toast.success(
                <div className="flex flex-col gap-2">
                    <span>✅ Swap successful!</span>
                    <span className="text-xs">
                        Swapped {fromAmount} {fromCurrency.symbol} → {toAmount} {toCurrency.symbol}
                    </span>
                    <a
                        href={`https://hashscan.io/testnet/transaction/${mockTxId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c48c] hover:underline text-xs"
                    >
                        View on HashScan →
                    </a>
                </div>,
                { duration: 5000 }
            );

            setTimeout(() => {
                onClose();
                setFromAmount("");
                setToAmount("");
            }, 1000);
        } catch (error) {
            toast.error("Swap failed. Please try again.");
        } finally {
            setSwapping(false);
        }
    };

    const handleClose = () => {
        onClose();
        setFromAmount("");
        setToAmount("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl my-8 max-h-[calc(100vh-4rem)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#0b1f3a]">Currency Swap</h2>
                        <p className="text-xs text-gray-500 mt-1">Hackathon MVP - Conversion Demo</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-1 transition-colors hover:bg-gray-100"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    {/* From Section */}
                    <div className="mb-4"
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                        From
                    </label>
                    <div className="rounded-lg border border-gray-300 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <select
                                value={fromCurrency.symbol}
                                onChange={(e) => {
                                    const selected = availableCurrencies.find(
                                        (c) => c.symbol === e.target.value
                                    );
                                    if (selected) setFromCurrency(selected);
                                }}
                                className="text-lg font-bold text-gray-900 bg-transparent border-none outline-none cursor-pointer"
                            >
                                {availableCurrencies.map((currency) => (
                                    <option key={currency.symbol} value={currency.symbol}>
                                        {currency.symbol}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={fromAmount}
                                onChange={(e) => handleFromAmountChange(e.target.value)}
                                placeholder="0.00"
                                className="text-right text-lg font-medium text-gray-400 bg-transparent border-none outline-none w-32"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{fromCurrency.name}</span>
                            <span className="text-gray-900">
                                Balance: {fromCurrency.balance}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="mb-4 flex justify-center">
                    <button
                        onClick={handleSwapCurrencies}
                        className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300"
                    >
                        <ArrowUpDown className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* To Section */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        To
                    </label>
                    <div className="rounded-lg border border-gray-300 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <select
                                value={toCurrency.symbol}
                                onChange={(e) => {
                                    const selected = availableCurrencies.find(
                                        (c) => c.symbol === e.target.value
                                    );
                                    if (selected) setToCurrency(selected);
                                }}
                                className="text-lg font-bold text-gray-900 bg-transparent border-none outline-none cursor-pointer"
                            >
                                {availableCurrencies.map((currency) => (
                                    <option key={currency.symbol} value={currency.symbol}>
                                        {currency.symbol}
                                    </option>
                                ))}
                            </select>
                            <span className="text-right text-lg font-medium text-gray-400">
                                {toAmount || "0.000000"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{toCurrency.name}</span>
                            <span className="text-gray-900">
                                Balance: {toCurrency.balance}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Slippage Tolerance */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Slippage Tolerance
                    </label>
                    <div className="flex gap-2">
                        {["0.1", "0.5", "1.0"].map((value) => (
                            <button
                                key={value}
                                onClick={() => setSlippage(value)}
                                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${slippage === value
                                    ? "bg-[#00c48c] text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {value}%
                            </button>
                        ))}
                        <input
                            type="text"
                            value={slippage}
                            onChange={(e) => setSlippage(e.target.value)}
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-900 outline-none focus:border-[#00c48c] focus:ring-1 focus:ring-[#00c48c]"
                        />
                    </div>
                </div>

                {/* Important Notice */}
                <div className="mb-6 rounded-lg bg-blue-50 p-4">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <h4 className="mb-1 text-sm font-semibold text-gray-900">
                                Important Notice
                            </h4>
                            <p className="text-xs text-gray-700">
                                Exchange rates are subject to market conditions and may change
                                before transaction confirmation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <Button
                    onClick={handleSwap}
                    className="w-full gap-2 rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d]"
                >
                    Swap Now
                </Button>
            </div>
        </div>
        </div >
    );
}
