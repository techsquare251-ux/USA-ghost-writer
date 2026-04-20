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
  {
    id: "tt-4",
    author: "L. Young",
    country: "United States",
    headline: "Strong design and formatting quality",
    quote: "The interior layout and cover treatment gave the book a premium finish that readers noticed immediately.",
    date: "2025-11-16",
    rating: 5,
  },
  {
    id: "tt-5",
    author: "A. Hussain",
    country: "United Arab Emirates",
    headline: "Reliable timeline and proactive team",
    quote: "I appreciated how proactive they were with updates and feedback loops at each stage.",
    date: "2025-10-27",
    rating: 4,
  },
  {
    id: "tt-6",
    author: "D. Morris",
    country: "Australia",
    headline: "Great launch support",
    quote: "Their launch plan helped us position the title better and get traction faster than expected.",
    date: "2025-09-14",
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
  {
    id: "vt-2",
    title: "Building a Better Author Brand",
    youtubeId: "9bZkp7q19f0",
    consultant: "S. Patel",
    projectManager: "M. Hughes",
  },
  {
    id: "vt-3",
    title: "What Changed After Professional Editing",
    youtubeId: "3JZ_D3ELwOQ",
    consultant: "N. Ramirez",
    projectManager: "C. White",
  },
  {
    id: "vt-4",
    title: "From Idea to Marketplace",
    youtubeId: "kJQP7kiw5Fk",
    consultant: "H. Grant",
    projectManager: "E. Foster",
  },
  {
    id: "vt-5",
    title: "Launching Across Multiple Platforms",
    youtubeId: "fJ9rUzIMcZQ",
    consultant: "B. Lewis",
    projectManager: "T. Reed",
  },
];