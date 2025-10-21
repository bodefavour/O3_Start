import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

export const MultiCurrencySupportSection = (): JSX.Element => {
  return (
    <section className="relative flex w-full flex-col items-center bg-[#0b1f3a] px-4 py-14 sm:py-[50px]">
      <h2 className="w-full max-w-xl text-center text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
        Ready to Transform Your <span className="block sm:inline">Business Banking?</span>
      </h2>

      <p className="mt-4 w-full max-w-2xl text-center text-sm font-semibold text-white sm:mt-6 sm:text-base md:text-lg">
        Join thousands of African SMEs already banking without borders.
      </p>

      <Button className="mt-10 flex h-auto items-center gap-3 rounded-lg bg-[#00c48c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00c48c]/90 sm:mt-[75px]">
        Open Your Account
        <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <Separator className="mt-16 w-full bg-white/20 sm:mt-[191px]" />

      <footer className="mt-6 w-full max-w-xl text-center text-xs font-medium text-white sm:mt-[25px] sm:text-sm">
        © 2025 BorderlessPay. Powered by blockchain technology. Bank beyond borders.
      </footer>
    </section>
  );
};
