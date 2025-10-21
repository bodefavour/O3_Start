import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const features = [
  {
    title: "Global Reach",
    description:
      "Send money to 50+ countries instantly with stablecoins and local currencies.",
  },
  {
    title: "Bank-Grade Security",
    description:
      "Blockchain-powered transactions with enterprise-level compliance and KYC.",
  },
  {
    title: "Instant Transfers",
    description:
      "Sub-second transaction speeds powered by Hedera's distributed ledger.",
  },
  {
    title: "Low Fees",
    description:
      "Save up to 90% on traditional banking fees for international transfers.",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track your business finances with powerful insights and reporting tools.",
  },
  {
    title: "24/7 Operations",
    description:
      "Process payments any time, any day - no banking hours restrictions.",
  },
];

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="w-full px-4 pb-12 sm:pb-16">
      <div className="mx-auto grid w-full max-w-5xl gap-4 sm:gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="h-full rounded-2xl border border-[#00c48c33] bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col gap-3 p-5 sm:p-6">
              <Badge className="w-fit rounded-full bg-[#e0fff5] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#047857] sm:text-xs">
                Feature
              </Badge>
              <h3 className="text-base font-bold text-[#0b1f3a] sm:text-lg">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-[#365476]">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
