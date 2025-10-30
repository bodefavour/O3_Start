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

const appMetadata = {
    name: 'BorderlessPay',
    description: 'Borderless payments for African businesses',
    icons: [typeof window !== 'undefined' ? window.location.origin + '/icon.png' : ''],
    url: typeof window !== 'undefined' ? window.location.origin : '',
};

/**
 * Initialize HashConnect and connect to HashPack wallet
 * Note: For hackathon demo, we'll use a simplified connection flow
 */
export async function initHashConnect(): Promise<HashConnectState> {
    try {
        // For demo purposes, we'll use the Thirdweb HashPack wallet integration
        // The actual HashConnect v3 requires WalletConnect v2 project ID
        // which is optional for this hackathon demo

        console.log('HashConnect: Using simplified demo mode');
        console.log('For production, get WalletConnect Project ID from: https://cloud.walletconnect.com');

        // Return demo state - in production you'd connect to actual HashPack
        return {
            hashconnect: null,
            accountId: null, // Users can manually enter their Hedera account ID
            isConnected: false,
        };

        /* 
        // Uncomment this for production with WalletConnect Project ID:
        
        hashconnectInstance = new HashConnect(
          LedgerId.TESTNET,
          process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
          appMetadata,
          true
        );
    
        await hashconnectInstance.init();
    
        hashconnectInstance.pairingEvent.on((data: any) => {
          pairingData = data;
          console.log('HashPack paired:', data);
        });
    
        hashconnectInstance.connectionStatusChangeEvent.on((state: any) => {
          console.log('Connection state changed:', state);
        });
    
        hashconnectInstance.openPairingModal();
    
        await new Promise((resolve) => setTimeout(resolve, 3000));
    
        const accountId = pairingData?.accountIds?.[0] || null;
    
        return {
          hashconnect: hashconnectInstance,
          accountId,
          isConnected: !!accountId,
        };
        */
    } catch (error) {
        console.error('HashConnect initialization error:', error);
        return {
            hashconnect: null,
            accountId: null,
            isConnected: false,
        };
    }
}/**
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
        hashconnectInstance.disconnect();
        hashconnectInstance = null;
        pairingData = null;
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
 * Note: This is a simplified version - actual implementation depends on HashConnect API
 */
export async function sendTransaction(
    transactionBytes: Uint8Array,
    accountId: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
        if (!hashconnectInstance || !pairingData) {
            return { success: false, error: 'HashPack not connected' };
        }

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

    // Note: getAccountInfo may not be available in all versions
    // Return pairing data as fallback
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