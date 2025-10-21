import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

interface SidebarProps {
  activeItem: string;
  onNavigate?: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "▶", path: "/dashboard" },
  { id: "wallet", label: "Wallet", icon: "💳", path: "/wallet" },
  { id: "payments", label: "Payments", icon: "💸", path: "/payments" },
  { id: "invoicing", label: "Invoicing", icon: "📄", path: "/invoicing" },
  { id: "payroll", label: "Payroll", icon: "💰", path: "/payroll" },
  { id: "analytics", label: "Analytics", icon: "📊", path: "/analytics" },
  { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" },
];

export const Sidebar = ({ activeItem, onNavigate }: SidebarProps) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (onNavigate) {
      onNavigate(item.id);
    }
    // Navigate to the route
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
                ? "bg-[#00c48c] hover:bg-[#00b37d] text-black"
                : "bg-transparent hover:bg-white/10 text-white"
              }
              rounded-lg [font-family:'Inter',Helvetica] font-normal text-sm
            `}
          >
            <span className="text-base">{item.icon}</span>
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
