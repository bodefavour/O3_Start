import { ArrowDownLeft, ArrowUpRight, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface QuickActionsProps {
  onSendMoney: () => void;
  onReceiveMoney: () => void;
  onCreateInvoice?: () => void;
}

export const QuickActions = ({
  onSendMoney,
  onReceiveMoney,
  onCreateInvoice,
}: QuickActionsProps) => {
  return (
    <div className="mt-6">
      <h3 className="mb-4 [font-family:'Inter',Helvetica] text-lg font-semibold text-[#0b1f3a]">
        Quick Actions
      </h3>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button
          className="flex h-[52px] flex-1 items-center justify-center rounded-xl bg-[#00c48c] hover:bg-[#00b37d] sm:h-[56px]"
          onClick={onSendMoney}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-black [font-family:'Inter',Helvetica] sm:text-base">
            <ArrowUpRight className="h-5 w-5" />
            Send Money
          </span>
        </Button>

        <Button
          variant="outline"
          className="flex h-[52px] flex-1 items-center justify-center rounded-xl border-[#e5e7eb] bg-white hover:bg-gray-50 sm:h-[56px]"
          onClick={onReceiveMoney}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[#0b1f3a] [font-family:'Inter',Helvetica] sm:text-base">
            <ArrowDownLeft className="h-5 w-5" />
            Receive
          </span>
        </Button>

        <Button
          variant="outline"
          className="flex h-[52px] flex-1 items-center justify-center rounded-xl border-[#e5e7eb] bg-white hover:bg-gray-50 sm:h-[56px]"
          onClick={onCreateInvoice}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-[#0b1f3a] [font-family:'Inter',Helvetica] sm:text-base">
            <FileText className="h-5 w-5" />
            Create Invoice
          </span>
        </Button>
      </div>
    </div>
  );
};
