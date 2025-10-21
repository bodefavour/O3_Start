import { useState } from "react";
import { Sidebar } from "../Dashboard/components/Sidebar";
import { WalletHeader } from "./components/WalletHeader";
import { PortfolioSummary } from "./components/PortfolioSummary";
import { WalletTabs } from "./components/WalletTabs";
import { WalletCard } from "./components/WalletCard";
import { QuickActionsSection } from "./components/QuickActionsSection";
import { SendMoneyModal } from "./components/SendMoneyModal";
import { ReceiveMoneyModal } from "./components/ReceiveMoneyModal.tsx";
import { SwapCurrenciesModal } from "./components/SwapCurrenciesModal";
import { TransactionHistory } from "./components/TransactionHistory";

type TabType = "stablecoins" | "local" | "history";

const stablecoinWallets = [
  {
    icon: "💵",
    name: "USD Coin",
    symbol: "USDC",
    balance: "25,000 USDC",
    usdValue: "$25,000.00 USD",
    address: "0x742a335c8633C0532925a3b844Bc9e7595f0bEb",
    type: "stablecoin" as const,
  },
  {
    icon: "💰",
    name: "Tether",
    symbol: "USDT",
    balance: "15,345 USDT",
    usdValue: "$15,345.00 USD",
    address: "0x8f3Cf7ad23Cd3CabD9735AF19802339236A",
    type: "stablecoin" as const,
  },
  {
    icon: "🏦",
    name: "HUSD Stablecoin",
    symbol: "HUSD",
    balance: "5,000 HUSD",
    usdValue: "$5,000.00 USD",
    address: "0x4Fab615d6465a2a52a3b844d7595330023f6A823C7C2",
    type: "stablecoin" as const,
  },
];

const localCurrencyWallets = [
  {
    icon: "🇳🇬",
    name: "Nigerian Naira",
    symbol: "NGN",
    balance: "45,250,000 NGN",
    usdValue: "$56,562.50 USD",
    address: "0x9f2Db821a4Dc5CbcD8836BG2934023g7B924D8D3",
    type: "local" as const,
  },
  {
    icon: "🇬🇭",
    name: "Ghanaian Cedi",
    symbol: "GHS",
    balance: "120,500 GHS",
    usdValue: "$10,041.67 USD",
    address: "0x1a3Ed932b5Ec6DbdE9937CG3045134h8C035E9E4",
    type: "local" as const,
  },
];

export const Wallet = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("wallet");
  const [activeTab, setActiveTab] = useState<TabType>("stablecoins");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  const handleNavigation = (item: string) => {
    setActiveMenuItem(item);
    console.log(`Navigating to: ${item}`);
  };

  const handleAddWallet = () => {
    console.log("Add new wallet");
    // Add wallet modal/flow here
  };

  const handleSendMoney = () => {
    setIsSendModalOpen(true);
  };

  const handleCloseSendMoney = () => {
    setIsSendModalOpen(false);
  };

  const handleReceiveMoney = () => {
    setIsReceiveModalOpen(true);
  };

  const handleCloseReceiveMoney = () => {
    setIsReceiveModalOpen(false);
  };

  const handleSwapCurrencies = () => {
    setIsSwapModalOpen(true);
  };

  const handleCloseSwapCurrencies = () => {
    setIsSwapModalOpen(false);
  };

  const handleSendModalContinue = (payload: {
    recipientAddress: string;
    amount: number;
    priority: "standard" | "fast";
    note: string;
    fee: number;
    feeLabel: string;
    total: number;
  }) => {
    console.log("Send money payload", payload);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <Sidebar activeItem={activeMenuItem} onNavigate={handleNavigation} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <WalletHeader onAddWallet={handleAddWallet} />

        {/* Wallet Content */}
        <div className="p-8">
          {/* Portfolio Summary */}
          <PortfolioSummary />

          {/* Tabs */}
          <WalletTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Wallet Cards Grid */}
          {activeTab === "stablecoins" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stablecoinWallets.map((wallet, index) => (
                <WalletCard key={index} {...wallet} />
              ))}
            </div>
          )}

          {activeTab === "local" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localCurrencyWallets.map((wallet, index) => (
                <WalletCard key={index} {...wallet} />
              ))}
            </div>
          )}

          {activeTab === "history" && <TransactionHistory />}

          {/* Quick Actions - Only show when not on history tab */}
          {activeTab !== "history" && (
            <QuickActionsSection
              onSendMoney={handleSendMoney}
              onReceiveMoney={handleReceiveMoney}
              onSwapCurrencies={handleSwapCurrencies}
            />
          )}

          {/* Transaction History - Show on Stablecoins and Local tabs */}
          {activeTab !== "history" && <TransactionHistory />}
        </div>
      </div>
      <SendMoneyModal
        isOpen={isSendModalOpen}
        onClose={handleCloseSendMoney}
        onContinue={handleSendModalContinue}
      />
      <ReceiveMoneyModal
        isOpen={isReceiveModalOpen}
        onClose={handleCloseReceiveMoney}
      />
      <SwapCurrenciesModal
        isOpen={isSwapModalOpen}
        onClose={handleCloseSwapCurrencies}
      />
    </div>
  );
};
