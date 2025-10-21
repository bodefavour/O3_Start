import { ArrowUpRight, Download, Settings2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface QuickActionsSectionProps {
  onSendMoney: () => void;
  onReceiveMoney?: () => void;
  onOpenSettings?: () => void;
}

export const QuickActionsSection = ({
  onSendMoney,
  onReceiveMoney,
  onOpenSettings,
}: QuickActionsSectionProps) => {
  return (
    <div className="mt-8 mb-6">
      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-lg mb-4">
        Quick Actions
      </h3>
      <div className="flex gap-4">
        <Button
          onClick={onSendMoney}
          className="flex-1 h-[56px] bg-[#00c48c] hover:bg-[#00b37d] rounded-xl"
        >
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-[#0b1f3a]" />
            <span className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-base">
              Send Money
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onReceiveMoney}
          className="flex-1 h-[56px] bg-white hover:bg-gray-50 border-[#e5e7eb] rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#0b1f3a]" />
            <span className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-base">
              Receive
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onOpenSettings}
          className="flex-1 h-[56px] bg-white hover:bg-gray-50 border-[#e5e7eb] rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#0b1f3a]" />
            <span className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-base">
              Settings
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
