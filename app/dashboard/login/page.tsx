import type { Metadata } from "next";
import DashboardLoginClient from "./dashboard-login-client";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Admin Login | USA Ghost Writer",
  description: "Secure admin login for authorized dashboard access.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}/dashboard/login`,
  },
};

export default function DashboardLoginPage() {
  return <DashboardLoginClient />;
}
