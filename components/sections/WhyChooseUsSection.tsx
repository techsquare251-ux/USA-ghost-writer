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
    <section className="bg-gradient-to-b from-white via-brand-cream/40 to-white py-24">
      <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(20,32,24,0.18)]">
          <Image
            src="https://picsum.photos/seed/why-liblit/900/1100"
            alt="Author and consultant collaborating on final manuscript"
            width={900}
            height={1100}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"
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
                className="flex items-center gap-3 rounded-xl border border-brand-green/10 bg-white px-4 py-3 text-sm font-medium text-brand-charcoal shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition hover:border-brand-green/25 hover:shadow-[0_4px_16px_rgba(20,32,24,0.08)]"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-brand-green"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-light hover:shadow-md"
            >
              Talk to an Expert
            </Link>
            <a
              href="tel:(888)786-7135"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-green/25 px-6 text-sm font-semibold text-brand-green transition hover:border-brand-green/45 hover:bg-brand-green/5"
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
