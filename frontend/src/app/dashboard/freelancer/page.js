"use client";
import { useState } from "react";
import DashboardSideBar from "@/dashboard/freelancer/DashboardSideBar";
import ProfileSection from "@/dashboard/freelancer/sections/ProfileSection";
import JobsSection from "@/dashboard/freelancer/sections/JobsSection";
import MessagesSection from "@/dashboard/freelancer/sections/MessagesSection";
import LearningSection from "@/dashboard/freelancer/sections/LearningSection";
import WalletSection from "@/dashboard/freelancer/sections/WalletSection";
import ReputationSection from "@/dashboard/freelancer/sections/ReputationSection";

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "jobs":
        return <JobsSection />;
      case "messages":
        return <MessagesSection />;
      case "learning":
        return <LearningSection />;
      case "wallet":
        return <WalletSection />;
      case "reputation":
        return <ReputationSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar - includes mobile and desktop logic */}
        <DashboardSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {renderSection()}
        </main>
      </div>
    </>
  );
}
