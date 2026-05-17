import type { Metadata } from "next";
import DashboardLoginClient from "./dashboard-login-client";

export const metadata: Metadata = {
  title: "Admin Login | USA Ghost Writer",
  robots: { index: false, follow: false },
};

export default function DashboardLoginPage() {
  return <DashboardLoginClient />;
}
