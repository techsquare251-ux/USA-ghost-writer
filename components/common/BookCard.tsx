import Image from "next/image";
import type { PortfolioBook } from "@/src/data/portfolio";

type BookCardProps = {
  book: PortfolioBook;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-green/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(20,32,24,0.16)]">
      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-brand-cream">
          <Image
            src={book.coverImage}
            alt={`${book.title} by ${book.author}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/5 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded border border-white/40 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              View Book
            </span>
          </div>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-brand-charcoal">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-brand-muted">{book.author}</p>
        <div className="mt-auto pt-3">
          <span className="inline-block rounded-full bg-brand-green/8 px-2.5 py-1 text-[10px] font-medium tracking-wide text-brand-green">
            {book.genre}
          </span>
        </div>
      </div>
    </article>
  );
}
