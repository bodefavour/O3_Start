import { SectionContainer } from "./SectionContainer";

export const SecuritySection = () => (
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
