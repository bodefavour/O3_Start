import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const MainHeaderSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-between px-[138px] py-5 bg-[#e879f9]">
      <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
        <div className="relative w-6 h-6 bg-[#00c48c] rounded" />

        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#0b1f3a] text-2xl tracking-[0] leading-[normal]">
          BorderlessPay
        </div>
      </div>

      <div className="gap-[17px] inline-flex items-center relative flex-[0_0_auto]">
        <Button
          onClick={() => navigate("/register")}
          className="h-auto inline-flex items-center justify-center gap-2 p-2.5 relative flex-[0_0_auto] bg-[#00c48c] hover:bg-[#00b37d] rounded-xl"
        >
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
            Get Started
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto justify-center gap-2.5 p-2.5 rounded-xl border border-solid border-[#00c48cbf] inline-flex items-center relative flex-[0_0_auto] bg-transparent hover:bg-[#00c48c]/10"
        >
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
            Sign In
          </div>
        </Button>
      </div>
    </header>
  );
};
