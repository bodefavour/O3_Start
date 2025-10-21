import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";

const transactions = [
  {
    id: 1,
    company: "TechCorp Ltd",
    type: "TXN01",
    time: "2 minutes ago",
    amount: "+2,500 USDC",
    status: "Completed",
    isIncoming: true,
  },
  {
    id: 2,
    company: "Lagos Office",
    type: "TXN02",
    time: "1 hour ago",
    amount: "-₦450,000",
    status: "Completed",
    isIncoming: false,
  },
  {
    id: 3,
    company: "Global Suppliers",
    type: "TXN03",
    time: "3 hours ago",
    amount: "+1,200 USDT",
    status: "Completed",
    isIncoming: true,
  },
  {
    id: 4,
    company: "Client Invoice",
    type: "INV-2024-001",
    time: "5 hours ago",
    amount: "+2,500 USDC",
    status: "Completed",
    isIncoming: true,
  },
  {
    id: 5,
    company: "Vendor Payment",
    type: "TXN05",
    time: "5 hours ago",
    amount: "-300 USD",
    status: "Pending",
    isIncoming: false,
  },
];

export const RecentTransactions = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-lg">
          Recent Transactions
        </h3>
        <button className="[font-family:'Inter',Helvetica] font-medium text-[#00c48c] text-sm hover:underline">
          View All
        </button>
      </div>

      <Card className="bg-white border-[#e5e7eb] rounded-xl">
        <CardContent className="p-0">
          {transactions.map((transaction, index) => (
            <div key={transaction.id}>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.isIncoming
                        ? "bg-[#00c48c]/10"
                        : "bg-red-50"
                    }`}
                  >
                    <span className="text-lg">
                      {transaction.isIncoming ? "↓" : "↑"}
                    </span>
                  </div>
                  <div>
                    <p className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-sm">
                      {transaction.company}
                    </p>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-xs">
                      {transaction.type} • {transaction.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p
                    className={`[font-family:'Inter',Helvetica] font-semibold text-sm ${
                      transaction.isIncoming
                        ? "text-[#00c48c]"
                        : "text-[#0b1f3a]"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                  <Badge
                    className={`
                      ${
                        transaction.status === "Completed"
                          ? "bg-[#00c48c] hover:bg-[#00b37d]"
                          : "bg-[#fbbf24] hover:bg-[#f59e0b]"
                      }
                      text-[#0b1f3a] px-3 py-1
                      [font-family:'Inter',Helvetica] font-medium text-xs
                    `}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <Separator className="bg-[#e5e7eb]" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
