# USA Ghost Writer — Next.js Rebuild: Agent Planning Document

---

## 1. Project Overview

Rebuild **usaghostwriter.com** in Next.js 14 (App Router) with a cleaner, more minimal, and professional UI.  
The redesign keeps all content and functionality from the original but strips visual noise, improves hierarchy, and creates a trustworthy brand impression befitting a premium publishing service.

**Core design philosophy:**  
- White/off-white base with a muted forest-green (`#2D5016` area) and warm cream accent  
- Clean serif headings (e.g. Playfair Display or DM Serif Display) + sans-serif body (Inter)  
- Generous white space, subtle borders, no gradient overload  
- Every CTA must feel premium, not loud

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui (Radix primitives) |
| Animation | Framer Motion (subtle only) |
| Forms | React Hook Form + Zod |
| Email/CRM | Resend (transactional email) or EmailJS as fallback |
| CMS (optional) | Contentlayer for blog MDX, or Sanity if dynamic blog needed |
| Fonts | `next/font` — Playfair Display + Inter |
| Icons | Lucide React |
| Images | `next/image` throughout |
| Deployment | Vercel |

---

## 3. Site Map & Route Structure

```
app/
├── layout.tsx                  ← Root layout (Navbar + Footer)
├── page.tsx                    ← Home
├── about/page.tsx
├── services/
│   ├── page.tsx                ← Services overview
│   ├── book-publishing/page.tsx
│   ├── book-editing/page.tsx
│   ├── proofreading/page.tsx
│   ├── book-formatting/page.tsx
│   ├── typesetting-layout-adjustment/page.tsx
│   ├── print-on-demand/page.tsx
│   ├── audio-book/page.tsx
│   ├── isbn-and-barcode/page.tsx
│   ├── book-marketing/page.tsx
│   ├── childrens-book-illustration/page.tsx
│   ├── book-illustration-services/page.tsx
│   ├── document-processing/page.tsx
│   └── book-translation/page.tsx
├── packages/page.tsx
├── portfolio/page.tsx
├── testimonials/page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── contact-us/page.tsx
├── privacy-policy/page.tsx
└── terms-and-conditions/page.tsx
```

---

## 4. Data Architecture

Keep all content in typed TypeScript data files under `src/data/`. This allows the agent to populate real content without a CMS and makes future migrations easy.

```
src/
├── data/
│   ├── services.ts         ← All 13 services (title, slug, icon, description, features)
│   ├── packages.ts         ← All 6 packages with features matrix
│   ├── testimonials.ts     ← Text + video testimonials
│   ├── portfolio.ts        ← Published books (title, author, cover img, amazon link)
│   ├── faqs.ts             ← FAQ Q&A pairs per page
│   ├── process.ts          ← 6-step publishing process
│   └── awards.ts           ← Awards/badges/credibility logos
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                 ← shadcn primitives (button, card, accordion, etc.)
│   ├── sections/           ← Reusable page sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── PackageCard.tsx
│   │   ├── PackageComparisonTable.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CTABanner.tsx
│   │   ├── DistributionLogos.tsx
│   │   ├── CredibilityBadges.tsx
│   │   └── VideoTestimonial.tsx
│   └── common/
│       ├── SectionHeader.tsx
│       └── BookCard.tsx
└── lib/
    ├── utils.ts
    └── constants.ts
```

---

## 5. Page-by-Page Specifications

### 5.1 Global Layout

**Navbar (`components/layout/Navbar.tsx`)**
- Sticky top bar with phone/email (desktop only)
- Main nav: Logo | Home | About | Services ▾ | Packages | Portfolio | Blog | Contact | [Talk to Expert] CTA button
- Services mega-menu dropdown: 2-column grid of all 13 services
- Mobile: hamburger → full-screen overlay with accordion for Services
- On scroll: background becomes solid white with subtle border-bottom

**Footer (`components/layout/Footer.tsx`)**
- 4-column: Logo + tagline | Quick Links | Services | Contact Info
- Social icons: Facebook, X, Instagram, YouTube, Threads
- Copyright line
- No animated GIF logo — use static SVG or PNG

---

### 5.2 Home Page (`app/page.tsx`)

Build as a composition of section components in this order:

1. **HeroSection** — Full-width, two-column layout
   - Left: Badge "#1 Self Publishing Company" | H1 headline | sub-copy | Lead form (Name, Phone, Email, + SMS consent checkbox) | Submit CTA
   - Right: Hero image (replace video thumbnail with a professional static illustration or photography)
   - Credibility logos (Google Partner, BBB, Trustpilot, Clutch) inline below form

2. **DistributionLogos** — "Sell Your Book With" — horizontal scrolling logo strip (Smashwords, B&N, Google Books, Draft2Digital, Amazon, Kobo, etc.)

