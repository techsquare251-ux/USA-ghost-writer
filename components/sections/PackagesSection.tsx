import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { publishingPackages } from "@/src/data/packages";

type PackagesSectionProps = {
  compact?: boolean;
};

export function PackagesSection({ compact = false }: PackagesSectionProps) {
  return (
    <section className={compact ? "mx-auto max-w-container px-4 py-20 sm:px-6 lg:px-8" : "relative overflow-hidden bg-gradient-to-b from-white via-brand-cream/40 to-brand-cream/80 py-24"}>
      {!compact ? (
        <>
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(11,60,109,0.08),transparent_65%)]" />
          <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        </>
      ) : null}

      <div className={compact ? "" : "relative mx-auto max-w-container px-4 sm:px-6 lg:px-8"}>
        <SectionHeader
          centered
          eyebrow="Plans"
          title="Choose The Right Publishing Tier"
          subtitle="Packages are grouped by depth of support, production scope, and launch intensity."
        />

        <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-muted">
            Swipe to compare packages
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green/20" />
          </div>
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:overflow-visible lg:pb-0 lg:snap-none lg:grid-cols-3">
          {publishingPackages.map((item) => (
            <article
              key={item.name}
              className={`group relative min-w-[82%] snap-center overflow-hidden rounded-[1.5rem] border p-6 shadow-[0_16px_36px_-24px_rgba(11,60,109,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:min-w-[58%] md:min-w-[42%] lg:min-w-0 ${
                item.featured
                  ? "border-brand-green bg-brand-green text-white shadow-[0_20px_50px_-24px_rgba(11,60,109,0.6)]"
                  : "border-brand-green/10 bg-white text-brand-charcoal"
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${item.featured ? "bg-white/30" : "bg-brand-green/10"}`} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${item.featured ? "text-white/75" : "text-brand-muted"}`}>
                    {item.featured ? "Most Popular" : "Publishing Plan"}
                  </p>
                  <p className={`mt-2 text-2xl font-semibold ${item.featured ? "text-white" : "text-brand-charcoal"}`}>
                    {item.name}
                  </p>
                </div>

                <div className={`rounded-2xl px-4 py-3 text-right ${item.featured ? "bg-white/10" : "bg-brand-cream"}`}>
                  <p className={`text-xs uppercase tracking-[0.18em] ${item.featured ? "text-white/70" : "text-brand-muted"}`}>
                    Starting at
                  </p>
                  <p className={`text-3xl font-semibold leading-none ${item.featured ? "text-white" : "text-brand-charcoal"}`}>
                    {item.price}
                  </p>
                </div>
              </div>

              <div className={`mt-5 h-px w-full ${item.featured ? "bg-white/15" : "bg-brand-green/10"}`} />

              <div className="mt-5 space-y-4">
                {item.featureGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className={`text-sm font-semibold uppercase tracking-[0.14em] ${item.featured ? "text-white" : "text-brand-charcoal"}`}>
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {group.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-2 text-sm leading-6 ${item.featured ? "text-white/90" : "text-brand-muted"}`}
                        >
                          <Check className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-white" : "text-secondary"}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href={`/contact-us?package=${encodeURIComponent(item.name)}`}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-transform duration-200 active:scale-[0.98] ${
                  item.featured
                    ? "bg-white text-secondary hover:bg-brand-cream"
                    : "bg-secondary text-white shadow-[0_10px_24px_-14px_rgba(193,18,31,0.6)] hover:bg-secondary/90"
                }`}
              >
                Get a Quote
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-brand-muted sm:text-sm">
          Drag horizontally on mobile to browse plans. On larger screens, the cards expand into a three-column comparison layout.
        </p>
      </div>
    </section>
  );
}