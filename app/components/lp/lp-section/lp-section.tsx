import { Section } from "../schemas";
import { SectionComponent } from "../section";

type LPSectionProps = {
  sections?: Section[];
};

export function LPSection({ sections = [] }: LPSectionProps) {
  // セクションを順序でソート
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="lp-container">
      {sortedSections.map((section) => (
        <SectionComponent key={section.id} section={section} />
      ))}
    </div>
  );
}
