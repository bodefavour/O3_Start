import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const currencies = [
  {
    code: "USDC",
    name: "USD Coin",
    type: "Stablecoin",
  },
  {
    code: "USDT",
    name: "Tether",
    type: "Stablecoin",
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    type: "Local",
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    type: "Local",
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    type: "Local",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    type: "Local",
  },
];

export const BusinessNeedsSection = (): JSX.Element => {
  return (
    <section className="w-full px-4 pb-20">
      <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currencies.map((currency) => (
          <Card
            key={currency.code}
            className="rounded-2xl border border-[#00c48c33] bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="flex flex-col gap-3 p-5">
              <div>
                <h3 className="text-xl font-extrabold text-[#0b1f3a]">
                  {currency.code}
                </h3>
                <p className="text-sm font-semibold text-[#1f3a5c]">
                  {currency.name}
                </p>
              </div>
              <Badge
                className={`w-fit rounded-full px-4 py-[6px] text-xs font-semibold uppercase tracking-wide ${currency.type === "Stablecoin"
                    ? "bg-[#e0fff5] text-[#047857]"
                    : "bg-[#e6f0ff] text-[#1d4ed8]"
                  }`}
              >
                {currency.type}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
