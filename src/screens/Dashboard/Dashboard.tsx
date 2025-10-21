import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { BalanceCards } from "./components/BalanceCards";
import { QuickActions } from "./components/QuickActions";
import { TransactionAnalytics } from "./components/TransactionAnalytics";
import { RecentTransactions } from "./components/RecentTransactions";

export const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleNavigation = (item: string) => {
    setActiveMenuItem(item);
    // You can add navigation logic here later
    console.log(`Navigating to: ${item}`);
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
          <QuickActions />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Transaction Analytics */}
            <TransactionAnalytics />

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};
