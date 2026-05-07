import Image from "next/image";
import { DISTRIBUTION_PARTNERS } from "@/lib/constants";

export function DistributionLogos() {
  const loopedPartners = [...DISTRIBUTION_PARTNERS, ...DISTRIBUTION_PARTNERS];

  return (
    <section className="border-b border-brand-green/8 bg-white px-4 py-12">
      <div className="mx-auto max-w-container">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 rounded-full bg-gradient-to-r from-transparent to-brand-green/12" />
          <p className="shrink-0 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-muted/70">
            Sell Your Book Through
          </p>
          <div className="h-px flex-1 rounded-full bg-gradient-to-l from-transparent to-brand-green/12" />
        </div>

        <div className="logo-marquee-mask mt-7">
          <div className="logo-marquee-track">
            {loopedPartners.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex h-14 w-36 shrink-0 items-center justify-center rounded-xl border border-brand-green/8 bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-brand-green/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
