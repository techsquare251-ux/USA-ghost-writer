import Link from "next/link";
import type { Service } from "@/src/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="rounded-xl border border-brand-green/10 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">Service {service.id}</p>
      <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-brand-muted">{service.description}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-brand-green hover:text-brand-green-light"
      >
        Read More
      </Link>
    </article>
  );
}
