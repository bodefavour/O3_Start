import { ReactNode, useState } from "react";
import { Copy, CopyCheck, Settings2 } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

interface WalletCardProps {
  icon: ReactNode;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  address: string;
  type: "stablecoin" | "local";
  onSendMoney?: () => void;
  onReceiveMoney?: () => void;
  onOpenSettings?: () => void;
}

export const WalletCard = ({
  icon,
  name,
  symbol,
  balance,
  usdValue,
  address,
  type,
  onSendMoney,
  onReceiveMoney,
  onOpenSettings,
}: WalletCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00c48c]/10 rounded-full flex items-center justify-center">
              {icon}
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
            <p className="font-mono text-[#0b1f3a] text-xs truncate flex-1">
              {address}
            </p>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
              title="Copy address"
            >
              {copied ? (
                <CopyCheck className="w-4 h-4 text-[#00c48c]" />
              ) : (
                <Copy className="w-4 h-4 text-[#0b1f3a]" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onSendMoney}
            className="flex-1 min-w-[140px] rounded-lg bg-[#00c48c] py-2 font-semibold text-[#0b1f3a] hover:bg-[#00b37d]"
          >
            Send Money
          </Button>
          <Button
            variant="outline"
            onClick={onReceiveMoney}
            className="flex-1 min-w-[140px] rounded-lg border-[#e5e7eb] bg-white py-2 font-semibold text-[#0b1f3a] hover:bg-gray-50"
          >
            Receive
          </Button>
          <Button
            variant="outline"
            onClick={onOpenSettings}
            className="h-10 w-full rounded-lg border-[#e5e7eb] bg-white p-0 hover:bg-gray-50 sm:w-10"
          >
            <Settings2 className="w-4 h-4 text-[#0b1f3a]" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
