import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const contactDetails = [
  { icon: Phone, label: "Sales", value: CONTACT.salesPhone, href: `tel:${CONTACT.salesPhone}` },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: "Location", value: "New York, USA", href: undefined },
];

export function ContactFormSection() {
  return (
    <section className="bg-gradient-to-b from-brand-cream/40 to-white py-24">
      <div className="mx-auto grid max-w-container gap-12 px-4 lg:grid-cols-2 lg:items-start">
        {/* Left column */}
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let's Get In Touch"
            subtitle="Share a few details about your project and our team will get back to you with a tailored publishing plan."
          />

          {/* Contact details */}
          <div className="mt-8 space-y-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-green/15 bg-brand-green/5">
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

          {/* Image */}
          <div className="mt-10 overflow-hidden rounded-3xl shadow-[0_20px_50px_-16px_rgba(20,32,24,0.16)]">
            <Image
              src="https://picsum.photos/seed/contact-liblit/900/600"
              alt="Publishing consultant ready to assist authors"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right column — form */}
        <div className="lg:pt-2">
          <ContactForm context="contact-section" />
        </div>
      </div>
    </section>
  );
}
