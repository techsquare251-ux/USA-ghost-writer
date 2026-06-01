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
import { SITE_URL } from "@/lib/site-url";

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

type ServiceLongFormContent = {
  seoDescription: string;
  lastUpdated: string;
  overview: string[];
  audience: string[];
  deliverables: string[];
};

function buildLongFormContent(service: { title: string; description: string; features: string[]; slug: string }): ServiceLongFormContent {
  const featureList = service.features.join(", ");
  const audience = [
    `Authors who want dependable ${service.title.toLowerCase()} support without losing their original voice or publishing goals.`,
    "Independent publishers who need production-ready deliverables aligned with marketplace and platform requirements.",
    "Teams preparing a launch timeline and looking for clear scope, milestone visibility, and quality checkpoints.",
  ];

  const deliverables = service.features.map(
    (feature) => `${feature}: delivered with documented quality checks, implementation notes, and practical handoff guidance.`
  );

  return {
    seoDescription: `${service.title} services for authors and publishers. Get strategic planning, expert execution, and measurable delivery quality from USA Ghost Writer.`,
    lastUpdated: "2026-06-01",
    overview: [
      `${service.title} is a high-impact stage in your publishing workflow because it directly affects reader experience, conversion quality, and long-term brand trust. At USA Ghost Writer, we treat this service as both a craft process and an execution system: we map your manuscript goals, define approval checkpoints, and align every deliverable with final publishing requirements. This reduces rework and protects launch timelines while maintaining consistent quality standards from first draft to release-ready output.`,
      `Our ${service.title.toLowerCase()} workflow is built around practical outcomes rather than generic checklists. We focus on what your manuscript needs to perform in real market conditions, including presentation quality, platform compatibility, and audience expectations. Core scope typically includes ${featureList}. Every stage is reviewed with structured QA so decisions are documented, revisions are controlled, and final assets are delivered in a format your next publishing step can use immediately.`,
    ],
    audience,
    deliverables,
  };
}

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

  const longForm = buildLongFormContent(service);

  return {
    title: `${service.title} | Publishing Service | USA Ghost Writer`,
    description: longForm.seoDescription,
    openGraph: {
      title: `${service.title} | Publishing Service | USA Ghost Writer`,
      description: longForm.seoDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Publishing Service | USA Ghost Writer`,
      description: longForm.seoDescription,
    },
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    other: {
      "last-modified": longForm.lastUpdated,
    },
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

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.service);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const longForm = buildLongFormContent(service);
  const serviceFaqs = buildServiceFaqs(service.title);
  const siteUrl = SITE_URL;
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
    dateModified: longForm.lastUpdated,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero title={service.title} current={service.title} />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center">
        <div className="">
          <Image
            src={encodeURI(serviceImages[service.slug] ?? "/banner.jpg")}
            alt={`${service.title} preview`}
            width={920}
            height={1080}
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={75}
            priority
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
          eyebrow="Service Overview"
          title={`${service.title}: Detailed Scope & Execution`}
          subtitle="Expanded detail to help search engines and authors understand service depth, workflow, and expected outcomes."
        />

        <div className="mt-6 space-y-4 rounded-xl border border-brand-green/10 bg-white p-6">
          {longForm.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-sm leading-7 text-brand-muted">
              {paragraph}
            </p>
          ))}
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-muted">
            Last updated: {longForm.lastUpdated}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-brand-green/10 bg-brand-cream p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Who This Service Is For</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
              {longForm.audience.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-brand-green/10 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-charcoal">Typical Deliverables</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-muted">
              {longForm.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
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

      <ProcessTimeline/>

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
