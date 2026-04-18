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
];