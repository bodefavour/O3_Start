import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const currencies = [
  {
    code: "KES",
    name: "Kenyan Shilling",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
  },
  {
    code: "ZAR",
    name: "South African Rand",
  },
];

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="flex items-center justify-center gap-8 w-full">
      {currencies.map((currency, index) => (
        <Card
          key={index}
          className="w-[300px] rounded-xl border border-[#00000040] cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardContent className="flex items-center justify-between p-2.5">
            <div className="inline-flex flex-col items-start gap-2">
              <h3 className="[font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-2xl tracking-[0] leading-[normal]">
                {currency.code}
              </h3>
              <p className="[font-family:'Inter',Helvetica] font-extrabold text-[#003c43bf] text-sm tracking-[0] leading-[normal]">
                {currency.name}
              </p>
            </div>
            <Badge className="bg-[#00c48c40] hover:bg-[#00c48c40] px-2.5 py-[5px] rounded-xl">
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#003c43bf] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                Local
              </span>
            </Badge>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
