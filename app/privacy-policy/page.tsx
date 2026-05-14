import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how USA Ghost Writer collects, uses, and protects your data.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: "We collect basic contact information submitted through inquiry forms, including name, phone number, email, and optional project details.",
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    body: "Submitted data is used to respond to inquiries, provide service proposals, and improve communication quality throughout project planning.",
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: "We retain inquiry data only as long as needed for service communication, legal obligations, and operational record keeping.",
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    body: "We may use trusted third-party tools for email delivery, analytics, and communication workflows, subject to their own privacy terms.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "For privacy questions or data requests, contact support@usaghostwriter.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" current="Privacy Policy" />

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
