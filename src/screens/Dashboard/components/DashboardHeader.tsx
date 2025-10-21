import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  isMobileView?: boolean;
}

export const DashboardHeader = ({
  onToggleSidebar,
  isSidebarCollapsed,
  isMobileView,
}: DashboardHeaderProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#c4d9e0] to-[#e5e7eb] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-start gap-3">
        {onToggleSidebar && isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="rounded-lg border border-[#0b1f3a]/15 bg-white/70 text-[#0b1f3a] hover:bg-white sm:hidden"
            aria-label={isSidebarCollapsed ? "Open navigation" : "Close navigation"}
          >
            {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        )}
        <div>
          <h1 className="[font-family:'Inter',Helvetica] text-2xl font-bold text-[#0b1f3a] sm:text-[32px]">
            Dashboard
          </h1>
          <p className="[font-family:'Inter',Helvetica] text-sm font-normal text-[#0b1f3a] sm:text-base">
            Welcome back to BorderlessPay
          </p>
        </div>
      </div>
    </div>
  );
};
