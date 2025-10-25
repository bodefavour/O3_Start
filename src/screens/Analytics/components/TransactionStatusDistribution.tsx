import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const statuses = [
    { label: "Completed", count: 1089, percentage: 87.35, color: "#00c48c" },
    { label: "Pending", count: 90, percentage: 7.23, color: "#f59e0b" },
    { label: "Failed", count: 45, percentage: 3.61, color: "#ef4444" },
    { label: "Cancelled", count: 18, percentage: 1.45, color: "#6366f1" },
];

export const TransactionStatusDistribution = () => {
    return (
        <Card className="border border-[#e5e7eb] bg-white shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-[#0b1f3a]">
                    Transaction Status Distribution
                </CardTitle>
                <p className="text-sm text-[#6b7280]">
                    Real-time status tracking across all payment flows
                </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
                {statuses.map((status) => (
                    <div
                        key={status.label}
                        className="flex items-center justify-between gap-4 text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: status.color }}
                            />
                            <span className="font-medium text-[#0b1f3a]">{status.label}</span>
                        </div>
                        <div className="flex items-center gap-6 text-right text-[#4b5563]">
                            <span>{status.count}</span>
                            <span className="font-medium text-[#0b1f3a]">
                                {status.percentage.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
