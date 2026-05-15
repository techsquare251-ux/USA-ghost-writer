"use client";

import { useState } from "react";

type FAQEntry = {
  q: string;
  a: string;
};

type FAQAccordionProps = {
  title?: string;
  subtitle?: string;
  items: FAQEntry[];
};

const StarIcon = ({ muted = false }: { muted?: boolean }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 20 20"
    fill={muted ? "rgba(15,23,42,0.18)" : "#BF0A30"}
    aria-hidden="true"
  >
    <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
  </svg>
);

const PlusMinusIcon = ({ open }: { open: boolean }) => (
  <span
    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
      open ? "border-brand-charcoal bg-brand-charcoal" : "border-brand-charcoal/15 bg-transparent"
    }`}
    aria-hidden="true"
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
    >
      <line x1="7" y1="1" x2="7" y2="13" stroke={open ? "#fff" : "#0a1628"} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="1" y1="7" x2="13" y2="7" stroke={open ? "#fff" : "#0a1628"} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  </span>
);

export function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Answers to the most common questions authors ask before starting.",
  items,
}: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (idx: number) => setOpen(open === idx ? null : idx);

  return (
    <section className="relative overflow-hidden bg-[#f4f1eb] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-5deg,transparent,transparent_52px,rgba(10,31,94,0.03)_52px,rgba(10,31,94,0.03)_54px)] pointer-events-none" />

      <div className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#BF0A30]">
            <span className="h-0.5 w-6 bg-[#BF0A30]" />
            FAQ
            <span className="h-0.5 w-6 bg-[#BF0A30]" />
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-brand-charcoal sm:text-4xl lg:text-5xl">
            {title.replace(/(Questions|Asked Questions)/i, "$1")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
            {subtitle}
          </p>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <span className="mx-3 h-0.5 w-7 bg-slate-300" />
            <StarIcon muted />
            <StarIcon muted />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-[0_12px_40px_-18px_rgba(11,60,109,0.28)]">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q} className={`relative border-b border-brand-green/10 last:border-b-0 ${isOpen ? "bg-brand-cream/40" : "bg-white"}`}>
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-4 py-5 text-left transition-colors sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span className={`hidden w-8 shrink-0 text-sm font-black tracking-[-0.03em] sm:inline-flex ${isOpen ? "text-secondary" : "text-slate-300"}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 text-sm font-semibold leading-6 sm:text-base ${isOpen ? "text-secondary" : "text-brand-charcoal"}`}>
                    {item.q}
                  </span>
                  <PlusMinusIcon open={isOpen} />
                </button>

                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? 420 : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <div className="border-t border-brand-green/10 px-4 pb-5 pt-4 text-sm leading-7 text-brand-muted sm:px-6 sm:pl-16">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-5 rounded-2xl bg-brand-charcoal px-6 py-6 text-white shadow-[0_18px_45px_-26px_rgba(11,60,109,0.55)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-1.5 flex-col overflow-hidden rounded-full">
              <span className="flex-1 bg-[#BF0A30]" />
              <span className="flex-1 bg-white/15" />
              <span className="flex-1 bg-[#BF0A30]" />
              <span className="flex-1 bg-white/15" />
            </div>
            <div>
              <p className="text-xs italic text-white/55">Still have questions about your manuscript?</p>
              <strong className="mt-1 block text-lg font-semibold tracking-[-0.02em]">Our team is ready to help.</strong>
            </div>
          </div>

          <a
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BF0A30] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#9b0827]"
          >
            Book a Free Call <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}