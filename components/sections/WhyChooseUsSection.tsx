import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

const benefits = [
  "Affordable Price",
  "Tailored Creativity",
  "Expert Craftsmanship",
  "Engaging Narratives",
  "On-Time Deliveries",
  "Pristine Publication",
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-gradient-to-b from-white via-brand-cream/60 to-white py-24">
      <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(11,60,109,0.35)]">
          <Image
            src="https://picsum.photos/seed/why-usa-ghost-writer/900/1100"
            alt="Author and consultant collaborating on final manuscript"
            width={900}
            height={1100}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Why Choose Us"
            title="Built Around Quality, Clarity, and Reliable Delivery"
            subtitle="Our team blends editorial expertise with production discipline to deliver books that read better, look better, and launch stronger."
          />

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {benefits.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-brand-green/12 bg-white px-4 py-3 text-sm font-medium text-brand-charcoal shadow-[0_1px_4px_rgba(11,60,109,0.08)] transition hover:border-secondary/35 hover:shadow-[0_6px_18px_-10px_rgba(11,60,109,0.3)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(193,18,31,0.6)] transition hover:bg-secondary/90 hover:shadow-[0_16px_30px_-16px_rgba(193,18,31,0.7)]"
            >
              Talk to an Expert
            </Link>
            <a
              href="tel:(888)111-2222"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-green/25 px-6 text-sm font-semibold text-brand-green transition hover:border-secondary/45 hover:text-secondary"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
