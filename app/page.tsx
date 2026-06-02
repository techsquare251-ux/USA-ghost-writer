import type { Metadata } from "next";
import { MotionReveal } from "@/components/common/MotionReveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { DistributionLogos } from "@/components/sections/DistributionLogos";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { VideoReviewSection } from "@/components/sections/VideoReviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { homeFaqs } from "@/src/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Self-Publishing Services | Book Editing | USA Ghost Writer",
  description:
    "Self-publishing services: editing, formatting, and distribution to get your book to market faster. Professional support and launch help — start today.",
  openGraph: {
    title: "Self-Publishing Services | Book Editing | USA Ghost Writer",
    description:
      "Self-publishing services: editing, formatting, and distribution to get your book to market faster. Professional support and launch help — start today.",
    url: SITE_URL,
    siteName: "USA Ghost Writer",
    images: [
      {
        url: `${SITE_URL}/social/og-home.webp`,
        width: 1200,
        height: 630,
        alt: "USA Ghost Writer — Self-Publishing Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Self-Publishing Services | Book Editing | USA Ghost Writer",
    description:
      "Self-publishing services: editing, formatting, and distribution to get your book to market faster. Professional support and launch help — start today.",
    images: [`${SITE_URL}/social/og-home.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const businessAddress = {
    "@type": "PostalAddress",
    streetAddress: "811 W 7th St",
    addressLocality: "Los Angeles",
    postalCode: "90017",
    addressCountry: "US",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "USA Ghost Writer",
    url: SITE_URL,
    logo: `${SITE_URL}/usa-logo.jpeg`,
    telephone: "+12132674279",
    address: businessAddress,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+12132674279",
        email: "support@usaghostwriter.com",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/usa-ghost-writer",
      "https://twitter.com/usaghostwriter",
      "https://www.facebook.com/usaghostwriter",
      "https://www.instagram.com/usaghostwriter",
      "https://www.youtube.com/@usaghostwriter",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "USA Ghost Writer",
    url: SITE_URL,
    logo: `${SITE_URL}/usa-logo.jpeg`,
    telephone: "+12132674279",
    address: businessAddress,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "USA Ghost Writer",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <MotionReveal>
        <HeroSection />
      </MotionReveal>
      <MotionReveal delay={0.02}>
        <DistributionLogos />
      </MotionReveal>
      <MotionReveal delay={0.04}>
        <AboutSection />
      </MotionReveal>
      <MotionReveal delay={0.06}>
        <PortfolioSection />
      </MotionReveal>
      <MotionReveal delay={0.08}>
        <ServicesSection />
      </MotionReveal>
      <MotionReveal delay={0.1}>
        <PackagesSection />
      </MotionReveal>
      <MotionReveal delay={0.12}>
        <CTABanner />
      </MotionReveal>
      <MotionReveal delay={0.14}>
        <ProcessTimeline />
      </MotionReveal>
      <MotionReveal delay={0.16}>
        <WhyChooseUsSection />
      </MotionReveal>
      <MotionReveal delay={0.18}>
        <VideoReviewSection />
      </MotionReveal>
      <MotionReveal delay={0.2}>
        <TestimonialsSection />
      </MotionReveal>
      <MotionReveal delay={0.22}>
        <FAQAccordion items={homeFaqs} />
      </MotionReveal>
      <MotionReveal delay={0.24}>
        <ContactFormSection />
      </MotionReveal>
      {/* <MotionReveal delay={0.24}>
        <AwardsSection />
      </MotionReveal> */}
    </>
  );
}
