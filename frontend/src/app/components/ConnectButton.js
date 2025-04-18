"use client";

import { useEffect, useRef } from "react";
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";

export const ConnectButton = ({ setIsLoggedIn }) => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { backgroundColor, emoji } = emojiAvatarForAddress(address ?? "");
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isConnected, setIsLoggedIn]);

  if (!isConnected) {
    return (
      <button
        onClick={() => openConnectModal?.()}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button
        onClick={openChainModal}
        className="px-4 py-2 bg-red-500 text-white rounded-xl"
      >
        Wrong network
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200"
        onClick={openAccountModal}
      >
        <div
          className="h-6 w-6 rounded-full flex items-center justify-center"
          style={{
            backgroundColor,
            boxShadow: "0 2px 2px rgba(81, 98, 255, 0.2)",
          }}
        >
          {emoji}
        </div>
        <p className="text-sm font-medium">Account</p>
      </div>

      <button
        onClick={openChainModal}
        className="text-sm text-blue-600 hover:underline"
      >
        Switch Network
      </button>
    </div>
  );
};
