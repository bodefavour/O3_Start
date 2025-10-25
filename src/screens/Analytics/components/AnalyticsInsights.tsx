import { ArrowUpRight } from "lucide-react";
import { cn } from "../../../lib/utils";

const insights = [
  {
    title: "Cross-border Transfers",
    change: "+15%",
    description: "Increased international payments",
  },
  {
    title: "Local Currency Usage",
    change: "+8%",
    description: "More NGN and KES transactions",
  },
  {
    title: "Transaction Speed",
    change: "+22%",
    description: "Faster processing times",
  },
  {
    title: "Customer Satisfaction",
    change: "+15%",
    description: "Improved user experience",
  },
];

type AnalyticsInsightsProps = {
  className?: string;
};

export const AnalyticsInsights = ({ className }: AnalyticsInsightsProps) => {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-[#0b1f3a]">
          Recent Trends & Insights
        </h2>
        <p className="text-sm text-[#6b7280]">
          Track performance signals and operational highlights
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="flex h-full flex-col gap-2 rounded-xl border border-[#d1d5db] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-1 text-xs font-semibold text-[#0f9d58]">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {insight.change}
            </div>
            <div className="text-sm font-semibold text-[#0b1f3a]">
              {insight.title}
            </div>
            <p className="text-sm text-[#6b7280]">{insight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
