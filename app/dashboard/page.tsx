import type { Metadata } from "next";
import { PortfolioManager } from "@/components/dashboard/PortfolioManager";

export const metadata: Metadata = {
  title: "Dashboard | USA Ghost Writer",
  description: "Restricted portfolio management dashboard.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <PortfolioManager />;
}
