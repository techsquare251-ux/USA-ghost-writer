import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTABanner } from "@/components/sections/CTABanner";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about USA Ghost Writer, our story, values, and publishing support approach.",
};

const stats = [
  { label: "Books Published", value: "500+" },
  { label: "Years Experience", value: "10+" },
  { label: "Satisfied Authors", value: "350+" },
  { label: "Awards Won", value: "20+" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About USA Ghost Writer" current="About" />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Our Story"
            title="Built to Make Publishing Professional and Predictable"
            subtitle="Since Feb 22, 2023, we have helped authors move from raw draft to polished publication with strong editorial oversight and reliable project execution."
          />
          <div className="mt-5 space-y-4 text-brand-muted">
            <p>
              Our model is simple: align quality standards early, communicate often, and deliver with measurable milestones.
            </p>
            <p>
              We combine editorial, design, and production expertise so authors get one cohesive team instead of fragmented freelancers.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white p-3 shadow-sm">
          <Image
            src="https://picsum.photos/seed/about-page/900/1080"
            alt="Publishing team meeting with author"
            width={900}
            height={1080}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 pb-10">
        <div className="grid gap-4 rounded-2xl border border-brand-green/10 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-brand-green/10 bg-brand-cream p-4">
              <p className="text-2xl font-semibold text-brand-green">{stat.value}</p>
              <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-10">
        <SectionHeader
          title="Our Values"
          subtitle="Author-first collaboration, transparent communication, and premium execution quality define our delivery approach."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Clarity</h3>
            <p className="mt-2 text-sm text-brand-muted">Clear process, clear scope, and clear milestones from kickoff to launch.</p>
          </article>
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Craft</h3>
            <p className="mt-2 text-sm text-brand-muted">Editorial and design decisions made for quality and reader experience.</p>
          </article>
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Commitment</h3>
            <p className="mt-2 text-sm text-brand-muted">Dependable delivery rhythms with accountability across every stage.</p>
          </article>
        </div>
      </section>

      <CTABanner />
      <ContactFormSection />
    </>
  );
}
