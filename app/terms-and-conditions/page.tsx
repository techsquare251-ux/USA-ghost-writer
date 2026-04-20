import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Review the terms governing use of Liblit Books Publishing services and website content.",
};

const sections = [
  {
    id: "service-scope",
    title: "Service Scope",
    body: "Project scope, timelines, deliverables, and revision limits are defined in writing before production begins.",
  },
  {
    id: "payments",
    title: "Payments",
    body: "Payment schedules are milestone based. Work may pause when payment obligations are not met according to agreed terms.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: "Authors retain ownership of their original manuscript content unless otherwise agreed in a signed contract.",
  },
  {
    id: "limitations",
    title: "Limitations",
    body: "We provide professional support services but do not guarantee specific sales, ranking, or revenue outcomes.",
  },
  {
    id: "governing-terms",
    title: "Governing Terms",
    body: "These terms may be updated periodically. Continued use of services indicates acceptance of the latest published version.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero title="Terms and Conditions" current="Terms" />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-12 lg:grid-cols-[0.28fr_0.72fr]">
        <aside className="rounded-xl border border-brand-green/10 bg-brand-cream p-4 lg:sticky lg:top-24 lg:h-fit">
          <p className="text-sm font-semibold text-brand-charcoal">Table of Contents</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-brand-muted hover:text-brand-green">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="rounded-2xl border border-brand-green/10 bg-white p-6 sm:p-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-8 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-brand-charcoal">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{section.body}</p>
            </section>
          ))}
        </article>
      </section>
    </>
  );
}
