import * as v from "valibot";
import type { CSSProperties } from "react";

// ブロックタイプの定義
export const BlockType = {
  Text: "TEXT",
  Heading: "HEADING",
  Button: "BUTTON",
  Container: "CONTAINER",
} as const;

// テキストブロックスキーマ
export const TextBlockSchema = v.object({
  type: v.literal(BlockType.Text),
  content: v.string(),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// 見出しブロックスキーマ
export const HeadingBlockSchema = v.object({
  type: v.literal(BlockType.Heading),
  level: v.picklist(["h1", "h2", "h3", "h4", "h5", "h6"]),
  content: v.string(),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// ボタンブロックスキーマ
export const ButtonBlockSchema = v.object({
  type: v.literal(BlockType.Button),
  content: v.string(),
  href: v.optional(v.string()),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// コンテナーブロックスキーマ
export const ContainerBlockSchema = v.object({
  type: v.literal(BlockType.Container),
  blocks: v.array(v.union([TextBlockSchema, HeadingBlockSchema, ButtonBlockSchema])),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// ブロック全体のスキーマ
export const BlockSchema = v.variant("type", [
  TextBlockSchema,
  HeadingBlockSchema,
  ButtonBlockSchema,
  ContainerBlockSchema,
]);

// セクションスキーマ
export const SectionSchema = v.object({
  id: v.string(),
  order: v.number(),
  enabled: v.boolean(),
  blocks: v.array(BlockSchema),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// 型エクスポート
export type Section = v.InferOutput<typeof SectionSchema>;
export type Block = v.InferOutput<typeof BlockSchema>;
export type TextBlock = v.InferOutput<typeof TextBlockSchema>;
export type HeadingBlock = v.InferOutput<typeof HeadingBlockSchema>;
export type ButtonBlock = v.InferOutput<typeof ButtonBlockSchema>;
export type ContainerBlock = v.InferOutput<typeof ContainerBlockSchema>;

// style プロパティの型を CSSProperties として明示的にエクスポート
export type BlockStyle = CSSProperties;
