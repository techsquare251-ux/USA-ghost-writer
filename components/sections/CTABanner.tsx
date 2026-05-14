"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { CONTACT } from "@/lib/constants";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({
  title = "Do You Have Concerns?",
  subtitle = "It's okay to have questions since we understand that your book is close to your heart. Why not just get into a quick discussion?",
  primaryLabel = "Speak to our Consultant",
  primaryHref = "/contact-us",
  secondaryLabel = "Call Now",
  secondaryHref = `tel:${CONTACT.salesPhone}`,
}: CTABannerProps) {
  return (
    <section className="px-4 py-16">
      <div className="relative mx-auto max-w-5xl">

        {/* ── Decorative green blobs (behind the book) ── */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 z-10">
          <div className="absolute -left-2 -top-10 size-28 rounded-full bg-[#4caf82]/60 blur-sm" />
          <div className="absolute left-10 top-6 size-16 rounded-full bg-[#3a9e6e]/50 blur-sm" />
          <div className="absolute -left-4 top-16 size-12 rounded-full bg-[#5bc490]/40 blur-[2px]" />
        </div>

        {/* ── Floating book ── */}
        <motion.div
          className="absolute -left-8 top-1/2 z-20 w-[130px] -translate-y-[62%] sm:w-[150px] md:-left-10 md:w-[170px]"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* drop shadow for depth */}
          <div className="absolute -bottom-4 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-full bg-black/30 blur-md" />
          <Image
            src="/CTA-image.jpeg"
            alt="Sample published book"
            width={170}
            height={255}
            className="relative rounded-md object-cover shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] drop-shadow-xl"
            style={{ transform: "rotate(-4deg)" }}
          />
        </motion.div>

        {/* ── Card ── */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1a2c5b] pl-[130px] pr-8 py-10 sm:pl-[150px] md:pl-[180px] md:pr-12 md:py-12">

          {/* decorative rings */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-1/4 size-48 rounded-full border border-white/8" />
          <div aria-hidden="true" className="pointer-events-none absolute right-8 top-8 size-20 rounded-full bg-white/[0.03]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* text */}
            <div className="max-w-sm">
              <h3 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-white/55">
                {subtitle}
              </p>
            </div>

            {/* buttons */}
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3aab7e] px-6 text-[13px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(58,171,126,0.7)] transition-all duration-200 hover:bg-[#2d9a6e] hover:shadow-[0_12px_28px_-10px_rgba(58,171,126,0.8)] active:scale-[0.98]"
              >
                <MessageSquare className="size-4" aria-hidden="true" />
                {primaryLabel}
              </Link>
              <a
                href={secondaryHref}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3aab7e] px-6 text-[13px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(58,171,126,0.7)] transition-all duration-200 hover:bg-[#2d9a6e] hover:shadow-[0_12px_28px_-10px_rgba(58,171,126,0.8)] active:scale-[0.98]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
