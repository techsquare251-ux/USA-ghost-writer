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
            title="A Ghostwriting Partner"
            subtitle="Built for Author Success"
          />

          <div className="mt-5 space-y-4 text-brand-muted">
            <p>
              We transform ideas, stories, and expertise into professionally written books that reflect your voice and vision.
            </p>
            <p>
              Our ghostwriting team works closely with authors through every stage of the writing journey — with creativity, confidentiality, and a clear process from concept to completion.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-brand-green/10 bg-white p-5">
              <h3 className="text-lg font-semibold text-brand-charcoal">Story-Driven Writing</h3>
              <p className="mt-2 text-sm text-brand-muted">From outlines to final chapters, every word is crafted to engage readers and match your unique voice.</p>
            </article>
            <article className="rounded-xl border border-brand-green/10 bg-white p-5">
              <h3 className="text-lg font-semibold text-brand-charcoal">Complete Book Creation</h3>
              <p className="mt-2 text-sm text-brand-muted">Writing, editing, formatting, cover design, and publishing support — all under one roof.</p>
            </article>
            <article className="rounded-xl border border-brand-green/10 bg-white p-5">
              <h3 className="text-lg font-semibold text-brand-charcoal">Publish-Ready Quality</h3>
              <p className="mt-2 text-sm text-brand-muted">Your manuscript is professionally polished, refined, and prepared for global publishing platforms.</p>
            </article>
          </div>

          <figure className="mt-8 border-l-2 border-primary pl-4">
            <blockquote className="text-lg italic text-primary">“We do not just write books — we turn ideas into powerful stories readers remember.”</blockquote>
            <figcaption className="mt-3 text-sm font-bold uppercase text-accent">— YOUR GHOSTWRITING TEAM</figcaption>
          </figure>
        </div>

        <div className="">
          <Image
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=85"
            alt="Book shop interior"
            width={900}
            height={1080}
            className="h-full w-full rounded-xl object-cover object-center"
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
