import { Card, CardContent } from "../../../components/ui/card";

export const PortfolioSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Total Portfolio Value Card */}
      <Card className="w-full rounded-xl border-none bg-[#0b1f3a]">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-white/80 text-sm mb-2">
                Total Portfolio Value
              </p>
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[normal]">
                $121,610
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-white/60 text-xs mt-1">
                Across all currencies
              </p>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">$</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Wallets Card */}
      <Card className="w-full rounded-xl border border-[#e5e7eb] bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/80 text-sm mb-2">
                Active Wallets
              </p>
              <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#0b1f3a] text-[32px] tracking-[0] leading-[normal]">
                7
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-xs mt-1">
                3 Stablecoins · 4 Local
              </p>
            </div>
            <div className="w-8 h-8 bg-[#00c48c]/10 rounded-lg flex items-center justify-center">
              <span className="text-[#00c48c] text-lg">💳</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
