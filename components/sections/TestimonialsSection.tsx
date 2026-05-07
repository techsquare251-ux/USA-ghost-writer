import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Play } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { textTestimonials, videoTestimonials } from "@/src/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Testimonials"
          title="What Authors Say About Working With Us"
          subtitle="Real feedback from clients who published with our editorial, design, and launch teams."
        />

        {/* Text testimonials */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {textTestimonials.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-green/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(20,32,24,0.14)]"
            >
              {/* Decorative quote mark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 font-serif text-7xl font-bold leading-none text-brand-gold/10 select-none transition-colors duration-300 group-hover:text-brand-gold/18"
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={`${item.id}-${i}`} className="size-3.5 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              <h3 className="mt-4 text-base font-semibold text-brand-charcoal">{item.headline}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-brand-muted">{item.quote}</p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-brand-green/6 pt-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-semibold text-brand-green">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-charcoal">{item.author}</p>
                  <p className="text-[10px] text-brand-muted">{item.country}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Video testimonials */}
        <div className="mt-12">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
            Video Testimonials
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {videoTestimonials.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-brand-green/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(20,32,24,0.14)]"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={`${item.title} video testimonial`}
                    width={480}
                    height={270}
                    className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play className="size-4 fill-brand-green text-brand-green" aria-hidden="true" />
                    </div>
                  </div>
                </a>
                <div className="p-4">
                  <h4 className="line-clamp-2 text-sm font-semibold text-brand-charcoal">{item.title}</h4>
                  <p className="mt-1.5 text-[10px] text-brand-muted">Consultant: {item.consultant}</p>
                  <p className="text-[10px] text-brand-muted">PM: {item.projectManager}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-all hover:gap-3 hover:text-brand-green-light"
          >
            View All Testimonials
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
