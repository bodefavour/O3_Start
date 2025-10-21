import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { BalanceCards } from "./components/BalanceCards";
import { QuickActions } from "./components/QuickActions";
import { TransactionAnalytics } from "./components/TransactionAnalytics";
import { RecentTransactions } from "./components/RecentTransactions";
import { SendMoneyModal } from "../Wallet/components/SendMoneyModal";
import { ReceiveMoneyModal } from "../Wallet/components/ReceiveMoneyModal.tsx";

export const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);

  const handleNavigation = (item: string) => {
    setActiveMenuItem(item);
    // You can add navigation logic here later
    console.log(`Navigating to: ${item}`);
  };

  const handleSendMoney = () => {
    setIsSendModalOpen(true);
  };

  const handleReceiveMoney = () => {
    setIsReceiveModalOpen(true);
  };

  const handleCloseSendModal = () => {
    setIsSendModalOpen(false);
  };

  const handleCloseReceiveModal = () => {
    setIsReceiveModalOpen(false);
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

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <Sidebar activeItem={activeMenuItem} onNavigate={handleNavigation} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Balance Cards */}
          <BalanceCards />

          {/* Quick Actions */}
          <QuickActions
            onSendMoney={handleSendMoney}
            onReceiveMoney={handleReceiveMoney}
            onCreateInvoice={() => console.log("Create invoice")}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Transaction Analytics */}
            <TransactionAnalytics />

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>
        </div>
      </div>
      <SendMoneyModal
        isOpen={isSendModalOpen}
        onClose={handleCloseSendModal}
        onContinue={handleSendModalContinue}
      />
      <ReceiveMoneyModal
        isOpen={isReceiveModalOpen}
        onClose={handleCloseReceiveModal}
      />
    </div>
  );
};
