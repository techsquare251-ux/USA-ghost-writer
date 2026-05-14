import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

type CTABannerProps = {
  title?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({
  title = "Do You Have Concerns?",
  primaryLabel = "Speak to a Consultant",
  primaryHref = "/contact-us",
  secondaryLabel = "Call Now",
  secondaryHref = "tel:(888)786-7135",
}: CTABannerProps) {
  return (
    <section className="px-4 py-14">
      <div className="relative mx-auto max-w-container overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green via-[#0b3c6d] to-secondary px-8 py-14 md:px-14">
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full border border-white/10 bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-12 size-64 rounded-full border border-white/10 bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/3 top-1/2 size-40 -translate-y-1/2 rounded-full bg-white/[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-10 top-10 size-24 rounded-full bg-brand-gold/30 blur-2xl"
        />

        <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Get Started Today
            </p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h3>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 md:justify-end">
            <Link
              href={primaryHref}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-green shadow-sm transition hover:bg-brand-cream"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              {primaryLabel}
            </Link>
            <a
              href={secondaryHref}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Phone className="size-4" aria-hidden="true" />
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
