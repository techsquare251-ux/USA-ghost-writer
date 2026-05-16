import type { Metadata } from "next";
import { PortfolioManager } from "@/components/dashboard/PortfolioManager";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Restricted portfolio management dashboard.",
};

export default function DashboardPage() {
  return <PortfolioManager />;
}
