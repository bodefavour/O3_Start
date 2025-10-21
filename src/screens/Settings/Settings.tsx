import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { ProfileSection } from "./components/ProfileSection";
import { BusinessSection } from "./components/BusinessSection";
import { SecuritySection } from "./components/SecuritySection";
import { NotificationsSection } from "./components/NotificationsSection";
import { ApiIntegrationSection } from "./components/ApiIntegrationSection";
import { PlaceholderSection } from "./components/PlaceholderSection";

const sections = [
    { id: "profile", label: "Profile" },
    { id: "business", label: "Business" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "API & Integration" },
];

export const Settings = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("settings");
    const [activeSection, setActiveSection] = useState("profile");

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
    };

    const renderSection = () => {
        switch (activeSection) {
            case "profile":
                return <ProfileSection />;
            case "business":
                return <BusinessSection />;
            case "security":
                return <SecuritySection />;
            case "notifications":
                return <NotificationsSection />;
            case "integrations":
                return <ApiIntegrationSection />;
            default:
                return (
                    <PlaceholderSection
                        label={sections.find((section) => section.id === activeSection)?.label ?? ""}
                    />
                );
        }
    };

    return (
        <DashboardShell
            activeItem={activeMenuItem}
            onNavigate={handleNavigate}
            renderHeader={({ toggleSidebar, isSidebarCollapsed, isMobileView }) => (
                <header className="flex items-start gap-3 border-b border-[#e5e7eb] bg-white px-4 py-6 sm:px-8">
                    {isMobileView && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="rounded-lg border border-[#0b1f3a]/15 bg-white/70 text-[#0b1f3a] hover:bg-white sm:hidden"
                            aria-label={isSidebarCollapsed ? "Open navigation" : "Close navigation"}
                        >
                            {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
                        </Button>
                    )}
                    <div>
                        <h1 className="text-2xl font-semibold text-[#0b1f3a]">Settings</h1>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            Manage your account and preferences
                        </p>
                    </div>
                </header>
            )}
        >
            <main className="flex flex-col gap-6 px-4 py-6 sm:px-8 lg:flex-row lg:gap-10">
                <aside className="w-full max-w-xs rounded-2xl border border-[#d1d5db] bg-white p-4 sm:p-6">
                    <nav className="flex flex-col gap-2">
                        {sections.map((section) => (
                            <Button
                                key={section.id}
                                variant={activeSection === section.id ? "default" : "outline"}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full justify-start rounded-xl px-4 py-2 text-sm font-semibold transition ${activeSection === section.id
                                        ? "bg-[#00c48c] text-[#0b1f3a] hover:bg-[#00b37d]"
                                        : "border-[#d1d5db] bg-white text-[#0b1f3a] hover:bg-gray-50"
                                    }`}
                            >
                                {section.label}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <section className="flex-1 space-y-6">{renderSection()}</section>
            </main>
        </DashboardShell>
    );
};
