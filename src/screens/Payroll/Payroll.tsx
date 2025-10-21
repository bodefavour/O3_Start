import { useMemo, useState } from "react";
import { Users, DollarSign, Clock, PiggyBank, Search, Download, Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { EmployeeCard } from "./components/EmployeeCard";
import { DashboardShell } from "../../components/layout/DashboardShell";

interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    salaryAmount: number;
    salaryDisplay: string;
    status: string;
    employeeId: string;
    joinedDate: string;
    email: string;
    phone: string;
    avatarColor?: string;
}

const employees: Employee[] = [
    {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        role: "Senior Developer",
        department: "Engineering",
        salaryAmount: 8500,
        salaryDisplay: "$8,500/mo",
        status: "Active",
        employeeId: "EMP-001",
        joinedDate: "2023-02-15",
        email: "sarah.johnson@company.com",
        phone: "+1 (555) 234-5678",
        avatarColor: "#00c48c",
    },
    {
        id: "michael-chen",
        name: "Michael Chen",
        role: "UI/UX Designer",
        department: "Design",
        salaryAmount: 6200,
        salaryDisplay: "$6,200/mo",
        status: "Active",
        employeeId: "EMP-002",
        joinedDate: "2023-05-20",
        email: "michael.chen@company.com",
        phone: "+1 (555) 987-6543",
        avatarColor: "#1d4ed8",
    },
    {
        id: "emily-rodriguez",
        name: "Emily Rodriguez",
        role: "Marketing Manager",
        department: "Marketing",
        salaryAmount: 7000,
        salaryDisplay: "$7,000/mo",
        status: "Active",
        employeeId: "EMP-003",
        joinedDate: "2023-01-10",
        email: "emily.rodriguez@company.com",
        phone: "+1 (555) 456-7890",
        avatarColor: "#10b981",
    },
    {
        id: "david-kim",
        name: "David Kim",
        role: "DevOps Engineer",
        department: "Engineering",
        salaryAmount: 7800,
        salaryDisplay: "$7,800/mo",
        status: "Active",
        employeeId: "EMP-004",
        joinedDate: "2023-07-01",
        email: "david.kim@company.com",
        phone: "+1 (555) 321-7654",
        avatarColor: "#0ea5e9",
    },
    {
        id: "lisa-thompson",
        name: "Lisa Thompson",
        role: "Sales Representative",
        department: "Sales",
        salaryAmount: 5500,
        salaryDisplay: "$5,500/mo",
        status: "Active",
        employeeId: "EMP-005",
        joinedDate: "2023-03-17",
        email: "lisa.thompson@company.com",
        phone: "+1 (555) 654-0987",
        avatarColor: "#f97316",
    },
];

const departments = ["All Department", "Engineering", "Design", "Marketing", "Sales"] as const;
type DepartmentFilter = (typeof departments)[number];

export const Payroll = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("payroll");
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>("All Department");
    const metrics = useMemo(() => {
        const totalEmployees = employees.length;
        const monthlyPayroll = employees.reduce((sum, employee) => sum + employee.salaryAmount, 0);
        const pendingPayments = 8;
        const totalPaidYTD = 890000;
        return {
            totalEmployees,
            monthlyPayroll,
            pendingPayments,
            totalPaidYTD,
        };
    }, []);

    const filteredEmployees = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return employees.filter((employee) => {
            const matchesDepartment =
                departmentFilter === "All Department" || employee.department === departmentFilter;
            const matchesSearch =
                employee.name.toLowerCase().includes(lower) ||
                employee.role.toLowerCase().includes(lower) ||
                employee.department.toLowerCase().includes(lower);
            return matchesDepartment && matchesSearch;
        });
    }, [departmentFilter, searchTerm]);

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
    };

    return (
        <DashboardShell
            activeItem={activeMenuItem}
            onNavigate={handleNavigate}
            renderHeader={({ toggleSidebar, isSidebarCollapsed, isMobileView }) => (
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-4 py-6 sm:px-8">
                    <div className="flex items-start gap-3">
                        {isMobileView && (
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
                            <h1 className="text-2xl font-semibold text-[#0b1f3a]">Payroll Management</h1>
                            <p className="mt-1 text-sm text-[#6b7280]">
                                Manage employee payments and payroll
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className="rounded-xl bg-[#00c48c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00b37d]">
                            + Run Payroll
                        </Button>
                        <Button variant="outline" className="rounded-xl border-[#d1d5db] bg-white px-5 py-3 text-sm font-semibold text-[#0b1f3a] hover:bg-gray-50">
                            + Add Employee
                        </Button>
                    </div>
                </header>
            )}
        >
            <main className="space-y-8 py-6">
                <section>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                Total Employees
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-3xl font-semibold text-[#0b1f3a]">
                                    {metrics.totalEmployees}
                                </span>
                                <Badge className="rounded-lg bg-[#e5f5f1] text-[#0f766e]">
                                    <Users className="mr-1 h-4 w-4" />
                                    Team
                                </Badge>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                Monthly Payroll
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-3xl font-semibold text-[#0b1f3a]">
                                    ${metrics.monthlyPayroll.toLocaleString()}
                                </span>
                                <Badge className="rounded-lg bg-[#e6f9f2] text-[#0f766e]">
                                    <DollarSign className="mr-1 h-4 w-4" />
                                    Payroll
                                </Badge>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                Pending Payments
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-3xl font-semibold text-[#0b1f3a]">
                                    {metrics.pendingPayments}
                                </span>
                                <Badge className="rounded-lg bg-[#f0f9ff] text-[#1d4ed8]">
                                    <Clock className="mr-1 h-4 w-4" />
                                    Pending
                                </Badge>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                                Total Paid (YTD)
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-3xl font-semibold text-[#0b1f3a]">
                                    ${metrics.totalPaidYTD.toLocaleString()}
                                </span>
                                <Badge className="rounded-lg bg-[#fee2e2] text-[#b91c1c]">
                                    <PiggyBank className="mr-1 h-4 w-4" />
                                    YTD
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 flex-wrap gap-3">
                            <div className="relative flex-1 min-w-[220px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    type="text"
                                    placeholder="search employees..."
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    className="w-full rounded-xl border border-[#d1d5db] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:outline-none"
                                />
                            </div>
                            <select
                                value={departmentFilter}
                                onChange={(event) =>
                                    setDepartmentFilter(event.target.value as DepartmentFilter)
                                }
                                className="h-10 rounded-xl border border-[#d1d5db] bg-white px-4 text-sm text-[#0b1f3a] focus:outline-none"
                            >
                                {departments.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <Button
                                variant="outline"
                                className="h-10 rounded-xl border-[#d1d5db] bg-white px-4 text-sm text-[#0b1f3a] hover:bg-gray-50"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        {filteredEmployees.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                name={employee.name}
                                role={employee.role}
                                department={employee.department}
                                salary={employee.salaryDisplay}
                                status={employee.status}
                                employeeId={employee.employeeId}
                                joinedDate={employee.joinedDate}
                                email={employee.email}
                                phone={employee.phone}
                                avatarColor={employee.avatarColor}
                            />
                        ))}
                        {filteredEmployees.length === 0 && (
                            <div className="col-span-full rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-10 text-center">
                                <h3 className="text-lg font-semibold text-[#0b1f3a]">No employees found</h3>
                                <p className="mt-1 text-sm text-[#6b7280]">
                                    Try adjusting your search or filters to see more results.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </DashboardShell>
    );
};
