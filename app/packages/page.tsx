import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { publishingPackages } from "@/src/data/packages";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { homeFaqs } from "@/src/data/faqs";
import FaqJsonLd from "@/components/seo/FaqJsonLd";

export const metadata: Metadata = {
  title: "Publishing Packages | Prices & Tiers | USA Ghost Writer",
  description:
    "Compare publishing packages, pricing, and what's included to choose the right tier for your manuscript and goals. Start your project today.",
  openGraph: {
    title: "Publishing Packages | Prices & Tiers | USA Ghost Writer",
    description:
      "Compare publishing packages, pricing, and what's included to choose the right tier for your manuscript and goals. Start your project today.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/packages`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishing Packages | Prices & Tiers | USA Ghost Writer",
    description:
      "Compare publishing packages, pricing, and what's included to choose the right tier for your manuscript and goals. Start your project today.",
  },
  alternates: { canonical: "/packages" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com" },
    { "@type": "ListItem", position: 2, name: "Packages", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/packages` },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FaqJsonLd items={homeFaqs} />
      <PageHero title="Publishing Packages" current="Packages" />
      <PackagesSection compact />

      <section className="mx-auto max-w-container px-4 mt-10">
        <div className="overflow-x-auto rounded-2xl border border-brand-green/12 bg-white shadow-[0_10px_30px_-18px_rgba(11,60,109,0.3)]">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-cream text-left text-brand-charcoal">
              <tr>
                <th className="px-4 py-3">Feature Category</th>
                {publishingPackages.map((pkg) => (
                  <th key={pkg.name} className="px-4 py-3">
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(publishingPackages.flatMap((pkg) => pkg.featureGroups.map((g) => g.title)))).map((group) => (
                <tr key={group} className="border-t border-brand-green/12">
                  <td className="px-4 py-3 font-medium text-brand-charcoal">{group}</td>
                  {publishingPackages.map((pkg) => {
                    const match = pkg.featureGroups.find((g) => g.title === group);
                    return (
                      <td key={`${pkg.name}-${group}`} className="px-4 py-3 text-brand-muted">
                        {match ? "✓ Included" : "✗"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-brand-muted">
          Payment terms: 50% upfront, remaining 50% in 2-3 months or after 3 chapters.
        </p>
      </section>

      <FAQAccordion items={homeFaqs} title="Packages FAQ" />
    </>
  );
}
