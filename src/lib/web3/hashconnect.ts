'use client';

import { HashConnect } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';

export interface HashConnectState {
    hashconnect: HashConnect | null;
    accountId: string | null;
    isConnected: boolean;
}

let hashconnectInstance: HashConnect | null = null;
let pairingData: any = null;
let isInitializing = false;

const appMetadata = {
    name: 'BorderlessPay',
    description: 'Borderless payments for African businesses',
    icons: [typeof window !== 'undefined' ? window.location.origin + '/icon.png' : ''],
    url: typeof window !== 'undefined' ? window.location.origin : '',
};

/**
 * Initialize HashConnect and connect to HashPack wallet
 */
export async function initHashConnect(): Promise<HashConnectState> {
    // Prevent multiple simultaneous initializations
    if (isInitializing) {
        console.log('HashConnect initialization already in progress...');
        return {
            hashconnect: hashconnectInstance,
            accountId: pairingData?.accountIds?.[0] || null,
            isConnected: !!hashconnectInstance && !!pairingData,
        };
    }

    // Return existing connection if already initialized
    if (hashconnectInstance && pairingData) {
        console.log('HashConnect already connected');
        return {
            hashconnect: hashconnectInstance,
            accountId: pairingData.accountIds[0],
            isConnected: true,
        };
    }

    isInitializing = true;

    try {
        const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

        if (!projectId) {
            console.warn('WalletConnect Project ID not configured');
            isInitializing = false;
            return {
                hashconnect: null,
                accountId: null,
                isConnected: false,
            };
        }

        // Create new HashConnect instance
        hashconnectInstance = new HashConnect(
            LedgerId.TESTNET,
            projectId,
            appMetadata,
            true
        );

        console.log('Initializing HashConnect...');
        await hashconnectInstance.init();

        // Listen for pairing events (use 'once' to prevent duplicate listeners)
        hashconnectInstance.pairingEvent.once((data: any) => {
            pairingData = data;
            console.log('HashPack paired successfully:', data.accountIds);
        });

        // Listen for connection status changes
        hashconnectInstance.connectionStatusChangeEvent.on((state: any) => {
            console.log('Connection state:', state);
        });

        // Request pairing (opens HashPack)
        console.log('Opening pairing modal...');
        hashconnectInstance.openPairingModal();

        // Wait for pairing with timeout
        await new Promise((resolve) => {
            const timeout = setTimeout(() => {
                console.log('Pairing timeout - user may need more time');
                resolve(undefined);
            }, 10000); // 10 second timeout

            if (hashconnectInstance) {
                hashconnectInstance.pairingEvent.once(() => {
                    clearTimeout(timeout);
                    resolve(undefined);
                });
            }
        });

        const accountId = pairingData?.accountIds?.[0] || null;

        if (accountId) {
            console.log('Connected to Hedera account:', accountId);
        } else {
            console.log('No account connected yet');
        }

        isInitializing = false;

        return {
            hashconnect: hashconnectInstance,
            accountId,
            isConnected: !!accountId,
        };
    } catch (error) {
        console.error('HashConnect initialization error:', error);
        isInitializing = false;

        // Clean up on error
        if (hashconnectInstance) {
            try {
                hashconnectInstance.disconnect();
            } catch (e) {
                // Ignore disconnect errors
            }
            hashconnectInstance = null;
        }

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
        try {
            console.log('Disconnecting HashPack...');
            hashconnectInstance.disconnect();
            hashconnectInstance = null;
            pairingData = null;
            isInitializing = false;
            console.log('HashPack disconnected successfully');
        } catch (error) {
            console.error('Disconnect error:', error);
        }
    }
}

/**
 * Check if HashPack wallet is installed
 */
export function isHashPackInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).hashpack;
}

/**
 * Sign and send transaction using HashPack
 */
export async function sendTransaction(
    transactionBytes: Uint8Array,
    accountId: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
        if (!hashconnectInstance || !pairingData) {
            return { success: false, error: 'HashPack not connected' };
        }

        console.log('Sending transaction to HashPack for signing...');

        // Send transaction through HashConnect
        const result = await hashconnectInstance.sendTransaction(
            pairingData.topic,
            {
                byteArray: transactionBytes,
                metadata: {
                    accountToSign: accountId,
                    returnTransaction: false,
                },
            } as any
        );

        console.log('Transaction result:', result);

        return {
            success: true,
            transactionId: (result as any)?.transactionId?.toString(),
        };
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

    return {
        accountId,
        network: 'testnet',
        pairingData,
    };
}

/**
 * Check connection status
 */
export function isConnected(): boolean {
    return !!hashconnectInstance && !!pairingData;
}
