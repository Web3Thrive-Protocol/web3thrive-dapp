"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { CONTRACTS } from "@/context/constants";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const [profileExists, setProfileExists] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileRole, setProfileRole] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Manual profile check
  useEffect(() => {
    const checkProfile = async () => {
      if (!isConnected || !address) {
        setProfileExists(false);
        setProfileRole(null);
        return;
      }
  
      try {
        setLoadingProfile(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACTS.PROFILE_MANAGER.address,
          CONTRACTS.PROFILE_MANAGER.abi,
          provider
        );
  
        const profile = await contract.profiles(address);
        console.log("Raw profile data:", profile);
  
        const exists = profile.exists; // no longer index-based
        const role = profile.role;     // still a string like "freelancer"
  
        setProfileExists(exists);
        setProfileRole(role);
      } catch (error) {
        console.error("Profile check failed:", error);
        setProfileExists(false);
        setProfileRole(null);
      } finally {
        setLoadingProfile(false);
      }
    };
  
    checkProfile();
  }, [isConnected, address]);
  
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-indigo-600 cursor-pointer"
          >
            web3thrive
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLinks
                isConnected={isConnected}
                profileExists={profileExists}
                loading={loadingProfile}
                profileRole={profileRole}
                toggleMenu={toggleMenu}
              />
            </div>
            <div className="ml-6">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLinks
              isConnected={isConnected}
              profileExists={profileExists}
              loading={loadingProfile}
              profileRole={profileRole}
              toggleMenu={toggleMenu}
            />
            <div className="px-3 py-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({
  isConnected,
  profileExists,
  loading,
  profileRole,
  toggleMenu,
}) => (
  <div className="flex items-center gap-6">
    <Link
      href="/explore"
      className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
    >
      Explore Talent
    </Link>
    {profileRole === "recruiter" ? (
      <Link
        href="/post-job"
        className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
      >
        Post a Job
      </Link>
    ) : profileRole === "freelancer" ? (
      <Link
        href="/jobs"
        className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
      >
        Jobs
      </Link>
    ) : null}

    <Link
      href="/learn"
      className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
    >
      Learn Web3
    </Link>
    <ConditionalDashboardLink
      isConnected={isConnected}
      profileExists={profileExists}
      loading={loading}
      role={profileRole} // Pass the role here
      toggleMenu={toggleMenu}
    />
    <Link
      href="/faq"
      className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
    >
      FAQ
    </Link>
    <Link
      href="/ai"
      onClick={toggleMenu}
      className="block px-3 py-2 text-gray-700 hover:text-indigo-600 text-base font-medium"
    >
      AI Chat
    </Link>
    {isConnected && !loading && !profileExists && (
      <Link
        href="/register"
        className="text-red-500 hover:text-red-600 text-sm font-medium"
      >
        Complete Profile
      </Link>
    )}
  </div>
);

const MobileNavLinks = ({
  isConnected,
  profileExists,
  loading,
  profileRole,
  toggleMenu,
}) => (
  <>
    <Link
      href="/explore"
      onClick={toggleMenu}
      className="block px-3 py-2 text-gray-700 hover:text-indigo-600 text-base font-medium"
    >
      Explore Talent
    </Link>
    {profileRole === "recruiter" ? (
      <Link
        href="/post-job"
        className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
      >
        Post a Job
      </Link>
    ) : profileRole === "freelancer" ? (
      <Link
        href="/jobs"
        className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
      >
        Jobs
      </Link>
    ) : null}

    <Link
      href="/learn"
      onClick={toggleMenu}
      className="block px-3 py-2 text-gray-700 hover:text-indigo-600 text-base font-medium"
    >
      Learn Web3
    </Link>
    <ConditionalDashboardLink
      isConnected={isConnected}
      profileExists={profileExists}
      loading={loading}
      role={profileRole} // Pass the role here
      toggleMenu={toggleMenu}
    />
    <Link
      href="/faq"
      onClick={toggleMenu}
      className="block px-3 py-2 text-gray-700 hover:text-indigo-600 text-base font-medium"
    >
      FAQ
    </Link>
    <Link
      href="/ai"
      onClick={toggleMenu}
      className="block px-3 py-2 text-gray-700 hover:text-indigo-600 text-base font-medium"
    >
      AI Chat
    </Link>
    {isConnected && !loading && !profileExists && (
      <Link
        href="/register"
        onClick={toggleMenu}
        className="block px-3 py-2 text-red-500 hover:text-red-600 text-base font-medium"
      >
        Complete Profile
      </Link>
    )}
  </>
);

// In ConditionalDashboardLink component
const ConditionalDashboardLink = ({
  isConnected,
  profileExists,
  loading,
  toggleMenu,
  role,
}) => {
  if (!isConnected || loading) return null;

  // Add validation for role
  const isValidRole =
    role && ["freelancer", "recruiter"].includes(role.toLowerCase());
  const path = isValidRole ? `/dashboard/${role.toLowerCase()}` : "/register";

  console.log(role);
  return (
    <Link
      href={profileExists ? path : "/register"}
      onClick={toggleMenu}
      className="text-gray-700 hover:text-blue-500 text-sm font-medium md:block"
    >
      Dashboard
    </Link>
  );
};

export default Navbar;
