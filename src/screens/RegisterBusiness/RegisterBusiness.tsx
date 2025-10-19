import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const benefitCards = [
  {
    icon: "/solar-global-outline.svg",
    title: "Global Reach",
    description:
      "Send money to 50+ countries instantly with stablecoins and local currencies",
  },
  {
    icon: "/material-symbols-shield-outline.svg",
    title: "Bank-Grade Security",
    description:
      "Blockchain-powered transactions with enterprise-level compliance and KYC",
  },
  {
    icon: "/mdi-thunder.svg",
    title: "Instant Transfers",
    description:
      "Sub-second transaction speeds powered by Hedera's distributed ledger",
  },
  {
    icon: "/iconoir-dollar.svg",
    title: "Low Fees",
    description:
      "Save up to 90% on traditional banking fees for international transfers",
  },
  {
    icon: "/ant-design-rise-outlined.svg",
    title: "Real-Time Analytics",
    description:
      "Track your business finances with powerful insights and reporting tools",
  },
  {
    icon: "/mingcute-time-line.svg",
    title: "24/7 Operations",
    description:
      "Process payments any time, any day - no banking hours restrictions",
  },
];

export const RegisterBusiness = (): JSX.Element => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    country: "",
    businessType: "",
    phoneNumber: "",
    website: "",
    employeeCount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <header className="w-full px-8 py-6 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#00c48c] rounded"></div>
          <span className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-xl tracking-[0] leading-[normal]">
            BorderlessPay
          </span>
        </div>
      </header>

      <section className="w-full px-4 py-12 bg-gradient-to-br from-[#003c43] via-[#003c43] to-[#00c48c]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-5xl md:text-6xl text-center tracking-[0] leading-tight mb-6">
            Bank Beyond <span className="text-[#00c48c]">Borders</span>
          </h1>

          <p className="[font-family:'Inter',Helvetica] font-semibold text-white text-lg text-center tracking-[0] leading-relaxed max-w-[800px] mx-auto mb-12">
            Fast, transparent, and low-cost cross-border payments for African
            businesses. Send money globally, instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                24+
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Countries
              </div>
            </div>
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                &lt;2s
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Transfer Time
              </div>
            </div>
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                90%
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Free Savings
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-[#f5f5f5]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-4xl text-center tracking-[0] leading-[normal] mb-3">
            Register Your Business
          </h2>

          <p className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-lg text-center tracking-[0] leading-[normal] mb-12">
            Let's start by getting to know your business better
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="businessEmail"
                  placeholder="Enter your business email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select your country</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="kenya">Kenya</option>
                  <option value="south-africa">South Africa</option>
                  <option value="ghana">Ghana</option>
                  <option value="egypt">Egypt</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select business type</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="consulting">Consulting</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+234**********"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                  Website (optional)
                </label>
                <input
                  type="url"
                  name="website"
                  placeholder="http://yourwebsite.com"
                  value={formData.website}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal]">
                Country *
              </label>
              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-md border border-[#d1d5db] [font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c48c] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select employee count</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div className="pt-6">
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-xl tracking-[0] leading-[normal] mb-6">
                Why choose BorderlessPay?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefitCards.map((benefit, index) => (
                  <Card
                    key={index}
                    className="rounded-xl border border-solid border-[#00c48c] bg-white"
                  >
                    <CardContent className="flex flex-col items-start gap-3 p-5">
                      <img
                        className="w-6 h-6"
                        alt={benefit.title}
                        src={benefit.icon}
                      />

                      <h4 className="self-stretch [font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-base tracking-[0] leading-[normal]">
                        {benefit.title}
                      </h4>

                      <p className="self-stretch [font-family:'Inter',Helvetica] font-normal text-[#003c43] text-sm tracking-[0] leading-[normal]">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                className="bg-[#00c48c] hover:bg-[#00b37d] text-white px-8 py-6 rounded-lg [font-family:'Inter',Helvetica] font-semibold text-base"
              >
                Continue to Verification →
              </Button>
            </div>
          </form>
        </div>
      </section>

      <footer className="w-full px-4 py-8 bg-[#003c43]">
        <p className="[font-family:'Inter',Helvetica] font-normal text-white text-center text-sm tracking-[0] leading-[normal]">
          © 2025 BorderlessPay. Powered by blockchain technology. Bank beyond
          borders.
        </p>
      </footer>
    </div>
  );
};
