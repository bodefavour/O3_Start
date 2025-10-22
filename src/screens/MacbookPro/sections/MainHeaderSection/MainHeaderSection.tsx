import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const MainHeaderSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-white/40 bg-[#d6e4f2]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:flex-nowrap sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-[#00c48c]" />
          <span className="text-base font-semibold text-[#0b1f3a] sm:text-lg">
            BorderlessPay
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <Button
            onClick={() => navigate("/register")}
            className="w-full rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-[#0b1f3a] hover:bg-[#00b37d] sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/signin")}
            className="w-full rounded-xl border border-[#0b1f3a] px-4 py-2 text-sm font-semibold text-[#0b1f3a] hover:bg-[#0b1f3a]/5 sm:w-auto"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};
