import Link from "next/link";
import { services } from "@/src/data/services";
import { CONTACT, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact-us", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-green/10 bg-white">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-semibold text-brand-green">{SITE_NAME}</p>
          <p className="mt-4 text-sm leading-6 text-brand-muted">
            Trusted publishing support for authors ready to launch with confidence.
          </p>

          <div className="mt-5 flex items-center gap-3 text-brand-muted">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Facebook"
              className="rounded-md px-2 py-1 text-xs font-semibold transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              FB
            </a>
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on X"
              className="rounded-md p-2 text-sm font-bold transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              X
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Instagram"
              className="rounded-md px-2 py-1 text-xs font-semibold transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              IG
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on YouTube"
              className="rounded-md px-2 py-1 text-xs font-semibold transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              YT
            </a>
            <a
              href={SOCIAL_LINKS.threads}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Threads"
              className="rounded-md px-2 py-1 text-xs font-semibold transition-colors hover:bg-brand-green/10 hover:text-brand-green"
            >
              Threads
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-brand-green" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Services</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-muted">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link className="hover:text-brand-green" href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-brand-charcoal">Contact Info</h3>
          <div className="mt-4 space-y-3 text-sm text-brand-muted">
            <p>
              Sales: <a href={`tel:${CONTACT.salesPhone}`}>{CONTACT.salesPhone}</a>
            </p>
            <p>
              Support: <a href={`tel:${CONTACT.supportPhone}`}>{CONTACT.supportPhone}</a>
            </p>
            <p>
              Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>{CONTACT.canadaAddress}</p>
            <p>{CONTACT.usaAddress}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-green/10 py-5 text-center text-sm text-brand-muted">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}