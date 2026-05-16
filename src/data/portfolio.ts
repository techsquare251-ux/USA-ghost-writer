export type PortfolioCategory = "published_book" | "upcoming_book";

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  published_book: "Published Books",
  upcoming_book: "Upcoming Books",
};

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ["published_book", "upcoming_book"];

export const PORTFOLIO_GENRES: PortfolioGenre[] = [
  "Children's",
  "Cookbook",
  "Graphic Novel",
  "Health & Wellness",
  "Leadership", 
  "Memoir",
  "Non-Fiction",
  "Planner",
  "Religion & Spirituality",
  "Self-Help",
];

export type PortfolioGenre =
  | "Children's"
  | "Cookbook"
  | "Graphic Novel"
  | "Health & Wellness"
  | "Leadership"
  | "Memoir"
  | "Non-Fiction"
  | "Planner"
  | "Religion & Spirituality"
  | "Self-Help";

export type PortfolioBook = {
  id: string;
  title: string;
  author: string;
  category: PortfolioCategory;
  genre: PortfolioGenre;
  coverImage: string;
  amazonUrl: string;
  description?: string;
};
