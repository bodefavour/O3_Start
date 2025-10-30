'use client';

import { HashConnect, HashConnectConnectionState } from 'hashconnect';
import { AccountId, LedgerId } from '@hashgraph/sdk';

export interface HashConnectState {
    hashconnect: HashConnect | null;
    accountId: string | null;
    isConnected: boolean;
}

let hashconnectInstance: HashConnect | null = null;
let pairingData: any = null;

const appMetadata = {
    name: 'BorderlessPay',
    description: 'Borderless payments for African businesses',
    icons: [window.location.origin + '/icon.png'],
    url: window.location.origin,
};

/**
 * Initialize HashConnect and connect to HashPack wallet
 */
export async function initHashConnect(): Promise<HashConnectState> {
    try {
        // Create new HashConnect instance
        hashconnectInstance = new HashConnect(
            LedgerId.TESTNET,
            process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
            appMetadata,
            true
        );

        // Initialize
        await hashconnectInstance.init();

        // Try to connect to extension (HashPack)
        hashconnectInstance.pairingEvent.on((data) => {
            pairingData = data;
            console.log('HashPack paired:', data);
        });

        hashconnectInstance.connectionStatusChange.on((state) => {
            console.log('Connection state changed:', state);
        });

        // Connect to extension wallet (HashPack)
        await hashconnectInstance.connectToLocalWallet();

        // Wait a bit for pairing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const accountId = pairingData?.accountIds?.[0] || null;

        return {
            hashconnect: hashconnectInstance,
            accountId,
            isConnected: !!accountId,
        };
    } catch (error) {
        console.error('HashConnect initialization error:', error);
        return {
            hashconnect: null,
            accountId: null,
            isConnected: false,
        };
    }
}

/**
 * Get current HashConnect instance
 */
export function getHashConnect(): HashConnect | null {
    return hashconnectInstance;
}

/**
 * Get connected account ID
 */
export function getConnectedAccountId(): string | null {
    return pairingData?.accountIds?.[0] || null;
}

/**
 * Get pairing string for QR code (if needed)
 */
export function getPairingString(): string | null {
    return hashconnectInstance?.pairingString || null;
}

/**
 * Disconnect from HashPack wallet
 */
export async function disconnectHashPack(): Promise<void> {
    if (hashconnectInstance) {
        hashconnectInstance.disconnect(pairingData?.topic);
        hashconnectInstance = null;
        pairingData = null;
    }
}

/**
 * Check if HashPack wallet is installed
 */
export function isHashPackInstalled(): boolean {
    return !!(window as any).hashpack;
}

/**
 * Sign and send transaction using HashPack
 */
export async function sendTransaction(
    transaction: any,
    accountId: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
        if (!hashconnectInstance || !pairingData) {
            return { success: false, error: 'HashPack not connected' };
        }

        const result = await hashconnectInstance.sendTransaction(
            pairingData.topic,
            {
                topic: pairingData.topic,
                byteArray: transaction,
                metadata: {
                    accountToSign: accountId,
                    returnTransaction: false,
                },
            }
        );

        if (result.success) {
            return {
                success: true,
                transactionId: result.receipt?.transactionId?.toString(),
            };
        } else {
            return {
                success: false,
                error: result.error?.message || 'Transaction failed',
            };
        }
    } catch (error: any) {
        console.error('Transaction error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Request account info from HashPack
 */
export async function requestAccountInfo(): Promise<any> {
    if (!hashconnectInstance || !pairingData) {
        throw new Error('HashPack not connected');
    }

    const accountId = pairingData.accountIds[0];
    const accountInfo = await hashconnectInstance.getAccountInfo(
        pairingData.topic,
        accountId
    );

    return accountInfo;
}

/**
 * Check connection status
 */
export function isConnected(): boolean {
    return !!hashconnectInstance && !!pairingData;
}
