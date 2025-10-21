import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

interface WalletCardProps {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  address: string;
  type: "stablecoin" | "local";
}

export const WalletCard = ({
  icon,
  name,
  symbol,
  balance,
  usdValue,
  address,
  type,
}: WalletCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00c48c]/10 rounded-full flex items-center justify-center">
              <span className="text-xl">{icon}</span>
            </div>
            <div>
              <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-base">
                {name}
              </h3>
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-sm">
                {symbol}
              </p>
            </div>
          </div>
          <Badge className="bg-[#00c48c]/20 text-[#00c48c] hover:bg-[#00c48c]/30 px-3 py-1 [font-family:'Inter',Helvetica] font-medium text-xs">
            {type === "stablecoin" ? "Stablecoin" : "Local"}
          </Badge>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-xs mb-1">
            Balance
          </p>
          <p className="[font-family:'Inter',Helvetica] font-bold text-[#0b1f3a] text-2xl">
            {balance}
          </p>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-sm mt-1">
            ≈ {usdValue}
          </p>
        </div>

        {/* Wallet Address */}
        <div className="bg-[#f5f5f5] rounded-lg p-3 mb-4">
          <p className="[font-family:'Inter',Helvetica] font-medium text-[#0b1f3a]/60 text-xs mb-2">
            Wallet Address
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="[font-family:'Inter',Helvetica] font-mono text-[#0b1f3a] text-xs truncate flex-1">
              {address}
            </p>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors"
              title="Copy address"
            >
              <span className="text-sm">{copied ? "✓" : "📋"}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-[#00c48c] hover:bg-[#00b37d] text-black font-semibold py-2 rounded-lg">
            Send Money
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-white hover:bg-gray-50 border-[#e5e7eb] text-[#0b1f3a] font-semibold py-2 rounded-lg"
          >
            Receive
          </Button>
          <Button
            variant="outline"
            className="w-10 h-10 p-0 bg-white hover:bg-gray-50 border-[#e5e7eb] rounded-lg"
          >
            <span className="text-lg">⚙️</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
