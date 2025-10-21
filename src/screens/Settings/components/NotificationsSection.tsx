import { SectionContainer } from "./SectionContainer";

interface NotificationToggleRowProps {
    label: string;
    description?: string;
    enabled?: boolean;
    disabled?: boolean;
}

const NotificationToggleRow = ({
    label,
    description,
    enabled = false,
    disabled = false,
}: NotificationToggleRowProps) => (
    <label
        className={`flex items-center justify-between rounded-2xl border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0b1f3a] ${disabled ? "opacity-50" : ""}`}
    >
        <span>
            {label}
            {description && (
                <span className="block text-xs text-[#6b7280]">{description}</span>
            )}
        </span>
        <input
            type="checkbox"
            defaultChecked={enabled}
            disabled={disabled}
            className="h-5 w-5 accent-[#00c48c]"
        />
    </label>
);

const NotificationCard = ({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    items: NotificationToggleRowProps[];
}) => (
    <div className="space-y-3 rounded-2xl border border-[#d1d5db] bg-[#e6f9f2] p-5">
        <div>
            <h3 className="text-sm font-semibold text-[#0b1f3a]">{title}</h3>
            <p className="text-xs text-[#6b7280]">{description}</p>
        </div>
        <div className="space-y-3">
            {items.map((item) => (
                <NotificationToggleRow key={item.label} {...item} />
            ))}
        </div>
    </div>
);

export const NotificationsSection = () => (
    <SectionContainer
        title="Notification Settings"
        subtitle="Manage how you receive notifications"
    >
        <div className="space-y-6">
            <NotificationCard
                title="Email Notifications"
                description="Receive notifications via email"
                items={[
                    {
                        label: "Transaction Alerts",
                        description: "Get notified about all transactions",
                        enabled: true,
                    },
                    {
                        label: "Payment Received",
                        description: "When you receive payments",
                        enabled: true,
                    },
                    {
                        label: "Payment Failed",
                        description: "When payments fail or are declined",
                        enabled: true,
                    },
                    {
                        label: "Weekly Reports",
                        description: "Summary of your weekly activity",
                        enabled: false,
                    },
                    {
                        label: "Monthly Statements",
                        description: "Detailed monthly financial statements",
                        enabled: true,
                    },
                    {
                        label: "Security Alerts",
                        description: "Important security notifications",
                        enabled: true,
                    },
                ]}
            />

            <NotificationCard
                title="Push Notifications"
                description="Receive notifications on your devices"
                items={[
                    {
                        label: "Transaction Updates",
                        description: "Real-time transaction notifications",
                        enabled: true,
                    },
                    {
                        label: "Payment Notifications",
                        description: "Payment status updates",
                        enabled: true,
                    },
                    {
                        label: "Security Alerts",
                        description: "Security-related notifications",
                        enabled: true,
                    },
                    {
                        label: "Marketing Updates",
                        description: "Product updates and promotions",
                        enabled: false,
                    },
                ]}
            />

            <NotificationCard
                title="SMS Notifications"
                description="Receive notifications via text message"
                items={[
                    {
                        label: "Transaction Alerts",
                        description: "SMS alerts for transactions",
                        enabled: true,
                    },
                    {
                        label: "Security Alerts",
                        description: "Critical security notifications",
                        enabled: true,
                    },
                    {
                        label: "Marketing Messages",
                        description: "Promotional messages and updates",
                        enabled: false,
                        disabled: true,
                    },
                ]}
            />

            <div className="space-y-3 rounded-2xl border border-[#d1d5db] bg-[#e6f9f2] p-5">
                <div>
                    <h3 className="text-sm font-semibold text-[#0b1f3a]">Notification Schedule</h3>
                    <p className="text-xs text-[#6b7280]">Control when you receive notifications</p>
                </div>
                <div className="space-y-3">
                    <NotificationToggleRow
                        label="Weekend Notifications"
                        description="Receive notifications on weekends"
                        enabled
                    />
                    <div className="rounded-2xl border border-[#d1d5db] bg-white px-4 py-4 text-sm text-[#0b1f3a]">
                        <p className="font-semibold">Quiet Hours</p>
                        <p className="text-xs text-[#6b7280]">
                            Disable non-critical notifications during these hours
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <input
                                type="time"
                                defaultValue="22:00"
                                className="h-10 rounded-xl border border-[#d1d5db] bg-white px-4 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                            <span className="text-[#6b7280]">to</span>
                            <input
                                type="time"
                                defaultValue="07:00"
                                className="h-10 rounded-xl border border-[#d1d5db] bg-white px-4 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionContainer>
);
