import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT, SOCIAL_MEDIA_LOGOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Liblit Books Publishing for publishing, editing, and marketing support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" current="Contact" />

      <section className="mx-auto grid max-w-container gap-8 px-4 py-16 lg:grid-cols-2 lg:items-start">
        <div>
          <ContactForm context="contact-page" endpoint="/api/contact" submitLabel="Send Message" />
        </div>

        <aside className="rounded-2xl border border-brand-green/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-brand-charcoal">Contact Information</h2>
          <div className="mt-5 space-y-3 text-sm text-brand-muted">
            <p className="inline-flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Sales: {CONTACT.salesPhone}
            </p>
            <p className="inline-flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Support: {CONTACT.supportPhone}
            </p>
            <p className="inline-flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Email: {CONTACT.email}
            </p>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Canada: {CONTACT.canadaAddress}
            </p>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              USA: {CONTACT.usaAddress}
            </p>
          </div>

          <div className="mt-6 h-56 rounded-xl border border-brand-green/10 bg-brand-cream p-4 text-sm text-brand-muted">
            Google Maps placeholder
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
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
        </aside>
      </section>
    </>
  );
}
