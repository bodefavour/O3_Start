import { CheckCircle2, Timer, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const metrics = [
    {
        title: "Success Rate",
        value: "96.4%",
        description: "+2.1% from last period",
        icon: CheckCircle2,
        accent: "#00c48c",
    },
    {
        title: "Avg Processing Time",
        value: "2.3 min",
        description: "−1% faster than before",
        icon: Timer,
        accent: "#0ea5e9",
    },
    {
        title: "Peak Hour Volume",
        value: "$156k",
        description: "12:30 PM daily peak",
        icon: BarChart3,
        accent: "#7c3aed",
    },
];

export const PerformanceMetrics = () => {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-[#0b1f3a]">
                    Performance Metrics
                </h2>
                <p className="text-sm text-[#6b7280]">
                    Operational indicators that show where to optimise
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <Card
                            key={metric.title}
                            className="border border-[#e5e7eb] bg-white shadow-sm"
                        >
                            <CardContent className="flex flex-col gap-4 p-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="flex h-9 w-9 items-center justify-center rounded-full"
                                        style={{ backgroundColor: `${metric.accent}1a` }}
                                    >
                                        <Icon
                                            className="h-4 w-4"
                                            style={{ color: metric.accent }}
                                        />
                                    </span>
                                    <h3 className="text-sm font-semibold text-[#0b1f3a]">
                                        {metric.title}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-semibold text-[#0b1f3a]">
                                        {metric.value}
                                    </p>
                                    <p className="text-sm text-[#6b7280]">
                                        {metric.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};
