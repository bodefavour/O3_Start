import { SectionContainer } from "./SectionContainer";

export const BusinessSection = () => (
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
