'use client';

import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionDetailsModalProps {
    transactionId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

interface TransactionDetails {
    transactionId: string;
    consensusTimestamp: string;
    transactionHash: string;
    result: string;
    name: string;
    memo: string | null;
    chargedTxFee: string;
    maxFee: string;
    validStart: string;
    validDuration: string;
    nodeAccount: string;
    hbarTransfers: Array<{ account: string; amount: string }>;
    tokenTransfers: Array<{
        tokenId: string;
        symbol: string;
        name: string;
        decimals: number;
        amount: string;
    }>;
    explorerUrl: string;
    mirrorNodeUrl: string;
}

export function TransactionDetailsModal({
    transactionId,
    isOpen,
    onClose,
}: TransactionDetailsModalProps) {
    const [details, setDetails] = useState<TransactionDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState(false);

    useEffect(() => {
        if (isOpen && transactionId) {
            fetchTransactionDetails();
        } else {
            setDetails(null);
            setError(null);
        }
    }, [isOpen, transactionId]);

    const fetchTransactionDetails = async () => {
        if (!transactionId) return;

        setLoading(true);
        setError(null);

        try {
            // URL encode the transaction ID to handle @ and . characters
            const encodedId = encodeURIComponent(transactionId);
            console.log('🔍 Fetching transaction:', { transactionId, encodedId });

            const response = await fetch(`/api/hedera/transaction/${encodedId}`);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to fetch transaction details');
            }

            setDetails(data.data);
        } catch (err: any) {
            console.error('Transaction details error:', err);
            setError(err.message || 'Failed to load transaction details');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(parseFloat(timestamp) * 1000);
        return date.toLocaleString();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Transaction Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
                            {error}
                        </div>
                    )}

                    {details && !loading && (
                        <div className="space-y-6">
                            {/* Transaction ID */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Transaction ID
                                </label>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-900 dark:text-gray-100 font-mono break-all">
                                        {details.transactionId}
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(details.transactionId)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                        title="Copy transaction ID"
                                    >
                                        {copiedId ? (
                                            <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Status
                                    </label>
                                    <p className="mt-1 text-sm">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${details.result === 'SUCCESS'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {details.result}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Type
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        {details.name || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Consensus Timestamp
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {formatTimestamp(details.consensusTimestamp)}
                                </p>
                            </div>

                            {/* Fee */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Transaction Fee
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {details.chargedTxFee} ℏ
                                </p>
                            </div>

                            {/* Memo */}
                            {details.memo && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Memo
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                                        {details.memo}
                                    </p>
                                </div>
                            )}

                            {/* Token Transfers */}
                            {details.tokenTransfers.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                                        Token Transfers
                                    </label>
                                    <div className="space-y-2">
                                        {details.tokenTransfers.map((transfer, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {transfer.symbol || transfer.name}
                                                    </span>
                                                    <span className="text-gray-900 dark:text-gray-100 font-mono">
                                                        {transfer.amount}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Token ID: {transfer.tokenId}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* HBAR Transfers */}
                            {details.hbarTransfers.length > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                                        HBAR Transfers ({details.hbarTransfers.length})
                                    </label>
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        {details.hbarTransfers.map((transfer, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm flex items-center justify-between"
                                            >
                                                <span className="font-mono text-gray-600 dark:text-gray-400 text-xs">
                                                    {transfer.account}
                                                </span>
                                                <span className={`font-mono ${parseFloat(transfer.amount) >= 0
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {transfer.amount} ℏ
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* External Links */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                                <a
                                    href={details.explorerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View on HashScan Explorer
                                </a>
                                <a
                                    href={details.mirrorNodeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View on Mirror Node API
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                    <Button
                        onClick={onClose}
                        className="w-full"
                        variant="outline"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
