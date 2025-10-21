import { CalendarDays, DollarSign, Mail, MoreHorizontal, PencilLine, Phone } from "lucide-react";

interface EmployeeCardProps {
  name: string;
  role: string;
  department: string;
  salary: string;
  status: string;
  employeeId: string;
  joinedDate: string;
  email: string;
  phone: string;
  avatarColor?: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 0) {
    return "";
  }
  if (parts.length === 1) {
    return parts[0][0] ?? "";
  }
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
};

export const EmployeeCard = ({
  name,
  role,
  department,
  salary,
  status,
  employeeId,
  joinedDate,
  email,
  phone,
  avatarColor = "#00c48c",
}: EmployeeCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#d1d5db] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: avatarColor }}
        >
          {getInitials(name)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0b1f3a]">{name}</h3>
              <p className="text-sm text-[#6b7280]">{role}</p>
              <p className="text-xs text-[#9ca3af]">{department}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-[#0b1f3a]">{salary}</p>
              <span className="inline-flex items-center rounded-full bg-[#e6f9f2] px-3 py-[2px] text-xs font-medium text-[#0f766e]">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-sm text-[#4b5563] md:grid-cols-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-[#9ca3af]" />
          <span>
            Employee ID: <strong className="font-semibold text-[#0b1f3a]">{employeeId}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#9ca3af]" />
          <span>
            Joined: <strong className="font-semibold text-[#0b1f3a]">{joinedDate}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 break-all">
          <Mail className="h-4 w-4 text-[#9ca3af]" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#9ca3af]" />
          <span>{phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 text-[#1d4ed8]">
        <button type="button" aria-label="Edit employee">
          <PencilLine className="h-4 w-4" />
        </button>
        <button type="button" aria-label="More actions">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
