import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PortfolioClient } from "./portfolio-client";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Portfolio | Published Books | USA Ghost Writer",
  description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
  openGraph: {
    title: "Portfolio | Published Books | USA Ghost Writer",
    description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
    url: `${SITE_URL}/portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Published Books | USA Ghost Writer",
    description: "Explore our portfolio of published books across genres and see examples of author projects we've produced.",
  },
  alternates: { canonical: `${SITE_URL}/portfolio` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
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
