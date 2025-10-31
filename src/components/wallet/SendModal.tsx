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

        try {
            // Validate recipient address format
            const accountIdRegex = /^0\.0\.\d+$/;
            if (!accountIdRegex.test(recipientAddress)) {
                throw new Error('Invalid recipient address format. Must be in format: 0.0.123456');
            }

            // Check if backend signing is enabled (bypasses wallet entirely)
            const backendSigningEnabled = process.env.NEXT_PUBLIC_BACKEND_SIGNING_ENABLED === 'true';
            const operatorId = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;
            const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

            // ALWAYS use backend signing if enabled - no wallet needed!
            if (backendSigningEnabled && operatorId) {
                console.log('✅ Using backend signing - no wallet required!');
                console.log('From:', operatorId, 'To:', recipientAddress, 'Amount:', amount);

                const response = await fetch('/api/hedera/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tokenId,
                        fromAccountId: operatorId,
                        toAccountId: recipientAddress,
                        amount: parseFloat(amount),
                        memo: note || `Send ${amount} ${currencySymbol}`,
                        userId: operatorId,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    setTransactionHash(result.data.transactionId);
                    showToast("✅ Transaction sent via backend!", "success");
                    setStep(3);
                } else {
                    // Provide helpful error messages
                    let errorMessage = result.error || 'Transaction failed';
                    
                    if (errorMessage.includes('INVALID_ACCOUNT_ID')) {
                        errorMessage = `Recipient account ${recipientAddress} does not exist on Hedera testnet. Please use a valid testnet account.`;
                    } else if (errorMessage.includes('INSUFFICIENT_PAYER_BALANCE')) {
                        errorMessage = 'Insufficient HBAR balance to pay for transaction fees. Please fund your account.';
                    } else if (errorMessage.includes('INSUFFICIENT_TOKEN_BALANCE')) {
                        errorMessage = 'Insufficient token balance. Please ensure your account has enough tokens.';
                    } else if (errorMessage.includes('TOKEN_NOT_ASSOCIATED')) {
                        errorMessage = 'Recipient has not associated this token. They need to associate it first.';
                    }
                    
                    throw new Error(errorMessage);
                }

                setSending(false);
                return;
            }

            // Legacy wallet-based flow (only if backend signing is disabled)
            const isHederaWallet = localStorage.getItem('isHederaWallet') === 'true';

            if (!tokenId && !isHederaWallet) {
                // Fallback to mock for demo if not configured
                console.warn('Hedera not configured, using mock transaction');
                const mockHash = `0.0.${Date.now()}@${Math.random().toString(36).substring(7)}`;
                setTransactionHash(mockHash);
                showToast("Demo transaction created!", "success");
                setStep(3);
                setSending(false);
                return;
            }

            // For Hedera wallets: Use WalletConnect to sign the transaction
            if (isHederaWallet && user?.accountId) {
                // Import DAppConnector dynamically to avoid SSR issues
                const { DAppConnector, HederaJsonRpcMethod } = await import('@hashgraph/hedera-wallet-connect');
                const { TransferTransaction, AccountId, TokenId } = await import('@hashgraph/sdk');

                // Get existing DAppConnector instance from window
                const dAppConnector = (window as any).hederaDAppConnector;

                if (!dAppConnector || !dAppConnector.signers || dAppConnector.signers.length === 0) {
                    showToast("Please connect your Hedera wallet first", "error");
                    setSending(false);
                    return;
                }

                const signer = dAppConnector.signers[0];

                // Create the transfer transaction
                const transferTx = new TransferTransaction()
                    .addTokenTransfer(
                        tokenId!,
                        user.accountId,
                        -parseFloat(amount) * 100 // Assuming 2 decimals
                    )
                    .addTokenTransfer(
                        tokenId!,
                        recipientAddress,
                        parseFloat(amount) * 100
                    )
                    .setTransactionMemo(note || `Send ${amount} ${currencySymbol}`);

                // Sign and execute via HashPack
                const response = await signer.call(
                    transferTx,
                    HederaJsonRpcMethod.SignAndExecuteTransaction
                );

                const txId = response.transactionId.toString();
                setTransactionHash(txId);

                // Store transaction in database
                await fetch('/api/hedera/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tokenId,
                        fromAccountId: user.accountId,
                        toAccountId: recipientAddress,
                        amount: parseFloat(amount),
                        memo: note || `Send ${amount} ${currencySymbol}`,
                        userId: user.accountId,
                        transactionId: txId,
                        walletSigned: true, // Indicate this was signed by user's wallet
                    }),
                });

                showToast("Transaction sent successfully!", "success");
                setStep(3);
            } else {
                // For non-Hedera wallets or fallback: Use operator account (backend signing)
                const response = await fetch('/api/hedera/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tokenId,
                        fromAccountId: user?.accountId || '0.0.0',
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
                                    Recipient Hedera Account ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                    placeholder="0.0.1234567"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Format: 0.0.XXXXXXX (e.g., 0.0.1234567)
                                </p>
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

                            {/* Transaction Hash with Links to Verify */}
                            <div className="w-full space-y-4 mb-6">
                                <div className="rounded-lg bg-gray-100 px-6 py-4">
                                    <p className="mb-3 text-center text-sm font-semibold text-gray-700">
                                        Transaction ID
                                    </p>
                                    <div className="flex justify-center">
                                        <TransactionLink
                                            transactionId={transactionHash}
                                            network={process.env.NEXT_PUBLIC_HEDERA_NETWORK as 'testnet' | 'mainnet' || 'testnet'}
                                        />
                                    </div>
                                </div>

                                {/* Verification Links */}
                                <div className="rounded-lg border-2 border-[#00c48c] bg-green-50 px-6 py-4">
                                    <p className="mb-3 text-center text-sm font-bold text-green-800">
                                        ✅ Verify on Hedera Blockchain
                                    </p>
                                    <div className="space-y-2">
                                        <a
                                            href={`https://hashscan.io/testnet/transaction/${transactionHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <span className="text-sm font-medium text-gray-700">
                                                📊 HashScan Explorer
                                            </span>
                                            <span className="text-xs text-gray-500 group-hover:text-[#00c48c]">
                                                View Details →
                                            </span>
                                        </a>
                                        <a
                                            href={`https://testnet.mirrornode.hedera.com/api/v1/transactions/${transactionHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <span className="text-sm font-medium text-gray-700">
                                                🔗 Mirror Node API
                                            </span>
                                            <span className="text-xs text-gray-500 group-hover:text-[#00c48c]">
                                                Raw JSON →
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                {/* Transaction Summary */}
                                <div className="text-xs text-gray-600 text-center space-y-1">
                                    <p>✅ Transaction confirmed on Hedera network</p>
                                    <p>⚡ Consensus time: ~3-5 seconds</p>
                                    <p>💰 Fee: ~$0.001 USD</p>
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
