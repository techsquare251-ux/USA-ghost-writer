"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/common/Toast";
import { CONTACT } from "@/lib/constants";

const CREDIBILITY = [
  { src: "/our-cradibility/trust-pilot.webp", alt: "Trustpilot" },
  { src: "/our-cradibility/google-partner.webp", alt: "Google Partner" },
  { src: "/our-cradibility/accrediated-business.webp", alt: "BBB Accredited Business" },
];

const STATS = [
  { num: "200+", label: "Books Published" },
  { num: "150+", label: "Happy Authors" },
  { num: "10+", label: "Years Experience" },
];

export function HeroSection() {
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
      smsConsent: false,
      context: "hero",
    },
  });

  const onSubmitWithEndpoint = async (values: ContactFormValues) => {
    setServerMessage("");
    setIsSuccess(false);
    const resolvedEndpoint = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "/api/contact";

    try {
      const response = await fetch(resolvedEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, context: "hero", sms_consent: values.smsConsent }),
      });

      const result = (await response.json()) as { success: boolean; message: string };
      setServerMessage(result.message || "Thanks! Your request was received.");
      setIsSuccess(Boolean(result.success));

      if (result.success) {
        reset({ name: "", phone: "", email: "", service: "", message: "", smsConsent: false, context: "hero" });
      }
    } catch {
      setServerMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* ── Background image ── */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/hero-section-background.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-left-top"
            sizes="100vw"
          />
          {/* Dark overlay — keeps text crisp */}
          <div className="absolute inset-0 bg-[#020d1a]/80" />
          {/* Left-to-right gradient so the form card side is slightly lighter */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:flex lg:min-h-[92vh] lg:items-center lg:gap-14 lg:px-10 lg:py-20">

          {/* Left column */}
          <div className="flex-1 lg:max-w-[55%]">
            {/* Badge */}
            <div className="mb-6 inline-flex animate-fadeUp items-center gap-2 rounded-sm bg-secondary px-4 py-1.5" style={{ animationDelay: "0.05s" }}>
              <ShieldCheck className="size-4 text-white" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                #1 Self Publishing Company
              </span>
            </div>

            <h1
              className="animate-fadeUp mb-5 text-[clamp(30px,4.5vw,58px)] font-black uppercase leading-[1.06] tracking-tight text-white"
              style={{ animationDelay: "0.15s" }}
            >
              Do You Have a Manuscript
              <br className="hidden sm:block" />
              <span className="text-secondary"> Ready to Be Published?</span>
            </h1>

            <p
              className="animate-fadeUp mb-8 max-w-xl text-[15px] leading-7 text-white/65"
              style={{ animationDelay: "0.28s" }}
            >
              USA Ghost Writer has made it much easier to self‑publish a book,
              with hands‑on support from the first word to the final cover. Our
              process involves Ghostwriting, Editing, Formatting, Book Cover
              Design, Publishing and Print‑on‑Demand through a vast network of
              global outlets.
            </p>

            {/* Stats row */}
            <div
              className="animate-fadeUp mb-9 flex flex-wrap gap-8 border-y border-white/10 py-5"
              style={{ animationDelay: "0.38s" }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white">{stat.num}</div>
                  <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/45">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Our Credibility */}
            <div className="animate-fadeUp" style={{ animationDelay: "0.5s" }}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Our Credibility
              </p>
              <div className="flex flex-wrap items-center gap-5">
                {CREDIBILITY.map(({ src, alt }) => (
                  <div
                    key={alt}
                    className="flex h-12 w-28 items-center justify-center rounded-md bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={96}
                      height={40}
                      className="h-8 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Form card */}
          <div
            className="animate-slideIn mt-12 w-full shrink-0 lg:mt-0 lg:w-[400px] xl:w-[430px]"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="rounded-2xl bg-white p-8 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)]">
              {/* Card header */}
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="mb-1 text-2xl font-black text-gray-900">
                Avail Discount
              </h2>
              <p className="mb-6 text-[13px] leading-5 text-gray-500">
                Exclusive Offer: Expert Book Writing at 50% off — Your Story
                Deserves to be Heard.
              </p>

              {/* Form fields */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Name (full width – spans both cols) */}
                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Full Name
                    </label>
                    <Input
                      id="hero-name"
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Margaret Atwood"
                      className="h-10 border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-300 focus:border-secondary focus-visible:ring-secondary/20"
                      {...register("name")}
                    />
                    {errors.name ? (
                      <p className="text-[11px] text-red-500">{errors.name.message}</p>
                    ) : null}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Phone
                    </label>
                    <Input
                      id="hero-phone"
                      aria-invalid={Boolean(errors.phone)}
                      placeholder="+1 (555) 000-0000"
                      className="h-10 border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-300 focus:border-secondary focus-visible:ring-secondary/20"
                      {...register("phone")}
                    />
                    {errors.phone ? (
                      <p className="text-[11px] text-red-500">{errors.phone.message}</p>
                    ) : null}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Email
                    </label>
                    <Input
                      id="hero-email"
                      aria-invalid={Boolean(errors.email)}
                      placeholder="you@example.com"
                      className="h-10 border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-300 focus:border-secondary focus-visible:ring-secondary/20"
                      {...register("email")}
                    />
                    {errors.email ? (
                      <p className="text-[11px] text-red-500">{errors.email.message}</p>
                    ) : null}
                  </div>
                </div>

                {/* SMS Consent */}
                <label className="mt-1 flex cursor-pointer items-start gap-2.5">
                  <Controller
                    control={control}
                    name="smsConsent"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                        className="mt-0.5 size-3.5 border-gray-300 data-checked:bg-secondary data-checked:border-secondary"
                        aria-label="SMS consent"
                      />
                    )}
                  />
                  <span className="text-[11px] leading-4 text-gray-400">
                    By ticking this box, I consent to receive messages related
                    to Follow-Up and Appointment Reminders from USA Ghost Writer
                    and Publishing. Message frequency may vary. Reply{" "}
                    <span className="font-semibold text-gray-600">STOP</span> to
                    opt-out or{" "}
                    <span className="font-semibold text-gray-600">HELP</span>{" "}
                    for assistance.
                  </span>
                </label>

                {/* Submit */}
                <Button
                  onClick={handleSubmit(onSubmitWithEndpoint)}
                  disabled={isSubmitting}
                  className="mt-1 h-11 w-full bg-secondary font-bold uppercase tracking-widest text-white shadow-[0_8px_24px_-10px_rgba(193,18,31,0.6)] transition-all hover:bg-secondary/90 hover:shadow-[0_12px_30px_-12px_rgba(193,18,31,0.7)] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                  ) : null}
                  {isSubmitting ? "Submitting…" : "Submit"}
                </Button>

                <Toast
                  message={serverMessage}
                  variant={isSuccess ? "success" : "error"}
                  onClose={() => setServerMessage("")}
                />

                <p className="mt-1 text-center text-[11px] text-gray-400">
                  or call us at{" "}
                  <a
                    href={`tel:${CONTACT.salesPhone}`}
                    className="font-semibold text-secondary hover:underline"
                  >
                    {CONTACT.salesPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scrolling ticker ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-9 items-center overflow-hidden border-t border-white/8 bg-primary">
        <div className="ticker-track flex shrink-0 whitespace-nowrap">
          {[
            "Book Editing",
            "Cover Design",
            "Interior Formatting",
            "eBook Conversion",
            "Amazon KDP Publishing",
            "Marketing Strategy",
            "Ghostwriting",
            "Proofreading",
            "Book Editing",
            "Cover Design",
            "Interior Formatting",
            "eBook Conversion",
            "Amazon KDP Publishing",
            "Marketing Strategy",
            "Ghostwriting",
            "Proofreading",
          ].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-2 border-r border-white/8 px-9 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40"
            >
              {item}
              <span className="text-[8px] text-accent">*</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
