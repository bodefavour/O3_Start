import { Card, CardContent } from "../../../components/ui/card";

const weeklyData = [
  { week: "Week1", height: "120px" },
  { week: "Week2", height: "80px" },
  { week: "Week3", height: "90px" },
  { week: "Week4", height: "140px" },
];

export const TransactionAnalytics = () => {
  return (
    <div className="mt-6">
      <h3 className="mb-4 [font-family:'Inter',Helvetica] text-lg font-semibold text-[#0b1f3a]">
        Transaction Analytics
      </h3>
      <Card className="rounded-xl border-[#e5e7eb] bg-white">
        <CardContent className="p-5 sm:p-6">
          <div className="flex h-48 items-end justify-between gap-4 sm:h-[200px] sm:gap-8">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    className="w-full rounded-t-lg bg-[#00c48c]"
                    style={{ height: data.height }}
                  />
                </div>
                <span className="[font-family:'Inter',Helvetica] text-xs font-medium text-[#0b1f3a]/60 sm:text-sm">
                  {data.week}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
