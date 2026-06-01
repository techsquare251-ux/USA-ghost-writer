import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import { serviceSlugs } from "@/src/data/services";
import { blogPosts } from "@/src/data/blog";

export const metadata: Metadata = {
  title: "Sitemap | USA Ghost Writer",
  description: "HTML sitemap listing main pages for easy navigation and crawlability.",
  alternates: { canonical: `${SITE_URL}/sitemap` },
};

export default function SitemapPage() {
  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/packages", label: "Packages" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
  ];

  const serviceLinks = serviceSlugs.map((slug) => ({
    href: `/services/${slug}`,
    label: `Service: ${slug.replace(/-/g, " ")}`,
  }));

  const blogLinks = blogPosts.map((post) => ({
    href: `/blog/${post.slug}`,
    label: `Blog: ${post.title}`,
  }));

  const links = [...baseLinks, ...serviceLinks, ...blogLinks];

  return (
    <main className="mx-auto max-w-container px-4 py-12">
      <h1 className="text-3xl font-bold">Sitemap</h1>
      <p className="mt-2 text-sm text-brand-muted">A navigable HTML sitemap of main pages.</p>

      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-brand-green font-medium">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
