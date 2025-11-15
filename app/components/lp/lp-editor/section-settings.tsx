"use client";

import { useState, useRef, useEffect } from "react";
import type { Section, Block } from "../schemas";

type SectionSettingsProps = {
  section: Section | undefined;
  onUpdate: (updates: Partial<Section>) => void;
};

function getAllBlocks(blocks: Block[]): Block[] {
  const result: Block[] = [];
  for (const block of blocks) {
    result.push(block);
    if (block.type === "CONTAINER" && "blocks" in block) {
      result.push(...getAllBlocks(block.blocks));
    }
  }
  return result;
}

function updateBlockContent(
  blocks: Block[],
  targetBlock: Block,
  newContent: string
): Block[] {
  return blocks.map((block) => {
    if (block === targetBlock) {
      return { ...block, content: newContent };
    }
    if (block.type === "CONTAINER" && "blocks" in block) {
      return {
        ...block,
        blocks: updateBlockContent(block.blocks, targetBlock, newContent),
      };
    }
    return block;
  });
}

export function SectionSettings({ section, onUpdate }: SectionSettingsProps) {
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize position to right side of screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 320 - 20, // 320px width + 20px margin
        y: 100,
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!section) {
    return (
      <aside
        ref={panelRef}
        className="bg-background border-border fixed z-50 w-80 rounded-lg border p-6 shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        role="complementary"
        aria-label="Section settings"
      >
        <div
          className="mb-4 cursor-grab select-none active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="bg-muted mx-auto mb-2 h-1 w-12 rounded-full" />
          <h2 className="text-lg font-semibold">Section Settings</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Select a section to edit its settings
        </p>
      </aside>
    );
  }

  return (
    <aside
      ref={panelRef}
      className="bg-background border-border fixed z-50 w-80 rounded-lg border p-6 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "auto",
      }}
      role="complementary"
      aria-label="Section settings"
    >
      <div
        className="mb-4 cursor-grab select-none active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="bg-muted mx-auto mb-2 h-1 w-12 rounded-full" />
        <h2 className="text-lg font-semibold">Section Settings</h2>
      </div>

      <div className="space-y-4">
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
            htmlFor="section-style"
            className="mb-2 block text-sm font-medium"
          >
            Style (CSS Properties)
          </label>
          <textarea
            id="section-style"
            value={JSON.stringify(section.style || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onUpdate({ style: parsed });
              } catch (error) {
                // Invalid JSON, don't update
              }
            }}
            className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none"
            placeholder='{\n  "display": "flex",\n  "padding": "2rem"\n}'
            rows={8}
          />
          <p className="text-muted-foreground mt-1 text-xs">
            Enter valid JSON format
          </p>
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

        <hr className="border-border" />

        <div>
          <h3 className="mb-3 text-sm font-semibold">Block Contents</h3>
          <div className="space-y-3">
            {getAllBlocks(section.blocks).map((block, index) => {
              // Skip Container blocks as they don't have direct content
              if (block.type === "CONTAINER") return null;

              const blockTypeLabel =
                block.type === "HEADING"
                  ? `Heading (${block.level})`
                  : block.type === "TEXT"
                    ? "Text"
                    : block.type === "BUTTON"
                      ? "Button"
                      : block.type;

              return (
                <div key={index} className="space-y-1">
                  <label className="text-muted-foreground text-xs font-medium">
                    {blockTypeLabel}
                  </label>
                  <textarea
                    value={block.content || ""}
                    onChange={(e) => {
                      const updatedBlocks = updateBlockContent(
                        section.blocks,
                        block,
                        e.target.value
                      );
                      onUpdate({ blocks: updatedBlocks });
                    }}
                    className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    rows={3}
                    placeholder={`Enter ${blockTypeLabel.toLowerCase()} content`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
