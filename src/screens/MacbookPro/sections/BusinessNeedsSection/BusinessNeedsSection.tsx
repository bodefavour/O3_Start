import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const currencies = [
  {
    code: "USDC",
    name: "USD Coin",
    badge: "Stablecoin",
    nameWidth: "w-[70px]",
  },
  {
    code: "USDT",
    name: "Tether",
    badge: "Stablecoin",
    nameWidth: "w-[70px]",
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    badge: "Local",
    nameWidth: "w-[115px]",
  },
];

export const BusinessNeedsSection = (): JSX.Element => {
  return (
    <section className="flex items-center gap-8 w-full">
      {currencies.map((currency, index) => (
        <Card
          key={index}
          className="w-[300px] rounded-xl border border-[#00000040]"
        >
          <CardContent className="flex items-center justify-between p-2.5">
            <div
              className={`${currency.nameWidth} flex flex-col items-start gap-2`}
            >
              <h3 className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-2xl tracking-[0] leading-[normal]">
                {currency.code}
              </h3>
              <p className="relative self-stretch [font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-sm tracking-[0] leading-[normal]">
                {currency.name}
              </p>
            </div>
            <Badge className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px] bg-[#00c48c40] rounded-xl hover:bg-[#00c48c40] border-0">
              <span className="w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#003c43bf] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                {currency.badge}
              </span>
            </Badge>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
