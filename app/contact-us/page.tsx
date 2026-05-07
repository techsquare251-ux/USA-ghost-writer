import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT, SOCIAL_MEDIA_LOGOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Liblit Books Publishing for publishing, editing, and marketing support.",
};

const contactDetails = [
  { icon: Phone, label: "Sales", value: CONTACT.salesPhone, href: `tel:${CONTACT.salesPhone}` },
  { icon: Phone, label: "Support", value: CONTACT.supportPhone, href: `tel:${CONTACT.supportPhone}` },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: "Canada", value: CONTACT.canadaAddress },
  { icon: MapPin, label: "USA", value: CONTACT.usaAddress },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" current="Contact" />

      <section className="bg-gradient-to-b from-brand-cream/40 to-white py-24">
        <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let's Get In Touch"
              subtitle="Share a few details about your project and our team will respond with tailored publishing guidance."
            />

            <div className="mt-8 space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-green/15 bg-brand-green/5">
                    <Icon className="size-4 text-brand-green" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-brand-muted">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-semibold text-brand-charcoal transition hover:text-brand-green"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-brand-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl shadow-[0_20px_50px_-16px_rgba(20,32,24,0.16)]">
              <Image
                src="https://picsum.photos/seed/contact-liblit/900/600"
                alt="Publishing consultant ready to assist authors"
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
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

          <div className="lg:pt-2">
            <ContactForm context="contact-page" endpoint="/api/contact" submitLabel="Send Message" />
          </div>
        </div>
      </section>
    </>
  );
}
