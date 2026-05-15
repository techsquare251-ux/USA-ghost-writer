import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  current: string;
};

export function PageHero({ title, current }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-green/8 bg-[#f7f7f2] px-4 py-20 sm:py-28">
      {/* Decorative blurred orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-green/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-brand-gold/5 blur-3xl"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/90 to-white/78" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/80 via-white/45 to-brand-green/8" />
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply">
          <Image
            src="/banner.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(11,60,109,0.08),transparent_28%),radial-gradient(circle_at_72%_20%,rgba(193,18,31,0.08),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(11,60,109,0.06),transparent_26%)]" />
      </div>

      <div className="relative mx-auto max-w-container">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
          <Link href="/" className="transition-colors hover:text-brand-green">
            Home
          </Link>
          <ChevronRight className="size-3 text-brand-muted/40" aria-hidden="true" />
          <span className="font-medium text-brand-charcoal">{current}</span>
        </nav>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-brand-charcoal drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-5 h-1 w-14 rounded-full bg-brand-green/30" />
      </div>
    </section>
  );
}
