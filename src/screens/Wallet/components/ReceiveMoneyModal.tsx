import { useEffect, useState } from "react";
import { Copy, Mail, Share2, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

type ReceiveMoneyModalProps = {
    isOpen: boolean;
    onClose: () => void;
    walletAddress?: string;
    currency?: string;
};

const DEFAULT_WALLET_ADDRESS = "0x4Fabb145d64652a948d72533023f6E7A623C7C2";
const QR_PLACEHOLDER =
    "M12 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 10H4V4h8zm8-10h-4a2 2 0 0 0-2 2v4h2V4h4zm-6 6v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4h-2v4h-4V8zm-4 6H4v-2H2v2a2 2 0 0 0 2 2h4z";

export const ReceiveMoneyModal = ({
    isOpen,
    onClose,
    walletAddress = DEFAULT_WALLET_ADDRESS,
    currency = "KES",
}: ReceiveMoneyModalProps) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [didCopy, setDidCopy] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAmount("");
            setNote("");
            setDidCopy(false);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        onClose();
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(walletAddress);
            setDidCopy(true);
            setTimeout(() => setDidCopy(false), 2000);
        } catch (error) {
            console.error("Failed to copy address", error);
        }
    };

    const handleShare = () => {
        console.log("Share payment request", {
            walletAddress,
            amount,
            note,
            currency,
        });
    };

    const handleEmail = () => {
        console.log("Email payment request", {
            walletAddress,
            amount,
            note,
            currency,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:py-10">
            <div className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f2f5] text-[#0b1f3a] transition hover:bg-[#e5e7eb]"
                    aria-label="Close receive modal"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                    <h2 className="mb-8 font-semibold text-[#0b1f3a]">Receive {currency}</h2>

                    <div className="mb-8 flex flex-col items-center gap-6">
                        <div className="flex h-28 w-28 items-center justify-center rounded-xl border border-dashed border-[#d1d5db] bg-[#f9fafb]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0b1f3a"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-20 w-20"
                            >
                                <path d={QR_PLACEHOLDER} />
                            </svg>
                        </div>
                        <p className="text-sm text-[#6b7280]">
                            Scan this QR code to send {currency} to this wallet
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <p className="mb-2 text-sm font-medium text-[#0b1f3a]">Wallet Address</p>
                            <div className="flex items-center gap-3 rounded-2xl border border-[#d1d5db] bg-white px-4 py-3">
                                <span className="flex-1 truncate text-sm font-semibold text-[#0b1f3a]">
                                    {walletAddress}
                                </span>
                                <Button
                                    type="button"
                                    onClick={handleCopy}
                                    className="h-10 rounded-xl bg-[#00c48c] px-4 text-sm font-semibold text-white hover:bg-[#00b37d]"
                                >
                                    {didCopy ? "Copied" : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">
                                Request Specific Amount (Optional)
                            </label>
                            <div className="flex items-center gap-2 rounded-2xl border border-[#d1d5db] bg-[#f9fafb]">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                    placeholder="0.00"
                                    className="h-12 flex-1 rounded-2xl bg-transparent px-4 text-sm text-[#0b1f3a] focus:outline-none"
                                />
                                <div className="pr-4 text-sm font-semibold text-[#0b1f3a]">{currency}</div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">
                                Note (Optional)
                            </label>
                            <textarea
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="What’s this payment for?"
                                className="h-24 w-full rounded-2xl border border-[#d1d5db] bg-[#f9fafb] px-4 py-3 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="mb-3 text-sm font-medium text-[#0b1f3a]">
                            Share Payment Request
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCopy}
                                className="h-12 rounded-xl border-[#d1d5db] bg-white text-sm font-semibold text-[#0b1f3a] hover:bg-gray-50"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Copy className="h-4 w-4" />
                                    <span>Copy</span>
                                </div>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleShare}
                                className="h-12 rounded-xl border-[#d1d5db] bg-white text-sm font-semibold text-[#0b1f3a] hover:bg-gray-50"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Share2 className="h-4 w-4" />
                                    <span>Share</span>
                                </div>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleEmail}
                                className="h-12 rounded-xl border-[#d1d5db] bg-white text-sm font-semibold text-[#0b1f3a] hover:bg-gray-50"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>Email</span>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-[#e0edff] p-4 text-left">
                        <div className="flex items-start gap-2">
                            <span className="mt-[2px] text-sm font-semibold text-[#0b1f3a]">i</span>
                            <div>
                                <p className="text-sm font-semibold text-[#0b1f3a]">
                                    Security Notice
                                </p>
                                <p className="mt-1 text-xs text-[#4b5563]">
                                    Only share your wallet address with trusted parties. Never share your private keys or seed phrase.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
