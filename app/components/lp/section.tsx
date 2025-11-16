import { Section } from "./schemas";
import { BlockRenderer } from "./block-renderer";
import { cn } from "@/lib/cn";

type SectionProps = {
  section: Section;
  isEditMode?: boolean;
  selectedBlockId?: string | null;
  onBlockSelect?: (blockId: string) => void;
};

export function SectionComponent({
  section,
  isEditMode = false,
  selectedBlockId = null,
  onBlockSelect,
}: SectionProps) {
  if (!section.enabled && !isEditMode) {
    return null;
  }

  return (
    <section
      id={section.id}
      className={cn(section.className)}
      style={section.style}
    >
      {section.blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      ))}
    </section>
  );
}
