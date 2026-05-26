import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { SITE_URL } from "@/lib/site-url";

type ContactPageProps = {
  searchParams?: {
    package?: string;
  };
};

export function generateMetadata({ searchParams }: ContactPageProps): Metadata {
  const hasPackageQuery = Boolean(searchParams?.package);

  return {
    title: "Contact Us | Request a Quote | USA Ghost Writer",
    description:
      "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
    openGraph: {
      title: "Contact Us | Request a Quote | USA Ghost Writer",
      description:
        "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
      url: `${SITE_URL}/contact-us`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Request a Quote | USA Ghost Writer",
      description:
        "Contact USA Ghost Writer to discuss ghostwriting, editing, or publishing packages. Request a free quote or schedule a consultation today.",
    },
    alternates: { canonical: `${SITE_URL}/contact-us` },
    robots: hasPackageQuery
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact-us` },
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
