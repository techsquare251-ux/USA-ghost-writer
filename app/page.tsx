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
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { homeFaqs } from "@/src/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { AwardsSection } from "@/components/sections/AwardsSection";

export const metadata: Metadata = {
  title: "Self-Publishing Services | Book Editing | USA Ghost Writer",
  description:
    "Self-publishing services: editing, formatting, and distribution to get your book to market faster. Professional support and launch help — start today.",
  openGraph: {
    title: "Self-Publishing Services | Book Editing | USA Ghost Writer",
    description:
      "Self-publishing services: editing, formatting, and distribution to get your book to market faster. Professional support and launch help — start today.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com",
    siteName: "USA Ghost Writer",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/social/og-home.webp`,
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
    images: [`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/social/og-home.webp`],
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "USA Ghost Writer",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/our-cradibility/logo.webp`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+1-866-333-4444",
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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "USA Ghost Writer",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com"}/search?q={search_term_string}`,
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
        <TestimonialsSection />
      </MotionReveal>
      <MotionReveal delay={0.2}>
        <FAQAccordion items={homeFaqs} />
      </MotionReveal>
      <MotionReveal delay={0.22}>
        <ContactFormSection />
      </MotionReveal>
      {/* <MotionReveal delay={0.24}>
        <AwardsSection />
      </MotionReveal> */}
    </>
  );
}
