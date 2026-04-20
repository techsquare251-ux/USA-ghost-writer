import type { Metadata } from "next";
import { MotionReveal } from "@/components/common/MotionReveal";
import { HeroSection } from "@/components/sections/HeroSection";
import { DistributionLogos } from "@/components/sections/DistributionLogos";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { homeFaqs } from "@/src/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { AwardsSection } from "@/components/sections/AwardsSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Premium self-publishing services for authors, from editing and formatting to launch and distribution.",
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Liblit Books Publishing",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://liblit.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+1-866-841-7469",
        email: "support@liblitbookspublishing.com",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
        <CTABanner />
      </MotionReveal>
      <MotionReveal delay={0.12}>
        <ProcessTimeline />
      </MotionReveal>
      <MotionReveal delay={0.14}>
        <WhyChooseUsSection />
      </MotionReveal>
      <MotionReveal delay={0.16}>
        <TestimonialsSection />
      </MotionReveal>
      <MotionReveal delay={0.18}>
        <FAQAccordion items={homeFaqs} />
      </MotionReveal>
      <MotionReveal delay={0.2}>
        <ContactFormSection />
      </MotionReveal>
      <MotionReveal delay={0.22}>
        <AwardsSection />
      </MotionReveal>
    </>
  );
}
