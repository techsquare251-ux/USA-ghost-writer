import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { getServiceBySlug, serviceSlugs, services } from "@/src/data/services";
import { ServiceCard } from "@/components/common/ServiceCard";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

// Local image map (files under `public/our-services/`).
const serviceImages: Record<string, string> = {
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

type ServicePageProps = {
  params: {
    service: string;
  };
};

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.service);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

function buildServiceFaqs(serviceTitle: string) {
  return [
    {
      q: `Why is ${serviceTitle.toLowerCase()} important?`,
      a: `${serviceTitle} helps improve quality, presentation, and release readiness so your book performs better in the market.`,
    },
    {
      q: "How long does this service usually take?",
      a: "Delivery timelines vary by manuscript scope and revision rounds, but all projects follow milestone-based planning.",
    },
    {
      q: "Can this service be bundled with other support?",
      a: "Yes. Authors can combine this service with editing, formatting, marketing, or full publishing packages.",
    },
  ];
}

function buildProcess(serviceTitle: string) {
  return [
    {
      title: "Discovery",
      description: `We assess your manuscript and define goals specific to ${serviceTitle.toLowerCase()}.`,
    },
    {
      title: "Execution",
      description: "Our specialists complete scoped deliverables with iterative quality checks.",
    },
    {
      title: "Delivery",
      description: "Final outputs are shared with implementation guidance and revision support.",
    },
  ];
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const serviceFaqs = buildServiceFaqs(service.title);
  const processSteps = buildProcess(service.title);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "USA Ghost Writer",
      url: siteUrl,
    },
    areaServed: "Global",
    url: `${siteUrl}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero title={service.title} current={service.title} />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center">
        <div className="">
          <Image
            src={encodeURI(serviceImages[service.slug] ?? "/banner.jpg")}
            alt={`${service.title} preview`}
            width={920}
            height={1080}
            className="h-full w-full rounded-xl object-cover object-center"
          />
        </div>

        <div>
          <SectionHeader title={service.title} subtitle={service.description} />
          <ul className="mt-5 space-y-2 text-sm text-brand-charcoal">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-10">
        <SectionHeader
          centered
          eyebrow="Why This Service Matters"
          title={`How ${service.title} Improves Publishing Outcomes`}
          subtitle="Focused delivery in this area reduces risk and improves quality before release."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Higher Quality</h3>
            <p className="mt-2 text-sm text-brand-muted">Professional execution increases overall polish and reader trust.</p>
          </article>
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Lower Friction</h3>
            <p className="mt-2 text-sm text-brand-muted">Clear process checkpoints reduce rework and missed expectations.</p>
          </article>
          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Stronger Launch</h3>
            <p className="mt-2 text-sm text-brand-muted">Better preparation supports smoother release and long-term performance.</p>
          </article>
        </div>
      </section>

      {/* <section className="mx-auto max-w-container px-4 py-10"> */}
        <ProcessTimeline/>
        {/* <SectionHeader centered eyebrow="Our Process" title="A Clear 3-Step Workflow" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {processSteps.map((step, idx) => (
            <article key={step.title} className="rounded-xl border border-brand-green/10 bg-brand-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">Step {idx + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-brand-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{step.description}</p>
            </article>
          ))}
        </div> */}
      {/* </section> */}

      <section className="mx-auto max-w-container px-4 py-10">
        <SectionHeader centered eyebrow="Related" title="Related Services" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {relatedServices.map((item) => (
            <ServiceCard key={item.slug} service={item} />
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link href="/services" className="text-sm font-semibold text-brand-green hover:text-brand-green-light">
            View All Services
          </Link>
        </div>
      </section>

      <FAQAccordion items={serviceFaqs} title={`${service.title} FAQ`} />
      <CTABanner />
      <ContactFormSection />
    </>
  );
}
