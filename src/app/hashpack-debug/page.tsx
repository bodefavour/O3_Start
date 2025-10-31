"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function HashPackDebugPage() {
  const [debug, setDebug] = useState<any>({});
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    const checkHashPack = () => {
      const info: any = {
        userAgent: navigator.userAgent,
        isMobile: /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent),
        windowHashpack: !!(window as any).hashpack,
        hashpackMethods: [],
      };

      if ((window as any).hashpack) {
        const hashpack = (window as any).hashpack;
        info.hashpackMethods = Object.keys(hashpack).filter(key => typeof hashpack[key] === 'function');
        info.hashpackProperties = Object.keys(hashpack).filter(key => typeof hashpack[key] !== 'function');
      }

      setDebug(info);
      addLog("HashPack debug info loaded");
    };

    checkHashPack();
  }, []);

  const testConnection = async () => {
    addLog("Testing HashPack connection...");
    
    if (!(window as any).hashpack) {
      addLog("❌ HashPack not detected");
      return;
    }

    const hashpack = (window as any).hashpack;
    addLog("✅ HashPack object found");

    // Try each method
    const methods = [
      'connectToExtension',
      'connect', 
      'getPairings',
      'requestPairing',
      'getAccountInfo',
    ];

    for (const method of methods) {
      if (typeof hashpack[method] === 'function') {
        addLog(`✅ Method available: ${method}`);
        try {
          addLog(`Calling ${method}...`);
          const result = await hashpack[method]();
          addLog(`✅ ${method} result: ${JSON.stringify(result)}`);
        } catch (error: any) {
          addLog(`⚠️ ${method} error: ${error.message}`);
        }
      } else {
        addLog(`❌ Method not available: ${method}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold">HashPack Debug Page</h1>
        
        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">Environment Info</h2>
          <div className="space-y-1 text-sm">
            <p><strong>Mobile:</strong> {debug.isMobile ? "Yes" : "No"}</p>
            <p><strong>User Agent:</strong> {debug.userAgent}</p>
            <p><strong>HashPack Detected:</strong> {debug.windowHashpack ? "Yes" : "No"}</p>
          </div>
        </div>

        {debug.windowHashpack && (
          <div className="mb-4 rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold">Available Methods</h2>
            <ul className="list-disc pl-5 text-sm">
              {debug.hashpackMethods?.map((method: string) => (
                <li key={method} className="text-green-600">{method}</li>
              ))}
            </ul>
            
            <h2 className="mt-4 mb-2 text-lg font-semibold">Available Properties</h2>
            <ul className="list-disc pl-5 text-sm">
              {debug.hashpackProperties?.map((prop: string) => (
                <li key={prop} className="text-blue-600">{prop}</li>
              ))}
            </ul>
          </div>
        )}

        <Button onClick={testConnection} className="mb-4 w-full">
          Test HashPack Connection
        </Button>

        <div className="rounded-lg bg-black p-4 text-white">
          <h2 className="mb-2 text-lg font-semibold">Console Logs</h2>
          <div className="h-96 overflow-y-auto font-mono text-xs">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-400">No logs yet...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
