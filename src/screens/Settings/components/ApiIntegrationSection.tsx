import { SectionContainer } from "./SectionContainer";
import { Button } from "../../../components/ui/button";

const webhookEndpoints = [
    {
        url: "https://api.yourapp.com/webhooks/payments",
        lastDelivery: "2024-01-15 14:30",
        status: "Active",
        owner: "finance@borderlesspay.com",
    },
    {
        url: "https://api.yourapp.com/webhooks/transactions",
        lastDelivery: "2024-01-10 09:15",
        status: "Inactive",
        owner: "tech@borderlesspay.com",
    },
];

const apiKeys = [
    {
        id: "production",
        name: "Production API Key",
        created: "2024-01-01",
        key: "bp_live_sk_12345f67890acdef",
        status: "Active",
        permissions: ["payments", "wallets", "reports"],
        lastUsed: "2024-01-15",
    },
    {
        id: "development",
        name: "Development API Key",
        created: "2024-01-10",
        key: "bp_test_sk_abcd1234567890",
        status: "Active",
        permissions: ["payments", "sandbox"],
        lastUsed: "2024-01-14",
    },
];

const rateLimits = [
    { label: "Requests per Day", value: "1,000", used: "450 used" },
    { label: "Requests per Hour", value: "10,000", used: "2,100 used" },
    { label: "Requests per Minute", value: "100,000", used: "13,000 used" },
];

export const ApiIntegrationSection = () => (
    <SectionContainer
        title="API & Integrations"
        subtitle="Manage your API keys and webhook integrations"
        actions={
            <div className="flex flex-wrap gap-3">
                <Button className="rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00b37d]">
                    + Create API Key
                </Button>
                <Button
                    variant="outline"
                    className="rounded-xl border-[#00c48c] px-4 py-2 text-sm font-semibold text-[#00c48c] hover:bg-[#e6f9f2]"
                >
                    + Add Webhooks
                </Button>
            </div>
        }
    >
        <div className="space-y-8">
            <div className="space-y-4 rounded-2xl border border-[#d1d5db] bg-[#f9fafb] p-5">
                <h3 className="text-sm font-semibold text-[#0b1f3a]">Webhook Endpoints</h3>
                <p className="text-xs text-[#6b7280]">
                    Manage delivery status and owners for your webhook endpoints
                </p>
                <div className="space-y-3">
                    {webhookEndpoints.map((endpoint) => (
                        <div
                            key={endpoint.url}
                            className="rounded-2xl border border-[#d1d5db] bg-white px-4 py-4 text-sm text-[#0b1f3a]"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <p className="font-semibold text-[#0b1f3a]">{endpoint.url}</p>
                                    <p className="text-xs text-[#6b7280]">Last delivery: {endpoint.lastDelivery}</p>
                                    <p className="text-xs text-[#00b37d]">Owner: {endpoint.owner}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                            endpoint.status === "Active"
                                                ? "bg-[#e6f9f2] text-[#047857]"
                                                : "bg-[#fee2e2] text-[#b91c1c]"
                                        }`}
                                    >
                                        {endpoint.status}
                                    </span>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-[#d1d5db] px-3 py-1 text-xs font-semibold text-[#0b1f3a] hover:bg-gray-50"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-[#d1d5db] px-3 py-1 text-xs font-semibold text-[#b91c1c] hover:bg-[#fee2e2]"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#0b1f3a]">API Keys</h3>
                <div className="grid gap-4 lg:grid-cols-2">
                    {apiKeys.map((key) => (
                        <div key={key.id} className="space-y-4 rounded-2xl border border-[#d1d5db] bg-[#f6fff9] p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-[#0b1f3a]">{key.name}</p>
                                    <p className="text-xs text-[#6b7280]">Created: {key.created}</p>
                                </div>
                                <span className="rounded-full bg-[#e6f9f2] px-3 py-1 text-xs font-semibold text-[#047857]">
                                    {key.status}
                                </span>
                            </div>
                            <div className="space-y-2 rounded-xl border border-dashed border-[#a7f3d0] bg-white px-4 py-3">
                                <div className="flex items-center justify-between gap-3 text-xs text-[#0b1f3a]">
                                    <span className="truncate font-mono">{key.key}</span>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-[#d1d5db] px-3 py-1 text-xs font-semibold text-[#0b1f3a] hover:bg-gray-50"
                                    >
                                        copy
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {key.permissions.map((permission) => (
                                        <span
                                            key={permission}
                                            className="rounded-full bg-[#e0f2fe] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1d4ed8]"
                                        >
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-[#9ca3af]">Last used: {key.lastUsed}</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    className="rounded-full border-[#d1d5db] px-3 py-1 text-xs font-semibold text-[#0b1f3a] hover:bg-gray-50"
                                >
                                    Revoke
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div className="space-y-3 rounded-2xl border border-[#d1d5db] bg-[#e8f0ff] p-5">
                    <h3 className="text-sm font-semibold text-[#0b1f3a]">BorderlessPay API Documentation</h3>
                    <p className="text-xs text-[#4b5563]">
                        Complete guide to integrating with our payment and financial services API.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {["View documentation", "Code examples", "Postman Collection"].map((link) => (
                            <Button
                                key={link}
                                variant="outline"
                                className="rounded-full border-[#d1d5db] px-4 py-2 text-xs font-semibold text-[#0b1f3a] hover:bg-white"
                            >
                                {link}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-[#d1d5db] bg-[#f6fff9] p-5">
                    <h3 className="text-sm font-semibold text-[#0b1f3a]">Rate Limits</h3>
                    <p className="text-xs text-[#6b7280]">Track your usage across each rate limit window.</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {rateLimits.map((limit) => (
                            <div key={limit.label} className="rounded-2xl border border-[#d1d5db] bg-white px-4 py-4 text-center">
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">{limit.label}</p>
                                <p className="mt-2 text-xl font-semibold text-[#0b1f3a]">{limit.value}</p>
                                <p className="text-xs text-[#00b37d]">{limit.used}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </SectionContainer>
);
