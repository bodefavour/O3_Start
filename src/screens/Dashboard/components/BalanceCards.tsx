import { Card, CardContent } from "../../../components/ui/card";

export const BalanceCards = () => {
  return (
    <div className="flex gap-4">
      {/* Total Balance Card */}
      <Card className="flex-1 bg-[#0b1f3a] border-none rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-white/80 text-sm mb-2">
                Total Balance
              </p>
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
                $67,980.76
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-white/60 text-xs mt-1">
                Across all wallets
              </p>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">$</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Volume Card */}
      <Card className="flex-1 bg-white border border-[#e5e7eb] rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/80 text-sm mb-2">
                Monthly Volume
              </p>
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#0b1f3a] text-[32px] tracking-[0] leading-[normal]">
                $186,450
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#00c48c] text-xs mt-1">
                +12% from last month
              </p>
            </div>
            <div className="w-8 h-8 bg-[#00c48c]/10 rounded-lg flex items-center justify-center">
              <span className="text-[#00c48c] text-lg">📈</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
