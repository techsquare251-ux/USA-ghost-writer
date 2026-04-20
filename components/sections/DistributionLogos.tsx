import Image from "next/image";
import { DISTRIBUTION_PARTNERS } from "@/lib/constants";

export function DistributionLogos() {
  const loopedPartners = [...DISTRIBUTION_PARTNERS, ...DISTRIBUTION_PARTNERS];

  return (
    <section className="border-b border-brand-green/10 bg-white px-4 py-10">
      <div className="mx-auto max-w-container">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">
          Sell Your Book With
        </p>

        <div className="logo-marquee-mask mt-6">
          <div className="logo-marquee-track">
            {loopedPartners.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-brand-green/10 bg-white px-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={140}
                  height={44}
                  className="h-10 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
