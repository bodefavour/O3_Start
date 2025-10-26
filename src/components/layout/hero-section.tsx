import { JSX } from "react";
import { statistics } from "@/components/data/hero-section";

export default function HeroSection(): JSX.Element {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#010f1f] via-[#062a4f] to-[#0b3f69] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[320px] w-[320px] rounded-full bg-[#00c48c]/30 blur-[140px]" />
        <div className="absolute right-[-5%] bottom-[-15%] h-[360px] w-[360px] rounded-full bg-[#00c48c]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Bank Beyond <span className="text-[#00c48c]">Borders</span>
        </h1>
        <p className="max-w-2xl text-sm font-medium text-[#d7e6ff] sm:text-base md:text-lg">
          Fast, transparent, and low-cost cross-border payments for African
          businesses. Send money globally, instantly.
        </p>

        <div className="mt-6 grid w-full gap-4 sm:grid-cols-3 sm:gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/5 px-5 py-4 backdrop-blur sm:px-6 sm:py-5"
            >
              <span className="text-2xl font-extrabold text-[#00c48c] sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-white/90 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
