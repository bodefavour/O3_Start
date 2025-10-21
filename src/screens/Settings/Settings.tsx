import { useState } from "react";
import { Sidebar } from "../Dashboard/components/Sidebar";
import { Button } from "../../components/ui/button";

const SectionContainer = ({
    title,
    subtitle,
    actionLabel,
    actionAriaLabel,
    children,
}: {
    title: string;
    subtitle: string;
    actionLabel: string;
    actionAriaLabel: string;
    children: React.ReactNode;
}) => (
    <div className="rounded-3xl border border-[#d1d5db] bg-white shadow-sm">
        <header className="flex items-center justify-between rounded-t-3xl bg-[#e6f9f2] px-8 py-6">
            <div>
                <h2 className="text-lg font-semibold text-[#0b1f3a]">{title}</h2>
                <p className="text-xs text-[#4b5563]">{subtitle}</p>
            </div>
            <Button className="rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00b37d]" aria-label={actionAriaLabel}>
                {actionLabel}
            </Button>
        </header>
        <div className="px-8 py-8">{children}</div>
    </div>
);

const ProfileSection = () => (
    <SectionContainer
        title="Profile Settings"
        subtitle="Upload a new profile picture or update your personal information"
        actionLabel="Edit Profile"
        actionAriaLabel="Edit profile information"
    >
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00c48c] text-xl font-semibold text-[#0b1f3a]">
                    MC
                </div>
                <div className="text-center text-sm text-[#4b5563]">
                    <p className="font-semibold text-[#0b1f3a]">Profile Picture</p>
                    <p>Upload a new profile picture</p>
                    <p>Change Avatar</p>
                </div>
                <Button
                    variant="outline"
                    className="rounded-xl border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] hover:bg-gray-50"
                >
                    Upload
                </Button>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                            Personal Information
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                            Update your account details below
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            First Name
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                        </label>
                        <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            Last Name
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                        </label>
                        <label className="md:col-span-2 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            Email Address
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                        </label>
                        <label className="md:col-span-2 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            Phone Number
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                            />
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                            Preferences
                        </h3>
                        <p className="text-xs text-[#6b7280]">
                            Choose how you’d like to experience the platform
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            Timezone
                            <select
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                                defaultValue="Africa/Lagos (WAT)"
                            >
                                <option>Africa/Lagos (WAT)</option>
                                <option>Africa/Nairobi (EAT)</option>
                                <option>Europe/London (GMT)</option>
                                <option>America/New_York (EST)</option>
                            </select>
                        </label>
                        <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                            Language
                            <select
                                className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                                defaultValue="English"
                            >
                                <option>English</option>
                                <option>French</option>
                                <option>Spanish</option>
                                <option>Swahili</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Account Status
                    </h3>
                    <div className="mt-3 rounded-2xl border border-[#d1d5db] bg-[#e6f1ff] px-5 py-4">
                        <p className="flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#1d4ed8]">
                                i
                            </span>
                            Verified Account
                        </p>
                        <p className="mt-2 text-xs text-[#4b5563]">
                            Your account is fully verified and active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </SectionContainer>
);

const BusinessSection = () => (
    <SectionContainer
        title="Business Settings"
        subtitle="Update your business profile and compliance information"
        actionLabel="Edit Business Info"
        actionAriaLabel="Edit business information"
    >
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Business Information
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Ensure your business details are accurate and up to date
                    </p>
                </div>
                <div className="grid gap-4">
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Business Name
                        <input
                            type="text"
                            placeholder="Enter your business name"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Business Type
                        <input
                            type="text"
                            placeholder="Enter your business type"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Registration Number
                        <input
                            type="text"
                            placeholder="Enter your registration number"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Tax ID
                        <input
                            type="text"
                            placeholder="Enter your tax identification number"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Business Address
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        The address associated with your business account
                    </p>
                </div>
                <div className="grid gap-4">
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Street Address
                        <input
                            type="text"
                            placeholder="Enter your street address"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        City
                        <input
                            type="text"
                            placeholder="Enter your city"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Postal Code
                        <input
                            type="text"
                            placeholder="Enter your postal code"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Country
                        <select className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none" defaultValue="Nigeria">
                            <option>Nigeria</option>
                            <option>Ghana</option>
                            <option>Kenya</option>
                            <option>South Africa</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Contact Information
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Who should we reach out to for business-related communications?
                    </p>
                </div>
                <div className="grid gap-4">
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Contact Name
                        <input
                            type="text"
                            placeholder="Enter contact name"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Contact Email
                        <input
                            type="email"
                            placeholder="Enter contact email"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Contact Phone
                        <input
                            type="tel"
                            placeholder="Enter contact phone"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                    Account Status
                </h3>
                <div className="mt-3 rounded-2xl border border-[#d1d5db] bg-[#e6f1ff] px-5 py-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#1d4ed8]">
                            i
                        </span>
                        Verified Account
                    </p>
                    <p className="mt-2 text-xs text-[#4b5563]">
                        Your business is fully verified and active
                    </p>
                </div>
            </div>
        </div>
    </SectionContainer>
);

