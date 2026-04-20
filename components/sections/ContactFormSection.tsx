import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactFormSection() {
  return (
    <section className="mx-auto grid max-w-container gap-8 px-4 py-20 lg:grid-cols-2 lg:items-center">
      <div className="overflow-hidden rounded-2xl border border-brand-green/10 bg-white p-3 shadow-sm">
        <Image
          src="https://picsum.photos/seed/contact-liblit/900/1080"
          alt="Publishing consultant ready to assist authors"
          width={900}
          height={1080}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      <div>
        <SectionHeader
          eyebrow="Contact"
          title="Let's Get In Touch"
          subtitle="Share a few details about your project and our team will get back to you with a suitable plan."
        />

        <div className="mt-6">
          <ContactForm context="contact-section" />
        </div>
      </div>
    </section>
  );
}
