export type TextTestimonial = {
  id: string;
  author: string;
  country: string;
  headline: string;
  quote: string;
  date: string;
  rating: number;
};

export type VideoTestimonial = {
  id: string;
  title: string;
  youtubeId: string;
  consultant: string;
  projectManager: string;
};

// TODO: Replace placeholders with real Trustpilot and YouTube testimonial content.
export const textTestimonials: TextTestimonial[] = [
  {
    id: "tt-1",
    author: "J. Carter",
    country: "United States",
    headline: "A polished and dependable publishing team",
    quote:
      "They brought structure, clarity, and professionalism to every stage of our launch.",
    date: "2026-02-11",
    rating: 5,
  },
];

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "vt-1",
    title: "From Draft to Published",
    youtubeId: "dQw4w9WgXcQ",
    consultant: "A. Collins",
    projectManager: "R. Thompson",
  },
];