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
  {
    id: "tt-2",
    author: "M. Alvarez",
    country: "Canada",
    headline: "Clear communication from start to finish",
    quote: "Their process was structured and transparent, and every milestone was delivered on time.",
    date: "2026-01-23",
    rating: 5,
  },
  {
    id: "tt-3",
    author: "R. Knight",
    country: "United Kingdom",
    headline: "Excellent editorial guidance",
    quote: "The editing team improved the manuscript without changing my voice. That balance was important to me.",
    date: "2025-12-08",
    rating: 4,
  },
];

// Placeholder for video testimonials; populate with real YouTube IDs when available.
export const videoTestimonials: VideoTestimonial[] = [];
