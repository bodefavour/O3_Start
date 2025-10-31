"use client";
import { SignInForm } from "@/components/thirdweb/signin-form";
import { HashPackConnect } from "@/components/hedera/HashPackConnect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth-provider";
import { LogIn } from "lucide-react";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);


  const handleDemoLogin = () => {
    // Create demo user data
    // Log in with demo credential

    // Redirect to dashboard
    router.push("/dashboard");
  };

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

        {/* Demo Login Button */}
        <div className="mb-6">
          <Button
            onClick={handleDemoLogin}
            className="w-full gap-2 rounded-xl bg-[#00c48c] py-6 text-base font-semibold hover:bg-[#00b37d]"
          >
            <LogIn className="h-5 w-5" />
            Demo Login (Quick Access)
          </Button>
          <p className="mt-2 text-center text-xs text-white/50">
            No registration required • Instant access
          </p>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0d2438] px-2 text-white/40">Or connect wallet</span>
          </div>
        </div>

        {/* HashPack Connection - First Priority */}
        <div className="mb-4">
          <HashPackConnect
            onConnect={(accountId) => {
              console.log("HashPack connected:", accountId);
              router.push("/dashboard");
            }}
          />
        </div>

        {/* Other Wallets */}
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
