"use client";
import { JSX } from "react";
import { BusinessNeedsSection } from "@/components/layout/business-need-section";
import { HeaderSection } from "@/components/layout/header-section";
import { MultiCurrencySupportSection } from "@/components/layout/multi-currency-support-section";
import { Header } from "@/components/layout/Header";
import HeroSection from "@/components/layout/hero-section";

export default function Home(): JSX.Element {
  return (
    <div className="flex w-full flex-col bg-white">
      <Header />

      <HeroSection />

      <section className="w-full bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-extrabold text-[#0b1f3a] sm:text-3xl md:text-4xl">
            Everything Your Business Needs
          </h2>
          <p className="text-sm font-semibold text-[#1f3a5c] sm:text-base md:text-lg">
            Powerful features designed for modern businesses operating across
            borders.
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
}
