"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, PenLine, Star, Users } from "lucide-react";

const STATS = [
  { num: "200+", label: "Books Published" },
  { num: "150+", label: "Happy Authors" },
  { num: "10+",  label: "Years of Experience" },
];

const FEATURES = [
  {
    icon: PenLine,
    title: "Story-Driven Writing",
    desc: "From outlines to final chapters, every word is crafted to engage readers and match your unique voice.",
  },
  {
    icon: BookOpen,
    title: "Complete Book Creation",
    desc: "Writing, editing, formatting, cover design, and publishing support — all under one roof.",
  },
  {
    icon: Star,
    title: "Publish-Ready Quality",
    desc: "Your manuscript is professionally polished, refined, and prepared for global publishing platforms.",
  },
];

const EASE = "easeOut" as const;
const VIEW = { once: true, amount: 0.2 as const };

export function AboutSection() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-labelledby="about-heading"
    >
      {/* top accent rule */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">

        {/* ── LEFT: image panel ─────────────────────────────────────── */}
        <motion.div
          className="relative min-h-[420px] overflow-hidden lg:min-h-[700px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <Image
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=920&h=1100&fit=crop&crop=center&q=85"
            alt="Shelves of books in warm library light"
            fill
            className="object-cover"
            priority
          />

          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          {/* floating stats card */}
          <motion.div
            className="absolute bottom-8 left-6 right-6 sm:right-auto sm:w-72"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          >
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="mb-3 flex items-center gap-2">
                <Users className="size-4 text-accent" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Our Track Record
                </span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/15">
                {STATS.map(({ num, label }) => (
                  <div key={label} className="px-3 first:pl-0 last:pr-0">
                    <div className="text-2xl font-black text-white">{num}</div>
                    <div className="mt-0.5 text-[10px] leading-snug text-white/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* vertical brand label */}
          <div
            className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:flex"
            aria-hidden="true"
          >
            <span
              className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/25"
              style={{ writingMode: "vertical-rl" }}
            >
              USA Ghost Writer
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: content panel ──────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-20">

          {/* eyebrow */}
          <motion.div
            className="mb-5 flex items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-accent">
              About Us
            </span>
          </motion.div>

          {/* heading */}
          <motion.h2
            id="about-heading"
            className="mb-5 text-[clamp(28px,3.8vw,50px)] font-black leading-[1.05] tracking-tight text-brand-charcoal"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          >
            A Ghostwriting Partner{" "}
            <br className="hidden sm:block" />
            <em className="not-italic text-primary">Built for Author</em>{" "}
            <span className="text-secondary">Success</span>
          </motion.h2>

          {/* accent bar */}
          <motion.div
            className="mb-7 h-1 w-14 rounded-full bg-gradient-to-r from-secondary to-accent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
            style={{ originX: 0 }}
          />

          {/* body */}
          <motion.div
            className="mb-8 space-y-4 text-[16px] leading-7 text-brand-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.32 }}
          >
            <p>
              We transform ideas, stories, and expertise into professionally written books that reflect your voice and vision.
            </p>
            <p>
              Our ghostwriting team works closely with authors through every stage of the writing journey — with creativity, confidentiality, and a clear process from concept to completion.
            </p>
          </motion.div>

          {/* feature list */}
          <motion.ul
            className="mb-9 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/8">
                  <Icon className="size-4 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-brand-charcoal">{title}</p>
                  <p className="text-[13px] leading-5 text-brand-muted">{desc}</p>
                </div>
              </li>
            ))}
          </motion.ul>

          {/* blockquote */}
          <motion.blockquote
            className="mb-9 border-l-[3px] border-primary pl-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.48 }}
          >
            <p className="text-[15px] italic leading-6 text-primary">
              &ldquo;We do not just write books — we turn ideas into powerful stories readers remember.&rdquo;
            </p>
            <cite className="mt-2 block text-[10px] font-bold not-italic uppercase tracking-[0.18em] text-accent">
              — YOUR GHOSTWRITING TEAM
            </cite>
          </motion.blockquote>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE, delay: 0.56 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 rounded-full bg-secondary px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_-14px_rgba(193,18,31,0.65)] transition-all duration-200 hover:bg-secondary/90 hover:shadow-[0_16px_36px_-14px_rgba(193,18,31,0.75)] active:scale-[0.98]"
            >
              Read Our Story
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
