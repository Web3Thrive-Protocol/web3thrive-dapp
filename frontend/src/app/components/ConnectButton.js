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
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setIsLoggedIn(isConnected);
    }
  }, [isConnected, setIsLoggedIn]);

  if (!isConnected) {
    return (
      <button
        onClick={openConnectModal}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  if (isConnected && !chain?.id) {
    return (
      <button
        onClick={openChainModal}
        className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
      >
        Wrong Network
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Account Preview */}
      <div
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={openAccountModal}
        role="button"
        tabIndex={0}
      >
        <div
          className="h-6 w-6 rounded-full flex items-center justify-center text-sm"
          style={{ 
            backgroundColor,
            boxShadow: "0 2px 2px rgba(81, 98, 255, 0.2)"
          }}
        >
          {emoji}
        </div>
        <span className="text-sm font-medium text-gray-700">Account</span>
      </div>

      {/* Network Switcher */}
      <button
        onClick={openChainModal}
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        Switch Network
      </button>
    </div>
  );
};