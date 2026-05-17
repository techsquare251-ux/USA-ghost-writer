import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | USA Ghost Writer",
  description: "The page you requested could not be found. Use the links to return to the homepage or key sections.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <main className="mx-auto max-w-container px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
      <p className="mt-4 text-sm text-brand-muted">Sorry, we couldn’t find that page. Use the links below to continue.</p>
      <ul className="mt-6 flex flex-col items-center gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-brand-green font-medium">{l.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
