"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    DAppConnector,
    HederaChainId,
    HederaJsonRpcMethod,
    HederaSessionEvent,
    type ExtensionData,
} from "@hashgraph/hedera-wallet-connect";
import { LedgerId } from "@hashgraph/sdk";

interface HashPackConnectProps {
    onConnect?: (accountId: string) => void;
    onDisconnect?: () => void;
}

type WalletEnvironment =
    | "detecting"
    | "hashpack_in_app"
    | "desktop_extension"
    | "mobile_browser"
    | "desktop_browser";

const ENVIRONMENT_POLL_LIMIT = 12;
const ENVIRONMENT_POLL_INTERVAL = 500;

export function HashPackConnect({ onConnect, onDisconnect }: HashPackConnectProps) {
    const [connector, setConnector] = useState<DAppConnector | null>(null);
    const [connecting, setConnecting] = useState(false);
    const [connectedAccountId, setConnectedAccountId] = useState<string | null>(null);
    const [walletEnv, setWalletEnv] = useState<WalletEnvironment>("detecting");
    const [lastWcUri, setLastWcUri] = useState<string | null>(null);
    const [debugLogs, setDebugLogs] = useState<string[]>([]);
    const [showDebug, setShowDebug] = useState(false);
    const [hashpackExtension, setHashpackExtension] = useState<ExtensionData | null>(null);
    const [initError, setInitError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch by only rendering dynamic content after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onConnectRef = useRef(onConnect);
    const onDisconnectRef = useRef(onDisconnect);

    useEffect(() => {
        onConnectRef.current = onConnect;
    }, [onConnect]);

    useEffect(() => {
        onDisconnectRef.current = onDisconnect;
    }, [onDisconnect]);

    const projectId = useMemo(
        () => (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "").trim(),
        [],
    );

    const devBypassAccount = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }

        const overrideAccount = (process.env.NEXT_PUBLIC_DEV_BYPASS_ACCOUNT ?? "").trim();
        if (!overrideAccount) {
            return null;
        }

        if (process.env.NODE_ENV !== "development") {
            console.warn(
                "NEXT_PUBLIC_DEV_BYPASS_ACCOUNT is set but ignored outside development mode.",
            );
            return null;
        }

        return overrideAccount;
    }, []);

    const addLog = useCallback((message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[HashPackConnect] ${message}`);
        setDebugLogs((prev) => [...prev, `${timestamp}: ${message}`]);
    }, []);

    const updateConnectedAccount = useCallback(
        (account: string | null) => {
            setConnectedAccountId((prev) => {
                if (prev === account) {
                    return prev;
                }

                if (typeof window !== "undefined") {
                    if (account) {
                        localStorage.setItem("hedera_account_id", account);
                        window.dispatchEvent(
                            new CustomEvent("hedera-connect", { detail: { accountId: account } }),
                        );
                    } else {
                        localStorage.removeItem("hedera_account_id");
                        window.dispatchEvent(new CustomEvent("hedera-disconnect"));
                    }
                }

                if (account) {
                    onConnectRef.current?.(account);
                } else {
                    onDisconnectRef.current?.();
                }

                return account;
            });
        },
        [],
    );

    const syncSignerState = useCallback(
        (source: DAppConnector) => {
            const signer = source.signers[0];
            if (signer) {
                const account = signer.getAccountId().toString();
                addLog(`Active signer detected: ${account}`);
                updateConnectedAccount(account);
                setLastWcUri(null);
            } else {
                addLog("No active signer present");
                updateConnectedAccount(null);
            }
        },
        [addLog, updateConnectedAccount],
    );

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (devBypassAccount) {
            addLog(`Development bypass active. Pretending to connect as ${devBypassAccount}.`);
            updateConnectedAccount(devBypassAccount);
            setConnector(null);
            return;
        }

        if (!projectId) {
            addLog("WalletConnect project ID not configured");
            setInitError("WalletConnect Project ID is missing. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.");
            toast.error("WalletConnect Project ID is not configured");
            return;
        }

        let cancelled = false;
        let cleanupListeners: (() => void) | undefined;

        const initConnector = async () => {
            try {
                addLog("Creating Hedera DAppConnector instance");
                const origin = window.location.origin;

                const metadata = {
                    name: "BorderlessPay",
                    description: "Global Payment Platform powered by Hedera",
                    url: origin,
                    icons: [`${origin}/favicon.svg`],
                    redirect: {
                        universal: origin,
                    },
                };

                const instance = new DAppConnector(
                    metadata,
                    LedgerId.TESTNET,
                    projectId,
                    Object.values(HederaJsonRpcMethod),
                    [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
                    [HederaChainId.Testnet],
                    "error",
                );

                instance.onSessionIframeCreated = () => {
                    addLog("Session established inside HashPack iframe");
                    syncSignerState(instance);
                    toast.success("Connected via HashPack in-app browser");
                };

                await instance.init({ logger: "error" });
                if (cancelled) {
                    return;
                }

                addLog("DAppConnector initialised");
                setConnector(instance);
                syncSignerState(instance);

                const client = instance.walletConnectClient;
                if (client) {
                    const handleSessionUpdate = () => {
                        addLog("Session update received");
                        syncSignerState(instance);
                    };
                    const handleSessionDelete = () => {
                        addLog("Session deleted by wallet");
                        updateConnectedAccount(null);
                        setLastWcUri(null);
                        toast.info("Wallet disconnected");
                    };
                    const pairingEvents = client.core.pairing.events;

                    client.on("session_update", handleSessionUpdate);
                    client.on("session_delete", handleSessionDelete);
                    pairingEvents.on("pairing_delete", handleSessionDelete);

                    cleanupListeners = () => {
                        client.off("session_update", handleSessionUpdate);
                        client.off("session_delete", handleSessionDelete);
                        pairingEvents.off("pairing_delete", handleSessionDelete);
                    };
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                addLog(`Failed to initialise DAppConnector: ${message}`);
                setInitError(message);
                toast.error("Failed to initialise Hedera connector", { description: message });
            }
        };

        void initConnector();

        return () => {
            cancelled = true;
            cleanupListeners?.();
        };
    }, [projectId, addLog, syncSignerState, updateConnectedAccount]);

    useEffect(() => {
        if (!connector || typeof window === "undefined") {
            return;
        }

        let attempts = 0;
        let timer: number | undefined;

        const pollExtensions = () => {
            attempts += 1;
            const extensions = connector.extensions ?? [];

            const hashpack = extensions.find((ext) =>
                (ext.name ?? "").toLowerCase().includes("hashpack"),
            );

            setHashpackExtension((prev) => {
                if (hashpack) {
                    return prev?.id === hashpack.id ? prev : hashpack;
                }
                return prev ? null : prev;
            });

            const ua = navigator.userAgent || "";
            const isHashPackBrowser =
                /hashpack/i.test(ua) || hashpack?.availableInIframe === true;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

            if (isHashPackBrowser) {
                setWalletEnv("hashpack_in_app");
            } else if (hashpack && !hashpack.availableInIframe) {
                setWalletEnv("desktop_extension");
            } else if (isMobile) {
                setWalletEnv("mobile_browser");
            } else {
                setWalletEnv("desktop_browser");
            }

            if (hashpack || attempts >= ENVIRONMENT_POLL_LIMIT) {
                if (timer !== undefined) {
                    window.clearInterval(timer);
                }
            }
        };

        pollExtensions();
        timer = window.setInterval(pollExtensions, ENVIRONMENT_POLL_INTERVAL);

        return () => {
            if (timer !== undefined) {
                window.clearInterval(timer);
            }
        };
    }, [connector]);

    const handleConnect = useCallback(async () => {
        if (devBypassAccount) {
            addLog("Connect ignored because development bypass is active");
            return;
        }

        if (!connector) {
            addLog("Connect attempt before DAppConnector ready");
            toast.error("Wallet connector not ready yet");
            return;
        }

        if (initError) {
            toast.error("Cannot connect", { description: initError });
            return;
        }

        setConnecting(true);
        setShowDebug(false);
        addLog(`Starting connection flow (${walletEnv})`);

        try {
            if (
                walletEnv === "desktop_extension" &&
                hashpackExtension &&
                hashpackExtension.availableInIframe === false
            ) {
                addLog(`Connecting via HashPack extension (${hashpackExtension.id})`);
                try {
                    await connector.connectExtension(hashpackExtension.id);
                    syncSignerState(connector);
                    toast.success("HashPack extension connected");
                    return;
                } catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    addLog(`HashPack extension connect failed: ${message}`);
                    toast.warning("HashPack extension handshake failed", {
                        description: "Falling back to WalletConnect link flow.",
                    });
                }
            }

            const session = await connector.connect((uri) => {
                addLog(`WalletConnect URI received (${uri.length} chars)`);
                setLastWcUri(uri);

                if (walletEnv === "desktop_browser") {
                    const universal = `https://hashpack.app/wc?uri=${encodeURIComponent(uri)}`;
                    window.open(universal, "_blank");
                    addLog("Opened hashpack.app universal link for desktop browser");
                    toast.info("Approve the session in the HashPack tab that just opened");
                    return;
                }

                const deepLink = `hashpack://wc?uri=${encodeURIComponent(uri)}`;

                if (walletEnv === "hashpack_in_app") {
                    addLog("HashPack in-app browser flow detected");
                    return;
                }

                try {
                    window.location.href = deepLink;
                    addLog("Attempted hashpack:// deep link");
                } catch {
                    const universal = `https://hashpack.app/wc?uri=${encodeURIComponent(uri)}`;
                    window.open(universal, "_blank");
                    addLog("Fallback to universal link");
                }
            });

            addLog(`Session established (${session.topic})`);
            syncSignerState(connector);
            const account = connector.signers[0]?.getAccountId()?.toString();
            if (account) {
                toast.success(`Connected: ${account}`);
            } else {
                toast.success("Wallet connected");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            addLog(`Connection failed: ${message}`);

            if (/user rejected/i.test(message)) {
                toast.info("Connection rejected in wallet");
            } else if (/timeout/i.test(message)) {
                toast.error("Connection timed out", {
                    description: "Approve the request in your wallet within 5 minutes.",
                });
            } else if (/Extension is not available/i.test(message)) {
                toast.error("HashPack extension not detected");
            } else {
                toast.error("Failed to connect wallet", { description: message });
            }

            setShowDebug(true);
        } finally {
            setConnecting(false);
        }
    }, [connector, walletEnv, hashpackExtension, syncSignerState, addLog, initError]);

    const handleDisconnect = useCallback(async () => {
        if (devBypassAccount) {
            addLog("Disconnect ignored because development bypass is active");
            return;
        }

        if (!connector) {
            return;
        }

        setConnecting(true);
        addLog("Disconnecting wallet sessions");

        try {
            await connector.disconnectAll();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            addLog(`Disconnect error: ${message}`);
        } finally {
            setConnecting(false);
            updateConnectedAccount(null);
            setLastWcUri(null);
            toast.success("Disconnected from Hedera wallet");
        }
    }, [connector, addLog, updateConnectedAccount]);

    const isConnected = !!connectedAccountId;

    if (isConnected) {
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
                                {connectedAccountId}
                            </p>
                        </div>
                        <Button
                            onClick={() => void handleDisconnect()}
                            variant="outline"
                            size="sm"
                            disabled={connecting}
                            className="border-[#00c48c] text-[#00c48c] hover:bg-[#00c48c]/10"
                        >
                            {connecting ? "Disconnecting…" : "Disconnect"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const connectButtonLabel = (() => {
        if (devBypassAccount) {
            return "Connected (dev bypass)";
        }
        if (connecting) {
            return walletEnv === "desktop_extension" ? "Waiting for HashPack…" : "Connecting…";
        }
        if (initError) {
            return "Connector unavailable";
        }
        if (!connector) {
            return "Initializing…";
        }
        if (walletEnv === "desktop_extension") {
            return "Connect HashPack Extension";
        }
        return "Connect Wallet";
    })();

    const statusText = (() => {
        if (!isMounted) {
            return "Connect your Hedera wallet via WalletConnect.";
        }
        if (devBypassAccount) {
            return "Development bypass active. Real wallet connection is skipped.";
        }
        if (initError) {
            return initError;
        }
        switch (walletEnv) {
            case "desktop_extension":
                return "HashPack extension detected. Click connect and approve the request in the extension.";
            case "hashpack_in_app":
                return "HashPack in-app browser detected. Tap connect and approve the request in HashPack.";
            case "desktop_browser":
                return "No HashPack extension detected. We'll open hashpack.app in a new tab so you can approve the WalletConnect session.";
            case "mobile_browser":
                return "Use HashPack, Blade, Kabila, or any WalletConnect-compatible Hedera wallet on your device.";
            default:
                return "Connect your Hedera wallet via WalletConnect.";
        }
    })();

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
                        <h3 className="text-base font-bold text-[#0b1f3a]">Hedera Wallet</h3>
                        <p className="text-xs text-gray-500">HashPack, Kabila, Blade & more</p>
                    </div>
                </div>

                <p className="mb-4 text-xs text-gray-600">{statusText}</p>

                <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-start gap-2">
                        <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600"
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
                        <p className="text-xs text-amber-800">
                            <strong>Testnet Required:</strong> Make sure you have a Hedera testnet account in your wallet.
                        </p>
                    </div>
                </div>

                <Button
                    onClick={() => void handleConnect()}
                    disabled={connecting || (!!initError && !devBypassAccount) || (!connector && !devBypassAccount)}
                    className="h-12 w-full bg-[#5D4FF4] text-base font-semibold hover:bg-[#4D3FE4]"
                >
                    {connectButtonLabel}
                </Button>

                {!devBypassAccount && (
                    <button
                        onClick={() => setShowDebug((prev) => !prev)}
                        className="mt-2 w-full text-center text-xs text-gray-500 underline hover:text-gray-700"
                    >
                        {showDebug ? "Hide" : "Show"} Debug Info
                    </button>
                )}
            </div>

            {!devBypassAccount && showDebug && debugLogs.length > 0 && (
                <div className="max-h-60 overflow-y-auto rounded-lg bg-gray-900 p-3 text-xs font-mono text-white">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold">Debug Logs</span>
                        <button
                            onClick={() => setDebugLogs([])}
                            className="text-xs text-gray-400 hover:text-white"
                        >
                            Clear
                        </button>
                    </div>
                    {debugLogs.map((log, index) => (
                        <div key={index} className="mb-1 break-words">
                            {log}
                        </div>
                    ))}
                    {lastWcUri && (
                        <div className="mt-3 space-y-2">
                            <div className="text-gray-400">
                                WalletConnect URI captured. If the wallet did not open automatically, try one of these actions:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(lastWcUri)
                                            .then(() => toast.success("WalletConnect URI copied"))
                                            .catch(() => toast.error("Failed to copy link"));
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >
                                    Copy URI
                                </button>
                                <button
                                    onClick={() => {
                                        try {
                                            window.location.href = `hashpack://wc?uri=${encodeURIComponent(lastWcUri)}`;
                                        } catch {
                                            addLog("Deep link navigation failed");
                                        }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >
                                    Open hashpack://
                                </button>
                                <button
                                    onClick={() => {
                                        try {
                                            window.open(
                                                `https://hashpack.app/wc?uri=${encodeURIComponent(lastWcUri)}`,
                                                "_blank",
                                            );
                                        } catch {
                                            addLog("Universal link open failed");
                                        }
                                    }}
                                    className="rounded bg-gray-800 px-2 py-1 hover:bg-gray-700"
                                >
                                    Open hashpack.app
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
