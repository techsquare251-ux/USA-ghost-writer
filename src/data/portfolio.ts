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
  },
  {
    id: "book-2",
    title: "Learning in Layers",
    author: "David Stone",
    genre: "Non-Fiction",
    coverImage: "https://picsum.photos/seed/book-2/400/600",
    amazonUrl: "https://amazon.com",
  },
];