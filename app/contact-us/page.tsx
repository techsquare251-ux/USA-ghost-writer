import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Us | Request a Quote | USA Ghost Writer",
  description:
    "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
  openGraph: {
    title: "Contact Us | Request a Quote | USA Ghost Writer",
    description:
      "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/contact-us`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Request a Quote | USA Ghost Writer",
    description:
      "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
  },
  alternates: { canonical: "/contact-us" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/contact-us` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero title="Contact Us" current="Contact" />
      <ContactFormSection />
    </>
  );
}
