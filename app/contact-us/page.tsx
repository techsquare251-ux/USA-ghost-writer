import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with USA Ghost Writer for publishing, editing, and marketing support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" current="Contact" />
      <ContactFormSection />
    </>
  );
}
