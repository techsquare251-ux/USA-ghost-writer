import { SectionHeader } from "@/components/common/SectionHeader";
import { publishingProcess } from "@/src/data/process";

export function ProcessTimeline() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Our Process"
          title="A Structured 6-Step Publishing Workflow"
          subtitle="Each phase is designed to reduce friction, improve quality, and keep authors informed."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {publishingProcess.map((step) => (
            <article key={step.step} className="rounded-xl border border-brand-green/10 bg-brand-cream p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Step {step.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-brand-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
