import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PortfolioClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio | Published Books | USA Ghost Writer",
  description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
  openGraph: {
    title: "Portfolio | Published Books | USA Ghost Writer",
    description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Published Books | USA Ghost Writer",
    description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
  },
  alternates: { canonical: "/portfolio" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/portfolio` },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero title="Portfolio" current="Portfolio" />
      <PortfolioClient />
    </>
  );
}
