import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PortfolioClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore a curated portfolio of published books across genres.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero title="Portfolio" current="Portfolio" />
      <PortfolioClient />
    </>
  );
}
