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
];