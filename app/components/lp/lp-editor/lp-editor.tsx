"use client";

import { useState } from "react";
import { SectionComponent } from "../section";
import type { Section } from "../schemas";
import { EditorToolbar } from "./editor-toolbar";
import { SectionSettings } from "./section-settings";

export type EditorMode = "view" | "edit";

type LPEditorProps = {
  initialSections: Section[];
  onSave?: (sections: Section[]) => void;
  onPublish?: (sections: Section[]) => void;
};

export function LPEditor({
  initialSections,
  onSave,
  onPublish,
}: LPEditorProps) {
  const [mode, setMode] = useState<EditorMode>("view");
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const toggleSectionEnabled = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];

    // Update order values
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });

    setSections(newSections);
  };

  const changeMode = (mode: EditorMode) => {
    setMode(mode);
    setSelectedSectionId(null);
  };

  const handleSave = () => {
    onSave?.(sections);
  };

  const handlePublish = () => {
    onPublish?.(sections);
  };

  return (
    <div className="min-h-screen">
      <EditorToolbar
        mode={mode}
        onModeChange={changeMode}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      {/* Canvas Area */}
      <div
        id="editor-content"
        className="w-full"
        role="tabpanel"
        aria-label={`${mode} mode content`}
      >
        {sections
          .filter((section) => section.enabled || mode === "edit")
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div
              key={section.id}
              className={`relative ${
                mode === "edit"
                  ? "border-border hover:border-muted-foreground rounded-lg border-2 border-dashed transition-colors"
                  : ""
              } ${selectedSectionId === section.id ? "border-primary ring-primary ring-2 ring-offset-2" : ""}`}
              onClick={() => {
                if (mode === "edit") {
                  setSelectedSectionId((prev) =>
                    prev === section.id ? null : section.id
                  );
                }
              }}
              role={mode === "edit" ? "button" : undefined}
              tabIndex={mode === "edit" ? 0 : undefined}
              aria-label={
                mode === "edit" ? `Select section ${section.id}` : undefined
              }
              onKeyDown={(e) => {
                if (mode === "edit" && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setSelectedSectionId((prev) =>
                    prev === section.id ? null : section.id
                  );
                }
              }}
            >
              {/* Section Controls in Edit Mode */}
              {mode === "edit" && (
                <div className="bg-muted/80 absolute top-2 right-2 z-10 flex gap-1 rounded-md p-1 shadow-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(section.id, "up");
                    }}
                    disabled={section.order === 1}
                    className="hover:bg-background rounded px-2 py-1 text-xs transition-colors disabled:opacity-30"
                    aria-label="Move section up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(section.id, "down");
                    }}
                    disabled={section.order === sections.length}
                    className="hover:bg-background rounded px-2 py-1 text-xs transition-colors disabled:opacity-30"
                    aria-label="Move section down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionEnabled(section.id);
                    }}
                    className={`rounded px-2 py-1 text-xs transition-colors ${
                      section.enabled
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    aria-label={
                      section.enabled ? "Disable section" : "Enable section"
                    }
                  >
                    {section.enabled ? "ON" : "OFF"}
                  </button>
                </div>
              )}

              <SectionComponent section={section} />
            </div>
          ))}
      </div>

      {/* Fixed Draggable Settings Panel in Edit Mode */}
      {mode === "edit" && (
        <SectionSettings
          section={selectedSection}
          onUpdate={(updates) => {
            if (selectedSection) {
              updateSection(selectedSection.id, updates);
            }
          }}
        />
      )}
    </div>
  );
}
