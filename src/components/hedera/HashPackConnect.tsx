"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    HederaSessionEvent,
    HederaJsonRpcMethod,
    DAppConnector,
    HederaChainId,
} from '@hashgraph/hedera-wallet-connect';
import { LedgerId } from '@hashgraph/sdk';

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
    const [dAppConnector, setDAppConnector] = useState<DAppConnector | null>(null);
    const [lastWcUri, setLastWcUri] = useState<string | null>(null);

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
        };
        checkMobile();
    }, []);

    // Initialize DAppConnector
    useEffect(() => {
        const initDAppConnector = async () => {
            try {
                addLog("Initializing Hedera DAppConnector...");

                const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '08c4b07e3ad25f1a27c14a4e8cecb6f0';
                const obfuscated = projectId ? `${projectId.slice(0, 4)}…${projectId.slice(-4)}` : 'undefined';
                addLog(`Using WalletConnect Project ID: ${obfuscated}`);
                addLog(`Network: ${LedgerId.TESTNET.toString()} | Origin: ${window.location.origin}`);

                const metadata = {
                    name: 'BorderlessPay',
                    description: 'Global Payment Platform powered by Hedera',
                    url: window.location.origin,
                    icons: [String(`${window.location.origin}/favicon.svg`)],
                    // Redirect helps deep-linking on mobile wallets
                    redirect: {
                        universal: window.location.origin,
                    },
                };

                const connector = new DAppConnector(
                    metadata,
                    LedgerId.TESTNET,
                    projectId,
                    Object.values(HederaJsonRpcMethod),
                    [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
                    [HederaChainId.Testnet],
                );

                await connector.init({ logger: 'error' });

                // Wire session lifecycle listeners so in-app browser connects automatically
                connector.onSessionIframeCreated = (session) => {
                    try {
                        const acct = session?.namespaces?.hedera?.accounts?.[0]?.split(':')?.[2];
                        const fallbackSigner = connector.signers?.[0];
                        const account = acct || fallbackSigner?.getAccountId()?.toString();
                        if (account) {
                            addLog(`Iframe session created: ${account}`);
                            setAccountId(account);
                            setConnected(true);
                            window.dispatchEvent(new CustomEvent('hedera-connect', { detail: { accountId: account } }));
                            onConnect?.(account);
                        } else {
                            addLog('Iframe session created but no account parsed');
                        }
                    } catch (e: any) {
                        addLog(`Error handling iframe session: ${e?.message || e}`);
                    }
                };

                // Subscribe to session events
                const client = connector.walletConnectClient;
                client?.on('session_update', ({ topic }) => {
                    addLog(`session_update for topic ${topic}`);
                    const signer = connector.signers?.[0];
                    const acct = signer?.getAccountId()?.toString();
                    if (acct) {
                        setAccountId(acct);
                        setConnected(true);
                        window.dispatchEvent(new CustomEvent('hedera-connect', { detail: { accountId: acct } }));
                    }
                });
                client?.on('session_delete', ({ topic }) => {
                    addLog(`session_delete for topic ${topic}`);
                    setConnected(false);
                    setAccountId('');
                    window.dispatchEvent(new CustomEvent('hedera-disconnect'));
                });
                client?.on('session_event', (args) => {
                    addLog(`session_event: ${JSON.stringify(args?.params?.event || {})}`);
                });
                setDAppConnector(connector);
                addLog("✅ DAppConnector initialized successfully");

                // Check for existing sessions
                const sessions = connector.signers;
                if (sessions && sessions.length > 0) {
                    const session = sessions[0];
                    const account = session.getAccountId()?.toString();
                    if (account) {
                        addLog(`Found existing session: ${account}`);
                        setAccountId(account);
                        setConnected(true);
                        // Dispatch event for auth context
                        window.dispatchEvent(new CustomEvent('hedera-connect', {
                            detail: { accountId: account }
                        }));
                        onConnect?.(account);
                    }
                }
            } catch (error: any) {
                addLog(`ERROR initializing: ${error.message}`);
                console.error("DAppConnector init error:", error);
            }
        };

        initDAppConnector();
    }, [onConnect]);

    const handleConnect = async () => {
        addLog("=== Starting connection attempt ===");

        if (!dAppConnector) {
            addLog("ERROR: DAppConnector not initialized");
            toast.error("Wallet connector not initialized. Please refresh the page.");
            setShowDebug(true);
            return;
        }

        setConnecting(true);

        try {
            if (isMobile) {
                addLog("Mobile detected — using deep link connect flow...");
                // Use direct connect with deep-link callback for mobile
                const session = await dAppConnector.connect((uri: string) => {
                    addLog(`Launching wallet deep link (len=${uri?.length})`);
                    setLastWcUri(uri);
                    // Prefer HashPack native deep link first
                    const hashpackNative = `hashpack://wc?uri=${encodeURIComponent(uri)}`;
                    try {
                        window.location.href = hashpackNative;
                    } catch (e) {
                        addLog('hashpack:// redirect failed, trying wc: then universal');
                    }
                    // Fallback to wc: scheme
                    try {
                        setTimeout(() => {
                            window.location.href = uri;
                        }, 150);
                    } catch (e) {
                        addLog('wc: redirect failed');
                    }
                    // Final fallback to universal https link
                    const hashpackUniversal = `https://hashpack.app/wc?uri=${encodeURIComponent(uri)}`;
                    setTimeout(() => {
                        try {
                            window.open(hashpackUniversal, '_blank');
                        } catch (e) {
                            addLog('universal link open failed');
                        }
                    }, 300);
                });

                const signer = dAppConnector.signers?.[0];
                const account = signer?.getAccountId()?.toString();
                if (account) {
                    addLog(`✅ SUCCESS! Connected (mobile): ${account}`);
                    setAccountId(account);
                    setConnected(true);
                    window.dispatchEvent(new CustomEvent('hedera-connect', { detail: { accountId: account } }));
                    toast.success(`Connected to Hedera wallet: ${account}`);
                    onConnect?.(account);
                } else {
                    addLog("No account ID received from mobile wallet session");
                }
            } else {
                addLog("Opening wallet selection modal...");
                await dAppConnector.openModal();

                // Wait a bit for connection to establish
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Check for connection
                const sessions = dAppConnector.signers;
                if (sessions && sessions.length > 0) {
                    const session = sessions[0];
                    const account = session.getAccountId()?.toString();

                    if (account) {
                        addLog(`✅ SUCCESS! Connected: ${account}`);
                        setAccountId(account);
                        setConnected(true);
                        // Dispatch event for auth context
                        window.dispatchEvent(new CustomEvent('hedera-connect', {
                            detail: { accountId: account }
                        }));
                        toast.success(`Connected to Hedera wallet: ${account}`);
                        onConnect?.(account);
                    } else {
                        addLog("No account ID received from wallet");
                    }
                } else {
                    addLog("No session created - user may have cancelled");
                }
            }
        } catch (error: any) {
            const msg = String(error?.message || error);
            addLog(`ERROR: ${msg}`);
            console.error("Wallet connection error:", error);

            // Specific recovery for WalletConnect relay publish failures on mobile
            if (isMobile && /Failed to publish custom payload/i.test(msg)) {
                try {
                    addLog('Attempting quick retry after relay publish failure...');
                    await dAppConnector.disconnectAll().catch(() => { });
                    const session = await dAppConnector.connect((uri: string) => {
                        addLog(`Retry deep link (len=${uri?.length})`);
                        setLastWcUri(uri);
                        const hashpackNative = `hashpack://wc?uri=${encodeURIComponent(uri)}`;
                        try { window.location.href = hashpackNative; } catch { }
                        setTimeout(() => { try { window.location.href = uri; } catch { } }, 150);
                        setTimeout(() => { try { window.open(`https://hashpack.app/wc?uri=${encodeURIComponent(uri)}`, '_blank'); } catch { } }, 300);
                    });
                    const signer = dAppConnector.signers?.[0];
                    const account = signer?.getAccountId()?.toString();
                    if (account) {
                        addLog(`✅ SUCCESS! Connected after retry: ${account}`);
                        setAccountId(account);
                        setConnected(true);
                        window.dispatchEvent(new CustomEvent('hedera-connect', { detail: { accountId: account } }));
                        toast.success(`Connected to Hedera wallet: ${account}`);
                        onConnect?.(account);
                        return;
                    }
                } catch (e2: any) {
                    addLog(`Retry failed: ${e2?.message || e2}`);
                    // As a final fallback, open the modal (QR + wallet list)
                    try {
                        addLog('Opening WalletConnect modal as fallback...');
                        await dAppConnector.openModal();
                    } catch (e3: any) {
                        addLog(`Modal fallback also failed: ${e3?.message || e3}`);
                    }
                }
            }

            toast.error(msg || "Failed to connect wallet");
            setShowDebug(true);
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        if (dAppConnector) {
            await dAppConnector.disconnectAll();
        }
        setConnected(false);
        setAccountId("");
        // Dispatch disconnect event for auth context
        window.dispatchEvent(new CustomEvent('hedera-disconnect'));
        toast.success("Disconnected from wallet");
        onDisconnect?.();
    };

    if (connected) {
        return (
            <div className="space-y-3">
                <div className="rounded-lg border border-[#00c48c] bg-[#00c48c]/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#00c48c]" />
                                <p className="text-xs font-medium text-gray-600">Connected to Hedera</p>
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
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="rounded-lg border-2 border-[#5D4FF4] bg-white p-4 shadow-lg">
                <div className="mb-3 flex items-center gap-2">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#5D4FF4" />
                        <path
                            d="M12 7L7 12L12 17M17 12H7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div>
                        <h3 className="text-base font-bold text-[#0b1f3a]">
                            Hedera Wallet
                        </h3>
                        <p className="text-xs text-gray-500">HashPack, Kabila, Blade & more</p>
                    </div>
                </div>
                <p className="mb-4 text-xs text-gray-600">
                    {isMobile
                        ? "Connect your Hedera wallet via WalletConnect."
                        : "Connect using HashPack, Kabila, Blade, or any Hedera wallet."
                    }
                </p>
                <Button
                    onClick={handleConnect}
                    disabled={connecting || !dAppConnector}
                    className="w-full bg-[#5D4FF4] hover:bg-[#4D3FE4] h-12 text-base font-semibold"
                >
                    {connecting ? (
                        <>
                            <svg
                                className="mr-2 h-5 w-5 animate-spin"
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
                    ) : !dAppConnector ? (
                        "Initializing..."
                    ) : (
                        "Connect Hedera Wallet"
                    )}
                </Button>

                {/* Show debug toggle button */}
                <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline w-full text-center"
                >
                    {showDebug ? "Hide" : "Show"} Debug Info
                </button>
            </div>

            {/* Debug logs panel */}
            {showDebug && debugLogs.length > 0 && (
                <div className="rounded-lg bg-gray-900 p-3 text-white text-xs font-mono max-h-60 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Debug Logs:</span>
                        <button
                            onClick={() => setDebugLogs([])}
                            className="text-gray-400 hover:text-white text-xs"
                        >
                            Clear
                        </button>
                    </div>
                    {debugLogs.map((log, i) => (
                        <div key={i} className="mb-1 break-all">
                            {log}
                        </div>
                    ))}
                    {lastWcUri && (
                        <div className="mt-3 space-y-2">
                            <div className="text-gray-400">WalletConnect URI detected. If the app didn’t open, try one of these:</div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        try { navigator.clipboard.writeText(lastWcUri); toast.success('WC URI copied'); } catch { }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >Copy WC URI</button>
                                <button
                                    onClick={() => {
                                        try { window.location.href = `hashpack://wc?uri=${encodeURIComponent(lastWcUri)}`; } catch { }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >Open in HashPack (native)</button>
                                <button
                                    onClick={() => {
                                        try { window.location.href = lastWcUri; } catch { }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >Open wc: link</button>
                                <button
                                    onClick={() => {
                                        try { window.open(`https://hashpack.app/wc?uri=${encodeURIComponent(lastWcUri)}`, '_blank'); } catch { }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >Open universal link</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
