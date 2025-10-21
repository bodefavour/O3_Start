import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface WalletHeaderProps {
  onAddWallet: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  isMobileView?: boolean;
}

export const WalletHeader = ({
  onAddWallet,
  onToggleSidebar,
  isSidebarCollapsed,
  isMobileView,
}: WalletHeaderProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#c4d9e0] to-[#e5e7eb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {onToggleSidebar && isMobileView && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="rounded-lg border border-[#0b1f3a]/15 bg-white/70 text-[#0b1f3a] hover:bg-white sm:hidden"
              aria-label={isSidebarCollapsed ? "Open navigation" : "Close navigation"}
            >
              {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>
          )}
          <div>
            <h1 className="[font-family:'Inter',Helvetica] text-2xl font-bold text-[#0b1f3a] sm:text-[32px]">
              Wallets
            </h1>
            <p className="[font-family:'Inter',Helvetica] text-sm font-normal text-[#0b1f3a] sm:text-base">
              Manage your multi-currency wallets
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-start justify-end sm:flex-none">
          <Button
            onClick={onAddWallet}
            className="w-full rounded-lg bg-[#00c48c] px-5 py-2 text-sm font-semibold text-black hover:bg-[#00b37d] sm:w-auto sm:px-6 sm:py-3"
          >
            <span className="mr-2 text-xl">+</span>
            Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};
