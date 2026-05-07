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
  genre: PortfolioGenre;
  coverImage: string;
  amazonUrl: string;
  description?: string;
};

export const portfolioBooks: PortfolioBook[] = [
  {
    id: "book-1",
    title: "2 Salty 2 Be Sweet",
    author: "Kendra Ellison",
    genre: "Children's",
    coverImage: "/books/2-salty-2-be-sweet.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "The first book in a series following Julienne Thyme, a smart young girl who solves a culinary mystery with her friends.",
  },
  {
    id: "book-2",
    title: "Positive1: Live a Positive or Negative Life?",
    author: "Darnell Devon Drew Jr.",
    genre: "Self-Help",
    coverImage: "/books/positive-1.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A self-help journey through doubt and transition, showing how choosing positivity can reshape outlook and reality.",
  },
  {
    id: "book-3",
    title: "Principal's Matter: Empowering School Administrators and Organizational Leaders",
    author: "Jorge A. Rivas",
    genre: "Leadership",
    coverImage: "/books/principals-matter.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A leadership guide for school principals and organizational leaders focused on trust, growth, and shared vision.",
  },
  {
    id: "book-4",
    title:
      "The Making of the Iron Lady: How One White Woman Went from an Aristocratic Background to Overcoming Homelessness Then Back to Wealth and Success with Two Doctorates",
    author: "Sophia Rothschild",
    genre: "Memoir",
    coverImage: "/books/the-making-of-the-iron-lady.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A memoir of a dramatic journey from privilege to homelessness and back to success with two doctoral degrees.",
  },
  {
    id: "book-5",
    title: "Great Answers to Life's Questions: 1,000 Sayings to Enhance Modern Living",
    author: "Marcus L. Whitman",
    genre: "Non-Fiction",
    coverImage: "/books/lifes.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A collection of 1,000 sayings blending ancient proverbs and modern reflections for daily encouragement.",
  },
  {
    id: "book-6",
    title: "The Physics of Religion: From Buddha to Jesus",
    author: "Dr. William Joel Meggs",
    genre: "Religion & Spirituality",
    coverImage: "/books/the-physics-of-religion.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A thought-provoking work linking enlightenment and quantum physics as shared properties of nature.",
  },
  {
    id: "book-7",
    title: "Fires of Change: A Journey Through Life and Flavor - A Cookbook",
    author: "Chef Guaracyara \"Guara\" Pimenta",
    genre: "Cookbook",
    coverImage: "/books/fires-of-change.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A Brazilian-born chef shares favorite recipes with the life stories and traditions behind them.",
  },
  {
    id: "book-8",
    title: "Jesus Walks Into a Bar",
    author: "Caleb R. Hawthorne",
    genre: "Religion & Spirituality",
    coverImage: "/books/jesus-walk-into-a-bar.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A witty, honest take on big theological questions aimed at skeptics and curious believers alike.",
  },
  {
    id: "book-9",
    title: "From Broken to Redeemed",
    author: "Elena Marquez",
    genre: "Memoir",
    coverImage: "/books/from-broken-to-redeemed.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A personal story of survival and healing, anchored in faith and the promise of redemption.",
  },
  {
    id: "book-10",
    title: "The Dairy of God: A Journey of Love, Life, and the Power Within",
    author: "Sofia Reynolds",
    genre: "Children's",
    coverImage: "/books/the-dairy-of-god.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A children's story about love, self-discovery, and courage, told through a young girl's voice.",
  },
  {
    id: "book-11",
    title: "He Loved Me to Death: From Hell to Heaven",
    author: "Danielle Brooks",
    genre: "Memoir",
    coverImage: "/books/he-loved-me-to-death.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A harrowing memoir of surviving decades of abuse and finding strength beyond the trauma.",
  },
  {
    id: "book-12",
    title: "Universal Lady Justice Aya (Part 1 - Volume 1)",
    author: "Kenji Mori",
    genre: "Graphic Novel",
    coverImage: "/books/lady-justice-aya.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A manga-style story set in 2084 where magic, alien factions, and conspiracy collide.",
  },
  {
    id: "book-13",
    title: "Weekly Planner",
    author: "Lauren Sinclair",
    genre: "Planner",
    coverImage: "/books/waply-phnna.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A motivational weekly planner with goal-setting, self-care pages, and inspirational quotes.",
  },
  {
    id: "book-14",
    title: "Mastering Tai Chi Chuan",
    author: "Victor Liang",
    genre: "Health & Wellness",
    coverImage: "/books/mastering-tai-chi-chuan.jpeg",
    amazonUrl: "https://amazon.com",
    description:
      "A guide to improving mobility, balance, and well-being through daily Tai Chi practice.",
  },
];