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
      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-lg mb-4">
        Transaction Analytics
      </h3>
      <Card className="bg-white border-[#e5e7eb] rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-end justify-between h-[200px] gap-8">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex items-end justify-center flex-1">
                  <div
                    className="w-full bg-[#00c48c] rounded-t-lg"
                    style={{ height: data.height }}
                  />
                </div>
                <span className="[font-family:'Inter',Helvetica] font-medium text-[#0b1f3a]/60 text-sm">
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
