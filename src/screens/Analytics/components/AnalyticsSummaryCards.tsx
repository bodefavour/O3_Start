import { ArrowUpRight, CircleDollarSign, ListChecks, CreditCard, PiggyBank } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

const summaryMetrics = [
    {
        label: "Total Transaction Volume",
        value: "$2,450,000",
        change: "+18.2%",
        icon: CircleDollarSign,
        accent: "#00c48c",
    },
    {
        label: "Transaction Count",
        value: "1,247",
        change: "+12.5%",
        icon: ListChecks,
        accent: "#2563eb",
    },
    {
        label: "Average Transaction Size",
        value: "$1,965",
        change: "+5.1%",
        icon: CreditCard,
        accent: "#f59e0b",
    },
    {
        label: "Fees Saved",
        value: "$45,670",
        change: "+23.8%",
        icon: PiggyBank,
        accent: "#9333ea",
    },
];

export const AnalyticsSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                    <Card
                        key={metric.label}
                        className="border border-[#d1d5db] bg-white shadow-sm"
                    >
                        <CardContent className="flex h-full flex-col gap-4 p-6">
                            <div className="flex items-center justify-between">
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-full"
                                    style={{ backgroundColor: `${metric.accent}1a` }}
                                >
                                    <Icon
                                        className="h-5 w-5"
                                        style={{ color: metric.accent }}
                                    />
                                </span>
                                <Badge className="inline-flex items-center gap-1 border-none bg-[#e8fff5] text-[#0f9d58]">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                    {metric.change}
                                </Badge>
                            </div>
                            <div>
                                <div className="text-[28px] font-semibold text-[#0b1f3a]">
                                    {metric.value}
                                </div>
                                <p className="text-sm text-[#6b7280]">{metric.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
