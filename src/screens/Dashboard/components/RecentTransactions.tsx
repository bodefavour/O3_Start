import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
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
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="[font-family:'Inter',Helvetica] text-lg font-semibold text-[#0b1f3a]">
          Recent Transactions
        </h3>
        <button className="w-fit [font-family:'Inter',Helvetica] text-sm font-medium text-[#00c48c] hover:underline">
          View All
        </button>
      </div>

      <Card className="rounded-xl border-[#e5e7eb] bg-white">
        <CardContent className="p-0">
          {transactions.map((transaction, index) => (
            <div key={transaction.id}>
              <div className="flex flex-col gap-3 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${transaction.isIncoming ? "bg-[#00c48c]/10" : "bg-red-50"
                      }`}
                  >
                    {transaction.isIncoming ? (
                      <ArrowDownLeft className="h-5 w-5 text-[#00c48c]" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-[#b91c1c]" />
                    )}
                  </div>
                  <div>
                    <p className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#0b1f3a]">
                      {transaction.company}
                    </p>
                    <p className="[font-family:'Inter',Helvetica] text-xs font-normal text-[#0b1f3a]/60">
                      {transaction.type} • {transaction.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <p
                    className={`[font-family:'Inter',Helvetica] text-sm font-semibold ${transaction.isIncoming ? "text-[#00c48c]" : "text-[#0b1f3a]"
                      }`}
                  >
                    {transaction.amount}
                  </p>
                  <Badge
                    className={`
                      ${transaction.status === "Completed"
                        ? "bg-[#00c48c] hover:bg-[#00b37d]"
                        : "bg-[#fbbf24] hover:bg-[#f59e0b]"
                      }
                      px-3 py-1 text-[#0b1f3a]
                      [font-family:'Inter',Helvetica] text-xs font-medium
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
