import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ServiceCard } from "@/components/common/ServiceCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/src/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore all publishing services from editing and formatting to marketing and translation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Publishing Services" current="Services" />

      <section className="mx-auto max-w-container px-4 py-20">
        <SectionHeader
          centered
          eyebrow="All Services"
          title="Specialized Services For Every Publishing Stage"
          subtitle="Choose a service to learn how our team approaches quality, delivery, and outcomes for your project."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
