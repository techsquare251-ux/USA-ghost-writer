"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import {
  PORTFOLIO_CATEGORY_LABELS,
  type PortfolioBook,
  type PortfolioCategory,
} from "@/src/data/portfolio";
import { BookCard } from "@/components/common/BookCard";
import { fetchPortfolioBooks } from "@/src/lib/portfolio-api";

const categories: Array<"All" | PortfolioCategory> = ["All", "published_book", "upcoming_book"];

export function PortfolioClient() {
  const [books, setBooks] = useState<PortfolioBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [activeGenre, setActiveGenre] = useState<string>("All");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const items = await fetchPortfolioBooks();
        setBooks(items);
      } catch {
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filtered = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = activeCategory === "All" || book.category === activeCategory;
      const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
      return matchesCategory && matchesGenre;
    });
  }, [activeCategory, activeGenre, books]);

  const availableGenres = useMemo(() => {
    const genres = books.filter((book) => activeCategory === "All" || book.category === activeCategory).map((book) => book.genre);
    return ["All", ...Array.from(new Set(genres))];
  }, [activeCategory, books]);

  useEffect(() => {
    setActiveGenre("All");
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-container px-4 py-14">
      <div className="relative space-y-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "border-brand-green bg-brand-green text-white shadow-sm"
                  : "border-brand-green/15 bg-white text-brand-muted hover:border-brand-green/35 hover:text-brand-charcoal"
              }`}
            >
              {category === "All" ? "All Books" : PORTFOLIO_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {availableGenres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeGenre === genre
                  ? "border-secondary bg-secondary text-white shadow-sm"
                  : "border-brand-green/15 bg-white text-brand-muted hover:border-brand-green/35 hover:text-brand-charcoal"
              }`}
            >
              {genre}
              {genre === "All" && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    activeGenre === "All" ? "bg-white/20 text-white" : "bg-brand-green/8 text-brand-green"
                  }`}
                >
                  {books.filter((book) => activeCategory === "All" || book.category === activeCategory).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="mt-16 text-center text-sm text-brand-muted">Loading portfolio items...</p>
      ) : filtered.length === 0 ? (
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-brand-green/10 bg-white shadow-[0_20px_60px_-40px_rgba(11,60,109,0.24)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative flex min-h-[20rem] items-center justify-center bg-gradient-to-br from-brand-green via-brand-green/90 to-brand-green/70 px-8 py-12 text-center text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%)]" />
              <div className="relative max-w-md">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <BookOpen className="size-8 text-white" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">{activeCategory === "All" ? "Portfolio" : PORTFOLIO_CATEGORY_LABELS[activeCategory]}</p>
                <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">New books are on the way.</h3>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  We are preparing more titles for this category. Once they are published in the dashboard, they will appear here automatically.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-5 bg-brand-cream/40 p-8">
              <div className="flex items-start gap-3 rounded-2xl border border-brand-green/10 bg-white p-4">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <p className="font-semibold text-brand-charcoal">Curated releases, coming soon</p>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">Use the category and genre filters once new items are published.</p>
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
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-brand-muted/60">
        Showing {filtered.length} {filtered.length === 1 ? "title" : "titles"}
        {activeCategory !== "All" ? ` in ${PORTFOLIO_CATEGORY_LABELS[activeCategory]}` : ""}
        {activeGenre !== "All" ? ` with genre ${activeGenre}` : ""}
      </p>
    </section>
  );
}
