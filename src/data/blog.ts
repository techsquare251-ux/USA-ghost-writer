export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  coverImage: string;
  publishedAt: string;
  readMinutes: number;
  content: string[];
};

// TODO: Replace placeholder blog content with real editorial articles.
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-your-manuscript-for-publishing",
    title: "How to Prepare Your Manuscript for Professional Publishing",
    excerpt:
      "A practical checklist for getting your draft ready for editing, design, and distribution without avoidable delays.",
    category: "Publishing",
    coverImage: "https://picsum.photos/seed/blog-1/1200/760",
    publishedAt: "2026-03-10",
    readMinutes: 8,
    content: [
      "Preparing a manuscript for publishing is more than correcting typos. It means setting up your structure, narrative flow, and formatting standards so downstream production steps can move quickly and accurately.",
      "Start by defining your reader and positioning. This affects your title, subtitle, tone, chapter sequence, and even design direction. When positioning is vague, every later decision becomes slower and more expensive.",
      "Next, complete a layered editorial process: developmental notes, line edits, and proofreading. Skipping editorial stages often results in avoidable revisions during layout and pre-release quality review.",
      "Before handoff, consolidate files and references into one clean package. Include manuscript version number, artwork source files, style choices, and any legal disclaimers. Organized handoff dramatically reduces production friction.",
      "Finally, plan launch logistics early: metadata, categories, pricing, and platform distribution strategy. A strong launch is built before the book is uploaded, not after.",
    ],
  },
  {
    slug: "editing-vs-proofreading-what-authors-need",
    title: "Editing vs Proofreading: What Authors Actually Need",
    excerpt:
      "Understand the difference between editorial services and when to invest in each stage for better reader outcomes.",
    category: "Editing",
    coverImage: "https://picsum.photos/seed/blog-2/1200/760",
    publishedAt: "2026-02-26",
    readMinutes: 6,
    content: [
      "Many authors treat editing and proofreading as the same task, but they solve different problems. Editing improves writing quality and structure. Proofreading checks final correctness before release.",
      "Developmental editing examines narrative architecture, pacing, clarity, and chapter-level decisions. It is strategic and high impact, especially for early drafts and first-time authors.",
      "Line editing operates closer to sentence quality: rhythm, readability, tone consistency, and word-level precision. It refines your voice without replacing it.",
      "Proofreading comes last. It catches residual grammar issues, punctuation errors, and formatting inconsistencies after layout is complete.",
      "When budget is limited, prioritize editing first. Proofreading is essential, but it cannot fix structural issues that should have been addressed earlier.",
    ],
  },
  {
    slug: "book-launch-basics-for-first-time-authors",
    title: "Book Launch Basics for First-Time Authors",
    excerpt:
      "A beginner-friendly launch framework covering timeline, channels, and measurable campaign priorities.",
    category: "Marketing",
    coverImage: "https://picsum.photos/seed/blog-3/1200/760",
    publishedAt: "2026-01-30",
    readMinutes: 7,
    content: [
      "A good launch plan focuses on a narrow set of actions done well. Most first-time launches underperform because they try to do too many channels at once with no clear priority.",
      "Begin with your core message and audience segment. Then align assets: cover, author bio, launch copy, and channel-specific variations for email, social, and sales pages.",
      "Create a 30-day timeline with pre-launch, release week, and post-launch phases. Assign each action to a date, owner, and measurable target.",
      "Track practical indicators: click-through rate, conversion by channel, and review velocity. These metrics tell you what to scale and what to stop.",
      "Treat launch as iteration. The first month gives you signal; sustained visibility comes from refining campaigns and continuing audience engagement.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
