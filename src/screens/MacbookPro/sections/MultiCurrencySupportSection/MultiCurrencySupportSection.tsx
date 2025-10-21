import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

export const MultiCurrencySupportSection = (): JSX.Element => {
  return (
    <section className="relative w-full flex flex-col items-center bg-[#0b1f3a] py-[50px]">
      <h2 className="h-auto w-full max-w-[595px] px-4 [font-family:'Inter',Helvetica] font-extrabold text-white text-5xl text-center tracking-[0] leading-[normal]">
        Ready to Transform Your <br />
        Business Banking?
      </h2>

      <p className="h-auto w-full max-w-[769px] px-4 mt-6 [font-family:'Inter',Helvetica] font-extrabold text-white text-2xl text-center tracking-[0] leading-[normal]">
        Join thousands of African SMEs already banking without borders
      </p>

      <Button className="h-auto mt-[75px] gap-3 px-2.5 py-[5px] bg-[#00c48c] hover:bg-[#00c48c]/90 rounded-lg">
        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm text-center tracking-[0] leading-[normal]">
          Open Your Account
        </span>
        <ArrowRightIcon className="w-6 h-6" />
      </Button>

      <Separator className="w-full mt-[191px] bg-white/20" />

      <footer className="h-auto w-full max-w-[541px] px-4 mt-[25px] [font-family:'Inter',Helvetica] font-normal text-white text-sm text-center tracking-[0] leading-[normal]">
        © 2025 BorderlessPay. Powered by blockchain technology. Bank beyond
        borders.
      </footer>
    </section>
  );
};
