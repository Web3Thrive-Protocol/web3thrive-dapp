"use client";

import { useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getProfile } from "@/utils/contracts/profile";
import { getProvider } from "@/utils/ethers";

export default function AuthGuard({ children }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isConnected) return setChecking(false);
    if (pathname === "/register") return setChecking(false);

    ;(async () => {
      try {
        const provider = getProvider();
        const profile = await getProfile(provider, address);

        if (!profile.exists) {
          return router.replace("/register");
        }

        const role = profile.role.toLowerCase();
        if (role === "freelancer" && !pathname.startsWith("/dashboard/freelancer")) {
          return router.replace("/dashboard/freelancer");
        }

        if (role === "recruiter" && pathname.startsWith("/dashboard/recruiter")) {
          return router.replace("/dashboard/recruiter");
        }
      } catch (err) {
        console.error("AuthGuard error:", err);
      } finally{
        setChecking(false);
      }
    })();
  }, [address, pathname, isConnected]);
  
  if(checking){
    return (
        <div className="flex items-center justify-center h-screen">
            Checking authetication...
        </div>
    );
  }
  
  return children;
}