3. **AboutSection** — Two-column: text left, image right
   - Headline + 3-paragraph intro
   - "Read More" link → /about

4. **PortfolioSection** — "Published Books" — horizontal scroll carousel of BookCards (cover image, title, author, Amazon link)
   - Tab toggle: "Published Books" | "Coming Soon"

5. **ServicesSection** — "Our Publishing Services"
   - Intro paragraph
   - Tabbed/accordion layout: clicking a service number reveals the service card with image + description + Read More link
   - Show 8 featured services (same as original)

6. **CTABanner** — "Do You Have Concerns?" — centered with two buttons: Speak to Consultant | Call Now

7. **ProcessSection** — "Our Process" — 6-step horizontal timeline (desktop) / vertical stacked (mobile)
   - Each step: number + icon + title + short description

8. **WhyChooseUs** — Two-column: image left, text right
   - Headline + intro paragraph
   - 6 bullet points in 2×3 grid: Affordable Price, Tailored Creativity, Expert Craftsmanship, Engaging Narratives, On-Time Deliveries, Pristine Publication
   - Two CTAs

9. **TestimonialsSection** — "Testimonials"
   - Star rating cards carousel (6 text testimonials)
   - Video testimonials grid (5 videos with YouTube embed modal)
   - "View More Testimonials" link

10. **FAQSection** — Accordion, 6 questions

11. **ContactFormSection** — "Let's Get in Touch"
    - Left: lady image
    - Right: Name, Phone, Email form + SMS consent + Submit

12. **AwardsSection** — "Awards & Recognition"
    - 6 award/badge cards in 2×3 grid

---

### 5.3 About Page (`app/about/page.tsx`)

- Page hero: title + breadcrumb
- Company story section (origin Feb 22, 2023, mission, team experience)
- Stats bar: Books Published, Years Experience, Satisfied Authors, Awards Won (animated counters)
- Team/values section
- Same CTABanner
- Same ContactFormSection

---

### 5.4 Services Overview Page (`app/services/page.tsx`)

- Page hero
- Grid of all 13 service cards: icon + number + title + short description + Read More link
- Same CTABanner

---

### 5.5 Individual Service Pages (`app/services/[service]/page.tsx`)

Each service page should follow a consistent template:
1. Page Hero (service name + breadcrumb)
2. Two-column intro (image + description with bullet features)
3. Why This Service Matters (3–4 feature highlight cards)
4. Our Process for this service (simplified 3-step)
5. Related Services grid
6. FAQ accordion (service-specific)
7. CTABanner
8. ContactFormSection

Use a dynamic template driven by `src/data/services.ts`.

---

### 5.6 Packages Page (`app/packages/page.tsx`)

**Tier 1 packages (individual cards):**
- Basic — $700
- Start Up — $2,000
- Standard — $3,000 *(featured/highlighted)*

**Tier 2 packages:**
- Expert — $7,000
- Premium — $15,000
- Enterprise — $25,000

**Layout per card:**
- Package name + price (large)
- Grouped feature lists by category (Manuscript Prep / Cover Design / Distribution / Marketing / Guarantees)
- Each feature line: check icon + label
- CTA: "Get a Quote" button → opens modal or links to /contact-us?package=NAME
- Phone + Live Chat links

**Comparison Table (below cards):**
- Sticky column headers
- Row groups matching categories
- ✓ / ✗ / text values
- Mobile: horizontally scrollable

**Payment terms note:**
- 50% upfront, remaining 50% in 2–3 months or after 3 chapters

**FAQ accordion at bottom**

---

### 5.7 Portfolio Page (`app/portfolio/page.tsx`)

- Page hero
- Filter bar: All | Fiction | Non-Fiction | Children's | Poetry | Memoir (use genre tags in data)
- Masonry or uniform grid of BookCards
- Each card: cover image, title, author, genre badge, "View on Amazon" button
- Use all 50+ books from the original site, stored in `src/data/portfolio.ts`

---

### 5.8 Testimonials Page (`app/testimonials/page.tsx`)

- Page hero
- Star rating summary: "Rated 4.5/5 based on 21 reviews"
- Text testimonials: card grid (2 col desktop, 1 col mobile)
  - Each card: stars, country, headline, body excerpt + expand toggle, name + date, Trustpilot link
- Video testimonials section:
  - 5-card grid
  - Each card: YouTube thumbnail image, play button overlay, book title, consultant, PM
  - Click → opens lightbox modal with YouTube iframe embed

---

### 5.9 Blog Page (`app/blog/page.tsx`)

