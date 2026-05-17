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
  { href: "/sitemap", label: "Sitemap" },
];

export function Footer() {
  return (
    <footer className="bg-brand-charcoal">
      {/* Top accent gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-60" />

      <div className="mx-auto grid max-w-container gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl font-semibold text-white">{SITE_NAME}</p>
          <p className="mt-4 text-sm leading-6 text-white/50">
            Trusted publishing support for authors ready to launch their book with confidence and
            clarity.
          </p>

          <div className="mt-6 flex items-center gap-2.5">
            {SOCIAL_MEDIA_LOGOS.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit us on ${social.name}`}
                className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-white/25 hover:bg-white/10"
              >
                <Image
                  src={social.logo}
                  alt={`${social.name} logo`}
                  width={18}
                  height={18}
                  className="size-[18px] object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-sm text-white/55 transition-colors hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Services
          </h3>
          <ul className="mt-5 space-y-2.5">
            {services.slice(0, 7).map((service) => (
              <li key={service.slug}>
                <Link
                  className="text-sm text-white/55 transition-colors hover:text-white"
                  href={`/services/${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Contact
          </h3>
          <div className="mt-5 space-y-3 text-sm text-white/55">
            <p>
              Sales:{" "}
              <a href={`tel:${CONTACT.salesPhone}`} className="transition-colors hover:text-white">
                {CONTACT.salesPhone}
              </a>
            </p>
            <p>
              Support:{" "}
              <a href={`tel:${CONTACT.supportPhone}`} className="transition-colors hover:text-white">
                {CONTACT.supportPhone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                {CONTACT.email}
              </a>
            </p>
            <div className="space-y-1 pt-2 text-xs text-white/30">
              <p>{CONTACT.canadaAddress}</p>
              <p>{CONTACT.usaAddress}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-6 text-center text-xs text-white/25">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
