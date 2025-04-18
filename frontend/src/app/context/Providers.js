"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getWagmiConfig } from "@/lib/config";

const queryClient = new QueryClient();

export default function Providers({ children}) {
  const config = getWagmiConfig(); // 🧠 Memoized config

  /*const initialState = cookieToInitialState(config, cookie);*/

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#fff",
            accentColorForeground: "#000",
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
