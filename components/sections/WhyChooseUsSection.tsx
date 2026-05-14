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

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a7a6a]">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row lg:min-h-[500px]">

        {/* ── LEFT: image panel ─────────────────────────────── */}
        <div className="relative min-h-[360px] w-full flex-shrink-0 lg:w-[45%] lg:min-h-0">
          {/* large lighter-teal glow circle behind persons */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[85%] w-[85%] rounded-full bg-[#2aab96]/35 blur-3xl" />
          </div>

          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src="/why-choose-us.jpeg"
              alt="Our team of publishing consultants"
              fill
              className="object-cover object-top"
              priority
            />
            {/* bottom fade into section bg */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a7a6a] to-transparent" />
            {/* right fade into section bg */}
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1a7a6a] to-transparent" />
          </motion.div>
        </div>

        {/* ── RIGHT: content ────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 xl:px-16">

          {/* heading */}
          <motion.h2
            className="mb-4 text-[clamp(28px,4vw,46px)] font-black uppercase leading-tight tracking-tight text-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Why Choose Us?
          </motion.h2>

          {/* body */}
          <motion.p
            className="mb-8 max-w-md text-[14px] leading-7 text-white/65"
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
            className="mb-10 grid grid-cols-2 gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
          >
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="flex size-4 shrink-0 items-center justify-center">
                  <Check className="size-4 text-white" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[13px] font-medium text-white/80">{item}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
          >
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-[13px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/60 active:scale-[0.98]"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Speak to our Consultant
            </Link>
            <a
              href={`tel:${CONTACT.salesPhone}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-[13px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/60 active:scale-[0.98]"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
