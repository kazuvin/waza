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
  id: v.string(),
  type: v.literal(BlockType.Text),
  content: v.string(),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// 見出しブロックスキーマ
export const HeadingBlockSchema = v.object({
  id: v.string(),
  type: v.literal(BlockType.Heading),
  level: v.picklist(["h1", "h2", "h3", "h4", "h5", "h6"]),
  content: v.string(),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// ボタンブロックスキーマ
export const ButtonBlockSchema = v.object({
  id: v.string(),
  type: v.literal(BlockType.Button),
  content: v.string(),
  href: v.optional(v.string()),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

// ブロック全体のスキーマ（再帰的定義のため、lazyを使用）
export const BlockSchema: v.GenericSchema<Block> = v.lazy(() =>
  v.variant("type", [
    TextBlockSchema,
    HeadingBlockSchema,
    ButtonBlockSchema,
    ContainerBlockSchema,
  ])
);

// コンテナーブロックスキーマ（BlockSchemaを使用して再帰的に定義）
export const ContainerBlockSchema = v.object({
  id: v.string(),
  type: v.literal(BlockType.Container),
  blocks: v.array(BlockSchema),
  style: v.optional(v.any()), // CSSProperties
  className: v.optional(v.string()),
});

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
export type TextBlock = v.InferOutput<typeof TextBlockSchema>;
export type HeadingBlock = v.InferOutput<typeof HeadingBlockSchema>;
export type ButtonBlock = v.InferOutput<typeof ButtonBlockSchema>;

// Block型（再帰的定義）
export type Block =
  | TextBlock
  | HeadingBlock
  | ButtonBlock
  | ContainerBlock;

export type ContainerBlock = {
  id: string;
  type: "CONTAINER";
  blocks: Block[];
  style?: CSSProperties;
  className?: string;
};

export type Section = v.InferOutput<typeof SectionSchema>;

// style プロパティの型を CSSProperties として明示的にエクスポート
export type BlockStyle = CSSProperties;

// LPスキーマ
export const LPSchema = v.object({
  id: v.string(),
  title: v.string(),
  slug: v.string(),
  description: v.optional(v.string()),
  sections: v.array(SectionSchema),
  createdAt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  updatedAt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  publishedAt: v.optional(v.pipe(v.string(), v.isoTimestamp())),
  status: v.optional(v.picklist(["draft", "published", "archived"])),
});

// LP型エクスポート
export type LP = v.InferOutput<typeof LPSchema>;
