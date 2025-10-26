"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";
import { employeeApi } from "@/lib/api";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    Users as UsersIcon,
    DollarSign,
    Clock,
    TrendingUp,
    CheckCircle,
    Info,
    MoreHorizontal,
    Wallet as WalletIcon,
    BarChart3,
    Settings,
    LogOut,
    Users,
    Receipt,
    Send,
    ChevronDown,
} from "lucide-react";

// Mock employee data
const mockEmployees = [
    {
        id: "EMP-001",
        name: "Sarah Johnson",
        initials: "SJ",
        color: "bg-green-500",
        position: "Senior Developer",
        department: "Engineering",
        salary: "$8,800/mo",
        email: "sarah.johnson@company.com",
        joined: "2023-03-15",
        status: "Active",
    },
    {
        id: "EMP-002",
        name: "Michael Chen",
        initials: "MC",
        color: "bg-cyan-500",
        position: "UI/UX Designer",
        department: "Design",
        salary: "$6,200/mo",
        email: "michael.chen@company.com",
        joined: "2023-05-20",
        status: "Active",
    },
    {
        id: "EMP-003",
        name: "Emily Rodriguez",
        initials: "ER",
        color: "bg-green-500",
        position: "Marketing Manager",
        department: "Marketing",
        salary: "$7,000/mo",
        email: "emily.rodriguez@company.com",
        joined: "2023-06-10",
        status: "Active",
    },
    {
        id: "EMP-004",
        name: "David Kim",
        initials: "DK",
        color: "bg-cyan-500",
        position: "DevOps Engineer",
        department: "Engineering",
        salary: "$7,800/mo",
        email: "david.kim@company.com",
        joined: "2023-07-01",
        status: "Active",
    },
    {
        id: "EMP-001",
        name: "Lisa Thompson",
        initials: "LT",
        color: "bg-green-500",
        position: "Sales Representative",
        department: "Sales",
        salary: "$5,500/mo",
        email: "lisa.thompson@company.com",
        joined: "",
        status: "Active",
    },
];

export default function PayrollPage() {
    const router = useRouter();
    const { user, logout, isAuthenticated } = useUser();
    const { userId } = useCurrentUser();
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [employees, setEmployees] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All Department");

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/signin");
            return;
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            
            setLoadingData(true);
            try {
                const response = await employeeApi.getAll(userId);
                setEmployees(response.employees || []);
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment =
            departmentFilter === "All Department" ||
            employee.department === departmentFilter;
        return matchesSearch && matchesDepartment;
    });

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00c48c] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0b1f3a] text-white">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="border-b border-white/10 px-6 py-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded bg-[#00c48c]" />
                            <span className="text-lg font-bold">BorderlessPay</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/wallet"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <WalletIcon className="h-5 w-5" />
                            Wallet
                        </Link>
                        <Link
                            href="/payments"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Send className="h-5 w-5" />
                            Payments
                        </Link>
                        <Link
                            href="/invoicing"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Receipt className="h-5 w-5" />
                            Invoicing
                        </Link>
                        <Link
                            href="/payroll"
                            className="flex items-center gap-3 rounded-lg bg-[#00c48c] px-3 py-2.5 text-sm font-medium text-white"
                        >
                            <Users className="h-5 w-5" />
                            Payroll
                        </Link>
                        <Link
                            href="/analytics"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <BarChart3 className="h-5 w-5" />
                            Analytics
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>

                    {/* User Profile */}
                    <div className="border-t border-white/10 p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00c48c] text-sm font-bold">
                                {user?.businessName?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-semibold">
                                    {user?.businessName || "User"}
                                </p>
                                <p className="truncate text-xs text-gray-400">Premium Account</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full gap-2 border-white/20 bg-transparent text-white hover:bg-white/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0b1f3a]">Payroll Management</h1>
                        <p className="mt-1 text-gray-600">
                            Manage employee payments and payroll
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                            <Send className="h-5 w-5" />
                            Run Payroll
                        </Button>
                        <Button className="gap-2 rounded-xl bg-[#00c48c] hover:bg-[#00b37d]">
                            <Plus className="h-5 w-5" />
                            Add Employee
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Employees</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        {employees.length}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-3">
                                    <UsersIcon className="h-6 w-6 text-gray-700" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Monthly Payroll</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        ${employees
                                            .filter(e => e.status === 'active')
                                            .reduce((sum, e) => sum + parseFloat(e.salary), 0)
                                            .toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-green-100 p-3">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Active Employees</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        {employees.filter(e => e.status === 'active').length}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-blue-100 p-3">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Last Payment</p>
                                    <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">
                                        {employees.length > 0 && employees[0].lastPayment 
                                            ? new Date(employees[0].lastPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-red-100 p-3">
                                    <TrendingUp className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="search employees..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#00c48c] focus:outline-none focus:ring-1 focus:ring-[#00c48c]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    {departmentFilter}
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <Button variant="outline" className="gap-2">
                                    Export
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Employee Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {filteredEmployees.map((employee, index) => {
                        const initials = employee.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .toUpperCase();
                        const colorClasses = ['bg-green-500', 'bg-cyan-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        const color = colorClasses[index % colorClasses.length];
                        
                        return (
                            <Card key={employee.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    {/* Employee Header */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full ${color} text-lg font-bold text-white`}
                                            >
                                                {initials}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#0b1f3a]">
                                                    {employee.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {employee.position}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {employee.department}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#0b1f3a]">
                                                {employee.currency}${parseFloat(employee.salary).toLocaleString()}/mo
                                            </p>
                                            <Badge className={`mt-1 ${
                                                employee.status === 'active' 
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                                            } capitalize`}>
                                                {employee.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Employee Details */}
                                    <div className="mb-4 space-y-2 border-t pt-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Employee ID:</span>
                                            <span className="font-medium text-gray-900">
                                                {employee.employeeId || `EMP-${String(index + 1).padStart(3, '0')}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Joined:</span>
                                            <span className="font-medium text-gray-900">
                                                {new Date(employee.createdAt).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="truncate font-medium text-gray-900 max-w-[200px]">
                                                {employee.email}
                                            </span>
                                        </div>
                                        {employee.lastPayment && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Last Payment:</span>
                                                <span className="font-medium text-gray-900">
                                                    {new Date(employee.lastPayment).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            className="flex-1 gap-2 rounded-lg bg-[#00c48c] hover:bg-[#00b37d]"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            Pay Now
                                        </Button>
                                        <button className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50">
                                            <Info className="h-4 w-4" />
                                        </button>
                                        <button className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
