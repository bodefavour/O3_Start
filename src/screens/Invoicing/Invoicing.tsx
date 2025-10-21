import { useMemo, useState } from "react";
import { ArrowDownToLine, Eye, Menu, PencilLine, Trash2, X } from "lucide-react";
import { Sidebar } from "../Dashboard/components/Sidebar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useResponsiveSidebar } from "../../hooks/useResponsiveSidebar";

interface Invoice {
    id: string;
    number: string;
    title: string;
    client: string;
    amount: string;
    amountValue: number;
    status: "Paid" | "Sent" | "Overdue" | "Draft";
    date: string;
}

const invoices: Invoice[] = [
    {
        id: "1",
        number: "INV-001",
        title: "Web Development Services",
        client: "Acme Corporation",
        amount: "$15,750",
        amountValue: 15750,
        status: "Paid",
        date: "2024-01-15",
    },
    {
        id: "2",
        number: "INV-002",
        title: "Mobile App Development",
        client: "TechStart Ltd",
        amount: "$8,900",
        amountValue: 8900,
        status: "Sent",
        date: "2024-01-20",
    },
    {
        id: "3",
        number: "INV-003",
        title: "Consulting Services",
        client: "Global Ventures",
        amount: "$12,300",
        amountValue: 12300,
        status: "Overdue",
        date: "2024-01-10",
    },
    {
        id: "4",
        number: "INV-004",
        title: "UI/UX Design Services",
        client: "Innovation Hub",
        amount: "$5,670",
        amountValue: 5670,
        status: "Draft",
        date: "2024-01-25",
    },
    {
        id: "5",
        number: "INV-005",
        title: "Software Integration",
        client: "Digital Solutions",
        amount: "$9,800",
        amountValue: 9800,
        status: "Sent",
        date: "2024-01-30",
    },
];

const statusConfig: Record<Invoice["status"], string> = {
    Paid: "bg-[#E6F9F2] text-[#0F766E]",
    Sent: "bg-[#E3F2FD] text-[#1E40AF]",
    Overdue: "bg-[#FEE2E2] text-[#B91C1C]",
    Draft: "bg-[#F3F4F6] text-[#374151]",
};

const statusOptions = ["All Status", "Paid", "Sent", "Overdue", "Draft"] as const;

type StatusFilter = (typeof statusOptions)[number];

