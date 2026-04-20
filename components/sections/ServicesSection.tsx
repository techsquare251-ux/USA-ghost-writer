"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <section className="mx-auto max-w-container px-4 py-20">
      <SectionHeader
        centered
        eyebrow="Our Publishing Services"
        title="Specialized Support Across The Entire Publishing Journey"
        subtitle="Select a service to preview how we help authors turn drafts into polished, market-ready titles."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
        <div className="grid gap-2 sm:grid-cols-2">
          {featured.map((service, idx) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => setActive(service)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition",
                active.slug === service.slug
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-brand-green/15 bg-white text-brand-charcoal hover:border-brand-green/35"
              )}
            >
              <span className="inline-flex size-7 items-center justify-center rounded-full border border-current/30 text-xs font-semibold">
                {idx + 1}
              </span>
              <span className="line-clamp-1">{service.title}</span>
            </button>
          ))}
        </div>

        <article className="rounded-2xl border border-brand-green/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[0.45fr_0.55fr] sm:items-center">
            <Image
              src={`https://picsum.photos/seed/${active.slug}/620/760`}
              alt={`${active.title} service preview`}
              width={620}
              height={760}
              className="h-60 w-full rounded-xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-brand-charcoal">{active.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{active.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-brand-charcoal">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${active.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-brand-green hover:text-brand-green-light"
              >
                Read More
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
