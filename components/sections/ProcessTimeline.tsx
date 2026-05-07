import { SectionHeader } from "@/components/common/SectionHeader";
import { publishingProcess } from "@/src/data/process";

export function ProcessTimeline() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Our Process"
          title="A Structured 6-Step Publishing Workflow"
          subtitle="Each phase is designed to reduce friction, improve quality, and keep authors fully informed at every milestone."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publishingProcess.map((step) => (
            <article
              key={step.step}
              className="group relative overflow-hidden rounded-2xl border border-brand-green/8 bg-gradient-to-br from-brand-cream to-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-[0_16px_40px_-12px_rgba(20,32,24,0.14)]"
            >
              {/* Large decorative step number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-5 font-serif text-[7rem] font-bold leading-none text-brand-green/5 select-none transition-colors duration-300 group-hover:text-brand-green/8"
              >
                {step.step}
              </div>

              {/* Step badge */}
              <div className="relative inline-flex size-11 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white shadow-[0_4px_12px_rgba(45,80,22,0.35)]">
                {step.step}
              </div>

              <h3 className="relative mt-5 text-lg font-semibold text-brand-charcoal">
                {step.title}
              </h3>
              <p className="relative mt-2.5 text-sm leading-6 text-brand-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
