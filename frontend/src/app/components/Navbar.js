"use client";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { ConnectButton } from "@/components/ConnectButton";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <nav className="flex justify-between items-center px-12 py-8 rounded-2xl shadow-sm bg-white w-full z-50">
      <div>
        <h1 className="text-2xl font-bold text-blue-600">web3hive</h1>
      </div>

      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/explore" className="hover:text-blue-500">
          Explore Talent
        </Link>
        <Link href="/post-job" className="hover:text-blue-500">
          Post a Job
        </Link>
        <Link href="/learn" className="hover:text-blue-500">
          Learn Web3
        </Link>
        <Link href="/dashboard" className="hover:text-blue-500">
          Dashboard
        </Link>
        <Link href="/ai" className="hover:text-blue-500">
          AI
        </Link>
      </ul>

      <div>
        <ConnectButton />
        {/* setIsLoggedIn={setIsLoggedIn} */}
      </div>
    </nav>
  );
};

export default Navbar;
