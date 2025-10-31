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
import { QRCodeSVG } from 'qrcode.react';

interface HashPackConnectProps {
    onConnect?: (accountId: string) => void;
    onDisconnect?: () => void;
}

type WalletEnvironment =
    | 'detecting'
    | 'hashpack_in_app'
    | 'desktop_extension'
    | 'mobile_browser'
    | 'desktop_browser';

export function HashPackConnect({ onConnect, onDisconnect }: HashPackConnectProps) {
    const [connected, setConnected] = useState(false);
    const [accountId, setAccountId] = useState<string>("");
    const [connecting, setConnecting] = useState(false);
    const [debugLogs, setDebugLogs] = useState<string[]>([]);
    const [showDebug, setShowDebug] = useState(false);
    const [dAppConnector, setDAppConnector] = useState<DAppConnector | null>(null);
    const [lastWcUri, setLastWcUri] = useState<string | null>(null);
    const [walletEnv, setWalletEnv] = useState<WalletEnvironment>('detecting');
    const [showDesktopQr, setShowDesktopQr] = useState(false);

    const addLog = (message: string) => {
        console.log(message);
        setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const loadHashConnectModule = async () => {
        return import('@/lib/web3/hashconnect');
    };

    const hasHashPackExtension = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        return Boolean((window as any).hashpack);
    };

    // Detect runtime environment (desktop extension, mobile browser, etc.)
    useEffect(() => {
        const detectEnvironment = () => {
            if (typeof window === 'undefined') return;
            const ua = navigator.userAgent || '';
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
            const extensionDetected = hasHashPackExtension();
            const isHashPackBrowser = /HashPack/i.test(ua) || window.location.href.includes('hashpack://');

            if (isHashPackBrowser) {
                setWalletEnv('hashpack_in_app');
                addLog('Environment detected: HashPack in-app browser');
            } else if (extensionDetected && !isMobileDevice) {
                setWalletEnv('desktop_extension');
                addLog('Environment detected: Desktop with HashPack extension');
            } else if (isMobileDevice) {
                setWalletEnv('mobile_browser');
                addLog('Environment detected: Mobile browser');
            } else {
                setWalletEnv('desktop_browser');
                addLog('Environment detected: Desktop browser (no extension)');
            }
        };

        detectEnvironment();
    }, []);

    // Initialize DAppConnector
    useEffect(() => {
        const initDAppConnector = async () => {
            try {
                addLog("Initializing Hedera DAppConnector...");

                const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '43e334ab6f14b190d4fed10ec2d9dc0d';
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

                // Store connector globally for other components to use
                if (typeof window !== 'undefined') {
                    (window as any).hederaDAppConnector = connector;
                }

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
            addLog("Connecting to HashPack...");

            // Use connect() with deep link for all platforms
            await dAppConnector.connect((uri: string) => {
                addLog(`Received WalletConnect URI (length: ${uri.length})`);
                setLastWcUri(uri);

                if (walletEnv === 'hashpack_in_app') {
                    addLog('Running inside HashPack in-app browser - no redirect needed');
                    return;
                }

                if (walletEnv === 'desktop_browser') {
                    addLog('Desktop browser without extension - showing QR modal');
                    setShowDesktopQr(true);
                    return;
                }

                const hashpackDeepLink = `hashpack://wc?uri=${encodeURIComponent(uri)}`;
                addLog(`Launching HashPack: ${hashpackDeepLink.substring(0, 50)}...`);

                try {
                    window.location.href = hashpackDeepLink;
                } catch (e) {
                    addLog('Deep link failed, trying universal link...');
                    const universalLink = `https://hashpack.app/wc?uri=${encodeURIComponent(uri)}`;
                    window.open(universalLink, '_blank');
                }
            });

            // Wait for connection with polling
            addLog("Waiting for wallet approval...");
            await new Promise<void>((resolve, reject) => {
                let resolved = false;

                const handleConnectEvent = (event: any) => {
                    const account = event.detail?.accountId;
                    if (account && !resolved) {
                        resolved = true;
                        addLog(`✅ SUCCESS! Connected: ${account}`);
                        toast.success(`Connected: ${account}`);
                        clearInterval(pollInterval);
                        clearTimeout(timeout);
                        window.removeEventListener('hedera-connect', handleConnectEvent);
                        setShowDesktopQr(false);
                        resolve();
                    }
                };
                window.addEventListener('hedera-connect', handleConnectEvent);

                const pollInterval = setInterval(() => {
                    const sessions = dAppConnector.signers;
                    if (sessions && sessions.length > 0 && !resolved) {
                        const session = sessions[0];
                        const account = session.getAccountId()?.toString();
                        if (account) {
                            resolved = true;
                            addLog(`✅ SUCCESS! Connected via polling: ${account}`);
                            setAccountId(account);
                            setConnected(true);
                            window.dispatchEvent(new CustomEvent('hedera-connect', {
                                detail: { accountId: account }
                            }));
                            toast.success(`Connected: ${account}`);
                            onConnect?.(account);
                            clearInterval(pollInterval);
                            clearTimeout(timeout);
                            window.removeEventListener('hedera-connect', handleConnectEvent);
                            setShowDesktopQr(false);
                            resolve();
                        }
                    }
                }, 500);

                const timeout = setTimeout(() => {
                    if (!resolved) {
                        window.removeEventListener('hedera-connect', handleConnectEvent);
                        clearInterval(pollInterval);
                        reject(new Error('Connection timeout - please try again'));
                    }
                }, 60000);
            });

        } catch (error: any) {
            const msg = String(error?.message || error);
            addLog(`ERROR: ${msg}`);

            // Check if user just cancelled
            const sessions = dAppConnector.signers;
            if (!sessions || sessions.length === 0) {
                addLog("No session created - user may have cancelled or rejected");

                // Check for specific error messages
                if (msg.includes('No applicable accounts') || msg.includes('no accounts')) {
                    toast.error("No Hedera testnet account found in HashPack", {
                        description: "Please create or import a testnet account in HashPack first",
                        duration: 6000,
                    });
                } else if (msg.includes('rejected') || msg.includes('denied')) {
                    toast.info("Connection rejected in wallet");
                } else if (msg.includes('timeout')) {
                    toast.error("Connection timeout", {
                        description: "Please try again and approve the connection in HashPack within 60 seconds",
                    });
                } else {
                    toast.info("Connection cancelled");
                }
            } else {
                toast.error(msg || "Failed to connect", {
                    description: "Please check the debug logs for more details",
                });
            }
            setShowDebug(true);
        } finally {
            setConnecting(false);
        }
    };

    const handleHashConnectFlow = async () => {
        setConnecting(true);
        addLog('Starting HashConnect flow for desktop extension...');

        try {
            const { initHashConnect } = await loadHashConnectModule();
            const { isConnected, accountId: hashConnectAccount } = await initHashConnect();

            if (isConnected && hashConnectAccount) {
                addLog(`HashConnect paired successfully: ${hashConnectAccount}`);
                setAccountId(hashConnectAccount);
                setConnected(true);
                window.dispatchEvent(new CustomEvent('hedera-connect', {
                    detail: { accountId: hashConnectAccount },
                }));
                onConnect?.(hashConnectAccount);
                toast.success(`Connected: ${hashConnectAccount}`);
            } else {
                addLog('HashConnect pairing pending - open HashPack extension to approve');
                toast.info('Open HashPack extension and approve the connection');
                setShowDebug(true);
            }
        } catch (error: any) {
            addLog(`HashConnect error: ${error?.message || error}`);
            toast.error(error?.message || 'Failed to connect with HashPack extension');
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        if (walletEnv === 'desktop_extension') {
            try {
                const { disconnectHashPack } = await loadHashConnectModule();
                await disconnectHashPack();
            } catch (error) {
                addLog(`Failed to disconnect HashConnect: ${String(error)}`);
            }
        }

        if (dAppConnector) {
            await dAppConnector.disconnectAll();
        }
        setConnected(false);
        setAccountId("");
        setLastWcUri(null);
        setShowDesktopQr(false);
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
                    {walletEnv === 'desktop_extension'
                        ? 'HashPack extension detected. Click connect and approve in the extension popup.'
                        : walletEnv === 'hashpack_in_app'
                            ? 'HashPack in-app browser detected. Tap connect and approve inside HashPack.'
                            : walletEnv === 'desktop_browser'
                                ? 'No HashPack extension detected. Scan the QR code with HashPack mobile or open the desktop app.'
                                : 'Connect your Hedera wallet via WalletConnect. Works with HashPack, Kabila, Blade & more.'}
                </p>

                {/* Important notice for testnet */}
                <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
                    <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-amber-800">
                            <strong>Testnet Required:</strong> Make sure you have a Hedera testnet account in your wallet.
                        </p>
                    </div>
                </div>

                <Button
                    onClick={() => {
                        if (walletEnv === 'desktop_extension') {
                            void handleHashConnectFlow();
                        } else {
                            void handleConnect();
                        }
                    }}
                    disabled={connecting || (!dAppConnector && walletEnv !== 'desktop_extension')}
                    className="w-full bg-[#5D4FF4] hover:bg-[#4D3FE4] h-12 text-base font-semibold"
                >
                    {connecting ? (
                        <>
                            <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {walletEnv === 'desktop_extension' ? 'Waiting for HashPack…' : 'Connecting...'}
                        </>
                    ) : walletEnv === 'desktop_extension' ? (
                        'Connect HashPack Extension'
                    ) : !dAppConnector ? (
                        'Initializing...'
                    ) : (
                        'Connect Wallet'
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

            {showDesktopQr && lastWcUri && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                    <h4 className="mb-2 text-sm font-semibold text-[#0b1f3a]">Scan with HashPack</h4>
                    <div className="flex flex-col items-center gap-3">
                        <div className="rounded-lg border border-gray-100 bg-white p-3">
                            <QRCodeSVG value={lastWcUri} size={180} level="M" includeMargin={false} />
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            Open HashPack on your phone → Tap WalletConnect → Scan this QR to finish pairing.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                    try {
                                        const deepLink = `hashpack://wc?uri=${encodeURIComponent(lastWcUri)}`;
                                        window.location.href = deepLink;
                                    } catch (e) {
                                        addLog('Failed to open deep link from QR panel');
                                    }
                                }}
                            >
                                Open in HashPack
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                    try {
                                        navigator.clipboard.writeText(lastWcUri);
                                        toast.success('WalletConnect URI copied');
                                    } catch (err) {
                                        toast.error('Failed to copy WalletConnect link');
                                    }
                                }}
                            >
                                Copy Link
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                    setShowDesktopQr(false);
                                }}
                            >
                                Hide QR
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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
