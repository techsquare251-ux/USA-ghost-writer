import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT } from "@/lib/constants";

const contactDetails = [
  { icon: Phone, label: "Sales", value: CONTACT.salesPhone, href: `tel:${CONTACT.salesPhone}` },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: "Location", value: CONTACT.usaAddress, href: undefined },
];

const notes = [
  {
    title: "Response Time",
    body: "We reply within 24 hours with a clear next step.",
    tone: "bg-[#FEF9C3] text-[#5a4a10]",
  },
  {
    title: "Free Consult",
    body: "Your first call is on us. No pressure, just clarity.",
    tone: "bg-[#FCE4D6] text-[#6b2a10]",
  },
];

export function ContactFormSection() {
  return (
    <section className="bg-gradient-to-b from-brand-cream/70 to-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-container gap-10 px-4 lg:grid-cols-2 lg:items-stretch">
        {/* Left column */}
        <div className="flex h-full flex-col gap-6">
          <SectionHeader
            eyebrow="Contact"
            title="Let's Get In Touch"
            subtitle="Share a few details about your project and our team will reply with a tailored publishing plan."
          />

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-brand-green/10 bg-white/90 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(11,60,109,0.25)]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-green/15 bg-brand-green/8">
                  <Icon className="size-4 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-muted">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-semibold text-brand-charcoal transition hover:text-secondary"
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

          <div className="relative overflow-hidden rounded-3xl shadow-[0_22px_50px_-18px_rgba(11,60,109,0.35)]">
            <Image
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=600&fit=crop&crop=center&q=85"
              alt="Publishing consultant ready to assist authors"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 hidden flex-col gap-3 md:flex">
              {notes.map((note, index) => (
                <div
                  key={note.title}
                  className={`max-w-[180px] rounded-xl p-3 shadow-[0_12px_24px_-16px_rgba(11,60,109,0.25)] ${note.tone} ${index === 1 ? "ml-6" : ""}`}
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-60">{note.title}</p>
                  <p className="mt-2 text-sm leading-snug">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div className="lg:pt-2">
          <div className="rounded-3xl border border-brand-green/10 bg-white/95 p-6 shadow-[0_20px_60px_-28px_rgba(11,60,109,0.4)] sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Start Your Journey</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-brand-charcoal">
                Request a Publishing Quote
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                No obligation. We will follow up with recommendations and next steps.
              </p>
            </div>
            <ContactForm context="contact-section" />
          </div>
        </div>
      </div>
    </section>
  );
}
