import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { awards } from "@/src/data/awards";

export function AwardsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Awards & Recognition"
          title="Trusted Standards. Recognized Outcomes."
          subtitle="Badges and recognitions reflecting our commitment to dependable publishing quality."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {awards.map((award) => (
            <article key={award.id} className="rounded-xl border border-brand-green/10 bg-brand-cream p-4">
              <div className="overflow-hidden rounded-lg border border-brand-green/10 bg-white">
                <Image src={award.image} alt={award.name} width={240} height={240} className="h-40 w-full object-cover" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-brand-charcoal">{award.name}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
