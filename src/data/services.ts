import { BookOpen, BookText, Languages, Megaphone, Mic2, Palette, ScanText, SpellCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  id: number;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

// TODO: Replace with real content copied from liblit.com
export const services: Service[] = [
  {
    id: 1,
    title: "Book Publishing",
    slug: "book-publishing",
    description: "End-to-end support from manuscript to market-ready release.",
    features: ["Publishing strategy", "ISBN support", "Distribution setup"],
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Book Editing",
    slug: "book-editing",
    description: "Developmental and line editing tailored to genre and audience.",
    features: ["Structural editing", "Line editing", "Editorial review"],
    icon: BookText,
  },
  {
    id: 3,
    title: "Proofreading",
    slug: "proofreading",
    description: "Final-stage review to ensure polish, consistency, and clarity.",
    features: ["Grammar review", "Style consistency", "Final QA pass"],
    icon: SpellCheck,
  },
  {
    id: 4,
    title: "Book Formatting",
    slug: "book-formatting",
    description: "Professional interior formatting for print and digital channels.",
    features: ["Print-ready files", "eBook formatting", "Typography setup"],
    icon: ScanText,
  },
  {
    id: 5,
    title: "Typesetting & Layout Adjustment",
    slug: "typesetting-layout-adjustment",
    description: "Refined interior composition for premium readability.",
    features: ["Chapter flow", "Spacing and rhythm", "Layout refinements"],
    icon: Palette,
  },
  {
    id: 6,
    title: "Print On Demand",
    slug: "print-on-demand",
    description: "Scalable print fulfillment with minimal inventory overhead.",
    features: ["POD setup", "Trim and paper choices", "Global availability"],
    icon: BookOpen,
  },
  {
    id: 7,
    title: "Document Processing",
    slug: "document-processing",
    description: "Conversion and cleanup services for manuscript-ready delivery.",
    features: ["File conversion", "Content cleanup", "Consistency checks"],
    icon: ScanText,
  },
  {
    id: 8,
    title: "Audio Book",
    slug: "audio-book",
    description: "Production support for audiobook planning and release.",
    features: ["Narration planning", "Audio mastering", "Distribution guidance"],
    icon: Mic2,
  },
  {
    id: 9,
    title: "ISBN & Barcode",
    slug: "isbn-and-barcode",
    description: "Standard identifiers prepared correctly for broad distribution.",
    features: ["ISBN registration", "Barcode generation", "Metadata checks"],
    icon: BookText,
  },
  {
    id: 10,
    title: "Book Marketing",
    slug: "book-marketing",
    description: "Targeted marketing campaigns to grow awareness and sales.",
    features: ["Launch planning", "Audience targeting", "Campaign reporting"],
    icon: Megaphone,
  },
  {
    id: 11,
    title: "Children's Book Illustration",
    slug: "childrens-book-illustration",
    description: "Custom illustrations designed for age-appropriate engagement.",
    features: ["Character design", "Scene illustration", "Art direction"],
    icon: Palette,
  },
  {
    id: 12,
    title: "Book Illustration Services",
    slug: "book-illustration-services",
    description: "Illustration support across fiction, nonfiction, and educational titles.",
    features: ["Visual style matching", "Cover and interior art", "Revision rounds"],
    icon: Palette,
  },
  {
    id: 13,
    title: "Book Translation",
    slug: "book-translation",
    description: "Localization and translation for multilingual publishing growth.",
    features: ["Language adaptation", "Cultural localization", "Quality review"],
    icon: Languages,
  },
];

export const featuredServiceSlugs = [
  "book-publishing",
  "book-editing",
  "proofreading",
  "book-formatting",
  "print-on-demand",
  "audio-book",
  "book-marketing",
  "book-translation",
];

export const serviceSlugs = services.map((service) => service.slug);

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}