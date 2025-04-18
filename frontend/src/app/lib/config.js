import { http } from "wagmi";
import { sepolia, arbitrumSepolia } from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const curtis = {
  id: 33111,
  name: "Curtis",
  nativeCurrency: {
    name: "ApeCoin",
    symbol: "APE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://curtis.betteruptime.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "nitro-curtis explorer",
      url: "https://curtis.explorer.caldera.xyz/",
    },
  },
  contract: {
    multicall3: {
      address: "0x4dA8Dd72d43d7e26ACe1188d6ACa52d1b3CD3F65",
      blockCreated: 9244266,
    },
    standardGateway: {
      address: "0x5b6cbA57e0BB050CBD1145C8B2C70BC80d997DA5",
    },
    rollup: {
      address: "0x276b8853606a63954A0FD903bb319AbCd9263830",
    },
  },
};

// Singleton config
let wagmiConfig;

export function getWagmiConfig() {
  if (!wagmiConfig) {
    const chains = [sepolia, arbitrumSepolia, curtis];
    wagmiConfig = getDefaultConfig({
      appName: "Web3Thrive",
      projectId: "6f03923749def6e38136d11c7f08a112",
      chains,
      transports: chains.reduce(
        (obj, chain) => ({ ...obj, [chain.id]: http() }),
        {}
      ),
      ssr: false, // ✅ DISABLE SSR
    });
  }

  return wagmiConfig;
}
