import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { textTestimonials, videoTestimonials } from "@/src/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Testimonials"
          title="What Authors Say About Working With Us"
          subtitle="Real feedback from clients who published with our editorial, design, and launch teams."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {textTestimonials.map((item) => (
            <article key={item.id} className="rounded-xl border border-brand-green/10 bg-brand-cream p-5">
              <div className="flex items-center gap-1 text-brand-gold">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={`${item.id}-${i}`} className="size-4 fill-current" />
                ))}
              </div>
              <h3 className="mt-3 text-base font-semibold text-brand-charcoal">{item.headline}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{item.quote}</p>
              <p className="mt-4 text-xs text-brand-muted">{item.author} • {item.country}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {videoTestimonials.map((item) => (
            <article key={item.id} className="rounded-xl border border-brand-green/10 bg-white p-3 shadow-sm">
              <a
                href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg"
              >
                <Image
                  src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={`${item.title} video testimonial`}
                  width={480}
                  height={270}
                  className="h-36 w-full object-cover"
                />
              </a>
              <h4 className="mt-3 line-clamp-2 text-sm font-semibold text-brand-charcoal">{item.title}</h4>
              <p className="mt-1 text-xs text-brand-muted">Consultant: {item.consultant}</p>
              <p className="text-xs text-brand-muted">PM: {item.projectManager}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/testimonials" className="text-sm font-semibold text-brand-green hover:text-brand-green-light">
            View More Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
