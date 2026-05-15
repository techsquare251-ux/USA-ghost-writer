"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { textTestimonials } from "@/src/data/testimonials";

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollBySlide = (direction: "left" | "right") => {
    const container = trackRef.current;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.82, 320);
    container.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const updateActive = () => {
      const firstSlide = container.querySelector<HTMLElement>('[data-testimonial-slide="true"]');
      if (!firstSlide) return;

      const slideWidth = firstSlide.getBoundingClientRect().width;
      const gap = 20;
      const index = Math.round(container.scrollLeft / (slideWidth + gap));
      setActiveIndex(Math.max(0, Math.min(textTestimonials.length - 1, index)));
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="h-full w-full object-cover object-center"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-[#071225]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 size-80 rounded-full bg-[#193d73]/35 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-[28rem] rounded-full bg-[#c1121f]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Testimonials"
          title="What Authors Say About Working With Us"
          subtitle="Real feedback from clients who published with our editorial, design, and launch teams."
          eyebrowClassName="text-white/65"
          titleClassName="text-white"
          subtitleClassName="text-white/72"
        />

        <div className="mt-12 flex items-center justify-between gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Scroll testimonials left"
              onClick={() => scrollBySlide("left")}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Scroll testimonials right"
              onClick={() => scrollBySlide("right")}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {textTestimonials.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Jump to testimonial ${idx + 1}`}
                onClick={() => {
                  const container = trackRef.current;
                  if (!container) return;
                  const slide = container.querySelector<HTMLElement>(`[data-testimonial-index="${idx}"]`);
                  slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === idx ? "w-8 bg-secondary" : "w-2.5 bg-white/30 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative mt-8">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {textTestimonials.map((item, idx) => (
              <article
                key={item.id}
                data-testimonial-slide="true"
                data-testimonial-index={idx}
                className={`group relative shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${
                  idx === activeIndex ? "w-[84%] sm:w-[62%] lg:w-[48%]" : "w-[84%] sm:w-[56%] lg:w-[42%]"
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%)]" />

                <div className="relative p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={`${item.id}-${i}`} className="size-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white ring-1 ring-white/10">
                      {item.author
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-4">
                    <div className="font-serif text-5xl leading-none text-brand-gold/35">&ldquo;</div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                        {item.headline}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/78 sm:text-[15px]">
                        {item.quote}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/80">
                    <div>
                      <p className="font-semibold text-white">{item.author}</p>
                      <p className="text-xs text-white/55">{item.country}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">Verified Feedback</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-all hover:gap-3 hover:text-secondary"
          >
            View All Testimonials
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
