export type PortfolioGenre =
  | "Fiction"
  | "Non-Fiction"
  | "Children's"
  | "Poetry"
  | "Memoir";

export type PortfolioBook = {
  id: string;
  title: string;
  author: string;
  genre: PortfolioGenre;
  coverImage: string;
  amazonUrl: string;
  description?: string;
};

// TODO: Replace with full 50+ books and real cover links.
export const portfolioBooks: PortfolioBook[] = [
  {
    id: "book-1",
    title: "The Quiet Valley",
    author: "Mira Caldwell",
    genre: "Fiction",
    coverImage: "https://picsum.photos/seed/book-1/400/600",
    amazonUrl: "https://amazon.com",
    description:
      "A reflective literary novel about homecoming, memory, and the quiet decisions that shape a family across generations.",
  },
  {
    id: "book-2",
    title: "Learning in Layers",
    author: "David Stone",
    genre: "Non-Fiction",
    coverImage: "https://picsum.photos/seed/book-2/400/600",
    amazonUrl: "https://amazon.com",
    description:
      "A practical guide for modern educators and mentors on building durable learning systems for students and teams.",
  },
  {
    id: "book-3",
    title: "Little Lantern at Dawn",
    author: "Ava Lin",
    genre: "Children's",
    coverImage: "https://picsum.photos/seed/book-3/400/600",
    amazonUrl: "https://amazon.com",
    description:
      "A warm bedtime story that helps young readers navigate fear, kindness, and confidence through magical adventures.",
  },
  {
    id: "book-4",
    title: "Paper Boats and Other Poems",
    author: "Noah Reed",
    genre: "Poetry",
    coverImage: "https://picsum.photos/seed/book-4/400/600",
    amazonUrl: "https://amazon.com",
    description:
      "A contemporary poetry collection that explores identity, grief, and wonder in sharp, image-rich verse.",
  },
  {
    id: "book-5",
    title: "The Bridge We Built",
    author: "Elena Morris",
    genre: "Memoir",
    coverImage: "https://picsum.photos/seed/book-5/400/600",
    amazonUrl: "https://amazon.com",
    description:
      "A moving memoir of migration, resilience, and rebuilding community in a new country.",
  },
  {
    id: "book-6",
    title: "Signal in the Orchard",
    author: "Jonas Hale",
    genre: "Fiction",
    coverImage: "https://picsum.photos/seed/book-6/400/600",
    amazonUrl: "https://amazon.com",
  },
  {
    id: "book-7",
    title: "The Productive Writer's Atlas",
    author: "Rina Patel",
    genre: "Non-Fiction",
    coverImage: "https://picsum.photos/seed/book-7/400/600",
    amazonUrl: "https://amazon.com",
  },
  {
    id: "book-8",
    title: "Echoes Under Cedar",
    author: "Malcolm Price",
    genre: "Fiction",
    coverImage: "https://picsum.photos/seed/book-8/400/600",
    amazonUrl: "https://amazon.com",
  },
];