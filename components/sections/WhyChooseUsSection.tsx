"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageSquare, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const BENEFITS = [
  "Affordable Price",
  "Engaging Narratives",
  "Tailored Creativity",
  "On-Time Deliveries",
  "Expert Craftsmanship",
  "Pristine Publication",
];

const EASE = "easeOut" as const;
const VIEW = { once: true, amount: 0.15 as const };

const BOOKSHOP_IMAGE =
  "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1600&q=85";

export function WhyChooseUsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex max-w-[1400px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-28px_rgba(17,24,39,0.35)] lg:min-h-[560px] lg:flex-row">

        {/* ── LEFT: image panel ─────────────────────────────── */}
        <div className="relative w-full overflow-hidden bg-slate-100 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:w-[40%] lg:min-h-0">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={BOOKSHOP_IMAGE}
              alt="Bookshop interior"
              fill
              className="object-cover object-center"
              priority
              quality={95}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
        </div>

        {/* ── RIGHT: content ────────────────────────────────── */}
        <div className="relative flex w-full flex-1 flex-col justify-center overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:w-[60%] lg:px-14 xl:px-16">
          <div className="absolute inset-0">
            <Image
              src="/hero-bg.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-18"
            />
            <div className="absolute inset-0 bg-white/82" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-[#f4f7fb]/90" />
          </div>

          <div className="relative z-10">

          {/* heading */}
          <motion.h2
            className="mb-4 max-w-xl text-[clamp(28px,4vw,46px)] font-black uppercase leading-tight tracking-tight text-[#16325c]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Why Choose Us?
          </motion.h2>

          {/* body */}
          <motion.p
            className="mb-8 max-w-xl text-[14px] leading-7 text-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
          >
            Tired of trying out the same old book publishing companies? At USA
            Ghost Writer, your success is our priority, and we&apos;re committed
            to helping you achieve your literary goals with the most professional
            services. With us, you get:
          </motion.p>

          {/* benefits grid */}
          <motion.ul
            className="mb-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
          >
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="flex size-4 shrink-0 items-center justify-center">
                  <Check className="size-4 text-[#1a7a6a]" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[13px] font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
          >
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1a7a6a] px-6 text-[13px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(26,122,106,0.55)] transition-all duration-200 hover:bg-[#146255] active:scale-[0.98]"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Speak to our Consultant
            </Link>
            <a
              href={`tel:${CONTACT.salesPhone}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 text-[13px] font-semibold text-slate-800 backdrop-blur-sm transition-all duration-200 hover:bg-white active:scale-[0.98]"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </a>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