- Featured post hero card (first post)
- Grid of blog cards: cover image, date, category tag, title, excerpt, Read More
- Use MDX files under `content/blog/` or a static `src/data/blog.ts` with placeholder posts
- Individual blog post page: `/blog/[slug]/page.tsx`
  - Article layout with reading progress bar
  - Related posts at bottom
  - CTA sidebar or inline CTA

---

### 5.10 Contact Page (`app/contact-us/page.tsx`)

- Two-column layout
- Left: form fields (Name, Phone, Email, Service Interest dropdown, Message textarea, SMS consent checkbox, Submit)
- Right: Contact info card (sales number, support number, email, Canada address, USA address) + Google Maps embed placeholder + social icons
- Form submission: POST to a Next.js API route (`/api/contact`) that sends email via Resend

---

### 5.11 Legal Pages

- `/privacy-policy` and `/terms-and-conditions` — simple prose layout with table of contents sidebar

---

## 6. API Routes

```
app/
└── api/
    ├── contact/route.ts        ← Handle contact form POST → send email
    └── quote/route.ts          ← Handle quote form POST (hero + package CTAs)
```

Both routes validate with Zod, send via Resend (or log to console in dev), return `{ success: boolean, message: string }`.

---

## 7. Design System (Tailwind Config)

```js
// tailwind.config.ts — extend with:
colors: {
  brand: {
    green: {
      DEFAULT: '#2D5016',
      light: '#3D6B20',
      muted: '#E8F0E0',
    },
    gold: '#C9A84C',
    cream: '#FAF7F2',
    charcoal: '#1A1A1A',
    muted: '#6B7280',
  }
},
fontFamily: {
  serif: ['Playfair Display', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
```

**Typography scale:**
- H1: `text-5xl font-serif font-bold` (hero)
- H2: `text-3xl font-serif font-semibold` (section headings)
- H3: `text-xl font-sans font-semibold`
- Body: `text-base font-sans text-brand-charcoal`
- Caption/label: `text-sm text-brand-muted`

**Component patterns:**
- Primary button: `bg-brand-green text-white hover:bg-brand-green-light rounded-md px-6 py-3 font-sans font-medium transition`
- Secondary button: `border border-brand-green text-brand-green hover:bg-brand-muted rounded-md px-6 py-3`
- Card: `bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition`
- Section padding: `py-20 px-4 max-w-7xl mx-auto`

---

## 8. SEO & Metadata

- Use `generateMetadata()` in every page file
- Root layout: global title template `%s | USA Ghost Writer`
- Each page: unique title, description, OG image
- `sitemap.ts` → auto-generate sitemap
- `robots.ts` → allow all
- Schema.org JSON-LD on Home (Organization), Service pages (Service), Blog posts (Article)

---

## 9. Performance Requirements

