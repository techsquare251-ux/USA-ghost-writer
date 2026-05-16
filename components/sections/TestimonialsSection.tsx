"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

type TrustpilotReview = {
  id: string;
  author: string;
  country: string;
  headline: string;
  quote: string;
  date: string;
  rating: number;
  source?: string;
};

const FALLBACK_REVIEWS: TrustpilotReview[] = [
  {
    id: "fallback-1",
    author: "J. Carter",
    country: "United States",
    headline: "A polished and dependable publishing team",
    quote: "They brought structure, clarity, and professionalism to every stage of our launch.",
    date: "2026-02-11",
    rating: 5,
    source: "fallback",
  },
  {
    id: "fallback-2",
    author: "M. Alvarez",
    country: "Canada",
    headline: "Clear communication from start to finish",
    quote: "Their process was structured and transparent, and every milestone was delivered on time.",
    date: "2026-01-23",
    rating: 5,
    source: "fallback",
  },
];

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState<TrustpilotReview[]>(FALLBACK_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);

  const apiBaseUrl = useMemo(
    () => (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, ""),
    []
  );
  const trustpilotProfileUrl = useMemo(
    () => process.env.NEXT_PUBLIC_TRUSTPILOT_PROFILE_URL ?? "",
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const endpoint = apiBaseUrl
          ? `${apiBaseUrl}/api/reviews/trustpilot?limit=5`
          : "/api/reviews/trustpilot?limit=5";

        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to load reviews (${response.status})`);
        }

        const payload = (await response.json()) as {
          reviews?: TrustpilotReview[];
        };

        const nextReviews = (payload.reviews ?? [])
          .filter((item) => item.quote && item.author)
          .sort((left, right) => right.rating - left.rating || left.date.localeCompare(right.date))
          .slice(0, 5);

        if (nextReviews.length > 0) {
          setReviews(nextReviews);
        }
      } catch {
        setReviews(FALLBACK_REVIEWS);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();

    return () => controller.abort();
  }, [apiBaseUrl]);

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
      setActiveIndex(Math.max(0, Math.min(reviews.length - 1, index)));
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, [reviews.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews]);

  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-bg2.jpeg"
          alt=""
          fill
          priority={false}
          className="object-cover object-left-top sm:object-center lg:object-left-top"
        />

        {/* Dark overlay — keeps text crisp */}
        <div className="absolute inset-0 bg-[#020d1a]/80" />
        {/* Left-to-right gradient to match hero section */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 size-80 rounded-full bg-[#193d73]/35 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-[28rem] rounded-full bg-[#c1121f]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-container px-4">
        <div className="mx-auto mb-5 flex w-fit flex-col items-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm">
            <Image
              src="/trustpilot-badge.svg"
              alt="Trustpilot"
              width={240}
              height={56}
              className="h-10 w-auto"
              priority={false}
            />
          </div>

          {trustpilotProfileUrl ? (
            <Link
              href={trustpilotProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/78 transition hover:border-white/25 hover:bg-white/12 hover:text-white"
            >
              Visit Trustpilot Profile
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <SectionHeader
          centered
          eyebrow="Trustpilot Reviews"
          title="What Authors Say About Working With Us"
          subtitle="Highest-rated reviews fetched directly from Trustpilot, with a fallback shown when the feed is unavailable."
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
            {reviews.map((item, idx) => (
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
            {reviews.map((item, idx) => (
              <article
                key={item.id}
                data-testimonial-slide="true"
                data-testimonial-index={idx}
                className={`group relative shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${
                  idx === activeIndex ? "w-[88%] sm:w-[64%] lg:w-[52%]" : "w-[88%] sm:w-[58%] lg:w-[44%]"
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
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                        {item.source === "fallback" ? "Fallback Review" : "Trustpilot Review"}
                      </p>
                      <p className="mt-1 text-[11px] text-white/50">{item.date}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/45">
            Loading Trustpilot reviews...
          </div>
        ) : null}

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
