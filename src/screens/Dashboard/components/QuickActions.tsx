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
      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-lg mb-4">
        Quick Actions
      </h3>
      <div className="flex gap-4">
        <Button
          className="flex-1 h-[56px] rounded-xl bg-[#00c48c] hover:bg-[#00b37d]"
          onClick={onSendMoney}
        >
          <span className="flex items-center gap-2 text-base font-semibold text-black [font-family:'Inter',Helvetica]">
            <ArrowUpRight className="h-5 w-5" />
            Send Money
          </span>
        </Button>

        <Button
          variant="outline"
          className="flex-1 h-[56px] rounded-xl border-[#e5e7eb] bg-white hover:bg-gray-50"
          onClick={onReceiveMoney}
        >
          <span className="flex items-center gap-2 text-base font-semibold text-[#0b1f3a] [font-family:'Inter',Helvetica]">
            <ArrowDownLeft className="h-5 w-5" />
            Receive
          </span>
        </Button>

        <Button
          variant="outline"
          className="flex-1 h-[56px] rounded-xl border-[#e5e7eb] bg-white hover:bg-gray-50"
          onClick={onCreateInvoice}
        >
          <span className="flex items-center gap-2 text-base font-semibold text-[#0b1f3a] [font-family:'Inter',Helvetica]">
            <FileText className="h-5 w-5" />
            Create Invoice
          </span>
        </Button>
      </div>
    </div>
  );
};
