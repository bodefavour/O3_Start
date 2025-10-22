import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const SignIn = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: wire real auth here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold text-[#0b1f3a]">Sign in</h1>
        <p className="mb-6 text-sm text-[#1f3a5c]">Enter your account details to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#1f3a5c]">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00c48c]/40"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#1f3a5c]">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00c48c]/40"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#1f3a5c]">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-200" />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-sm text-[#0b1f3a]/80 underline"
            >
              Create account
            </button>
          </div>

          <div>
            <Button type="submit" className="w-full rounded-xl bg-[#00c48c] px-4 py-2 text-sm font-semibold text-[#0b1f3a]">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
