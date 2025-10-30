/**
 * Simple manual Hedera account input for hackathon demo
 * Users can enter their Hedera Account ID (0.0.xxxxx) manually
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts';

export function HederaAccountInput() {
  const [accountId, setAccountId] = useState('');
  const [connected, setConnected] = useState(false);
  const { showToast } = useToast();

  const handleConnect = () => {
    // Validate Hedera account ID format (0.0.xxxxx)
    const accountRegex = /^0\.0\.\d+$/;
    
    if (!accountRegex.test(accountId)) {
      showToast('Invalid Hedera Account ID. Format: 0.0.12345', 'error');
      return;
    }

    // Store in localStorage
    localStorage.setItem('hedera_account_id', accountId);
    setConnected(true);
    showToast(`Connected with account ${accountId}`, 'success');
  };

  const handleDisconnect = () => {
    localStorage.removeItem('hedera_account_id');
    setAccountId('');
    setConnected(false);
    showToast('Disconnected', 'success');
  };

  // Check if already connected on mount
  useState(() => {
    const stored = localStorage.getItem('hedera_account_id');
    if (stored) {
      setAccountId(stored);
      setConnected(true);
    }
  });

  if (connected) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-[#00c48c] bg-[#00c48c]/10 px-4 py-2">
        <div className="flex-1">
          <p className="text-xs text-gray-600">Connected Account</p>
          <p className="font-mono text-sm font-semibold text-[#0b1f3a]">{accountId}</p>
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <h3 className="mb-2 text-sm font-semibold text-[#0b1f3a]">
        Connect Hedera Account (Demo Mode)
      </h3>
      <p className="mb-3 text-xs text-gray-600">
        Enter your Hedera testnet account ID to demo transactions
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="0.0.12345"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-[#00c48c] focus:outline-none"
        />
        <Button
          onClick={handleConnect}
          className="bg-[#00c48c] hover:bg-[#00b37d]"
        >
          Connect
        </Button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Get testnet account from{' '}
        <a
          href="https://portal.hedera.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00c48c] hover:underline"
        >
          portal.hedera.com
        </a>
      </p>
    </div>
  );
}
