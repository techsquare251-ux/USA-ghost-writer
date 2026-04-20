import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { publishingPackages } from "@/src/data/packages";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { homeFaqs } from "@/src/data/faqs";

export const metadata: Metadata = {
  title: "Packages",
  description: "Compare publishing packages and choose the right tier for your manuscript goals.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero title="Publishing Packages" current="Packages" />

      <section className="mx-auto max-w-container px-4 py-20">
        <SectionHeader
          centered
          eyebrow="Plans"
          title="Choose The Right Publishing Tier"
          subtitle="Packages are grouped by depth of support, production scope, and launch intensity."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {publishingPackages.map((item) => (
            <article
              key={item.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                item.featured
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-brand-green/10 bg-white text-brand-charcoal"
              }`}
            >
              <p className={`text-sm ${item.featured ? "text-white/80" : "text-brand-muted"}`}>{item.name}</p>
              <p className="mt-2 text-4xl font-semibold">{item.price}</p>

              <div className="mt-5 space-y-4">
                {item.featureGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className={`text-sm font-semibold ${item.featured ? "text-white" : "text-brand-charcoal"}`}>
                      {group.title}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {group.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-2 text-sm ${item.featured ? "text-white/90" : "text-brand-muted"}`}
                        >
                          <Check className="mt-0.5 size-4 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href={`/contact-us?package=${encodeURIComponent(item.name)}`}
                className={`mt-6 inline-flex rounded-md px-4 py-2 text-sm font-semibold ${
                  item.featured
                    ? "bg-white text-brand-green hover:bg-brand-cream"
                    : "bg-brand-green text-white hover:bg-brand-green-light"
                }`}
              >
                Get a Quote
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 pb-12">
        <div className="overflow-x-auto rounded-2xl border border-brand-green/10 bg-white">
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
                <tr key={group} className="border-t border-brand-green/10">
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
