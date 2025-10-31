import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BorderlessPay - Global Payment Platform",
  description: "Fast, secure, and affordable cross-border payments powered by Hedera",
  keywords: ["hedera", "hashgraph", "payments", "crypto", "blockchain", "dapp"],
  other: {
    "hedera:network": "testnet",
    "hedera:compatible": "true",
    "dapp:name": "BorderlessPay",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThirdwebProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
