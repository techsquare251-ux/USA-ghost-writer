import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div className={cn("inline-flex flex-col", centered && "items-center")}>
          <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-brand-green/80", eyebrowClassName)}>
            {eyebrow}
          </p>
          <div className={cn("mt-2 h-0.5 w-10 rounded-full bg-secondary", centered && "mx-auto", eyebrowClassName && "bg-white/60")} />
        </div>
      ) : null}
      <h2 className={cn("mt-4 text-3xl font-semibold tracking-tight text-brand-charcoal sm:text-4xl", titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 text-brand-muted",
            centered && "mx-auto max-w-2xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
