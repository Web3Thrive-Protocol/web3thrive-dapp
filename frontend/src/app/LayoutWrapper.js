"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";

const hiddenRoutes = ["/register", "/dashboard/freelancer", "/dashboard/recruiter"];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout = hiddenRoutes.includes(pathname) || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && <Navbar />}
      <AuthGuard>
        <main>{children}</main>
      </AuthGuard>
      {!hideLayout && <Footer />}
    </>
  );
}
