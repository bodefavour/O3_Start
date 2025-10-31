import { ExternalLink } from 'lucide-react';

interface TransactionLinkProps {
    transactionId: string;
    network?: 'testnet' | 'mainnet';
    className?: string;
    showIcon?: boolean;
}

/**
 * Format transaction ID for Mirror Node API
 * Converts: 0.0.4826582@1761924855.321040929
 * To: 0.0.4826582-1761924855-321040929
 */
function formatTransactionIdForMirrorNode(transactionId: string): string {
    return transactionId.replace('@', '-').replace(/\.(\d{9})$/, '-$1');
}

/**
 * Component to display Hedera transaction hash with link to HashScan explorer
 */
export function TransactionLink({
    transactionId,
    network = 'testnet',
    className = '',
    showIcon = true,
}: TransactionLinkProps) {
    const explorerUrl = `https://hashscan.io/${network}/transaction/${transactionId}`;
    const formattedTxId = formatTransactionIdForMirrorNode(transactionId);
    const mirrorNodeUrl = `https://${network}.mirrornode.hedera.com/api/v1/transactions/${formattedTxId}`;

    const shortTxId =
        transactionId.length > 20
            ? `${transactionId.substring(0, 10)}...${transactionId.substring(transactionId.length - 10)}`
            : transactionId;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {/* HashScan Explorer Link */}
            <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#00c48c] hover:text-[#00b37d] transition-colors font-mono text-sm"
            >
                <span>{shortTxId}</span>
                {showIcon && <ExternalLink className="h-4 w-4" />}
            </a>

            {/* Mirror Node Link (for advanced users) */}
            <div className="text-xs text-gray-500">
                <a
                    href={mirrorNodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-700 transition-colors"
                >
                    View on Mirror Node API
                </a>
            </div>
        </div>
    );
}

interface TransactionStatusBadgeProps {
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    network?: 'testnet' | 'mainnet';
}

/**
 * Badge showing transaction status with optional link
 */
export function TransactionStatusBadge({
    status,
    transactionId,
    network = 'testnet',
}: TransactionStatusBadgeProps) {
    const statusColors = {
        completed: 'bg-[#00c48c]/10 text-[#00c48c]',
        pending: 'bg-yellow-100 text-yellow-600',
        failed: 'bg-red-100 text-red-600',
    };

    return (
        <div className="flex items-center gap-2">
            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            {transactionId && status === 'completed' && (
                <a
                    href={`https://hashscan.io/${network}/transaction/${transactionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#00c48c] transition-colors"
                >
                    <ExternalLink className="h-4 w-4" />
                </a>
            )}
        </div>
    );
}
