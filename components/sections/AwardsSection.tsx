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
          title="Trusted Standards. Recognized Outcomes."
          subtitle="Badges and recognitions reflecting our commitment to dependable publishing quality."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {awards.map((award) => (
            <article
              key={award.id}
              className="group overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-[0_10px_30px_-18px_rgba(11,60,109,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-[0_16px_40px_-16px_rgba(11,60,109,0.45)]"
            >
              <div className="relative h-44 overflow-hidden bg-brand-cream">
                <Image
                  src={award.image}
                  alt={award.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-brand-charcoal">{award.name}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{award.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
