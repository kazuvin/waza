"use client";

import { useState } from "react";
import { SectionComponent } from "../section";
import type { Section, Block } from "../schemas";
import { EditorToolbar } from "./editor-toolbar";
import { BlockSettings } from "./block-settings";

export type EditorMode = "view" | "edit";

type LPEditorProps = {
  initialSections: Section[];
  onSave?: (sections: Section[]) => void;
  onPublish?: (sections: Section[]) => void;
};

// Helper function to find a block by ID in nested structure
function findBlock(blocks: Block[], blockId: string): Block | undefined {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }
    if (block.type === "CONTAINER" && "blocks" in block) {
      const found = findBlock(block.blocks, blockId);
      if (found) return found;
    }
  }
  return undefined;
}

// Helper function to update a block by ID in nested structure
function updateBlockInBlocks(
  blocks: Block[],
  blockId: string,
  updates: Partial<Block>
): Block[] {
  return blocks.map((block) => {
    if (block.id === blockId) {
      return { ...block, ...updates } as Block;
    }
    if (block.type === "CONTAINER") {
      return {
        ...block,
        blocks: updateBlockInBlocks(block.blocks, blockId, updates),
      } as Block;
    }
    return block;
  });
}

export function LPEditor({
  initialSections,
  onSave,
  onPublish,
}: LPEditorProps) {
  const [mode, setMode] = useState<EditorMode>("view");
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Find selected block across all sections
  const selectedBlock = selectedBlockId
    ? sections
        .flatMap((s) => findBlock(s.blocks, selectedBlockId))
        .find((b) => b !== undefined)
    : undefined;

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        blocks: updateBlockInBlocks(section.blocks, blockId, updates),
      }))
    );
  };

  const handleBlockSelect = (blockId: string) => {
    setSelectedBlockId((prev) => (prev === blockId ? null : blockId));
  };

  const changeMode = (mode: EditorMode) => {
    setMode(mode);
    setSelectedBlockId(null);
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
            <SectionComponent
              key={section.id}
              section={section}
              isEditMode={mode === "edit"}
              selectedBlockId={selectedBlockId}
              onBlockSelect={handleBlockSelect}
            />
          ))}
      </div>

      {/* Fixed Draggable Block Settings Panel in Edit Mode */}
      {mode === "edit" && (
        <BlockSettings
          block={selectedBlock}
          onUpdate={(updates) => {
            if (selectedBlockId) {
              updateBlock(selectedBlockId, updates);
            }
          }}
        />
      )}
    </div>
  );
}
