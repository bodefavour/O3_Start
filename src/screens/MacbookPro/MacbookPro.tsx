import { BusinessNeedsSection } from "./sections/BusinessNeedsSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainHeaderSection } from "./sections/MainHeaderSection";
import { MultiCurrencySupportSection } from "./sections/MultiCurrencySupportSection";

export const MacbookPro = (): JSX.Element => {
  return (
    <div className="flex w-full flex-col bg-white">
      <MainHeaderSection />

      <FeaturesSection />

      <section className="w-full bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-extrabold text-[#0b1f3a] sm:text-3xl md:text-4xl">
            Everything Your Business Needs
          </h2>
          <p className="text-sm font-semibold text-[#1f3a5c] sm:text-base md:text-lg">
            Powerful features designed for modern businesses operating across borders.
          </p>
        </div>
      </section>

      <HeaderSection />

      <section className="flex w-full flex-col items-center px-4 pb-10 sm:pb-12">
        <h2 className="mb-4 text-2xl font-extrabold text-[#0b1f3a] sm:mb-6 sm:text-3xl md:text-4xl">
          Multi-Currency Support
        </h2>
      </section>

      <BusinessNeedsSection />

      <MultiCurrencySupportSection />
    </div>
  );
};
