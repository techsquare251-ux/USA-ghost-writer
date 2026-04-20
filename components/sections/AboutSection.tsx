import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-container gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionHeader
          eyebrow="About Us"
          title="A Publishing Partner Built for Author Confidence"
          subtitle="We combine editorial precision, thoughtful design, and practical launch support so your book enters the market with authority."
        />

        <div className="mt-5 space-y-4 text-brand-muted">
          <p>
            Liblit Books Publishing supports authors through every stage of publication with clear milestones and transparent communication.
          </p>
          <p>
            Our teams focus on quality, timing, and long-term discoverability so your manuscript is not only complete, but positioned for growth.
          </p>
          <p>
            We work with first-time and established authors across genres, delivering practical guidance and premium output standards.
          </p>
        </div>

        <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-brand-green hover:text-brand-green-light">
          Read More
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white p-3 shadow-sm">
        <Image
          src="https://picsum.photos/seed/about-liblit/860/1040"
          alt="Authors discussing publishing strategy in a studio"
          width={860}
          height={1040}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
