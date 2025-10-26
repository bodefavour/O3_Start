"use client";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { createContext, useContext, useMemo } from "react";

import type { AuthContext } from "@/lib/types";

const AuthContext = createContext<AuthContext | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const activeAccount = useActiveAccount();
    const activeWallet = useActiveWallet();

    // Check if connected via thirdweb (in-app wallet)
    const isThirdwebConnected = !!activeAccount?.address && !!activeWallet?.id;
    const isAuthenticated = isThirdwebConnected;
    const address = activeAccount?.address as
        | `0x${string}`
        | undefined;

    const authValue = useMemo<AuthContext>(
        () => ({
            isAuthenticated,
            address,
        }),
        [isAuthenticated, address],
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
