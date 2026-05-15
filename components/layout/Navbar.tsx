"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, MapPin, Menu, Phone } from "lucide-react";
import { services } from "@/src/data/services";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/common/BookingModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/packages", label: "Packages" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBookingClose = () => {
    setBookingOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand-green/15 bg-white/95 shadow-[0_10px_30px_-18px_rgba(11,60,109,0.45)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-white/90 via-brand-cream/80 to-brand-cream"
      )}
    >
      {/* Top bar */}
      <div className="hidden border-b border-brand-green/10 bg-brand-green/[0.03] md:block">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-2 text-xs text-brand-muted">
          <p className="font-medium text-brand-charcoal/80">
            Premium publishing support for ambitious authors.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${CONTACT.salesPhone}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {CONTACT.salesPhone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {CONTACT.usaAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-serif text-xl font-semibold tracking-tight text-brand-green transition-opacity hover:opacity-80"
        >
          <Image
            src="/usa-logo.jpeg"
            alt="USA Ghost Writer logo"
            width={40}
            height={40}
            className="object-contain rounded-sm"
          />
          <span className="leading-none">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className={cn(
                  "relative inline-flex items-center gap-1 py-1 text-sm font-medium transition-colors hover:text-secondary",
                  isActive(link.href) ? "text-brand-green" : "text-brand-charcoal"
                )}
              >
                {link.label}
                {link.href === "/services" ? (
                  <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                ) : null}
                {/* Active underline */}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-secondary transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>

              {link.href === "/services" ? (
                <div className="invisible absolute left-1/2 top-full z-40 mt-4 w-[38rem] -translate-x-1/2 rounded-2xl border border-brand-green/10 bg-white/98 p-5 opacity-0 shadow-[0_30px_80px_-40px_rgba(11,60,109,0.6)] backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                    Our Services
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-lg px-3 py-2 text-sm text-brand-charcoal transition-colors hover:bg-brand-green/5 hover:text-secondary"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-brand-green/8 pt-4">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-brand-green hover:text-secondary"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex h-10 items-center rounded-full bg-secondary px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(193,18,31,0.6)] transition-all duration-200 hover:bg-secondary/90 hover:shadow-[0_16px_30px_-14px_rgba(193,18,31,0.7)]"
          >
            Book a Call
          </button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-full max-w-[22rem] bg-white">
              <SheetHeader>
                <SheetTitle className="font-serif text-brand-green">{SITE_NAME}</SheetTitle>
              </SheetHeader>

              <div className="px-4 pb-6">
                <div className="space-y-1 border-b border-brand-green/10 pb-4">
                  {navLinks
                    .filter((item) => item.href !== "/services")
                    .map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-green/5 hover:text-secondary",
                          isActive(link.href)
                            ? "bg-brand-green/5 text-brand-green"
                            : "text-brand-charcoal"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                </div>

                <Accordion className="mt-3" defaultValue={["services"]}>
                  <AccordionItem value="services">
                    <AccordionTrigger className="text-sm font-semibold text-brand-charcoal">
                      Services
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-1 pb-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="rounded-lg px-3 py-1.5 text-sm text-brand-muted transition-colors hover:bg-brand-green/5 hover:text-secondary"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(193,18,31,0.6)] transition hover:bg-secondary/90"
                >
                  Book a Call
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <BookingModal open={bookingOpen} onClose={handleBookingClose} />
    </header>
  );
}
