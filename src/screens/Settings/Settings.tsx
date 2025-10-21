import { useState } from "react";
import { Sidebar } from "../Dashboard/components/Sidebar";
import { Button } from "../../components/ui/button";

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
                  className={`justify-start rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activeSection === section.id
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
            <div className="rounded-3xl border border-[#d1d5db] bg-white shadow-sm">
              <header className="flex items-center justify-between rounded-t-3xl bg-[#e6f9f2] px-8 py-6">
                <div>
                  <h2 className="text-lg font-semibold text-[#0b1f3a]">
                    Profile Settings
                  </h2>
                  <p className="text-xs text-[#4b5563]">
                    Upload a new profile picture or update your personal information
                  </p>
                </div>
                <Button className="rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00b37d]">
                  Edit Profile
                </Button>
              </header>

              <div className="grid gap-8 px-8 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
