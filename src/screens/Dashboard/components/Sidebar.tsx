import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet as WalletIcon,
  CreditCard,
  FileText,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

interface SidebarProps {
  activeItem: string;
  onNavigate?: (item: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "wallet", label: "Wallet", icon: WalletIcon, path: "/wallet" },
  { id: "payments", label: "Payments", icon: CreditCard, path: "/payments" },
  { id: "invoicing", label: "Invoicing", icon: FileText, path: "/invoicing" },
  { id: "payroll", label: "Payroll", icon: Users, path: "/payroll" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export const Sidebar = ({
  activeItem,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (onNavigate) {
      onNavigate(item.id);
    }

    navigate(item.path);
  };

  return (
    <div
      className={`flex h-full flex-shrink-0 flex-col overflow-hidden bg-[#0b1f3a] transition-all duration-300 ${collapsed
        ? "w-16 max-sm:w-0 max-sm:-translate-x-full max-sm:pointer-events-none max-sm:opacity-0"
        : "w-[176px] max-sm:w-[240px] max-sm:translate-x-0 max-sm:pointer-events-auto max-sm:opacity-100"
        } max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:z-40 max-sm:h-full max-sm:shadow-xl max-sm:transition-transform`}
    >
      {/* Logo/Brand */}
      <div className="px-3 pt-4 pb-3">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div className={`flex items-center ${collapsed ? "gap-0" : "gap-2"}`}>
            <div className="h-6 w-6 rounded bg-[#00c48c]" />
            {!collapsed && (
              <span className="[font-family:'Inter',Helvetica] text-sm font-semibold text-white">
                BorderlessPay
              </span>
            )}
          </div>
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="ml-2 h-8 w-8 rounded-lg border border-white/10 bg-white/10 text-white hover:bg-white/20"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className={`flex flex-col gap-2 pb-4 ${collapsed ? "px-2" : "px-4"}`}>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={`
              w-full h-[42px] ${collapsed ? "justify-center px-2" : "justify-start px-4"} gap-2 py-2
              ${activeItem === item.id
                ? "bg-[#00c48c] hover:bg-[#00b37d] text-[#0b1f3a]"
                : "bg-transparent hover:bg-white/10 text-white"
              }
              rounded-lg [font-family:'Inter',Helvetica] font-normal text-sm
            `}
          >
            <item.icon
              className={`w-4 h-4 ${activeItem === item.id ? "text-[#0b1f3a]" : "text-white"
                }`}
            />
            {!collapsed && item.label}
          </Button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile Section */}
      <div className="px-3 pb-5">
        <Separator className="mb-4 bg-white/20" />
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-2"}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00c48c]">
            <span className="[font-family:'Inter',Helvetica] text-sm font-semibold text-[#0b1f3a]">
              OV
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <div className="[font-family:'Inter',Helvetica] text-xs font-medium text-white">
                Oba Vincent
              </div>
              <div className="[font-family:'Inter',Helvetica] text-[10px] font-normal text-white/60">
                Premium Account
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
