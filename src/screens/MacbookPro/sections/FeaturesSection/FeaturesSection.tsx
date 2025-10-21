const statistics = [
  {
    value: "24+",
    label: "Countries",
  },
  {
    value: "<2s",
    label: "Transfer Time",
  },
  {
    value: "90%",
    label: "Fee Savings",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#010f1f] via-[#062a4f] to-[#0b3f69] py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[320px] w-[320px] rounded-full bg-[#00c48c]/30 blur-[140px]" />
        <div className="absolute right-[-5%] bottom-[-15%] h-[360px] w-[360px] rounded-full bg-[#00c48c]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Bank Beyond <span className="text-[#00c48c]">Borders</span>
        </h1>
        <p className="max-w-2xl text-base font-medium text-[#d7e6ff] md:text-lg">
          Fast, transparent, and low-cost cross-border payments for African businesses.
          Send money globally, instantly.
        </p>

        <div className="mt-6 grid w-full gap-6 sm:grid-cols-3">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/5 px-6 py-5 backdrop-blur"
            >
              <span className="text-3xl font-extrabold text-[#00c48c]">{stat.value}</span>
              <span className="text-sm font-semibold text-white/90">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
