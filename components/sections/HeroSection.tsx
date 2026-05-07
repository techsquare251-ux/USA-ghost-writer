import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { ShieldCheck } from "lucide-react";

const credibility = ["Google Partner", "BBB Accredited", "Trustpilot Rated", "Clutch Verified"];

const stats = [
  { value: "200+", label: "Books Published" },
  { value: "150+", label: "Happy Authors" },
  { value: "10+", label: "Years Experience" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-brand-green/8 bg-gradient-to-br from-brand-cream via-white to-brand-cream px-4 py-16 sm:py-24">
      {/* Decorative blurred orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-brand-green/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-brand-gold/6 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-container gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/6 px-4 py-2">
            <span className="size-1.5 rounded-full bg-brand-green animate-pulse-dot" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
              #1 Self Publishing Company
            </span>
          </div>

          <SectionHeader
            className="mt-5"
            title="Turn Your Manuscript Into a Market-Ready Book"
            subtitle="Work with experienced publishing specialists to edit, design, format, and launch your title with premium quality and clear direction."
          />

          <div className="mt-8 max-w-xl">
            <ContactForm context="hero" compact />
          </div>

          {/* Credibility badges */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {credibility.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/15 bg-white px-3 py-1.5 text-xs font-medium text-brand-muted shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <ShieldCheck className="size-3 text-brand-green/70" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6 border-t border-brand-green/10 pt-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div>
                  <p className="font-serif text-2xl font-semibold text-brand-charcoal">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-brand-muted">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-8 w-px rounded-full bg-brand-green/15" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(20,32,24,0.18)]">
          <Image
            src="https://picsum.photos/seed/liblit-hero/960/1180"
            alt="Publishing consultant reviewing manuscript pages"
            width={960}
            height={1180}
            priority
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
