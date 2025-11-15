import { Section } from "./schemas";
import { BlockRenderer } from "./block-renderer";
import { cn } from "@/lib/cn";

type SectionProps = {
  section: Section;
};

export function SectionComponent({ section }: SectionProps) {
  if (!section.enabled) {
    return null;
  }

  return (
    <section id={section.id} className={cn(section.className)} style={section.style}>
      {section.blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </section>
  );
}
