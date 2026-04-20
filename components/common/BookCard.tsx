import Image from "next/image";
import type { PortfolioBook } from "@/src/data/portfolio";

type BookCardProps = {
  book: PortfolioBook;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="w-44 shrink-0 rounded-xl border border-brand-green/10 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={book.coverImage}
          alt={`${book.title} by ${book.author}`}
          width={400}
          height={600}
          className="h-56 w-full object-cover"
        />
      </div>
      <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-brand-charcoal">{book.title}</h3>
      <p className="mt-1 line-clamp-1 text-xs text-brand-muted">{book.author}</p>
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xs font-semibold text-brand-green hover:text-brand-green-light"
      >
        View on Amazon
      </a>
    </article>
  );
}
