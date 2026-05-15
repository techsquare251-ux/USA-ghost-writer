import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/src/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  const imageMap: Record<string, string> = {
    "book-publishing": "/our-services/publishing.png",
    "book-editing": "/our-services/editing.png",
    proofreading: "/our-services/proofreading.png",
    "book-formatting": "/our-services/print-on-demand.png",
    "typesetting-layout-adjustment": "/our-services/typesetting and layout.jpeg",
    "print-on-demand": "/our-services/print-on-demand.png",
    "document-processing": "/our-services/document-processing.jpeg",
    "audio-book": "/our-services/audio book.png",
    "isbn-and-barcode": "/our-services/isbn-barcode.jpeg",
    "book-marketing": "/our-services/marketing.png",
    "childrens-book-illustration": "/our-services/child book.jpeg",
    "book-illustration-services": "/our-services/book-illustration.jpeg",
    "book-translation": "/our-services/translation.png",
  };

  const imageSrc = encodeURI(imageMap[service.slug] ?? "/banner.jpg");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-md transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(11,60,109,0.45)] hover:-translate-y-1">
      <div className="relative h-44 w-full">
        <Image src={imageSrc} alt={service.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute left-4 bottom-4 inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 shadow-sm">
            <Icon className="size-5 text-brand-green" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Service {service.id}</p>
            <h3 className="mt-1 text-lg font-bold text-white">{service.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-7 text-brand-muted">{service.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
          >
            Learn More
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          <span className="text-sm font-semibold text-brand-green/80">Explore →</span>
        </div>
      </div>
    </article>
  );
}
