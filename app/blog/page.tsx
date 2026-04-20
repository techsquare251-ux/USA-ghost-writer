import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { blogPosts } from "@/src/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on publishing, editing, and book marketing for independent authors.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero title="Blog" current="Blog" />

      <section className="mx-auto max-w-container px-4 py-12">
        <article className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              width={1200}
              height={760}
              className="h-full w-full object-cover"
              priority
            />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Featured Post</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-charcoal">{featured.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-6 inline-block text-sm font-semibold text-brand-green hover:text-brand-green-light"
              >
                Read More
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <article key={post.slug} className="rounded-xl border border-brand-green/10 bg-white p-4 shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={760}
                className="h-44 w-full rounded-lg object-cover"
              />
              <p className="mt-3 text-xs text-brand-muted">
                {post.publishedAt} • {post.category}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">{post.title}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-brand-green hover:text-brand-green-light"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
