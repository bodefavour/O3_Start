import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

const countries = [
    { code: "NG", name: "Nigeria", amount: "$890,000", percentage: 36.3 },
    { code: "KE", name: "Kenya", amount: "$650,000", percentage: 28.5 },
    { code: "GH", name: "Ghana", amount: "$420,000", percentage: 17.1 },
    { code: "ZA", name: "South Africa", amount: "$290,000", percentage: 11.8 },
    { code: "UG", name: "Uganda", amount: "$200,000", percentage: 8.2 },
];

type TopCountriesCardProps = {
    className?: string;
};

export const TopCountriesCard = ({ className }: TopCountriesCardProps) => {
    return (
        <Card className={cn("border border-[#d1d5db] bg-white shadow-sm", className)}>
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-lg font-semibold text-[#0b1f3a]">
                    Top Countries by Volume
                </CardTitle>
                <p className="text-sm text-[#6b7280]">
                    Distribution that highlights your strongest markets
                </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
                {countries.map((country, index) => (
                    <div
                        key={country.code}
                        className={cn(
                            "flex items-center justify-between gap-4",
                            index !== countries.length - 1 && "border-b border-[#e5e7eb] pb-4"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8fff5] text-sm font-semibold text-[#0b1f3a]">
                                {country.code}
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-[#0b1f3a]">
                                    {country.name}
                                </div>
                                <div className="text-xs text-[#6b7280]">{country.amount}</div>
                            </div>
                        </div>
                        <div className="flex w-32 flex-col items-end gap-2">
                            <span className="text-sm font-semibold text-[#0b1f3a]">
                                {country.percentage.toFixed(1)}%
                            </span>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                                <div
                                    className="h-full rounded-full bg-[#00c48c]"
                                    style={{ width: `${country.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
