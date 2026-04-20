export type FAQItem = {
  q: string;
  a: string;
};

// TODO: Replace with page-specific FAQs from the original site.
export const homeFaqs: FAQItem[] = [
  {
    q: "How long does publishing usually take?",
    a: "Timeline depends on manuscript condition and selected package, but projects generally move through a staged milestone process.",
  },
  {
    q: "Do you support first-time authors?",
    a: "Yes. We guide first-time authors through editing, formatting, publishing, and launch planning.",
  },
  {
    q: "Can I choose only one service instead of a full package?",
    a: "Yes. Authors can choose individual services like editing, formatting, or marketing based on project needs.",
  },
  {
    q: "Do you publish in print and digital formats?",
    a: "Yes. We support print-on-demand, ebook-ready formats, and marketplace setup guidance for each channel.",
  },
  {
    q: "How do payments work?",
    a: "Most projects begin with an initial payment, followed by milestone-based payments across the production timeline.",
  },
  {
    q: "Will I keep ownership of my manuscript?",
    a: "Yes. You retain ownership of your work while we provide production and publishing support as a service partner.",
  },
];