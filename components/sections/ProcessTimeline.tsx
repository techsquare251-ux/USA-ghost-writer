"use client";

import {
  Pencil,
  AlignLeft,
  SearchCheck,
  LayoutTemplate,
  ImageIcon,
  Send,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { publishingProcess } from "@/src/data/process";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Pencil,
  AlignLeft,
  SearchCheck,
  LayoutTemplate,
  ImageIcon,
  Send,
};

const ARROW_SIZE = 44;

function ArrowBanner({
  isRight,
  children,
  isMobile = false,
}: {
  isRight: boolean;
  children: React.ReactNode;
  isMobile?: boolean;
}) {
  const arrowSize = isMobile ? 28 : ARROW_SIZE;
  const clipRight = `polygon(0 0, calc(100% - ${arrowSize}px) 0, 100% 50%, calc(100% - ${arrowSize}px) 100%, 0 100%, ${arrowSize}px 50%)`;
  const clipLeft = `polygon(${arrowSize}px 0, 100% 0, 100% 100%, ${arrowSize}px 100%, 0 50%)`;

  const heightClass = isMobile ? "h-auto" : "h-24";
  const paddingClass = isMobile ? "py-3" : "";

  return (
    <div
      className={`relative flex ${heightClass} ${paddingClass} w-full items-center bg-white shadow-[0_6px_30px_-8px_rgba(0,0,0,0.12)]`}
      style={{ clipPath: isRight ? clipRight : clipLeft }}
    >
      {children}
    </div>
  );
}

export function ProcessTimeline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#f0ede8] py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader
          centered
          eyebrow="How We Work"
          title="Our Process"
          subtitle=""
        />

        <div className="mt-12 flex flex-col gap-4">
          {publishingProcess.map((step, index) => {
            const isRight = index % 2 === 0;
            const Icon = iconMap[step.icon];
            const stepLabel = String(step.step).padStart(2, "0");

            const variants = {
              hidden: {
                opacity: 0,
                x: prefersReducedMotion ? 0 : isRight ? -80 : 80,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut" as const,
                  delay: index * 0.08,
                },
              },
            };

            return (
              <motion.div
                key={step.step}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="gap-4"
              >
                <ArrowBanner isRight={isRight} isMobile={false}>
                  {isRight ? (
                    <>
                      {/* Left: numbered badge */}
                      <div className="hidden sm:flex shrink-0 items-center justify-center pl-10 pr-4">
                        <div className="relative flex size-12 shrink-0 items-center justify-center">
                          {/* Diamond / rotated square */}
                          <div className="absolute inset-0 rotate-45 rounded-sm bg-secondary" />
                          <span className="relative text-sm font-bold text-white">
                            {stepLabel}
                          </span>
                        </div>
                      </div>

                      {/* Left: numbered badge - Mobile */}
                      <div className="flex sm:hidden shrink-0 items-center justify-center pl-3 pr-2">
                        <div className="relative flex size-8 shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rotate-45 rounded-sm bg-secondary" />
                          <span className="relative text-xs font-bold text-white">
                            {stepLabel}
                          </span>
                        </div>
                      </div>

                      {/* Middle: text */}
                      <div className="flex-1 px-2 sm:px-3">
                        <p className="text-xs sm:text-base font-bold text-brand-charcoal">
                          {step.title}:
                        </p>
                        <p className="mt-0.5 text-xs leading-4 sm:leading-5 text-brand-muted">
                          {step.description}
                        </p>
                      </div>

                      {/* Right: icon badge */}
                      <div className="hidden sm:flex shrink-0 items-center justify-center pr-12 pl-2">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary/30 bg-white shadow-md">
                          {Icon && (
                            <Icon className="size-5 text-secondary" />
                          )}
                        </div>
                      </div>

                      {/* Right: icon badge - Mobile */}
                      <div className="flex sm:hidden shrink-0 items-center justify-center pr-3 pl-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-secondary/30 bg-white shadow-md">
                          {Icon && (
                            <Icon className="size-4 text-secondary" />
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left: icon badge */}
                      <div className="hidden sm:flex shrink-0 items-center justify-center pl-12 pr-2">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-[#e07b2a]/30 bg-white shadow-md">
                          {Icon && (
                            <Icon className="size-5 text-[#e07b2a]" />
                          )}
                        </div>
                      </div>

                      {/* Left: icon badge - Mobile */}
                      <div className="flex sm:hidden shrink-0 items-center justify-center pl-3 pr-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-[#e07b2a]/30 bg-white shadow-md">
                          {Icon && (
                            <Icon className="size-4 text-[#e07b2a]" />
                          )}
                        </div>
                      </div>

                      {/* Middle: text (right-aligned for even rows) */}
                      <div className="flex-1 px-2 sm:px-3 text-left sm:text-right">
                        <p className="text-xs sm:text-base font-bold text-brand-charcoal">
                          {step.title}:
                        </p>
                        <p className="mt-0.5 text-xs leading-4 sm:leading-5 text-brand-muted">
                          {step.description}
                        </p>
                      </div>

                      {/* Right: numbered badge */}
                      <div className="hidden sm:flex shrink-0 items-center justify-center pr-10 pl-4">
                        <div className="relative flex size-12 shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rotate-45 rounded-sm bg-[#e07b2a]" />
                          <span className="relative text-sm font-bold text-white">
                            {stepLabel}
                          </span>
                        </div>
                      </div>

                      {/* Right: numbered badge - Mobile */}
                      <div className="flex sm:hidden shrink-0 items-center justify-center pr-3 pl-2">
                        <div className="relative flex size-8 shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rotate-45 rounded-sm bg-[#e07b2a]" />
                          <span className="relative text-xs font-bold text-white">
                            {stepLabel}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </ArrowBanner>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
