"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function TestBackendSigningPage() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [memo, setMemo] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [checkingBalance, setCheckingBalance] = useState(false);

    const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;
    const backendSigningEnabled = process.env.NEXT_PUBLIC_BACKEND_SIGNING_ENABLED === 'true';

    const handleCheckBalance = async () => {
        setCheckingBalance(true);
        try {
            // Use direct-signer to check balance
            const { getAccountBalance } = await import('@/lib/hedera/direct-signer');
            const result = await getAccountBalance(operatorId!);
            
            if (result.balance !== undefined) {
                setBalance(result.balance.toFixed(2));
                toast.success(`Balance: ${result.balance.toFixed(2)} HBAR`);
            } else {
                toast.error(result.error || 'Failed to check balance');
            }
        } catch (error: any) {
            toast.error(error.message || 'Error checking balance');
        } finally {
            setCheckingBalance(false);
        }
    };

    const handleSendTransaction = async () => {
        if (!recipient || !amount) {
            toast.error("Please enter recipient and amount");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

            const response = await fetch('/api/hedera/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenId,
                    fromAccountId: operatorId,
                    toAccountId: recipient,
                    amount: parseFloat(amount),
                    memo: memo || 'Backend signing test',
                    userId: operatorId,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
                toast.success("✅ Transaction successful!");
            } else {
                toast.error(data.error || 'Transaction failed');
                setResult({ error: data.error });
            }
        } catch (error: any) {
            toast.error(error.message || 'Error sending transaction');
            setResult({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (!backendSigningEnabled) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-red-600">Backend Signing Disabled</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            Backend signing is not enabled. Add this to your .env.local:
                        </p>
                        <pre className="bg-gray-100 p-4 rounded">
                            NEXT_PUBLIC_BACKEND_SIGNING_ENABLED=true
                        </pre>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto space-y-6 py-8">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">🚀 Backend Signing Test</CardTitle>
                        <p className="text-sm text-gray-600">
                            Test Hedera transactions WITHOUT connecting a wallet
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">✅ Backend Signing Enabled</h3>
                            <p className="text-sm text-green-700">
                                Your operator account: <code className="bg-green-100 px-2 py-1 rounded">{operatorId}</code>
                            </p>
                        </div>

                        {/* Balance Check */}
                        <div className="flex items-center gap-4">
                            <Button 
                                onClick={handleCheckBalance} 
                                disabled={checkingBalance}
                                variant="outline"
                            >
                                {checkingBalance ? "Checking..." : "Check Balance"}
                            </Button>
                            {balance && (
                                <p className="text-lg font-semibold text-green-600">
                                    💰 {balance} HBAR
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Send Transaction Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Send Transaction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Recipient Account ID
                            </label>
                            <input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="0.0.1234567"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Amount (Token Units)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="10"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Memo (Optional)
                            </label>
                            <input
                                type="text"
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                                placeholder="Test payment"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <Button
                            onClick={handleSendTransaction}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Sending..." : "🚀 Send Transaction"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Result Display */}
                {result && (
                    <Card>
                        <CardHeader>
                            <CardTitle className={result.error ? "text-red-600" : "text-green-600"}>
                                {result.error ? "❌ Error" : "✅ Success"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {result.error ? (
                                <div className="bg-red-50 p-4 rounded">
                                    <p className="text-red-800">{result.error}</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="bg-green-50 p-4 rounded space-y-2">
                                        <p><strong>Transaction ID:</strong></p>
                                        <code className="block bg-white p-2 rounded text-xs break-all">
                                            {result.transactionId}
                                        </code>
                                    </div>

                                    <div className="space-y-2">
                                        <p><strong>From:</strong> {result.fromAccountId}</p>
                                        <p><strong>To:</strong> {result.toAccountId}</p>
                                        <p><strong>Amount:</strong> {result.amount}</p>
                                    </div>

                                    {result.explorerUrl && (
                                        <a
                                            href={result.explorerUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            View on HashScan →
                                        </a>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Info Box */}
                <Card>
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">ℹ️ How It Works</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>✅ No wallet connection required</li>
                            <li>✅ Transactions signed with your operator key</li>
                            <li>✅ Real transactions on Hedera testnet</li>
                            <li>✅ Verified on HashScan blockchain explorer</li>
                            <li>⚠️ Make sure your operator account has HBAR balance</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
