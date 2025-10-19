import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { BusinessNeedsSection } from "./sections/BusinessNeedsSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainHeaderSection } from "./sections/MainHeaderSection";
import { MultiCurrencySupportSection } from "./sections/MultiCurrencySupportSection";

const featureCards = [
  {
    icon: "/solar-global-outline.svg",
    title: "Global Reach",
    description:
      "Send money to 50+ countries instantly with stablecoins and local currencies",
  },
  {
    icon: "/material-symbols-shield-outline.svg",
    title: "Bank-Grade Security",
    description:
      "Blockchain-powered transactions with enterprise-level compliance and KYC",
  },
  {
    icon: "/mdi-thunder.svg",
    title: "Instant Transfers",
    description:
      "Sub-second transaction speeds powered by Hedera's distributed ledger",
  },
  {
    icon: "/iconoir-dollar.svg",
    title: "Low Fees",
    description:
      "Save up to 90% on traditional banking fees for international transfers",
  },
  {
    icon: "/ant-design-rise-outlined.svg",
    title: "Real-Time Analytics",
    description:
      "Track your business finances with powerful insights and reporting tools",
  },
  {
    icon: "/mingcute-time-line.svg",
    title: "24/7 Operations",
    description:
      "Process payments any time, any day - no banking hours restrictions",
  },
];

export const MacbookPro = (): JSX.Element => {
  return (
    <div className="bg-white w-full flex flex-col">
      <MainHeaderSection />

      <FeaturesSection />

      <section className="w-full flex flex-col items-center px-4 py-16">
        <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-[#003c43] text-[40px] text-center tracking-[0] leading-[normal] mb-4">
          Everything Your Business Needs
        </h2>

        <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#003c43] text-xl text-center tracking-[0] leading-[normal] mb-12">
          Powerful features designed for modern businesses operating across
          borders
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] w-full">
          {featureCards.map((feature, index) => (
            <Card
              key={index}
              className="rounded-xl border border-solid border-[#00c48c]"
            >
              <CardContent className="flex flex-col items-start gap-3 p-5">
                <img
                  className="w-6 h-6"
                  alt={feature.title}
                  src={feature.icon}
                />

                <h3 className="self-stretch [font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-2xl tracking-[0] leading-[normal]">
                  {feature.title}
                </h3>

                <p className="self-stretch [font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-sm tracking-[0] leading-[normal]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col items-center px-4 py-8">
        <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-black text-5xl tracking-[0] leading-[normal] mb-8">
          Multi-Currency Support
        </h2>
      </section>

      <BusinessNeedsSection />

      <HeaderSection />

      <MultiCurrencySupportSection />
    </div>
  );
};
