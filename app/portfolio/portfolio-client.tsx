"use client";

import { useMemo, useState } from "react";
import { portfolioBooks, type PortfolioGenre } from "@/src/data/portfolio";
import { BookCard } from "@/components/common/BookCard";

const genres: Array<"All" | PortfolioGenre> = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Children's",
  "Poetry",
  "Memoir",
];

export function PortfolioClient() {
  const [active, setActive] = useState<(typeof genres)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") {
      return portfolioBooks;
    }
    return portfolioBooks.filter((book) => book.genre === active);
  }, [active]);

  return (
    <section className="mx-auto max-w-container px-4 py-12">
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => setActive(genre)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === genre
                ? "border-brand-green bg-brand-green text-white"
                : "border-brand-green/20 bg-white text-brand-muted"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