const SecuritySection = () => (
    <SectionContainer
        title="Security Settings"
        subtitle="Manage password, two-factor authentication, and active sessions"
        actionLabel="Update Password"
        actionAriaLabel="Update account password"
    >
        <div className="space-y-8">
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Change Password
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Choose a strong password to keep your account secure
                    </p>
                </div>
                <div className="grid gap-4">
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Current Password
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        New Password
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                        Registration Number
                        <input
                            type="text"
                            placeholder="Enter registration number"
                            className="mt-2 w-full rounded-xl border border-[#d1d5db] bg-white px-4 py-2 text-sm text-[#0b1f3a] focus:outline-none"
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Use an authenticator app to generate verification codes
                    </p>
                </div>
                <div className="rounded-2xl border border-[#d1d5db] bg-[#f6fff9] p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[#0b1f3a]">Authenticator App</p>
                            <p className="text-xs text-[#6b7280]">
                                Two-factor authentication is enabled. Your account is protected with 2FA.
                            </p>
                        </div>
                        <input type="checkbox" checked readOnly className="h-4 w-4 accent-[#00c48c]" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Security Preferences
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Control notifications and session settings for your account
                    </p>
                </div>
                <div className="space-y-3">
                    <label className="flex items-center justify-between rounded-2xl border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0b1f3a]">
                        <span>
                            Login Notifications
                            <span className="block text-xs text-[#6b7280]">
                                Get notified when someone logs into your account
                            </span>
                        </span>
                        <input type="checkbox" checked readOnly className="h-4 w-4 accent-[#00c48c]" />
                    </label>
                    <label className="flex items-center justify-between rounded-2xl border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0b1f3a]">
                        <span>
                            Session Timeout
                            <span className="block text-xs text-[#6b7280]">
                                Automatically log out after inactivity
                            </span>
                        </span>
                        <input type="checkbox" readOnly className="h-4 w-4 accent-[#00c48c]" />
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0b1f3a]">
                        Active Sessions
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        Review the devices currently signed in to your account
                    </p>
                </div>
                <div className="space-y-3">
                    {[
                        { device: "MacBook Pro", location: "Lagos, Nigeria", lastActive: "2024-01-15 14:30", status: "Active", statusClass: "bg-[#e6f9f2] text-[#0f766e]" },
                        { device: "iPhone 15", location: "Lagos, Nigeria", lastActive: "2024-01-15 12:15", status: "Inactive", statusClass: "bg-[#fee2e2] text-[#b91c1c]" },
                        { device: "Chrome Browser", location: "Nairobi, Kenya", lastActive: "2024-01-14 09:45", status: "Inactive", statusClass: "bg-[#fee2e2] text-[#b91c1c]" },
                    ].map((session) => (
                        <div
                            key={session.device}
                            className="rounded-2xl border border-[#d1d5db] bg-white px-4 py-4 text-sm text-[#0b1f3a]"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <p className="font-semibold">{session.device}</p>
                                    <p className="text-xs text-[#6b7280]">{session.location}</p>
                                    <p className="text-xs text-[#9ca3af]">Last active: {session.lastActive}</p>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-3 py-[2px] text-xs font-semibold ${session.statusClass}`}>
                                    {session.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </SectionContainer>
);

const PlaceholderSection = ({ label }: { label: string }) => (
    <SectionContainer
        title={`${label} Settings`}
        subtitle={`Configuration options for ${label.toLowerCase()} will appear here.`}
        actionLabel="Coming Soon"
        actionAriaLabel={`Coming soon for ${label}`}
    >
        <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-10 text-center">
            <h3 className="text-lg font-semibold text-[#0b1f3a]">Section in progress</h3>
            <p className="mt-2 text-sm text-[#6b7280]">
                This area will be populated with {label.toLowerCase()} controls soon.
            </p>
        </div>
    </SectionContainer>
);

const sections = [
    { id: "profile", label: "Profile" },
    { id: "business", label: "Business" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "API & Integration" },
];

export const Settings = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("settings");
    const [activeSection, setActiveSection] = useState("profile");

    const handleNavigate = (item: string) => {
        setActiveMenuItem(item);
    };

    return (
        <div className="flex h-screen bg-[#f5f5f5]">
            <Sidebar activeItem={activeMenuItem} onNavigate={handleNavigate} />
            <div className="flex-1 overflow-y-auto">
                <header className="border-b border-[#e5e7eb] bg-white px-8 py-6">
                    <h1 className="text-2xl font-semibold text-[#0b1f3a]">Settings</h1>
                    <p className="mt-1 text-sm text-[#6b7280]">
                        Manage your account and preferences
                    </p>
                </header>

                <main className="flex flex-col gap-8 px-8 py-8 lg:flex-row">
                    <aside className="w-full max-w-xs rounded-2xl border border-[#d1d5db] bg-white p-6">
                        <nav className="flex flex-col gap-3">
                            {sections.map((section) => (
                                <Button
                                    key={section.id}
                                    variant={activeSection === section.id ? "default" : "outline"}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`justify-start rounded-xl px-4 py-2 text-sm font-semibold transition ${activeSection === section.id
                                            ? "bg-[#00c48c] text-[#0b1f3a] hover:bg-[#00b37d]"
                                            : "border-[#d1d5db] bg-white text-[#0b1f3a] hover:bg-gray-50"
                                        }`}
                                >
                                    {section.label}
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <section className="flex-1">
                        {activeSection === "profile" && (
                            <ProfileSection />
                        )}
                        {activeSection === "business" && (
                            <BusinessSection />
                        )}
                        {activeSection === "security" && <SecuritySection />}
                        {activeSection !== "profile" &&
                            activeSection !== "business" &&
                            activeSection !== "security" && (
                                <PlaceholderSection
                                    label={sections.find((section) => section.id === activeSection)?.label ?? ""}
                                />
                            )}
                    </section>
                </main>
            </div>
        </div>
    );
};
