import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider, ToastProvider } from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BorderlessPay - Global Payment Platform",
  description: "Fast, secure, and affordable cross-border payments powered by Hedera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          <ToastProvider>
            <ThirdwebProvider>
              {children}
              <Toaster position="top-center" />
            </ThirdwebProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
