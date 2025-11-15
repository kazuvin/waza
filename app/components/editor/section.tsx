import { Section } from "./schemas";
import { BlockRenderer } from "./block-renderer";
import { mergeStyles } from "./style-converter";

type SectionProps = {
  section: Section;
};

export function SectionComponent({ section }: SectionProps) {
  if (!section.enabled) {
    return null;
  }
  const className = mergeStyles(section.style, section.className);

  return (
    <section id={section.id} className={className}>
      {section.blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </section>
  );
}
