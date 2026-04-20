import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

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
    <section className="mx-auto grid max-w-container gap-8 px-4 py-20 lg:grid-cols-2 lg:items-center">
      <div className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white p-3 shadow-sm">
        <Image
          src="https://picsum.photos/seed/why-liblit/900/1100"
          alt="Author and consultant collaborating on final manuscript"
          width={900}
          height={1100}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      <div>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built Around Quality, Clarity, and Reliable Delivery"
          subtitle="Our team blends editorial expertise with production discipline to deliver books that read better, look better, and launch stronger."
        />

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {benefits.map((item) => (
            <li key={item} className="rounded-lg border border-brand-green/10 bg-white px-3 py-2 text-sm text-brand-charcoal">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button render={<Link href="/contact-us" />} className="h-11 rounded-md bg-brand-green px-5 text-white hover:bg-brand-green-light">
            Talk to an Expert
          </Button>
          <Button render={<a href="tel:(888)786-7135" />} variant="outline" className="h-11 rounded-md border-brand-green text-brand-green hover:bg-brand-green/5">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}
