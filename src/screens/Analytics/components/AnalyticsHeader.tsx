import { Menu, X, ChevronDown, Download } from "lucide-react";
import { Button } from "../../../components/ui/button";

type AnalyticsHeaderProps = {
  isMobileView: boolean;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export const AnalyticsHeader = ({
  isMobileView,
  isSidebarCollapsed,
  onToggleSidebar,
}: AnalyticsHeaderProps) => {
  return (
    <header className="border-b border-[#e5e7eb] bg-white px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {isMobileView && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="rounded-lg border border-[#0b1f3a]/15 bg-white/70 text-[#0b1f3a] hover:bg-white"
              aria-label={isSidebarCollapsed ? "Open navigation" : "Close navigation"}
              type="button"
            >
              {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-[#0b1f3a]">Analytics</h1>
            <p className="mt-1 text-sm text-[#6b7280]">
              Insights into your financial operations
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="outline"
            className="h-10 justify-between gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-sm font-medium text-[#0b1f3a] hover:bg-gray-50"
            type="button"
          >
            All Status
            <ChevronDown className="h-4 w-4 text-[#6b7280]" />
          </Button>
          <Button
            className="h-10 gap-2 rounded-lg bg-[#00c48c] px-4 text-sm font-semibold text-white hover:bg-[#00b37d]"
            type="button"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
    </header>
  );
};
