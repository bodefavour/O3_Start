import { Search } from "lucide-react";
import { cn } from "../../../lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "geographic", label: "Geographic" },
  { id: "currencies", label: "Currencies" },
];

type AnalyticsNavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export const AnalyticsNavigation = ({
  activeTab,
  onTabChange,
}: AnalyticsNavigationProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 rounded-full border border-[#d1d5db] bg-white p-1 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium text-[#4b5563] transition",
              activeTab === tab.id
                ? "bg-[#00c48c] text-[#0b1f3a] shadow"
                : "hover:bg-[#f3f4f6]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative w-full sm:max-w-xs">
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-full rounded-lg border border-[#d1d5db] bg-white pl-10 pr-3 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#b9f2df]"
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
      </div>
    </div>
  );
};
