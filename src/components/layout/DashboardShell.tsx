import { ReactNode } from "react";
import { Sidebar } from "../../screens/Dashboard/components/Sidebar";
import { useResponsiveSidebar } from "../../hooks/useResponsiveSidebar";

interface HeaderControls {
    toggleSidebar: () => void;
    isSidebarCollapsed: boolean;
    isMobileView: boolean;
}

interface DashboardShellProps {
    activeItem: string;
    onNavigate: (item: string) => void;
    children: ReactNode;
    renderHeader?: (controls: HeaderControls) => ReactNode;
    backgroundClassName?: string;
}

export const DashboardShell = ({
    activeItem,
    onNavigate,
    children,
    renderHeader,
    backgroundClassName = "bg-[#f5f5f5]",
}: DashboardShellProps) => {
    const {
        isSidebarCollapsed,
        isMobileView,
        toggleSidebar,
        closeSidebar,
    } = useResponsiveSidebar();

    const handleNavigate = (item: string) => {
        onNavigate(item);
        if (isMobileView) {
            closeSidebar();
        }
    };

    return (
        <div className={`flex h-screen overflow-hidden ${backgroundClassName}`}>
            <Sidebar
                activeItem={activeItem}
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

            <div className="relative flex-1">
                <div className="flex h-full flex-col overflow-hidden">
                    {renderHeader && (
                        <div className="flex-shrink-0">
                            <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
                                {renderHeader({ toggleSidebar, isSidebarCollapsed, isMobileView })}
                            </div>
                        </div>
                    )}
                    <div className="flex-1 overflow-y-auto">
                        <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
