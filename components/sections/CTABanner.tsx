import Link from "next/link";
import { Button } from "@/components/ui/button";

type CTABannerProps = {
  title?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({
  title = "Do You Have Concerns?",
  primaryLabel = "Speak to Consultant",
  primaryHref = "/contact-us",
  secondaryLabel = "Call Now",
  secondaryHref = "tel:(888)786-7135",
}: CTABannerProps) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 rounded-2xl bg-brand-green px-6 py-10 text-center text-white md:flex-row md:px-10 md:text-left">
        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h3>

        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <Button
            render={<Link href={primaryHref} />}
            className="h-11 rounded-md bg-white px-5 text-brand-green hover:bg-brand-muted"
          >
            {primaryLabel}
          </Button>
          <Button
            render={<a href={secondaryHref} />}
            variant="outline"
            className="h-11 rounded-md border-white/60 bg-transparent px-5 text-white hover:bg-white/10"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}