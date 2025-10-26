"use client";
import { SignInForm } from "@/components/thirdweb/signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1929] via-[#0d2d47] to-[#0a4d3c] py-10 px-4">
      {/* Logo and Brand */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-[#00c48c]" />
        <span className="text-xl font-semibold text-white">BorderlessPay</span>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0d2438]/80 backdrop-blur-sm p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-white">Sign In</h1>
          <p className="text-sm text-white/60">
            Access your BorderlessPay account
          </p>
        </div>
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
