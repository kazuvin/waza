"use client";

import { useState, useRef, useEffect } from "react";
import type { Block } from "../schemas";

type BlockSettingsProps = {
  block: Block | undefined;
  onUpdate: (updates: Partial<Block>) => void;
};

export function BlockSettings({ block, onUpdate }: BlockSettingsProps) {
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

  if (!block) {
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
        aria-label="Block settings"
      >
        <div
          className="mb-4 cursor-grab select-none active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="bg-muted mx-auto mb-2 h-1 w-12 rounded-full" />
          <h2 className="text-lg font-semibold">Block Settings</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Select a block to edit its settings
        </p>
      </aside>
    );
  }

  const getBlockTypeLabel = (block: Block): string => {
    switch (block.type) {
      case "HEADING":
        return `Heading (${(block as any).level})`;
      case "TEXT":
        return "Text";
      case "BUTTON":
        return "Button";
      case "CONTAINER":
        return "Container";
      default:
        return "Unknown";
    }
  };

  const hasContent =
    block.type === "HEADING" ||
    block.type === "TEXT" ||
    block.type === "BUTTON";

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
      aria-label="Block settings"
    >
      <div
        className="mb-4 cursor-grab select-none active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="bg-muted mx-auto mb-2 h-1 w-12 rounded-full" />
        <h2 className="text-lg font-semibold">Block Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">
            Block Type
          </p>
          <p className="text-sm font-semibold">{getBlockTypeLabel(block)}</p>
        </div>

        {hasContent && (
          <div>
            <label
              htmlFor="block-content"
              className="mb-2 block text-sm font-medium"
            >
              Content
            </label>
            <textarea
              id="block-content"
              value={block.content || ""}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              rows={5}
              placeholder="Enter content"
            />
          </div>
        )}

        {block.type === "BUTTON" && (
          <div>
            <label
              htmlFor="block-href"
              className="mb-2 block text-sm font-medium"
            >
              Link URL
            </label>
            <input
              id="block-href"
              type="text"
              value={block.href || ""}
              onChange={(e) => onUpdate({ href: e.target.value })}
              className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              placeholder="https://example.com"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="block-style"
            className="mb-2 block text-sm font-medium"
          >
            Style (CSS Properties)
          </label>
          <textarea
            id="block-style"
            value={JSON.stringify(block.style || {}, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onUpdate({ style: parsed });
              } catch (error) {
                // Invalid JSON, don't update
              }
            }}
            className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none"
            placeholder='{\n  "fontSize": "1.5rem",\n  "color": "#333"\n}'
            rows={10}
          />
          <p className="text-muted-foreground mt-1 text-xs">
            Enter valid JSON format
          </p>
        </div>

        {block.type !== "CONTAINER" && (
          <div>
            <label
              htmlFor="block-className"
              className="mb-2 block text-sm font-medium"
            >
              CSS Class
            </label>
            <input
              id="block-className"
              type="text"
              value={block.className || ""}
              onChange={(e) => onUpdate({ className: e.target.value })}
              className="border-border focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              placeholder="e.g., text-center font-bold"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
