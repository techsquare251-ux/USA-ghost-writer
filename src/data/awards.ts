export type Award = {
  id: string;
  name: string;
  description: string;
  image: string;
};

// TODO: Replace with real award and credibility badge assets.
export const awards: Award[] = [
  {
    id: "award-1",
    name: "Editors Choice",
    description: "Recognized for outstanding publishing support quality.",
    image: "https://picsum.photos/seed/award-1/240/240",
  },
  {
    id: "award-2",
    name: "Author Trust Badge",
    description: "Trusted by independent authors across multiple genres.",
    image: "https://picsum.photos/seed/award-2/240/240",
  },
  {
    id: "award-3",
    name: "Publishing Excellence",
    description: "Recognized for high-quality author-first production standards.",
    image: "https://picsum.photos/seed/award-3/240/240",
  },
  {
    id: "award-4",
    name: "Creative Design Merit",
    description: "Awarded for strong visual direction and book presentation.",
    image: "https://picsum.photos/seed/award-4/240/240",
  },
  {
    id: "award-5",
    name: "Reader Impact Mark",
    description: "Celebrates titles that connect strongly with target audiences.",
    image: "https://picsum.photos/seed/award-5/240/240",
  },
  {
    id: "award-6",
    name: "Global Distribution Badge",
    description: "Honors effective multi-platform publishing operations.",
    image: "https://picsum.photos/seed/award-6/240/240",
  },
];