"use client";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { toast as sonnerToast } from "sonner";

import type { AuthContext } from "@/lib/types";

const AuthContext = createContext<AuthContext | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const activeAccount = useActiveAccount();
    const activeWallet = useActiveWallet();
    const [hederaAccount, setHederaAccount] = useState<string | null>(null);

    // Listen for Hedera wallet connections (from localStorage or custom event)
    useEffect(() => {
        // Check localStorage for Hedera account
        const storedAccount = localStorage.getItem('hedera_account_id');
        if (storedAccount) {
            setHederaAccount(storedAccount);
        }

        // Listen for custom Hedera connection events
        const handleHederaConnect = (event: CustomEvent) => {
            const accountId = event.detail?.accountId;
            if (accountId) {
                setHederaAccount(accountId);
                localStorage.setItem('hedera_account_id', accountId);
            }
        };

        const handleHederaDisconnect = () => {
            setHederaAccount(null);
            localStorage.removeItem('hedera_account_id');
        };

        window.addEventListener('hedera-connect' as any, handleHederaConnect);
        window.addEventListener('hedera-disconnect' as any, handleHederaDisconnect);

        return () => {
            window.removeEventListener('hedera-connect' as any, handleHederaConnect);
            window.removeEventListener('hedera-disconnect' as any, handleHederaDisconnect);
        };
    }, []);

    // Check if connected via thirdweb (in-app wallet)
    const isThirdwebConnected = !!activeAccount?.address && !!activeWallet?.id;
    
    // Check if connected via Hedera wallet
    const isHederaConnected = !!hederaAccount;
    
    // User is authenticated if connected via either method
    const isAuthenticated = isThirdwebConnected || isHederaConnected;
    
    // Use Hedera account if available, otherwise use Thirdweb address
    const address = (hederaAccount || activeAccount?.address) as string | undefined;

    const authValue = useMemo<AuthContext>(
        () => ({
            isAuthenticated,
            address,
            isHederaWallet: isHederaConnected,
        }),
        [isAuthenticated, address, isHederaConnected],
    );

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

// Compatibility exports for existing code
export function useUser() {
    const { address, isAuthenticated } = useAuthContext();
    return {
        user: address ? {
            accountId: address,
            businessName: "User",
            email: "",
        } : null,
        isAuthenticated,
        login: (accountId: string, businessName?: string, email?: string) => {
            console.log("Login called with:", { accountId, businessName, email });
            // Login is handled by thirdweb connection
        },
        logout: () => {
            console.log("Logout called");
            // Logout is handled by thirdweb disconnection
        },
    };
}

export function useToast() {
    return {
        showToast: (message: string, type: "success" | "error" | "info" = "info") => {
            switch (type) {
                case "success":
                    sonnerToast.success(message);
                    break;
                case "error":
                    sonnerToast.error(message);
                    break;
                case "info":
                    sonnerToast.info(message);
                    break;
            }
        },
    };
}
