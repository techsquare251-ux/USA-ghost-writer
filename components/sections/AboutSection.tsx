import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

const stats = [
  { value: "200+", label: "Books Published" },
  { value: "150+", label: "Authors Served" },
  { value: "10+", label: "Years of Excellence" },
];

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-container gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center">
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(20,32,24,0.18)]">
        <Image
          src="https://picsum.photos/seed/about-liblit/860/1040"
          alt="Authors discussing publishing strategy in a studio"
          width={860}
          height={1040}
          className="h-full w-full object-cover"
        />
        {/* Floating stat badge */}
        <div className="absolute bottom-6 right-6 rounded-2xl border border-white/20 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm">
          <p className="font-serif text-3xl font-semibold text-brand-green">200+</p>
          <p className="mt-0.5 text-xs font-medium text-brand-muted">Books Published</p>
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="About Us"
          title="A Publishing Partner Built for Author Confidence"
          subtitle="We combine editorial precision, thoughtful design, and practical launch support so your book enters the market with authority."
        />

        <div className="mt-6 space-y-4 text-sm leading-7 text-brand-muted">
          <p>
            Liblit Books Publishing supports authors through every stage of publication with clear
            milestones and transparent communication.
          </p>
          <p>
            Our teams focus on quality, timing, and long-term discoverability so your manuscript is
            not only complete, but positioned for growth.
          </p>
          <p>
            We work with first-time and established authors across genres, delivering practical
            guidance and premium output standards.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-green/10 pt-7">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col">
              <p className="font-serif text-3xl font-semibold text-brand-green">{stat.value}</p>
              <p className="mt-1 text-xs text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-all hover:gap-3 hover:text-brand-green-light"
        >
          Read Our Story
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
