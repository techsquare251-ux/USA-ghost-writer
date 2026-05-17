import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ServiceCard } from "@/components/common/ServiceCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/src/data/services";

export const metadata: Metadata = {
  title: "Publishing Services | Ghostwriting & Editing | USA Ghost Writer",
  description:
    "Publishing services: ghostwriting, editing, design, and distribution to bring your book to market professionally. Explore our offerings.",
  openGraph: {
    title: "Publishing Services | Ghostwriting & Editing | USA Ghost Writer",
    description:
      "Publishing services: ghostwriting, editing, design, and distribution to bring your book to market professionally. Explore our offerings.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/services`,
    siteName: "USA Ghost Writer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishing Services | Ghostwriting & Editing | USA Ghost Writer",
    description:
      "Publishing services: ghostwriting, editing, design, and distribution to bring your book to market professionally. Explore our offerings.",
  },
  alternates: { canonical: "/services" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero title="Publishing Services" current="Services" />

      <section className="mx-auto max-w-container px-4 py-20">
        <SectionHeader
          centered
          eyebrow="All Services"
          title="Specialized Services For Every Publishing Stage"
          subtitle="Choose a service to learn how our team approaches quality, delivery, and outcomes for your project."
        />

        <div className="mt-10">
          <div className="mb-6 text-center">
            <p className="mx-auto max-w-2xl text-sm text-brand-muted">
              We provide a full suite of publishing services — from ghostwriting and editing to design, production, and distribution. Click a card to read more about a specific offering.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
