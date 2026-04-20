"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, MapPin, Menu, Phone } from "lucide-react";
import { services } from "@/src/data/services";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-brand-green/10 bg-white/95 backdrop-blur" : "border-transparent bg-brand-cream"
      )}
    >
      <div className="hidden border-b border-brand-green/10 md:block">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-2 text-sm text-brand-muted">
          <p>Premium publishing support for ambitious authors.</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT.salesPhone}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-green">
              <Phone className="size-4" aria-hidden="true" />
              {CONTACT.salesPhone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-green">
              <Mail className="size-4" aria-hidden="true" />
              {CONTACT.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              New York, USA
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-brand-green">
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-green",
                  pathname === link.href && "text-brand-green"
                )}
              >
                {link.label}
                {link.href === "/services" ? <ChevronDown className="size-4" aria-hidden="true" /> : null}
              </Link>

              {link.href === "/services" ? (
                <div className="invisible absolute left-1/2 top-full z-40 mt-3 w-[36rem] -translate-x-1/2 rounded-xl border border-brand-green/10 bg-white p-5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-md p-2 text-sm text-brand-charcoal transition-colors hover:bg-brand-green/5 hover:text-brand-green"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            render={<Link href="/contact-us" />}
            className="h-11 rounded-md bg-brand-green px-5 text-white hover:bg-brand-green-light"
          >
            Talk to Expert
          </Button>
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
                <SheetTitle>{SITE_NAME}</SheetTitle>
              </SheetHeader>

              <div className="px-4 pb-6">
                <div className="space-y-3 border-b border-brand-green/10 pb-4">
                  {navLinks
                    .filter((item) => item.href !== "/services")
                    .map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-md py-1 text-sm font-medium text-brand-charcoal hover:text-brand-green"
                      >
                        {link.label}
                      </Link>
                    ))}
                </div>

                <Accordion className="mt-4" defaultValue={["services"]}>
                  <AccordionItem value="services">
                    <AccordionTrigger className="text-sm font-semibold text-brand-charcoal">
                      Services
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2 pb-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="rounded-md py-1 text-sm text-brand-muted hover:text-brand-green"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  render={<Link href="/contact-us" />}
                  className="mt-6 h-11 w-full rounded-md bg-brand-green text-white hover:bg-brand-green-light"
                >
                  Talk to Expert
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}