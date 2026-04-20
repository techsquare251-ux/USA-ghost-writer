import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { textTestimonials, videoTestimonials } from "@/src/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read text and video testimonials from authors who published with our team.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero title="Testimonials" current="Testimonials" />

      <section className="mx-auto max-w-container px-4 py-12">
        <div className="rounded-xl border border-brand-green/10 bg-brand-cream p-4 text-sm text-brand-charcoal">
          Rated 4.5/5 based on 21 reviews
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {textTestimonials.map((item) => (
            <article key={item.id} className="rounded-xl border border-brand-green/10 bg-white p-5">
              <div className="flex items-center gap-1 text-brand-gold">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={`${item.id}-${i}`} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs text-brand-muted">{item.country}</p>
              <h3 className="mt-1 text-lg font-semibold text-brand-charcoal">{item.headline}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{item.quote}</p>
              <p className="mt-3 text-xs text-brand-muted">{item.author} • {item.date}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 pb-16">
        <h2 className="text-2xl font-semibold text-brand-charcoal">Video Testimonials</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {videoTestimonials.map((item) => (
            <article key={item.id} className="rounded-xl border border-brand-green/10 bg-white p-3 shadow-sm">
              <a href={`https://www.youtube.com/watch?v=${item.youtubeId}`} target="_blank" rel="noopener noreferrer">
                <Image
                  src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={`${item.title} thumbnail`}
                  width={480}
                  height={270}
                  className="h-36 w-full rounded-lg object-cover"
                />
              </a>
              <h3 className="mt-3 text-sm font-semibold text-brand-charcoal">{item.title}</h3>
              <p className="mt-1 text-xs text-brand-muted">Consultant: {item.consultant}</p>
              <p className="text-xs text-brand-muted">PM: {item.projectManager}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
