import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const MainHeaderSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-white/40 bg-[#d6e4f2]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-[#00c48c]" />
          <span className="text-lg font-semibold text-[#0b1f3a]">
            BorderlessPay
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/register")}
            className="rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-[#0b1f3a] hover:bg-[#00b37d]"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border border-[#0b1f3a] px-4 py-2 text-sm font-semibold text-[#0b1f3a] hover:bg-[#0b1f3a]/5"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};
