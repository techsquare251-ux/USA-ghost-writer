"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  PORTFOLIO_CATEGORY_LABELS,
  type PortfolioBook,
  type PortfolioCategory,
} from "@/src/data/portfolio";
import { fetchPortfolioBooks } from "@/src/lib/portfolio-api";
import { cn } from "@/lib/utils";

const tabs: PortfolioCategory[] = ["published_book", "upcoming_book"];

export function PortfolioSection() {
  const [active, setActive] = useState<PortfolioCategory>("published_book");
  const [selectedBook, setSelectedBook] = useState<PortfolioBook | null>(null);
  const [books, setBooks] = useState<PortfolioBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      try {
        const items = await fetchPortfolioBooks(undefined, controller.signal);
        setBooks(items);
      } catch {
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
    return () => controller.abort();
  }, []);

  const displayedBooks = useMemo(
    () => books.filter((book) => book.category === active),
    [active, books]
  );

  useEffect(() => {
    if (!selectedBook) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBook(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [selectedBook]);

  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBook]);

  useEffect(() => {
    setSelectedBook(null);
  }, [active]);

  const scrollByCardSet = (direction: "left" | "right") => {
    const container = trackRef.current;
    if (!container) return;
    const amount = Math.max(container.clientWidth * 0.82, 260);
    container.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-white via-brand-cream/70 to-white py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Portfolio"
          title={PORTFOLIO_CATEGORY_LABELS[active]}
          subtitle="A curated selection of author projects delivered with full editorial, design, and distribution support."
        />

        {/* Tab bar */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-brand-green/15 bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  active === tab
                    ? "bg-secondary text-white shadow-[0_10px_24px_-14px_rgba(193,18,31,0.6)]"
                    : "text-brand-muted hover:text-secondary"
                )}
              >
                {PORTFOLIO_CATEGORY_LABELS[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          {isLoading ? (
            <p className="py-16 text-center text-sm text-brand-muted">Loading portfolio items...</p>
          ) : displayedBooks.length === 0 ? (
            <div className="overflow-hidden rounded-[2rem] border border-brand-green/10 bg-white shadow-[0_20px_60px_-40px_rgba(11,60,109,0.24)]">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative flex min-h-[22rem] items-center justify-center bg-gradient-to-br from-brand-green via-brand-green/90 to-brand-green/70 px-8 py-12 text-center text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%)]" />
                  <div className="relative max-w-md">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                      <BookOpen className="size-8 text-white" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">{PORTFOLIO_CATEGORY_LABELS[active]}</p>
                    <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                      The next shelf is being prepared.
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/80">
                      We are adding new {active === "published_book" ? "published titles" : "upcoming books"}. Once they are available in the dashboard, they will appear here automatically.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-5 bg-brand-cream/40 p-8">
                  <div className="flex items-start gap-3 rounded-2xl border border-brand-green/10 bg-white p-4">
                    <Sparkles className="mt-0.5 size-5 shrink-0 text-secondary" />
                    <div>
                      <p className="font-semibold text-brand-charcoal">Fresh releases, coming soon</p>
                      <p className="mt-1 text-sm leading-6 text-brand-muted">Upcoming books will show up here with full cover art, author details, and quick links to Amazon.</p>
                    </div>
                  </div>

                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(193,18,31,0.65)] transition hover:bg-secondary/90"
                  >
                    Request a featured book
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                aria-label="Scroll books left"
                onClick={() => scrollByCardSet("left")}
                className="absolute -left-4 top-[45%] z-10 hidden -translate-y-1/2 rounded-full border border-brand-green/20 bg-white p-2.5 text-brand-charcoal shadow-md transition hover:border-secondary/40 hover:text-secondary md:flex"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>

              <div
                ref={trackRef}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {displayedBooks.map((book) => (
                  <article
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className="group relative w-[80%] shrink-0 cursor-pointer snap-start sm:w-[46%] md:w-[36%] lg:w-[28%] xl:w-[22%]"
                  >
                    {/* Cover */}
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_18px_44px_-24px_rgba(11,60,109,0.45)] transition-all duration-400 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_60px_-26px_rgba(11,60,109,0.6)]">
                      <div className="aspect-[2/3]">
                        <Image
                          src={book.coverImage}
                          alt={`${book.title} by ${book.author}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                          {book.genre}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold leading-snug text-white line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-white/65">{book.author}</p>
                        <span className="mt-4 inline-flex items-center gap-1 self-start rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Below-cover meta (visible by default, fades on hover) */}
                    <div className="mt-3 px-1 transition-opacity duration-300 group-hover:opacity-0">
                      <h3 className="line-clamp-1 text-sm font-semibold text-brand-charcoal">
                        {book.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-brand-muted">{book.author}</p>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                aria-label="Scroll books right"
                onClick={() => scrollByCardSet("right")}
                className="absolute -right-4 top-[45%] z-10 hidden -translate-y-1/2 rounded-full border border-brand-green/20 bg-white p-2.5 text-brand-charcoal shadow-md transition hover:border-secondary/40 hover:text-secondary md:flex"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* View all link */}
        <div className="mt-4 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green transition hover:text-secondary"
          >
            View full portfolio
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Detail modal */}
      {selectedBook ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm"
          onClick={() => setSelectedBook(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedBook.title} details`}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
              className="absolute right-5 top-5 z-10 rounded-full border border-brand-green/15 bg-white p-2 text-brand-charcoal shadow-sm transition hover:border-secondary/40 hover:text-secondary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="grid sm:grid-cols-[200px_1fr]">
              {/* Cover */}
              <div className="relative h-56 sm:h-auto">
                <Image
                  src={selectedBook.coverImage}
                  alt={`${selectedBook.title} by ${selectedBook.author}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/15 sm:bg-gradient-to-b" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green/80">
                    {selectedBook.genre}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-brand-charcoal">
                    {selectedBook.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-muted">by {selectedBook.author}</p>
                </div>

                <div className="h-px bg-brand-green/12" />

                <p className="flex-1 text-sm leading-relaxed text-brand-muted">
                  {selectedBook.description ??
                    `A ${selectedBook.genre.toLowerCase()} title delivered with end-to-end publishing support — from editorial refinement through to distribution setup.`}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href={selectedBook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(193,18,31,0.6)] transition hover:bg-secondary/90"
                  >
                    Buy on Amazon
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedBook(null)}
                    className="rounded-full border border-brand-green/20 px-5 py-2.5 text-sm font-semibold text-brand-charcoal transition hover:border-secondary/40 hover:text-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
