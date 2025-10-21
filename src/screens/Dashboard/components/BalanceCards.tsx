import { DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export const BalanceCards = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Total Balance Card */}
      <Card className="rounded-xl border-none bg-[#0b1f3a] sm:flex-1">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 [font-family:'Inter',Helvetica] text-xs font-normal text-white/80 sm:text-sm">
                Total Balance
              </p>
              <h2 className="[font-family:'Inter',Helvetica] text-2xl font-bold text-white sm:text-[32px]">
                $67,980.76
              </h2>
              <p className="mt-1 [font-family:'Inter',Helvetica] text-[11px] font-normal text-white/60 sm:text-xs">
                Across all wallets
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Volume Card */}
      <Card className="rounded-xl border border-[#e5e7eb] bg-white sm:flex-1">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 [font-family:'Inter',Helvetica] text-xs font-normal text-[#0b1f3a]/80 sm:text-sm">
                Monthly Volume
              </p>
              <h2 className="[font-family:'Inter',Helvetica] text-2xl font-bold text-[#0b1f3a] sm:text-[32px]">
                $186,450
              </h2>
              <p className="mt-1 [font-family:'Inter',Helvetica] text-[11px] font-normal text-[#00c48c] sm:text-xs">
                +12% from last month
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00c48c]/10">
              <TrendingUp className="h-5 w-5 text-[#00c48c]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
