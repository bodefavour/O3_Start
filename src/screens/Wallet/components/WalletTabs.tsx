import { Button } from "../../../components/ui/button";

type TabType = "stablecoins" | "local" | "history";

interface WalletTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const WalletTabs = ({ activeTab, onTabChange }: WalletTabsProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Button
        onClick={() => onTabChange("stablecoins")}
        className={`
          w-full px-6 py-2 rounded-lg [font-family:'Inter',Helvetica] font-medium text-sm sm:w-auto
          ${activeTab === "stablecoins"
            ? "bg-[#0b1f3a] text-white hover:bg-[#0b1f3a]/90"
            : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
          }
        `}
      >
        Stablecoins
      </Button>
      <Button
        onClick={() => onTabChange("local")}
        className={`
          w-full px-6 py-2 rounded-lg [font-family:'Inter',Helvetica] font-medium text-sm sm:w-auto
          ${activeTab === "local"
            ? "bg-[#0b1f3a] text-white hover:bg-[#0b1f3a]/90"
            : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
          }
        `}
      >
        Local Currencies
      </Button>
      <Button
        onClick={() => onTabChange("history")}
        className={`
          w-full px-6 py-2 rounded-lg [font-family:'Inter',Helvetica] font-medium text-sm sm:w-auto
          ${activeTab === "history"
            ? "bg-[#0b1f3a] text-white hover:bg-[#0b1f3a]/90"
            : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
          }
        `}
      >
        Transaction History
      </Button>
    </div>
  );
};
