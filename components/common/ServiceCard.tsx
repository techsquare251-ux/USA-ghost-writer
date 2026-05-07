import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/src/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group flex flex-col rounded-2xl border border-brand-green/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/20 hover:shadow-[0_16px_40px_-12px_rgba(20,32,24,0.14)]">
      <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-green/8 text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted">
        Service {service.id}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">{service.description}</p>

      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-all hover:gap-2.5 hover:text-brand-green-light"
      >
        Read More
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
