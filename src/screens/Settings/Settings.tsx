import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "../Dashboard/components/Sidebar";
import { Button } from "../../components/ui/button";
import { ProfileSection } from "./components/ProfileSection";
import { BusinessSection } from "./components/BusinessSection";
import { SecuritySection } from "./components/SecuritySection";
import { NotificationsSection } from "./components/NotificationsSection";
import { ApiIntegrationSection } from "./components/ApiIntegrationSection";
import { PlaceholderSection } from "./components/PlaceholderSection";
import { useResponsiveSidebar } from "../../hooks/useResponsiveSidebar";

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
    const {
        isSidebarCollapsed,
        isMobileView,
        toggleSidebar,
        closeSidebar,
    } = useResponsiveSidebar();

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
        if (isMobileView) {
            closeSidebar();
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f5f5f5]">
            <Sidebar
                activeItem={activeMenuItem}
                onNavigate={handleNavigate}
                collapsed={isSidebarCollapsed}
                onToggleCollapse={toggleSidebar}
            />

            {!isSidebarCollapsed && isMobileView && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm sm:hidden"
                    onClick={closeSidebar}
                />
            )}
            <div className="flex-1 overflow-y-auto">
                <header className="flex items-start gap-3 border-b border-[#e5e7eb] bg-white px-4 py-6 sm:px-8">
                    {toggleSidebar && isMobileView && (
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

                <main className="flex flex-col gap-8 px-8 py-8 lg:flex-row">
                    <aside className="w-full max-w-xs rounded-2xl border border-[#d1d5db] bg-white p-6">
                        <nav className="flex flex-col gap-3">
                            {sections.map((section) => (
                                <Button
                                    key={section.id}
                                    variant={activeSection === section.id ? "default" : "outline"}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`justify-start rounded-xl px-4 py-2 text-sm font-semibold transition ${activeSection === section.id
                                        ? "bg-[#00c48c] text-[#0b1f3a] hover:bg-[#00b37d]"
                                        : "border-[#d1d5db] bg-white text-[#0b1f3a] hover:bg-gray-50"
                                        }`}
                                >
                                    {section.label}
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <section className="flex-1">
                        {activeSection === "profile" && <ProfileSection />}
                        {activeSection === "business" && <BusinessSection />}
                        {activeSection === "security" && <SecuritySection />}
                        {activeSection === "notifications" && <NotificationsSection />}
                        {activeSection === "integrations" && <ApiIntegrationSection />}
                        {!["profile", "business", "security", "notifications", "integrations"].includes(activeSection) && (
                            <PlaceholderSection
                                label={sections.find((section) => section.id === activeSection)?.label ?? ""}
                            />
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};
