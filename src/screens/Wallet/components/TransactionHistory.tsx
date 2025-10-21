import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

type FilterType = "all" | "sent" | "received" | "swapped";

const transactions = [
  {
    id: 1,
    name: "John Smith (Arrival)",
    date: "Jan 15, 11:23 AM",
    hash: "hash1c742a335cc8633C0532925a3b844Bc9e7595f0bEb",
    amount: "+2,500 USDC",
    status: "completed",
    type: "received" as const,
  },
  {
    id: 2,
    name: "Lagos Office",
    date: "Jan 14, 11:32 AM",
    hash: "hash1c742a335cc8633C0532925a3b844Bc9e7595f0bEb",
    amount: "-500 USDT",
    fee: "Fee: $2.6",
    status: "completed",
    type: "sent" as const,
  },
  {
    id: 3,
    name: "Swapped to NGN",
    date: "Jan 13, 10:14 AM",
    hash: "hash1c9c942c1091c8633320532343c96c032151b",
    amount: "+500 USDC",
    fee: "Fee: $4",
    status: "completed",
    type: "swapped" as const,
  },
  {
    id: 4,
    name: "Mary Johnson (Ghana)",
    date: "Jan 12, 03:42 PM",
    hash: "hash1c9c942c1091c8633320532343c96c032151b",
    amount: "-75.5 HUSD",
    fee: "Fee: $1.23",
    status: "failed",
    type: "sent" as const,
  },
  {
    id: 5,
    name: "Invoice Payment #INV-001",
    date: "Jan 11, 12:01 PM",
    hash: "hash1c9c942c1091c8633320532343c96c032151b",
    amount: "+2,000 USDC",
    status: "failed",
    type: "received" as const,
  },
];

export const TransactionHistory = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-lg">
            Transactions History
          </h3>
          <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-sm">
            Recent wallet activity
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium
              ${
                filter === "all"
                  ? "bg-[#00c48c] text-black hover:bg-[#00b37d]"
                  : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
              }
            `}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("sent")}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium
              ${
                filter === "sent"
                  ? "bg-[#00c48c] text-black hover:bg-[#00b37d]"
                  : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
              }
            `}
          >
            Sent
          </Button>
          <Button
            onClick={() => setFilter("received")}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium
              ${
                filter === "received"
                  ? "bg-[#00c48c] text-black hover:bg-[#00b37d]"
                  : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
              }
            `}
          >
            Received
          </Button>
          <Button
            onClick={() => setFilter("swapped")}
            className={`
              px-4 py-1.5 rounded-full text-xs font-medium
              ${
                filter === "swapped"
                  ? "bg-[#00c48c] text-black hover:bg-[#00b37d]"
                  : "bg-white text-[#0b1f3a] border border-[#e5e7eb] hover:bg-gray-50"
              }
            `}
          >
            Swapped
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <Card className="bg-white border-[#e5e7eb] rounded-xl">
        <CardContent className="p-0">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                index !== filteredTransactions.length - 1
                  ? "border-b border-[#e5e7eb]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      transaction.type === "received"
                        ? "bg-[#00c48c]/10"
                        : transaction.type === "sent"
                        ? "bg-red-50"
                        : "bg-blue-50"
                    }`}
                  >
                    <span className="text-lg">
                      {transaction.type === "received"
                        ? "↓"
                        : transaction.type === "sent"
                        ? "↑"
                        : "🔄"}
                    </span>
                  </div>

                  {/* Transaction Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-sm">
                        {transaction.name}
                      </p>
                      <p
                        className={`[font-family:'Inter',Helvetica] font-semibold text-sm flex-shrink-0 ${
                          transaction.amount.startsWith("+")
                            ? "text-[#00c48c]"
                            : "text-[#0b1f3a]"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                    </div>

                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-xs mb-1">
                      {transaction.date}{" "}
                      <Badge
                        className={`ml-2 ${
                          transaction.status === "completed"
                            ? "bg-[#00c48c]/20 text-[#00c48c] hover:bg-[#00c48c]/30"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        } px-2 py-0.5 text-[10px] font-medium`}
                      >
                        {transaction.status === "completed"
                          ? "completed"
                          : "FAILED"}
                      </Badge>
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="[font-family:'Inter',Helvetica] font-mono text-[#0b1f3a]/40 text-[10px] truncate max-w-[300px]">
                        {transaction.hash}
                      </p>
                      <button className="text-xs hover:opacity-70">📋</button>
                    </div>

                    {transaction.fee && (
                      <p className="[font-family:'Inter',Helvetica] font-normal text-[#0b1f3a]/60 text-xs mt-1">
                        {transaction.fee}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-50 border-[#e5e7eb] text-[#0b1f3a] px-8 py-3 rounded-lg font-semibold"
        >
          Load More Transactions
        </Button>
      </div>
    </div>
  );
};
