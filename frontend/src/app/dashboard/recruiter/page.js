"use client";
import { useState } from "react";
import DashboardSideBar from "@/dashboard/recruiter/DashboardSideBar";
import ManageJobsSection from "@/dashboard/recruiter/sections/ManageJobsSection";
import ApplicantsSection from "@/dashboard/recruiter/sections/ApplicantsSection";
import MessagesSection from "@/dashboard/recruiter/sections/MessagesSection";
import WalletSection from "@/dashboard/recruiter/sections/WalletSection";
import ReputationSection from "@/dashboard/recruiter/sections/ReputationSection";
import SettingsSection from "@/dashboard/recruiter/sections/SettingsSection";

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("manageJobs");

  const renderSection = () => {
    switch (activeTab) {
      case "manageJobs":
        return <ManageJobsSection />;
      case "applicants":
        return <ApplicantsSection />;
      case "messages":
        return <MessagesSection />;
      case "wallet":
        return <WalletSection />;
      case "reputation":
        return <ReputationSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <ManageJobsSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashboardSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {renderSection()}
      </main>
    </div>
  );
}
