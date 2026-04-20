import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";

const credibility = ["Google Partner", "BBB", "Trustpilot", "Clutch"];

export function HeroSection() {
  return (
    <section className="border-b border-brand-green/10 bg-gradient-to-b from-brand-cream to-white px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
            #1 Self Publishing Company
          </p>

          <SectionHeader
            className="mt-5"
            title="Turn Your Manuscript Into a Market-Ready Book"
            subtitle="Work with experienced publishing specialists to edit, design, format, and launch your title with premium quality and clear direction."
          />

          <div className="mt-7 max-w-xl">
            <ContactForm context="hero" compact />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-brand-muted">
            {credibility.map((item) => (
              <span key={item} className="rounded-full border border-brand-green/15 bg-white px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-brand-green/10 bg-white p-3 shadow-sm">
          <Image
            src="https://picsum.photos/seed/liblit-hero/960/1180"
            alt="Publishing consultant reviewing manuscript pages"
            width={960}
            height={1180}
            priority
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
