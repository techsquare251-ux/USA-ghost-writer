import Image from "next/image";
import Link from "next/link";
import { services } from "@/src/data/services";
import { CONTACT, SITE_NAME, SOCIAL_MEDIA_LOGOS } from "@/lib/constants";

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
            {SOCIAL_MEDIA_LOGOS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit us on ${social.name}`}
                className="rounded-lg border border-brand-green/10 bg-white p-2 transition-colors hover:border-brand-green/30 hover:bg-brand-green/5"
              >
                <Image
                  src={social.logo}
                  alt={`${social.name} logo`}
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              </a>
            ))}
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