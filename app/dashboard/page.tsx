import type { Metadata } from "next";
import { PortfolioManager } from "@/components/dashboard/PortfolioManager";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Dashboard | USA Ghost Writer",
  description: "Restricted portfolio management dashboard.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}/dashboard`,
  },
};

export default function DashboardPage() {
  return <PortfolioManager />;
}
