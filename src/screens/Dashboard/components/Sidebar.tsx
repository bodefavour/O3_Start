import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet as WalletIcon,
  CreditCard,
  FileText,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

interface SidebarProps {
  activeItem: string;
  onNavigate?: (item: string) => void;
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

export const Sidebar = ({ activeItem, onNavigate }: SidebarProps) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (onNavigate) {
      onNavigate(item.id);
    }

    navigate(item.path);
  };

  return (
    <div className="w-[176px] h-screen bg-[#0b1f3a] flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#00c48c] rounded" />
          <span className="[font-family:'Inter',Helvetica] font-semibold text-white text-sm">
            BorderlessPay
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={`
              w-full h-[38px] justify-start gap-2 px-4 py-2
              ${activeItem === item.id
                ? "bg-[#00c48c] hover:bg-[#00b37d] text-[#0b1f3a]"
                : "bg-transparent hover:bg-white/10 text-white"
              }
              rounded-lg [font-family:'Inter',Helvetica] font-normal text-sm
            `}
          >
            <item.icon
              className={`w-4 h-4 ${
                activeItem === item.id ? "text-[#0b1f3a]" : "text-white"
              }`}
            />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile Section */}
      <div className="p-4">
        <Separator className="bg-white/20 mb-4" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00c48c] rounded-full flex items-center justify-center">
            <span className="[font-family:'Inter',Helvetica] font-semibold text-[#0b1f3a] text-sm">
              OV
            </span>
          </div>
          <div className="flex flex-col">
            <div className="[font-family:'Inter',Helvetica] font-medium text-white text-xs">
              Oba Vincent
            </div>
            <div className="[font-family:'Inter',Helvetica] font-normal text-white/60 text-[10px]">
              Premium Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
