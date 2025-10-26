"use client";
import { ConnectButton, ConnectEmbed, lightTheme } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { User } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { truncateAddress, generateColorFromAddress } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import router from "next/router";

interface SignInButtonProps {
  label?: string;
  connectButtonStyle?: React.CSSProperties;
  detailsButtonStyle?: React.CSSProperties;
  termsOfServiceUrl?: string;
  privacyPolicyUrl?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  label = "Sign In",
  connectButtonStyle = {
    fontSize: "0.875rem sm:text-base",
    fontWeight: "normal",
    color: "#ffffff",
    backgroundColor: "#00c48c",
    border: "2px solid #00c48c",
    height: "2.25rem",
    minWidth: "auto",
  },
  detailsButtonStyle = {
    fontSize: "0.875rem sm:text-base",
    fontWeight: "semibold",
    color: "#ffffff",
    background:
      "bg-gradient-to-br from-[#0a1929] via-[#0d2d47] to-[#0a4d3c] py-10 px-4",
    border: "1px solid #00c48c",
    borderRadius: "1rem",
    height: "2.25rem",
    transition: "all 0.3s ease",
    minWidth: "auto",
  },
  termsOfServiceUrl = "https://sealedtrust.com",
  privacyPolicyUrl = "https://sealedtrust.com",
}) => {
  const activeAccount = useActiveAccount();
  const avatarBg = generateColorFromAddress(activeAccount?.address);

  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "email", "passkey"],
      },
      hidePrivateKeyExport: false,
    }),
    createWallet("com.hashpack.wallet"),
  ];

  const displayName = truncateAddress(activeAccount?.address);

  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      onConnect={(_wallet) => {
        router.push("/dashboard");
      }}
      theme={lightTheme({
        colors: {
          modalBg:
            "linear-gradient(to bottom right, #0a1929, #0d2d47, #0a4d3c)",
          borderColor: "#4f666a",
          accentText: "#00c48c",
          accentButtonBg: "#00c48c",
          separatorLine: "#00c48c33",
          tertiaryBg: "#0d2439",
          skeletonBg: "#4f666a",
          primaryText: "#ffffff",
          secondaryText: "#ffffff99",
          selectedTextColor: "var(--primary)",
          inputAutofillBg: "var(--background)",
          secondaryButtonBg: "var(--muted)",
          secondaryButtonText: "#fff",
        },
      })}
      connectButton={{
        label,
        style: connectButtonStyle,
      }}
      connectModal={{
        size: "compact",
        title: "Welcome",
        titleIcon: "/favicon/favicon.svg",
        showThirdwebBranding: false,
        termsOfServiceUrl,
        privacyPolicyUrl,
      }}
      detailsButton={{
        style: detailsButtonStyle,
        render: () => (
          <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 cursor-pointer border rounded-md p-1 sm:p-2">
            <Avatar className="w-4 h-4 sm:w-5 sm:h-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${activeAccount?.address}`}
              />
              <AvatarFallback
                className="text-xs"
                style={{ backgroundColor: avatarBg }}
              >
                <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </AvatarFallback>
            </Avatar>
            <User className="w-5 h-5 md:hidden" />
            <span className="text-xs sm:text-sm font-medium hidden xs:inline-block sm:inline-block">
              {displayName}
            </span>
          </div>
        ),
      }}
      detailsModal={{
        hideBuyFunds: true,
        hideReceiveFunds: true,
        hideSendFunds: true,
        payOptions: {
          buyWithCrypto: { testMode: true },
          buyWithFiat: { testMode: true },
        },
      }}
    />
  );
};

const SignInForm: React.FC<SignInButtonProps> = () => {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "email", "passkey"],
      },
      hidePrivateKeyExport: false,
    }),
    createWallet("com.hashpack.wallet"),
  ];

  return (
    <div>
      <ConnectEmbed
        client={thirdwebClient}
        wallets={wallets}
        onConnect={(_wallet) => {
          router.push("/dashboard");
        }}
        modalSize="compact"
        termsOfServiceUrl="/terms"
        privacyPolicyUrl="/privacy"
        showThirdwebBranding={false}
        theme={lightTheme({
          colors: {
            modalBg:
              "bg-gradient-to-br from-[#0a1929] via-[#0d2d47] to-[#0a4d3c] py-10 px-4",
            borderColor: "#4f666a",
            accentText: "#00c48c",
            accentButtonBg: "#00c48c",
            separatorLine: "#00c48c33",
            tertiaryBg: "#0d2439",
            skeletonBg: "#4f666a",
            primaryText: "#ffffff",
            secondaryText: "#ffffff99",
            selectedTextColor: "var(--primary)",
            inputAutofillBg: "var(--background)",
            secondaryButtonBg: "var(--muted)",
            secondaryButtonText: "#fff",
          },
        })}
      />
    </div>
  );
};

export { SignInButton, SignInForm };
