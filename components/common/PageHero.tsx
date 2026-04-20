import Link from "next/link";

type PageHeroProps = {
  title: string;
  current: string;
};

export function PageHero({ title, current }: PageHeroProps) {
  return (
    <section className="border-b border-brand-green/10 bg-gradient-to-b from-brand-cream to-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-container">
        <p className="text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand-green">
            Home
          </Link>{" "}
          / <span>{current}</span>
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-charcoal sm:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
