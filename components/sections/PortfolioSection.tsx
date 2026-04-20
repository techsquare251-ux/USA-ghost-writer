"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { portfolioBooks, type PortfolioBook } from "@/src/data/portfolio";
import { cn } from "@/lib/utils";

const tabs = ["Published Books", "Coming Soon"] as const;

export function PortfolioSection() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Published Books");
  const [selectedBook, setSelectedBook] = useState<PortfolioBook | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const displayedBooks = active === "Published Books" ? portfolioBooks : portfolioBooks.slice(0, 4);

  useEffect(() => {
    if (!selectedBook) {
      return;
    }

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedBook(null);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [selectedBook]);

  const scrollByCardSet = (direction: "left" | "right") => {
    const container = trackRef.current;
    if (!container) {
      return;
    }

    const amount = Math.max(container.clientWidth * 0.82, 260);
    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Portfolio"
          title="Published Books"
          subtitle="A selection of author projects delivered with editorial, design, and distribution support."
        />

        <div className="mt-7 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                active === tab
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-brand-green/20 bg-white text-brand-muted hover:border-brand-green/35"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Scroll books left"
            onClick={() => scrollByCardSet("left")}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-green/20 bg-white p-2 text-brand-charcoal shadow-sm transition hover:border-brand-green/40 hover:text-brand-green md:block"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayedBooks.map((book) => (
              <article
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="group w-[84%] shrink-0 cursor-pointer snap-start rounded-2xl border border-brand-green/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[48%] md:w-[38%] lg:w-[31%] xl:w-[23%]"
              >
                <div className="mx-auto w-full max-w-[210px] [perspective:1000px]">
                  <div className="relative overflow-hidden rounded-md border border-black/5 bg-white shadow-[10px_0_0_rgba(0,0,0,0.08),0_22px_24px_-20px_rgba(0,0,0,0.5)] transition duration-300 group-hover:shadow-[14px_0_0_rgba(0,0,0,0.1),0_28px_30px_-18px_rgba(0,0,0,0.55)]">
                    <Image
                      src={book.coverImage}
                      alt={`${book.title} by ${book.author}`}
                      width={400}
                      height={600}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <h3 className="mt-4 line-clamp-2 text-center text-base font-semibold leading-snug text-brand-charcoal">
                  {book.title}
                </h3>
                <p className="mt-1 text-center text-sm text-brand-muted">by: {book.author}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll books right"
            onClick={() => scrollByCardSet("right")}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-brand-green/20 bg-white p-2 text-brand-charcoal shadow-sm transition hover:border-brand-green/40 hover:text-brand-green md:block"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {selectedBook ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4 py-8"
          onClick={() => setSelectedBook(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedBook.title} details`}
            className="relative grid w-full max-w-3xl gap-6 rounded-2xl bg-white p-5 shadow-2xl sm:p-6 md:grid-cols-[240px_1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
              className="absolute right-4 top-4 rounded-full border border-brand-green/15 p-1.5 text-brand-charcoal transition hover:border-brand-green/35 hover:text-brand-green"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="mx-auto w-full max-w-[220px]">
              <Image
                src={selectedBook.coverImage}
                alt={`${selectedBook.title} by ${selectedBook.author}`}
                width={420}
                height={630}
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green/80">Published Book</p>
              <h3 className="mt-2 text-2xl font-semibold text-brand-charcoal">{selectedBook.title}</h3>
              <p className="mt-1 text-sm text-brand-muted">by: {selectedBook.author}</p>
              <p className="mt-4 text-sm leading-6 text-brand-muted">
                {selectedBook.description ??
                  `A ${selectedBook.genre.toLowerCase()} title delivered with end-to-end publishing support, from editorial refinement to distribution setup.`}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={selectedBook.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-light"
                >
                  Buy / View Book
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="rounded-md border border-brand-green/20 px-4 py-2 text-sm font-semibold text-brand-charcoal transition hover:border-brand-green/35 hover:text-brand-green"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
