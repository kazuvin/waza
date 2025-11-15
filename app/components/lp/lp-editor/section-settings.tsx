import type { Section } from "../schemas";

type SectionSettingsProps = {
  section: Section | undefined;
  onUpdate: (updates: Partial<Section>) => void;
};

export function SectionSettings({ section, onUpdate }: SectionSettingsProps) {
  if (!section) {
    return (
      <aside
        className="bg-muted border-border w-80 border-l p-6"
        role="complementary"
        aria-label="Section settings"
      >
        <h2 className="mb-4 text-lg font-semibold">Section Settings</h2>
        <p className="text-muted-foreground text-sm">
          Select a section to edit its settings
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="bg-muted border-border w-80 border-l p-6"
      role="complementary"
      aria-label="Section settings"
    >
      <h2 className="mb-4 text-lg font-semibold">Section Settings</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="section-id"
            className="mb-2 block text-sm font-medium"
          >
            Section ID
          </label>
          <input
            id="section-id"
            type="text"
            value={section.id}
            onChange={(e) => onUpdate({ id: e.target.value })}
            className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="section-order"
            className="mb-2 block text-sm font-medium"
          >
            Order
          </label>
          <input
            id="section-order"
            type="number"
            value={section.order}
            onChange={(e) => onUpdate({ order: parseInt(e.target.value) })}
            className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="section-className"
            className="mb-2 block text-sm font-medium"
          >
            CSS Class
          </label>
          <input
            id="section-className"
            type="text"
            value={section.className || ""}
            onChange={(e) => onUpdate({ className: e.target.value })}
            className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            placeholder="e.g., py-20 px-4"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="section-enabled"
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => onUpdate({ enabled: e.target.checked })}
            className="border-border focus:ring-primary h-4 w-4 rounded"
          />
          <label htmlFor="section-enabled" className="text-sm font-medium">
            Enabled
          </label>
        </div>
      </div>
    </aside>
  );
}
