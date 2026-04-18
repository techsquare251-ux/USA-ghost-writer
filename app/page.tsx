import { CTABanner } from "@/components/sections/CTABanner";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { homeFaqs } from "@/src/data/faqs";

export default function Home() {
  return (
    <>
      <section className="border-b border-brand-green/10 bg-gradient-to-b from-brand-cream to-white px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-container">
          <SectionHeader
            eyebrow="Phase 1"
            title="Pine Book Publishing Next.js Rebuild"
            subtitle="Foundation is now configured with brand tokens, global layout, and reusable section primitives. Home page composition starts in Phase 2."
          />

          <div className="mt-8 inline-flex rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-sm text-brand-muted">
            Next step: Build all Home sections and wire lead form API.
          </div>
        </div>
      </section>

      <CTABanner />

      <FAQAccordion items={homeFaqs} />
    </>
  );
}
