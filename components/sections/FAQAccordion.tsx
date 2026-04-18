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
    <section className="mx-auto max-w-container px-4 py-20">
      <SectionHeader centered title={title} subtitle={subtitle} />

      <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-brand-green/10 bg-white p-6 sm:p-8">
        <Accordion defaultValue={items[0] ? [items[0].q] : []}>
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="py-4 text-base text-brand-charcoal">{item.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-7 text-brand-muted">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}