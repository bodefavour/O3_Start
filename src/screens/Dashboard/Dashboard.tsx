import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { BalanceCards } from "./components/BalanceCards";
import { QuickActions } from "./components/QuickActions";
import { TransactionAnalytics } from "./components/TransactionAnalytics";
import { RecentTransactions } from "./components/RecentTransactions";
import { SendMoneyModal } from "../Wallet/components/SendMoneyModal";
import { ReceiveMoneyModal } from "../Wallet/components/ReceiveMoneyModal.tsx";
import { useResponsiveSidebar } from "../../hooks/useResponsiveSidebar";

export const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const {
    isSidebarCollapsed,
    isMobileView,
    toggleSidebar,
    closeSidebar,
  } = useResponsiveSidebar();

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
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeMenuItem}
        onNavigate={handleNavigation}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {!isSidebarCollapsed && isMobileView && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm sm:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-auto">
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          isMobileView={isMobileView}
        />

        {/* Dashboard Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Balance Cards */}
          <BalanceCards />

          {/* Quick Actions */}
          <QuickActions
            onSendMoney={handleSendMoney}
            onReceiveMoney={handleReceiveMoney}
            onCreateInvoice={() => console.log("Create invoice")}
          />

          {/* Two Column Layout */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
