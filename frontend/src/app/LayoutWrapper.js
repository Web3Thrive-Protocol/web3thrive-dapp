"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hiddenRoutes = ["/register", "/dashboard/freelancer", "/dashboard/recruiter"];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout = hiddenRoutes.includes(pathname) || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && <Navbar />}
        <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
