"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HashPackConnectProps {
    onConnect?: (accountId: string) => void;
    onDisconnect?: () => void;
}

export function HashPackConnect({ onConnect, onDisconnect }: HashPackConnectProps) {
    const [connected, setConnected] = useState(false);
    const [accountId, setAccountId] = useState<string>("");
    const [connecting, setConnecting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [debugLogs, setDebugLogs] = useState<string[]>([]);
    const [showDebug, setShowDebug] = useState(false);

    const addLog = (message: string) => {
        console.log(message);
        setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    // Check if running on mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(mobile);
            addLog(`Mobile detected: ${mobile}`);
            addLog(`User agent: ${navigator.userAgent.substring(0, 50)}...`);
        };
        checkMobile();
    }, []);

    // Check if HashPack is available (extension or mobile app)
    const isHashPackAvailable = () => {
        const available = typeof window !== "undefined" && !!(window as any).hashpack;
        if (available) {
            const hashpack = (window as any).hashpack;
            const methods = Object.keys(hashpack).filter(k => typeof hashpack[k] === 'function');
            addLog(`HashPack available! Methods: ${methods.join(', ')}`);
        } else {
            addLog("HashPack NOT available");
        }
        return available;
    };

    // Check existing connection on mount
    useEffect(() => {
        const checkConnection = async () => {
            if (!isHashPackAvailable()) {
                // If in mobile and no hashpack object, try to auto-connect after short delay
                if (isMobile) {
                    setTimeout(() => {
                        if (isHashPackAvailable()) {
                            attemptConnection();
                        }
                    }, 1000);
                }
                return;
            }

            try {
                const hashpack = (window as any).hashpack;
                console.log("Checking existing HashPack connection...");

                let data;

                // Try to get existing account info
                if (typeof hashpack.getAccountInfo === 'function') {
                    data = await hashpack.getAccountInfo();
                } else if (typeof hashpack.getPairings === 'function') {
                    const pairings = await hashpack.getPairings();
                    if (pairings && pairings.length > 0) {
                        data = { accountId: pairings[0].accountIds[0] };
                    }
                }

                if (data?.accountId) {
                    console.log("Found existing connection:", data.accountId);
                    setAccountId(data.accountId);
                    setConnected(true);
                    onConnect?.(data.accountId);
                } else if (data?.accountIds && data.accountIds.length > 0) {
                    const account = data.accountIds[0];
                    console.log("Found existing connection:", account);
                    setAccountId(account);
                    setConnected(true);
                    onConnect?.(account);
                } else {
                    console.log("No existing HashPack connection found");
                }
            } catch (error) {
                console.log("No existing HashPack connection:", error);
            }
        };

        checkConnection();
    }, [onConnect, isMobile]);

    const handleConnect = async () => {
        await attemptConnection();
    };

    const attemptConnection = async () => {
        addLog("=== Starting connection attempt ===");
        
        if (!isHashPackAvailable()) {
            addLog("ERROR: HashPack not available");
            if (isMobile) {
                toast.error("Please open this app from within the HashPack mobile app's browser.");
            } else {
                toast.error("HashPack extension not detected. Please install HashPack.");
            }
            setShowDebug(true);
            return;
        }

        setConnecting(true);

        try {
            const hashpack = (window as any).hashpack;
            addLog("HashPack object found");

            // Try different connection methods based on what's available
            let data;

            // Method 1: Try connectToExtension (browser extension)
            if (typeof hashpack.connectToExtension === 'function') {
                addLog("Trying connectToExtension...");
                data = await hashpack.connectToExtension();
                addLog(`connectToExtension result: ${JSON.stringify(data)}`);
            }
            // Method 2: Try pairings (mobile app)
            else if (typeof hashpack.getPairings === 'function') {
                addLog("Trying getPairings...");
                const pairings = await hashpack.getPairings();
                addLog(`Pairings: ${JSON.stringify(pairings)}`);
                if (pairings && pairings.length > 0) {
                    data = { accountId: pairings[0].accountIds[0] };
                } else {
                    addLog("No pairings found, requesting new pairing...");
                    data = await hashpack.requestPairing();
                    addLog(`requestPairing result: ${JSON.stringify(data)}`);
                }
            }
            // Method 3: Try direct connection request
            else if (typeof hashpack.connect === 'function') {
                addLog("Trying connect...");
                data = await hashpack.connect();
                addLog(`connect result: ${JSON.stringify(data)}`);
            }
            // Method 4: Try getAccountInfo (already connected)
            else if (typeof hashpack.getAccountInfo === 'function') {
                addLog("Trying getAccountInfo...");
                data = await hashpack.getAccountInfo();
                addLog(`getAccountInfo result: ${JSON.stringify(data)}`);
            }

            if (data?.accountId) {
                addLog(`SUCCESS! Connected: ${data.accountId}`);
                setAccountId(data.accountId);
                setConnected(true);
                toast.success(`Connected to HashPack: ${data.accountId}`);
                onConnect?.(data.accountId);
            } else if (data?.accountIds && data.accountIds.length > 0) {
                const account = data.accountIds[0];
                addLog(`SUCCESS! Connected: ${account}`);
                setAccountId(account);
                setConnected(true);
                toast.success(`Connected to HashPack: ${account}`);
                onConnect?.(account);
            } else {
                addLog("ERROR: No account information in response");
                throw new Error("Failed to get account information from HashPack");
            }
        } catch (error: any) {
            addLog(`ERROR: ${error.message}`);
            console.error("HashPack connection error:", error);
            toast.error(error.message || "Failed to connect to HashPack");
            setShowDebug(true);
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = () => {
        setConnected(false);
        setAccountId("");
        toast.success("Disconnected from HashPack");
        onDisconnect?.();
    };

    // Show message if HashPack not available
    if (!isHashPackAvailable()) {
        if (isMobile) {
            return (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-blue-900">
                                Open in HashPack App
                            </h3>
                            <p className="mt-1 text-sm text-blue-700">
                                To use HashPack features, please open this website from within the HashPack mobile app's built-in browser.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-5 w-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-orange-900">
                            HashPack Extension Not Found
                        </h3>
                        <p className="mt-1 text-sm text-orange-700">
                            Install the HashPack browser extension to connect your Hedera wallet.
                        </p>
                        <Button
                            onClick={() => window.open("https://www.hashpack.app/", "_blank")}
                            className="mt-3 bg-orange-500 hover:bg-orange-600"
                            size="sm"
                        >
                            Get HashPack
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (connected) {
        return (
            <div className="rounded-lg border border-[#00c48c] bg-[#00c48c]/10 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#00c48c]" />
                            <p className="text-xs font-medium text-gray-600">Connected to HashPack</p>
                        </div>
                        <p className="mt-1 font-mono text-sm font-semibold text-[#0b1f3a]">
                            {accountId}
                        </p>
                    </div>
                    <Button
                        onClick={handleDisconnect}
                        variant="outline"
                        size="sm"
                        className="border-[#00c48c] text-[#00c48c] hover:bg-[#00c48c]/10"
                    >
                        Disconnect
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-300 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#5D4FF4" />
                    <path
                        d="M12 7L7 12L12 17M17 12H7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h3 className="text-sm font-semibold text-[#0b1f3a]">
                    Connect HashPack Wallet
                </h3>
            </div>
            <p className="mb-4 text-xs text-gray-600">
                {isMobile
                    ? "Tap below to connect your HashPack wallet."
                    : "Connect your Hedera wallet using HashPack."
                }
            </p>
            <Button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full bg-[#5D4FF4] hover:bg-[#4D3FE4]"
            >
                {connecting ? (
                    <>
                        <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Connecting...
                    </>
                ) : (
                    "Connect HashPack"
                )}
            </Button>
        </div>
    );
}
