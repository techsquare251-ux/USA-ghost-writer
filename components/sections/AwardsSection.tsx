import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { awards } from "@/src/data/awards";

export function AwardsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-brand-cream/70 py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Awards & Recognition"
          title="Our Awards"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {awards.map((award) => (
            <article
              key={award.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(15,23,42,0.26)]"
            >
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white p-6">
                <Image
                  src={award.image}
                  alt={award.name}
                  fill
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-slate-100/45" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
