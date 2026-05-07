"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { featuredServiceSlugs, services } from "@/src/data/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const featured = useMemo(
    () => services.filter((service) => featuredServiceSlugs.includes(service.slug)),
    []
  );
  const [active, setActive] = useState(featured[0]);

  return (
    <section className="bg-gradient-to-b from-brand-cream/50 to-white py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Our Publishing Services"
          title="Specialized Support Across The Entire Publishing Journey"
          subtitle="Select a service to preview how we help authors turn drafts into polished, market-ready titles."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_3fr]">
          {/* Service selector */}
          <div className="flex flex-col gap-2">
            {featured.map((service, idx) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActive(service)}
                className={cn(
                  "group flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-200",
                  active.slug === service.slug
                    ? "border-brand-green bg-brand-green text-white shadow-[0_4px_20px_rgba(45,80,22,0.25)]"
                    : "border-brand-green/12 bg-white text-brand-charcoal hover:border-brand-green/30 hover:bg-brand-green/3"
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    active.slug === service.slug
                      ? "bg-white/20 text-white"
                      : "bg-brand-green/8 text-brand-green"
                  )}
                >
                  {idx + 1}
                </span>
                <span className="line-clamp-1 font-medium">{service.title}</span>
                {active.slug === service.slug && (
                  <ArrowRight
                    className="ml-auto size-4 shrink-0 opacity-70"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Service preview */}
          <article className="overflow-hidden rounded-3xl border border-brand-green/8 bg-white shadow-[0_8px_40px_-12px_rgba(20,32,24,0.12)]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/${active.slug}/800/500`}
                alt={`${active.title} service preview`}
                fill
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Service
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{active.title}</h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm leading-7 text-brand-muted">{active.description}</p>

              <ul className="mt-5 space-y-2.5">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-charcoal">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand-green"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${active.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-light hover:gap-3"
              >
                Learn More
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
