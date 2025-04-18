'use client';

import { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaComments,
  FaBook,
  FaWallet,
  FaStar,
  FaCog,
  FaBars,
} from "react-icons/fa";

const tabs = [
  { key: "profile", label: "Profile", icon: <FaUser /> },
  { key: "jobs", label: "Jobs", icon: <FaBriefcase /> },
  { key: "messages", label: "Messages", icon: <FaComments /> },
  { key: "learning", label: "Learning", icon: <FaBook /> },
  { key: "wallet", label: "Wallet", icon: <FaWallet /> },
  { key: "reputation", label: "Reputation", icon: <FaStar /> },
  { key: "settings", label: "Settings", icon: <FaCog /> },
];

export default function DashboardSideBar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <nav className="space-y-2 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => {
            setActiveTab(tab.key);
            setMobileOpen(false); // Close sidebar on mobile
          }}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            activeTab === tab.key
              ? "bg-indigo-100 text-indigo-600 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="mr-3 text-lg">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden p-4 flex justify-between items-center border-b bg-white z-50">
        <h2 className="text-xl font-bold">Freelancer</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full z-40 bg-white border-t shadow-md p-4">
          <SidebarContent />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:h-screen md:border-r md:shadow-sm md:p-6 bg-white">
        <h2 className="text-2xl font-bold mb-8">Freelancer</h2>
        <SidebarContent />
      </div>
    </>
  );
}
