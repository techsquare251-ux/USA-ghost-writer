"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────────────────────────────*/
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface Sticky { label: string; text: string; bg: string; color: string; rotate: string; top: string; left: string; delay: string; }
const stickies: Sticky[] = [
  { label: "Editor's Note",   text: '"Clarity before creativity — structure first, voice second."', bg: "#FEF9C3", color: "#5a4a10", rotate: "-3deg",  top: "8%",  left: "5%",  delay: "0.55s" },
  { label: "Author Tip",      text: "Great books are forged in revision, not the first draft.",       bg: "#FCE4D6", color: "#6b2a10", rotate: "2.5deg", top: "42%", left: "3%",  delay: "0.72s" },
  { label: "From Our Desk",   text: "We've helped 150+ authors go from manuscript to market.",        bg: "#DBEAFE", color: "#1e3a5f", rotate: "-1.8deg", top: "10%", left: "60%", delay: "0.88s" },
];

/* ─── component ──────────────────────────────────────────────────────────────*/
export function AboutSection() {
  const { ref, visible } = useInView();

  return (
    <section
      ref={ref}
      className="ab-section relative overflow-hidden"
      style={{ background: "#F8F9FC" }}
      aria-labelledby="about-heading"
    >
        {/* top gradient rule */}
        <div
          className="absolute top-0 inset-x-0 h-[3px] z-10"
          style={{ background: "linear-gradient(90deg,#0B3C6D 0%,#D4A017 50%,#C1121F 100%)" }}
        />

        {/* ── SPLIT LAYOUT ─────────────────────────────────────────────────── */}
        <div className="relative flex flex-col lg:flex-row" style={{ minHeight: "820px" }}>

          {/* ████ LEFT — photo half ████ */}
          <div className="relative w-full lg:w-[48%] flex-shrink-0 overflow-hidden" style={{ minHeight: "820px" }}>
            <Image
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=920&h=1100&fit=crop&crop=center&q=85"
              alt="Open books in warm reading light"
              fill
              className="object-cover"
              priority
            />
            {/* gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />

            {/* ── STICKY NOTES on the photo ── */}
            {stickies.map((s) => (
              <div
                key={s.label}
                className="ab-sticky absolute z-20 p-3.5 max-w-[152px] shadow-lg"
                style={{
                  background: s.bg, color: s.color,
                  top: s.top, left: s.left,
                  transform: `rotate(${s.rotate})`,
                  ["--sr" as string]: s.rotate,
                  animation: visible ? `ab-pop 0.52s ease-out ${s.delay} both` : "none",
                }}
              >
                {/* tape strip */}
                <span
                  className="absolute -top-0 left-1/2 -translate-x-1/2 w-8 h-[7px] rounded-b"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                />
                <p className="ab-mono text-[7.5px] uppercase tracking-[0.18em] mb-1.5 opacity-50">{s.label}</p>
                <p className="ab-body text-[12px] leading-snug">{s.text}</p>
              </div>
            ))}

            {/* ── floating badge bottom-left ── */}
            <div
              className="absolute bottom-8 left-6 z-20"
              style={{
                animation: visible ? `ab-badge 0.6s ease-out 1.0s both` : "none",
              }}
            >
              {/* <div
                className="px-5 py-4 border border-white/20 backdrop-blur-sm rounded-sm shadow-2xl"
                style={{ background: "rgba(255,255,255,0.93)" }}
              >
                <p className="ab-display text-[34px] font-black leading-none" style={{ color: "#0B3C6D" }}>
                  200<sup className="text-lg align-super" style={{ color: "#C1121F" }}>+</sup>
                </p>
                <p className="ab-mono text-[8.5px] uppercase tracking-[0.18em] mt-1.5" style={{ color: "#1B263B", opacity: 0.45 }}>
                  Books Published
                </p>
                <div className="ab-shimmer mt-2 h-[2.5px] w-10 rounded-full" />
              </div> */}
            </div>

            {/* mobile fade-to-bg */}
            <div
              className="lg:hidden absolute bottom-0 inset-x-0 h-20 z-10"
              style={{ background: "linear-gradient(to bottom,transparent,#F8F9FC)" }}
            />
          </div>

          {/* ████ TORN PAPER EDGE — desktop only ████ */}
          <div
            className="hidden lg:block absolute inset-y-0 z-10 pointer-events-none"
            style={{ left: "calc(48% - 1px)", width: "80px" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 80 820" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M80,0 L80,820 L0,820
                   L5,800 L0,776 L7,754 L2,730 L8,708
                   L1,684 L6,660 L0,638 L7,616 L2,594
                   L8,572 L1,548 L6,526 L0,504 L7,482
                   L2,460 L9,438 L1,416 L6,394 L0,372
                   L8,350 L2,328 L7,306 L0,284 L6,262
                   L1,240 L8,218 L2,196 L7,174 L0,152
                   L6,130 L1,108 L8,86  L2,64  L7,42
                   L0,20  L5,0   Z"
                fill="#F8F9FC"
              />
              {/* subtle shadow on the torn edge */}
              <path
                d="M10,0 L10,820 L0,820
                   L5,800 L0,776 L7,754 L2,730 L8,708
                   L1,684 L6,660 L0,638 L7,616 L2,594
                   L8,572 L1,548 L6,526 L0,504 L7,482
                   L2,460 L9,438 L1,416 L6,394 L0,372
                   L8,350 L2,328 L7,306 L0,284 L6,262
                   L1,240 L8,218 L2,196 L7,174 L0,152
                   L6,130 L1,108 L8,86  L2,64  L7,42
                   L0,20  L5,0   Z"
                fill="rgba(11,60,109,0.06)"
              />
            </svg>
          </div>

          {/* ── mobile torn top edge ── */}
          <div className="lg:hidden relative -mt-5 z-10" aria-hidden="true">
            <svg viewBox="0 0 390 44" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:44 }}>
              <path
                d="M0,44 L390,44 L390,14
                   C365,4 340,22 315,12 C290,2 265,20 240,10
                   C215,0 190,18 165,10 C140,2 115,20 90,10
                   C65,0 40,18 15,8 L0,10 Z"
                fill="#F8F9FC"
              />
            </svg>
          </div>

          {/* ████ RIGHT — content panel ████ */}
          <div
            className="ab-ruled relative flex flex-col justify-center flex-1 px-8 sm:px-12 lg:pl-20 lg:pr-16 pb-16 pt-4 lg:pt-24 lg:pb-24"
            style={{ background: "#F8F9FC" }}
          >
            {/* red margin line */}
            <div
              className="hidden lg:block absolute inset-y-0 pointer-events-none"
              style={{ left: "64px", width: "1px", background: "rgba(193,18,31,0.13)" }}
              aria-hidden="true"
            />

            {/* eyebrow */}
            <div
              className="ab-anim-left flex items-center gap-3 mb-5"
              style={{ animationDelay: "0.2s", animationPlayState: visible ? "running" : "paused" }}
            >
              <div className="w-5 h-px" style={{ background: "#D4A017" }} />
              <span className="ab-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: "#D4A017" }}>
                About Us
              </span>
            </div>

            {/* heading */}
            <h2
              id="about-heading"
              className="ab-display ab-anim-up text-[clamp(28px,4vw,52px)] font-black leading-[1.02] tracking-tight mb-4"
              style={{
                color: "#1B263B",
                animationDelay: "0.3s",
                animationPlayState: visible ? "running" : "paused",
              }}
            >
              A Publishing Partner<br />
              <em className="italic" style={{ color: "#0B3C6D" }}>Built for Author</em>{" "}
              <span style={{ color: "#C1121F" }}>Confidence</span>
            </h2>

            {/* shimmer underline */}
            <div
              className="ab-shimmer ab-anim-up h-[3px] w-20 rounded-full mb-8"
              style={{ animationDelay: "0.38s", animationPlayState: visible ? "running" : "paused" }}
            />

            {/* body */}
            <div
              className="ab-body ab-anim-up space-y-3.5 mb-8 text-[18px] leading-relaxed"
              style={{
                color: "#1B263B", opacity: 0.72,
                animationDelay: "0.46s", animationPlayState: visible ? "running" : "paused",
              }}
            >
              <p>
                We blend editorial care, design rigor, and launch strategy so your story feels{" "}
                <strong style={{ color: "#0B3C6D", fontWeight: 600 }}>premium and ready for readers.</strong>
              </p>
              <p>
                USA Ghost Writer supports authors through every phase of publication with clarity,
                consistency, and measurable milestones.
              </p>
            </div>

            {/* block-quote */}
            <blockquote
              className="ab-anim-left border-l-[3px] pl-5 mb-8"
              style={{
                borderColor: "#0B3C6D",
                animationDelay: "0.56s", animationPlayState: visible ? "running" : "paused",
              }}
            >
              <p className="ab-display italic text-[16px] sm:text-[17px] leading-snug" style={{ color: "#0B3C6D" }}>
                We do not just publish books — we build author careers, one manuscript at a time.
              </p>
              <cite className="ab-mono not-italic text-[9px] uppercase tracking-[0.14em] mt-2 block" style={{ color: "#D4A017" }}>
                — USA Ghost Writer Team
              </cite>
            </blockquote>

            {/* CTA */}
            <Link
              href="/about"
              className="ab-cta-link ab-anim-up inline-flex items-center gap-2 w-fit rounded-full bg-secondary px-5 py-2.5 text-white shadow-[0_12px_28px_-14px_rgba(193,18,31,0.65)]"
              style={{ animationDelay: "1.02s", animationPlayState: visible ? "running" : "paused" }}
            >
              <span className="ab-cta-text ab-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-200" style={{ color: "#FFFFFF" }}>
                Read Our Story
              </span>
              <ArrowRight className="size-4 transition-colors duration-200" style={{ color: "#FFFFFF" }} aria-hidden="true" />
            </Link>
          </div>
        </div>
    </section>
  );
}