- All images: `next/image` with `width`, `height`, `alt`, `priority` on hero images
- Lazy load below-fold images
- Portfolio carousel: virtualized or paginated (don't render all 50+ books at once)
- YouTube embeds: use `lite-youtube-embed` or `react-lite-youtube-embed` for fast load
- Font loading: `next/font` with `display: swap`
- No jQuery, no heavy animation libraries beyond Framer Motion

---

## 10. Accessibility

- All images have descriptive `alt` text
- Focus-visible rings on all interactive elements
- ARIA labels on icon-only buttons
- Keyboard-navigable mobile menu and dropdowns
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Form labels associated with inputs; error messages linked via `aria-describedby`

---

## 11. Forms & Validation

All forms use **React Hook Form + Zod**.

### Lead/Contact Form Schema:
```ts
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s\-()]{7,}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  service: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean(),
})
```

- Inline validation errors below each field
- Loading spinner on submit button
- Success toast notification
- Error toast on API failure

---

## 12. Component Library Checklist

Build these components first (they are reused across many pages):

- [ ] `SectionHeader` — eyebrow label + H2 + optional subtitle
- [ ] `CTABanner` — full-width green band with heading + 2 buttons
- [ ] `ContactForm` — reusable, accepts page context prop
- [ ] `FAQAccordion` — accepts array of `{ q, a }` props
- [ ] `BookCard` — cover + title + author + CTA link
- [ ] `ServiceCard` — icon + number + title + description + link
- [ ] `PackageCard` — full feature list grouped by category
- [ ] `TestimonialCard` — stars + quote + author + date
- [ ] `VideoCard` — YouTube thumbnail + lightbox trigger
- [ ] `ProcessStep` — step number + icon + title + description
- [ ] `AwardBadge` — badge image + title + description

---

## 13. Implementation Order (Recommended for AI Agent)

**Phase 1 — Foundation**
1. Init Next.js 14 project with TypeScript + Tailwind + ESLint
2. Install shadcn/ui, configure components
3. Set up `tailwind.config.ts` with design system
4. Load fonts via `next/font`
5. Create all data files in `src/data/`
6. Build `Navbar` and `Footer` (global layout)
7. Create `SectionHeader`, `CTABanner`, `FAQAccordion` base components

**Phase 2 — Home Page**
8. Build all Home page section components
9. Wire up `app/page.tsx`
10. Hero lead form with API route

**Phase 3 — Core Pages**
11. About page
12. Packages page (cards + comparison table)
13. Portfolio page (grid + filter)
14. Testimonials page (cards + video lightbox)
15. Contact page (form + map placeholder)

**Phase 4 — Service Pages**
16. Services overview page
17. Service page template component
18. Wire all 13 service routes using dynamic data

**Phase 5 — Blog & Legal**
19. Blog listing page + post template
20. Privacy Policy + Terms pages

**Phase 6 — Polish**
21. Add Framer Motion transitions (page enter, scroll-reveal)
22. SEO metadata for all pages
23. sitemap.ts + robots.ts
24. Final responsive QA (mobile, tablet, desktop)
25. Lighthouse audit and performance fixes

---

## 14. UX Improvements Over Original

| Original Issue | Redesign Fix |
|---|---|
| Animated GIF logo in footer feels cheap | Static SVG/PNG logo |
| Services section duplicated twice on home | Single clean tabbed services section |
| CTA buttons overuse `javascript:;` | Proper modal/chat integration or link to contact |
| Hero uses autoplaying video background | Clean hero with professional image/illustration |
| Process section has duplicate rendering | One clean process with step indicators |
| Packages page shows cards with no visual hierarchy | Featured "Standard" card highlighted; clear tier separation |
| Book portfolio has no filtering | Filter bar by genre |
| No live video embeds — just thumbnails | Lightbox modal with YouTube iframe |
| No sticky CTA on scroll | Floating "Get a Quote" button on mobile |
| Google Maps missing from Contact | Embed Google Maps iframe for both addresses |

---

## 15. Environment Variables

```env
# .env.local
RESEND_API_KEY=re_xxxx
NEXT_PUBLIC_SITE_URL=https://usaghostwriter.com
NEXT_PUBLIC_PHONE_SALES=(888) 111-2222
NEXT_PUBLIC_PHONE_SUPPORT=(866) 333-4444
NEXT_PUBLIC_EMAIL=support@usaghostwriter.com
NEXT_PUBLIC_GTM_ID=GTM-xxxxx
```

---

## 16. Key Content Reference

### Services (13 total):
1. Book Publishing — `/book-publishing`
2. Book Editing — `/book-editing`
3. Proofreading — `/proofreading`
4. Book Formatting — `/book-formatting`
5. Typesetting & Layout Adjustment — `/typesetting-layout-adjustment`
6. Print On Demand — `/print-on-demand`
7. Document Processing — `/document-processing`
8. Audio Book — `/audio-book`
9. ISBN & Barcode — `/isbn-and-barcode`
10. Book Marketing — `/book-marketing`
11. Children's Book Illustration — `/childrens-book-illustration`
12. Book Illustration Services — `/book-illustration-services`
13. Book Translation — `/book-translation`

### Packages (6 tiers):
| Package | Price |
|---|---|
| Basic | $700 |
| Start Up | $2,000 |
| Standard | $3,000 |
| Expert | $7,000 |
| Premium | $15,000 |
| Enterprise | $25,000 |

### Distribution Partners:
Smashwords, Barnes & Noble, Google Books, Draft2Digital, Amazon, Kindle, Kobo, ACX

### Contact:
- Sales: (888) 786-7135
- Support: (866) 841-7469
- Email: support@usaghostwriter.com
- Canada: (optional)
- USA: 211 E 43rd St, 7th Floor, Suite #424, New York City, NY 10017

### Social:
- Facebook: facebook.com/usaghostwriter
- Twitter/X: x.com/usaghostwriter
- Instagram: instagram.com/usaghostwriter
- YouTube: youtube.com/@usaghostwriter
- Threads: (optional)

---

## 17. Notes for Agent

- Do NOT use `<form>` HTML elements — use React Hook Form with `<div>` wrappers and standard event handlers
- All external links (Amazon, Trustpilot, social) use `target="_blank" rel="noopener noreferrer"`
- The "Talk to an Expert" and "Speak to Consultant" CTAs should open a live chat widget (e.g. Tawk.to script in layout) or link to `/contact-us`
- Replace all `javascript:;` hrefs from the original
- Use placeholder images from `https://picsum.photos` or local `/public/placeholder/` folder until real assets are provided
- Keep all placeholder data clearly commented with `// TODO: Replace with real content`
- Type everything strictly — no `any`
- Run `next build` and ensure zero TypeScript errors before considering any phase complete