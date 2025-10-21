import { useEffect, useState } from "react";
import { ArrowLeftRight, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface WalletOption {
    code: string;
    name: string;
    balance: number;
    decimals: number;
}

interface SwapCurrenciesModalProps {
    isOpen: boolean;
    onClose: () => void;
    fromWallets?: WalletOption[];
    toWallets?: WalletOption[];
}

const DEFAULT_WALLETS: WalletOption[] = [
    { code: "NGN", name: "Nigerian Naira", balance: 12500000, decimals: 2 },
    { code: "USD", name: "US Dollar", balance: 32000, decimals: 2 },
    { code: "USDT", name: "Tether USD", balance: 8750.25, decimals: 6 },
    { code: "USDC", name: "USD Coin", balance: 25000, decimals: 2 },
];

const SLIPPAGE_PRESETS = [0.1, 0.5, 1];

export const SwapCurrenciesModal = ({
    isOpen,
    onClose,
    fromWallets = DEFAULT_WALLETS,
    toWallets = DEFAULT_WALLETS,
}: SwapCurrenciesModalProps) => {
    const [fromWalletCode, setFromWalletCode] = useState("NGN");
    const [toWalletCode, setToWalletCode] = useState("USDT");
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("0.000000");
    const [slippage, setSlippage] = useState(0.1);
    const [customSlippage, setCustomSlippage] = useState("0.1");

    useEffect(() => {
        if (isOpen) {
            setFromWalletCode("NGN");
            setToWalletCode("USDT");
            setFromAmount("");
            setToAmount("0.000000");
            setSlippage(0.1);
            setCustomSlippage("0.1");
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        onClose();
    };

    const handleSwapDirection = () => {
        setFromWalletCode(toWalletCode);
        setToWalletCode(fromWalletCode);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    const handleSlippagePreset = (value: number) => {
        setSlippage(value);
        setCustomSlippage(value.toString());
    };

    const fromWallet = fromWallets.find((wallet) => wallet.code === fromWalletCode) ?? DEFAULT_WALLETS[0];
    const toWallet = toWallets.find((wallet) => wallet.code === toWalletCode) ?? DEFAULT_WALLETS[2];

    const formatBalance = (value: number, decimals = 2) =>
        value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:py-10">
            <div className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f2f5] text-[#0b1f3a] transition hover:bg-[#e5e7eb]"
                    aria-label="Close swap modal"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                    <h2 className="mb-8 font-semibold text-[#0b1f3a]">Swap Currencies</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">From</label>
                            <div className="flex flex-col gap-2 rounded-2xl border border-[#d1d5db] bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <select
                                        value={fromWalletCode}
                                        onChange={(event) => setFromWalletCode(event.target.value)}
                                        className="w-32 cursor-pointer rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-2 text-sm font-semibold text-[#0b1f3a] focus:outline-none"
                                    >
                                        {fromWallets.map((wallet) => (
                                            <option key={wallet.code} value={wallet.code}>
                                                {wallet.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="0"
                                        value={fromAmount}
                                        placeholder="0.00"
                                        onChange={(event) => setFromAmount(event.target.value)}
                                        className="w-32 text-right text-sm font-semibold text-[#0b1f3a] focus:outline-none"
                                    />
                                </div>
                                <div className="text-sm text-[#6b7280]">{fromWallet.name}</div>
                                <div className="text-xs text-[#6b7280]">
                                    Balance: {formatBalance(fromWallet.balance, fromWallet.decimals)}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleSwapDirection}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#0b1f3a] shadow-sm transition hover:bg-gray-50"
                            >
                                <ArrowLeftRight className="h-5 w-5" />
                            </button>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">To</label>
                            <div className="flex flex-col gap-2 rounded-2xl border border-[#d1d5db] bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <select
                                        value={toWalletCode}
                                        onChange={(event) => setToWalletCode(event.target.value)}
                                        className="w-32 cursor-pointer rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-3 py-2 text-sm font-semibold text-[#0b1f3a] focus:outline-none"
                                    >
                                        {toWallets.map((wallet) => (
                                            <option key={wallet.code} value={wallet.code}>
                                                {wallet.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="0"
                                        value={toAmount}
                                        placeholder="0.000000"
                                        onChange={(event) => setToAmount(event.target.value)}
                                        className="w-32 text-right text-sm font-semibold text-[#0b1f3a] focus:outline-none"
                                    />
                                </div>
                                <div className="text-sm text-[#6b7280]">{toWallet.name}</div>
                                <div className="text-xs text-[#6b7280]">
                                    Balance: {formatBalance(toWallet.balance, toWallet.decimals)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-medium text-[#0b1f3a]">Slippage Tolerance</p>
                            <div className="flex flex-wrap items-center gap-3">
                                {SLIPPAGE_PRESETS.map((value) => (
                                    <Button
                                        key={value}
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleSlippagePreset(value)}
                                        className={`h-10 rounded-xl border ${slippage === value
                                                ? "border-[#00c48c] bg-[#00c48c] text-white"
                                                : "border-[#d1d5db] bg-white text-[#0b1f3a]"
                                            } px-4 text-sm font-semibold`}
                                    >
                                        {value}%
                                    </Button>
                                ))}
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={customSlippage}
                                    onChange={(event) => {
                                        setCustomSlippage(event.target.value);
                                        const parsed = Number.parseFloat(event.target.value);
                                        if (!Number.isNaN(parsed)) {
                                            setSlippage(parsed);
                                        }
                                    }}
                                    className="h-10 w-24 rounded-xl border border-[#d1d5db] px-3 text-sm text-[#0b1f3a] focus:outline-none"
                                    placeholder="0.1%"
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#e0edff] p-4">
                            <p className="text-sm font-semibold text-[#0b1f3a]">Important Notice</p>
                            <p className="mt-1 text-xs text-[#4b5563]">
                                Exchange rates are subject to market conditions and may change before transaction confirmation.
                            </p>
                        </div>

                        <Button
                            type="button"
                            className="h-12 w-full rounded-xl bg-[#00c48c] text-base font-semibold text-white hover:bg-[#00b37d]"
                        >
                            Review Swap
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
