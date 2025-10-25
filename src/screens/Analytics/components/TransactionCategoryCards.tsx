import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

const categories = [
    {
        title: "Cross-border Transfer",
        color: "#00c48c",
        count: 465,
        volume: "$1,250,000",
        average: "$2,741",
        tag: "Success Rate"
    },
    {
        title: "Local Payment",
        color: "#1d4ed8",
        count: 342,
        volume: "$890,000",
        average: "$1,988",
        tag: "Naira"
    },
    {
        title: "Currency Exchange",
        color: "#f59e0b",
        count: 289,
        volume: "$420,000",
        average: "$1,454",
        tag: "FX"
    },
    {
        title: "Wallet Top-up",
        color: "#9ca3af",
        count: 160,
        volume: "$100,000",
        average: "$625",
        tag: "Wallet"
    },
];

type TransactionCategoryCardsProps = {
    className?: string;
};

export const TransactionCategoryCards = ({ className }: TransactionCategoryCardsProps) => {
    return (
        <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4", className)}>
            {categories.map((category) => (
                <Card
                    key={category.title}
                    className="h-full border border-[#e5e7eb] bg-white shadow-sm"
                >
                    <CardContent className="flex h-full flex-col gap-4 p-4">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold text-[#0b1f3a]">
                                {category.title}
                            </h3>
                            <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                        </div>
                        <div className="space-y-1 text-xs text-[#6b7280]">
                            <div className="flex items-center justify-between">
                                <span>Count</span>
                                <span className="font-semibold text-[#0b1f3a]">
                                    {category.count}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Volume</span>
                                <span className="font-semibold text-[#0b1f3a]">
                                    {category.volume}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Avg Size</span>
                                <span className="font-semibold text-[#0b1f3a]">
                                    {category.average}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
