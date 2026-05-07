"use client";

import { useMemo, useState } from "react";
import { portfolioBooks, type PortfolioGenre } from "@/src/data/portfolio";
import { BookCard } from "@/components/common/BookCard";

const genres: Array<"All" | PortfolioGenre> = [
  "All",
  "Children's",
  "Cookbook",
  "Graphic Novel",
  "Health & Wellness",
  "Leadership",
  "Memoir",
  "Non-Fiction",
  "Planner",
  "Religion & Spirituality",
  "Self-Help",
];

export function PortfolioClient() {
  const [active, setActive] = useState<(typeof genres)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return portfolioBooks;
    return portfolioBooks.filter((book) => book.genre === active);
  }, [active]);

  return (
    <section className="mx-auto max-w-container px-4 py-14">
      <div className="relative">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActive(genre)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                active === genre
                  ? "border-brand-green bg-brand-green text-white shadow-sm"
                  : "border-brand-green/15 bg-white text-brand-muted hover:border-brand-green/35 hover:text-brand-charcoal"
              }`}
            >
              {genre}
              {genre === "All" && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    active === "All" ? "bg-white/20 text-white" : "bg-brand-green/8 text-brand-green"
                  }`}
                >
                  {portfolioBooks.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-brand-muted">No books found in this category.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-brand-muted/60">
        Showing {filtered.length} {filtered.length === 1 ? "title" : "titles"}
        {active !== "All" ? ` in ${active}` : ""}
      </p>
    </section>
  );
}