export const Invoicing = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("invoicing");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Status");
    const [searchTerm, setSearchTerm] = useState("");
    const {
        isSidebarCollapsed,
        isMobileView,
        toggleSidebar,
        closeSidebar,
    } = useResponsiveSidebar();

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const matchesStatus =
                statusFilter === "All Status" || invoice.status === statusFilter;
            const lower = searchTerm.toLowerCase();
            const matchesSearch =
                invoice.number.toLowerCase().includes(lower) ||
                invoice.title.toLowerCase().includes(lower) ||
                invoice.client.toLowerCase().includes(lower);
            return matchesStatus && matchesSearch;
        });
    }, [statusFilter, searchTerm]);

    const metrics = useMemo(() => {
        const totalInvoices = invoices.length;
        const paidAmount = invoices
            .filter((invoice) => invoice.status === "Paid")
            .reduce((sum, invoice) => sum + invoice.amountValue, 0);
        const pendingAmount = invoices
            .filter((invoice) => invoice.status === "Sent")
            .reduce((sum, invoice) => sum + invoice.amountValue, 0);
        const overdueAmount = invoices
            .filter((invoice) => invoice.status === "Overdue")
            .reduce((sum, invoice) => sum + invoice.amountValue, 0);
        return {
            totalInvoices,
            paidAmount,
            pendingAmount,
            overdueAmount,
        };
    }, []);

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
        if (isMobileView) {
            closeSidebar();
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f5f5f5]">
            <Sidebar
                activeItem={activeMenuItem}
                onNavigate={handleNavigate}
                collapsed={isSidebarCollapsed}
                onToggleCollapse={toggleSidebar}
            />

            {!isSidebarCollapsed && isMobileView && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm sm:hidden"
                    onClick={closeSidebar}
                />
            )}

            <div className="flex-1 overflow-y-auto">
                <header className="flex items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-4 py-6 sm:px-8">
                    <div className="flex items-start gap-3">
                        {toggleSidebar && isMobileView && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="rounded-lg border border-[#0b1f3a]/15 bg-white/70 text-[#0b1f3a] hover:bg-white sm:hidden"
                                aria-label={isSidebarCollapsed ? "Open navigation" : "Close navigation"}
                            >
                                {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
                            </Button>
                        )}
                        <div>
                            <h1 className="text-2xl font-semibold text-[#0b1f3a]">Invoicing</h1>
                            <p className="mt-1 text-sm text-[#6b7280]">
                                Manage your invoices and payments
                            </p>
                        </div>
                    </div>
                    <Button className="rounded-xl bg-[#00c48c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#00b37d]">
                        + Create Invoice
                    </Button>
                </header>

                <main className="space-y-8 px-8 py-8">
                    <section>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                    Total Invoices
                                </p>
                                <div className="mt-3 flex items-end justify-between">
                                    <span className="text-3xl font-semibold text-[#0b1f3a]">
                                        {metrics.totalInvoices}
                                    </span>
                                    <Badge className="rounded-lg bg-[#e5f5f1] text-[#0f766e]">
                                        <ArrowDownToLine className="mr-1 h-4 w-4" />
                                        Manage
                                    </Badge>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                    Paid Amount
                                </p>
                                <div className="mt-3 flex items-end justify-between">
                                    <span className="text-3xl font-semibold text-[#0b1f3a]">
                                        ${metrics.paidAmount.toLocaleString()} USD
                                    </span>
                                    <Badge className="rounded-lg bg-[#e6f9f2] text-[#0f766e]">
                                        ✓
                                    </Badge>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                    Pending Amount
                                </p>
                                <div className="mt-3 flex items-end justify-between">
                                    <span className="text-3xl font-semibold text-[#0b1f3a]">
                                        ${metrics.pendingAmount.toLocaleString()} USD
                                    </span>
                                    <Badge className="rounded-lg bg-[#f0f9ff] text-[#1d4ed8]">
                                        ⏱
                                    </Badge>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                    Overdue Amount
                                </p>
                                <div className="mt-3 flex items-end justify-between">
                                    <span className="text-3xl font-semibold text-[#0b1f3a]">
                                        ${metrics.overdueAmount.toLocaleString()} USD
                                    </span>
                                    <Badge className="rounded-lg bg-[#fee2e2] text-[#b91c1c]">
                                        !
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="search invoices"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-4 py-2 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:outline-none"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value as StatusFilter)
                                    }
                                    className="w-40 rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    variant="outline"
                                    className="rounded-xl border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a]"
                                >
                                    Export
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-[#0b1f3a]">
                                <thead>
                                    <tr className="border-b border-[#e5e7eb] text-xs uppercase text-[#6b7280]">
                                        <th className="py-3 pl-4 pr-4">Invoice</th>
                                        <th className="py-3 pr-4">Client</th>
                                        <th className="py-3 pr-4">Amount</th>
                                        <th className="py-3 pr-4">Status</th>
                                        <th className="py-3 pr-4">Date</th>
                                        <th className="py-3 pr-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b border-[#f1f5f9]">
                                            <td className="py-4 pl-4 pr-4">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" className="mt-1" />
                                                    <div>
                                                        <p className="font-semibold">{invoice.number}</p>
                                                        <p className="text-xs text-[#6b7280]">{invoice.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <p className="font-semibold">{invoice.client}</p>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <p className="font-semibold">{invoice.amount}</p>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <span
                                                    className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold ${statusConfig[invoice.status]}`}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <p>{invoice.date}</p>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-3 text-[#1d4ed8]">
                                                    <button type="button" aria-label="View invoice">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" aria-label="Edit invoice">
                                                        <PencilLine className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" aria-label="Download invoice">
                                                        <ArrowDownToLine className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label="Delete invoice"
                                                        className="text-[#b91c1c]"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};
