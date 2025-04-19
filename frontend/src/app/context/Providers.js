"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getWagmiConfig } from "@/lib/config";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Only initialize on client side
    setConfig(getWagmiConfig());
    setMounted(true);
  }, []);

  if (!mounted || !config) {
    // Return empty div during server-side rendering
    return <div className="hidden" />;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColorForeground: "#fff",
            borderRadius: "large",
            fontStack: "poppins",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}