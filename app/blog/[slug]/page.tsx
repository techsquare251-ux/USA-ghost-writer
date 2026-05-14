import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { ReadingProgressBar } from "@/components/common/ReadingProgressBar";
import { getBlogPostBySlug, blogPosts } from "@/src/data/blog";
import { CTABanner } from "@/components/sections/CTABanner";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usaghostwriter.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "USA Ghost Writer",
    },
    publisher: {
      "@type": "Organization",
      name: "USA Ghost Writer",
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgressBar />
      <PageHero title={post.title} current="Blog" />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-12 lg:grid-cols-[1fr_0.3fr]">
        <article className="rounded-2xl border border-brand-green/10 bg-white p-6 sm:p-8">
          <p className="text-xs text-brand-muted">
            {post.publishedAt} • {post.category} • {post.readMinutes} min read
          </p>

          <div className="mt-4 space-y-6 text-base leading-8 text-brand-charcoal">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-brand-green/10 bg-brand-cream p-4">
            <p className="text-sm font-semibold text-brand-charcoal">Need publishing support?</p>
            <p className="mt-2 text-sm text-brand-muted">Talk to a consultant for a tailored roadmap.</p>
            <Link href="/contact-us" className="mt-3 inline-block text-sm font-semibold text-brand-green">
              Talk to Expert
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-container px-4 pb-12">
        <h2 className="text-2xl font-semibold text-brand-charcoal">Related Posts</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {relatedPosts.map((item) => (
            <article key={item.slug} className="rounded-xl border border-brand-green/10 bg-white p-5">
              <p className="text-xs text-brand-muted">{item.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{item.excerpt}</p>
              <Link href={`/blog/${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-brand-green">
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
