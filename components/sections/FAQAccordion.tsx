import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/common/SectionHeader";

type FAQEntry = {
  q: string;
  a: string;
};

type FAQAccordionProps = {
  title?: string;
  subtitle?: string;
  items: FAQEntry[];
};

export function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Answers to the most common questions authors ask before starting.",
  items,
}: FAQAccordionProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-container px-4">
        <SectionHeader centered title={title} subtitle={subtitle} />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-brand-green/8 bg-white shadow-[0_8px_40px_-12px_rgba(20,32,24,0.10)]">
            <Accordion defaultValue={items[0] ? [items[0].q] : []}>
              {items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={item.q}
                  className={i < items.length - 1 ? "border-b border-brand-green/6" : "border-b-0"}
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-base font-medium text-brand-charcoal hover:text-brand-green hover:no-underline [&[data-state=open]]:text-brand-green">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sm leading-7 text-brand-muted">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
