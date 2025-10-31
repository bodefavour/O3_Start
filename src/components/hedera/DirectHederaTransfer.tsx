"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendHbar, getAccountBalance } from "@/lib/hedera/direct-signer";
import { ExternalLink, Loader2 } from "lucide-react";

export function DirectHederaTransfer() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [lastTxUrl, setLastTxUrl] = useState<string | null>(null);

    const handleTransfer = async () => {
        if (!recipient || !amount) {
            toast.error("Please fill in all fields");
            return;
        }

        // Basic validation for Hedera account ID format
        if (!/^\d+\.\d+\.\d+$/.test(recipient)) {
            toast.error("Invalid Hedera account ID format (should be 0.0.xxxxx)");
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        setLastTxUrl(null);

        try {
            const result = await sendHbar(recipient, amountNum);

            if (result.success) {
                toast.success(`Successfully sent ${amount} HBAR`, {
                    description: `Transaction ID: ${result.transactionId}`,
                    duration: 10000,
                });
                setLastTxUrl(result.explorerUrl || null);
                setAmount("");
                setRecipient("");
            } else {
                toast.error("Transaction failed", {
                    description: result.error || "Unknown error",
                });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            toast.error("Transaction error", {
                description: message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCheckBalance = async () => {
        if (!recipient) {
            toast.error("Please enter an account ID");
            return;
        }

        if (!/^\d+\.\d+\.\d+$/.test(recipient)) {
            toast.error("Invalid Hedera account ID format");
            return;
        }

        setLoading(true);

        try {
            const result = await getAccountBalance(recipient);

            if (result.balance !== undefined) {
                toast.success(`Balance: ${result.balance.toFixed(8)} HBAR`, {
                    description: `Account: ${recipient}`,
                });
            } else {
                toast.error("Failed to fetch balance", {
                    description: result.error,
                });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            toast.error("Balance query error", {
                description: message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 rounded-lg border-2 border-[#5D4FF4] bg-white p-6 shadow-lg">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-[#0b1f3a]">Direct Hedera Transfer</h3>
                <p className="text-xs text-amber-600">
                    ⚠️ Development mode: Using hardcoded private key
                </p>
            </div>

            <div className="space-y-3">
                <div>
                    <Label htmlFor="recipient">Recipient Account ID</Label>
                    <Input
                        id="recipient"
                        placeholder="0.0.xxxxx"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div>
                    <Label htmlFor="amount">Amount (HBAR)</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={handleTransfer}
                        disabled={loading}
                        className="flex-1 bg-[#5D4FF4] hover:bg-[#4D3FE4]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Send HBAR"
                        )}
                    </Button>

                    <Button
                        onClick={handleCheckBalance}
                        disabled={loading}
                        variant="outline"
                        className="border-[#5D4FF4] text-[#5D4FF4]"
                    >
                        Check Balance
                    </Button>
                </div>
            </div>

            {lastTxUrl && (
                <div className="mt-4 rounded-lg border border-[#00c48c] bg-[#00c48c]/10 p-3">
                    <p className="text-xs font-medium text-gray-600">Transaction successful!</p>
                    <a
                        href={lastTxUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-1 text-sm text-[#5D4FF4] hover:underline"
                    >
                        View on HashScan
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            )}
        </div>
    );
}
