import { Button } from "../../../components/ui/button";

interface WalletHeaderProps {
  onAddWallet: () => void;
}

export const WalletHeader = ({ onAddWallet }: WalletHeaderProps) => {
  return (
    <div className="w-full h-[124px] bg-gradient-to-r from-[#c4d9e0] to-[#e5e7eb] px-8 py-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-[#0b1f3a] text-[32px] tracking-[0] leading-[normal]">
            Wallets
          </h1>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a] text-base tracking-[0] leading-[normal]">
            Manage your multi-currency wallets
          </p>
        </div>
        <Button
          onClick={onAddWallet}
          className="bg-[#00c48c] hover:bg-[#00b37d] text-black font-semibold px-6 py-2 rounded-lg"
        >
          <span className="text-xl mr-2">+</span>
          Wallet
        </Button>
      </div>
    </div>
  );
};
