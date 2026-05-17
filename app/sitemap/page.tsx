import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap | USA Ghost Writer",
  description: "HTML sitemap listing main pages for easy navigation and crawlability.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  const links = [
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
