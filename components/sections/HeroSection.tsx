"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/common/Toast";

type StickyProps = {
  label: string;
  text: string;
  bg: string;
  textColor: string;
  rotate: string;
  delay: string;
};

function StickyNote({ label, text, bg, textColor, rotate, delay }: StickyProps) {
  return (
    <div
      className={`group relative max-w-[160px] cursor-default p-3 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:rotate-0 hover:shadow-xl ${bg} ${textColor} ${rotate} animate-fadeUp`}
      style={{ animationDelay: delay, animationFillMode: "both" }}
    >
      <span className="absolute left-1/2 top-0 h-2 w-8 -translate-x-1/2 rounded-b-sm bg-black/10" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-4 h-6 w-6 rotate-12 rounded-sm bg-white/70 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-90"
      />
      <p className="mb-1 font-mono text-[9px] uppercase tracking-widest opacity-50">{label}</p>
      <p className="font-body text-[12px] leading-snug">{text}</p>
    </div>
  );
}

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
    const resolvedEndpoint = apiBaseUrl
      ? `${apiBaseUrl}/api/contact`
      : "/api/contact";

    try {
      const response = await fetch(resolvedEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          context: "hero",
          sms_consent: values.smsConsent,
        }),
      });

      const result = (await response.json()) as { success: boolean; message: string };
      setServerMessage(result.message || "Thanks! Your request was received.");
      setIsSuccess(Boolean(result.success));

      if (result.success) {
        reset({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
          smsConsent: false,
          context: "hero",
        });
      }
    } catch {
      setServerMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    }
  };

  const handleToastClose = () => {
    setServerMessage("");
  };

  const stickies: StickyProps[] = [
    {
      label: "Editorial Note",
      text: '"Every great book starts with a single brave draft - we help you finish it."',
      bg: "bg-[#FEF9C3]",
      textColor: "text-[#5a4a10]",
      rotate: "-rotate-2",
      delay: "0.55s",
    },
    {
      label: "From Our Desk",
      text: "Manuscripts polished into bestsellers since 2014.",
      bg: "bg-[#FCE4D6]",
      textColor: "text-[#6b2a10]",
      rotate: "rotate-2",
      delay: "0.65s",
    },
    {
      label: "Author Tip",
      text: "Your story matters. Our job is to make the world see it.",
      bg: "bg-[#DBEAFE]",
      textColor: "text-[#1e3a5f]",
      rotate: "-rotate-1",
      delay: "0.75s",
    },
  ];

  return (
    <>
      <section className="noise relative min-h-[88vh] grid-cols-1 overflow-hidden bg-bg pb-10 text-ink lg:grid lg:grid-cols-[1fr_360px] lg:pb-0 xl:grid-cols-[1fr_400px]">
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="relative z-10 flex flex-col px-10 pb-10 pt-12 sm:px-14 lg:px-20 lg:pr-12">
          {/* <div className="animate-fadeUp mb-7 inline-flex w-fit items-center gap-2 border border-primary/20 px-3.5 py-1.5" style={{ animationDelay: "0.05s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              #1 Self Publishing Company
            </span>
          </div> */}

          <h1
            className="animate-fadeUp mb-5 font-display text-[clamp(34px,5vw,64px)] font-black leading-[1.02] tracking-tight text-ink"
            style={{ animationDelay: "0.15s" }}
          >
            Turn Your Manuscript
            <br />
            Into a{" "}
            <em className="italic text-secondary">Market-Ready</em> Book
          </h1>

          <p
            className="animate-fadeUp mb-7 max-w-[520px] font-body text-[16px] italic leading-relaxed text-ink/60 sm:text-[17px]"
            style={{ animationDelay: "0.28s" }}
          >
            Work with experienced publishing specialists to edit, design, format, and launch your title with premium quality and clear direction.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {stickies.map((sticky, index) => (
              <div
                key={sticky.label}
                className={index === 1 ? "sm:-translate-y-1" : index === 2 ? "lg:-translate-y-1.5" : ""}
              >
                <StickyNote {...sticky} />
              </div>
            ))}
          </div>

          <blockquote
            className="animate-fadeUp mb-7 max-w-[520px] border-l-[3px] border-accent pl-5"
            style={{ animationDelay: "0.85s" }}
          >
            <p className="font-display text-[16px] italic leading-snug text-ink/60 sm:text-[17px]">
              &quot;A writer only begins a book. A reader finishes it.&quot;
            </p>
            <cite className="mt-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-accent not-italic">
              -- Samuel Johnson, adapted
            </cite>
          </blockquote>

          <div className="animate-fadeUp mb-7 flex items-center gap-4" style={{ animationDelay: "0.95s" }}>
            <div className="h-px flex-1 bg-gradient-to-r from-accent to-transparent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Trusted by Authors Worldwide
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent to-transparent" />
          </div>

          <div className="animate-fadeUp mb-6 grid gap-5 sm:grid-cols-3" style={{ animationDelay: "1.05s" }}>
            {[
              { num: "200", label: "Books Published" },
              { num: "150", label: "Happy Authors" },
              { num: "10", label: "Years Experience" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`pr-6 ${index < 2 ? "border-r border-ink/12" : ""}`}
              >
                <div className="font-display text-[32px] font-black leading-none text-ink sm:text-[36px]">
                  {stat.num}
                  <sup className="align-super text-xl text-secondary">+</sup>
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="animate-fadeUp flex flex-wrap gap-2" style={{ animationDelay: "1.15s" }}>
            {["Google Partner", "BBB Accredited", "Trustpilot Rated", "Clutch Verified"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 border border-ink/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/50"
              >
                <svg className="h-2.5 w-2.5 fill-none stroke-accent stroke-2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {badge}
              </span>
            ))}
          </div> */}

          <div className="absolute -right-0 top-32 z-10 hidden lg:flex">
            <div
              className="relative bg-secondary px-[11px] py-4 font-mono text-[8px] uppercase tracking-[0.22em] text-white shadow-lg"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Free Consultation
              <span
                className="absolute -bottom-2.5 left-0 w-full"
                style={{
                  borderLeft: "18px solid #962d22",
                  borderRight: "18px solid #962d22",
                  borderBottom: "10px solid transparent",
                }}
              />
            </div>
          </div>
        </div>

        <div className="animate-slideIn relative z-10 flex flex-col overflow-hidden bg-primary px-8 py-10 sm:px-10" style={{ animationDelay: "0.25s" }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/4" />
          <div className="absolute left-0 right-0 top-0 h-0.5 bg-accent" />

          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            Start Your Journey
          </p>
          <h2 className="mb-2 font-display text-[26px] font-bold leading-tight text-white sm:text-[28px]">
            Get a Free
            <br />
            Publishing Quote
          </h2>
          <p className="mb-7 font-body text-[14px] italic leading-relaxed text-white/45 sm:text-[15px]">
            No obligation. Our specialists respond within 24 hours.
          </p>

          <div className="mb-6 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Full Name</label>
              <Input
                id="hero-name"
                aria-invalid={Boolean(errors.name)}
                placeholder="e.g. Margaret Atwood"
                className="h-11 border-white/10 bg-white/5 px-4 py-2.5 font-body text-base text-white placeholder:text-white/25 focus:border-accent focus:bg-white/10 focus-visible:ring-4 focus-visible:ring-accent/25"
                {...register("name")}
              />
              {errors.name ? <p className="text-xs text-white/50">{errors.name.message}</p> : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Phone Number</label>
              <Input
                id="hero-phone"
                aria-invalid={Boolean(errors.phone)}
                placeholder="+1 (555) 000-0000"
                className="h-11 border-white/10 bg-white/5 px-4 py-2.5 font-body text-base text-white placeholder:text-white/25 focus:border-accent focus:bg-white/10 focus-visible:ring-4 focus-visible:ring-accent/25"
                {...register("phone")}
              />
              {errors.phone ? <p className="text-xs text-white/50">{errors.phone.message}</p> : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Email Address</label>
              <Input
                id="hero-email"
                aria-invalid={Boolean(errors.email)}
                placeholder="you@example.com"
                className="h-11 border-white/10 bg-white/5 px-4 py-2.5 font-body text-base text-white placeholder:text-white/25 focus:border-accent focus:bg-white/10 focus-visible:ring-4 focus-visible:ring-accent/25"
                {...register("email")}
              />
              {errors.email ? <p className="text-xs text-white/50">{errors.email.message}</p> : null}
            </div>
          </div>

          <label className="mb-6 flex cursor-pointer items-start gap-3">
            <Controller
              control={control}
              name="smsConsent"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  className="mt-0.5 size-3.5 border-white/30 text-white data-checked:bg-secondary data-checked:border-secondary"
                  aria-label="SMS consent"
                />
              )}
            />
            <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-white/35">
              I agree to receive SMS updates related to my publishing inquiry. Standard messaging rates may apply.
            </span>
          </label>

          <Button
            onClick={handleSubmit(onSubmitWithEndpoint)}
            disabled={isSubmitting}
            className="group relative w-full overflow-hidden bg-secondary py-3 pr-10 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_-14px_rgba(193,18,31,0.65)] transition-all duration-200 hover:bg-[#a00f19] hover:tracking-[0.22em] active:scale-[0.98]"
          >
            {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm tracking-normal transition-transform duration-200 group-hover:translate-x-1">
              -&gt;
            </span>
          </Button>

          <Toast
            message={serverMessage}
            variant={isSuccess ? "success" : "error"}
            onClose={handleToastClose}
          />

          <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-white/25">
            or call us at{" "}
            <a href="tel:+18881112222" className="text-accent hover:underline">
              +1 888 111 2222
            </a>
          </p>
        </div>
      </section>

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
