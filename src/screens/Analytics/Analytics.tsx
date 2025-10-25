import { useState } from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { AnalyticsSummaryCards } from "./components/AnalyticsSummaryCards";
import { AnalyticsNavigation } from "./components/AnalyticsNavigation";
import { TopCountriesCard } from "./components/TopCountriesCard";
import { AnalyticsInsights } from "./components/AnalyticsInsights";

export const Analytics = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("analytics");
    const [activeTab, setActiveTab] = useState("overview");

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
    };

    return (
        <DashboardShell
            activeItem={activeMenuItem}
            onNavigate={handleNavigate}
            renderHeader={({ toggleSidebar, isSidebarCollapsed, isMobileView }) => (
                <AnalyticsHeader
                    isMobileView={isMobileView}
                    isSidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={toggleSidebar}
                />
            )}
        >
            <div className="space-y-6 py-6">
                <AnalyticsSummaryCards />
                <AnalyticsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                <TopCountriesCard className="max-w-xl" />
                <AnalyticsInsights />
            </div>
        </DashboardShell>
    );
};
