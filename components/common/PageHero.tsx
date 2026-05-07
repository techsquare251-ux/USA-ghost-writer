import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  current: string;
};

export function PageHero({ title, current }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-green/8 bg-gradient-to-br from-brand-cream via-white to-brand-cream px-4 py-20 sm:py-28">
      {/* Decorative blurred orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-green/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-brand-gold/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-container">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
          <Link href="/" className="transition-colors hover:text-brand-green">
            Home
          </Link>
          <ChevronRight className="size-3 text-brand-muted/40" aria-hidden="true" />
          <span className="font-medium text-brand-charcoal">{current}</span>
        </nav>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-5 h-1 w-14 rounded-full bg-brand-green/30" />
      </div>
    </section>
  );
}
