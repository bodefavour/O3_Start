import React from "react";

const statistics = [
  {
    value: "24+",
    label: "Countries",
    left: "left-[446px]",
  },
  {
    value: "<2s",
    label: "Transfer Time",
    left: "left-[658px]",
  },
  {
    value: "90%",
    label: "Free Savings",
    left: "left-[918px]",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[449px] bg-[#0b1f3a] overflow-hidden">
      <img
        className="left-[calc(50.00%_-_180px)] w-[361px] h-[380px] absolute top-[calc(50.00%_-_190px)] object-cover"
        alt="Image"
        src="/image-1.png"
      />

      <img
        className="right-5 w-[394px] h-[394px] absolute top-[calc(50.00%_-_190px)] object-cover"
        alt="Image"
        src="/image-2.png"
      />

      <img
        className="left-5 w-[295px] h-[382px] absolute top-[calc(50.00%_-_190px)] object-cover"
        alt="Image"
        src="/image-3.png"
      />

      <h1 className="absolute top-[90px] left-[calc(50.00%_-_333px)] [font-family:'Inter',Helvetica] font-extrabold text-transparent text-[64px] tracking-[0] leading-[normal]">
        <span className="text-white">Bank Beyond </span>
        <span className="text-[#00c48c]">Borders</span>
      </h1>

      <div className="absolute top-[152px] left-[1212px] w-[300px] h-[300px] bg-[#00c48cbf] rounded-[150px] blur-[100px]" />

      <p className="absolute top-[179px] left-[calc(50.00%_-_350px)] [font-family:'Inter',Helvetica] font-extrabold text-white text-2xl text-center tracking-[0] leading-[normal]">
        Fast, transparent, and low-cost cross-border payments for <br />
        African businesses. Send money globally, instantly.
      </p>

      {statistics.map((stat, index) => (
        <div
          key={index}
          className={`absolute top-[312px] ${stat.left} [font-family:'Inter',Helvetica] font-normal text-transparent text-2xl text-center tracking-[0] leading-[normal]`}
        >
          <span className="font-extrabold text-[#00c48c]">
            {stat.value}
            <br />
          </span>
          <span className="font-medium text-white">{stat.label}</span>
        </div>
      ))}
    </section>
  );
};
