import * as v from "valibot";

// ブロックタイプの定義
export const BlockType = {
  Text: "TEXT",
  Heading: "HEADING",
  Container: "CONTAINER",
} as const;

// スタイル設定スキーマ
export const StyleConfigSchema = v.object({
  // レイアウト
  display: v.optional(v.picklist(["block", "flex", "grid", "inline-block"])),
  flexDirection: v.optional(v.picklist(["row", "column"])),
  alignItems: v.optional(v.picklist(["start", "center", "end", "stretch"])),
  justifyContent: v.optional(
    v.picklist(["start", "center", "end", "between", "around"])
  ),

  // グリッド
  gridCols: v.optional(v.number()),
  colSpan: v.optional(v.number()),
  rowSpan: v.optional(v.number()),

  // スペーシング
  padding: v.optional(v.picklist(["none", "sm", "md", "lg", "xl"])),
  margin: v.optional(v.picklist(["none", "sm", "md", "lg", "xl"])),
  gap: v.optional(v.picklist(["none", "sm", "md", "lg", "xl"])),

  // カラー
  backgroundColor: v.optional(v.string()),
  textColor: v.optional(v.string()),
  borderColor: v.optional(v.string()),

  // ボーダー
  borderWidth: v.optional(v.number()),
  borderRadius: v.optional(v.picklist(["none", "sm", "md", "lg", "full"])),

  // タイポグラフィ
  fontSize: v.optional(
    v.picklist([
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ])
  ),
  fontWeight: v.optional(v.picklist(["normal", "medium", "semibold", "bold"])),
  textAlign: v.optional(v.picklist(["left", "center", "right"])),

  // サイズ
  width: v.optional(v.string()),
  height: v.optional(v.string()),

  // アニメーション
  animation: v.optional(v.picklist(["none", "fade-in", "slide-up", "bounce"])),
  transition: v.optional(v.picklist(["none", "all", "colors", "transform"])),

  // 高度な設定用（GUI設定を上書き）
  customClasses: v.optional(v.string()),
});

// テキストブロックスキーマ
export const TextBlockSchema = v.object({
  type: v.literal(BlockType.Text),
  content: v.string(),
  style: v.optional(StyleConfigSchema),
  className: v.optional(v.string()), // 後方互換性のため残す
});

// 見出しブロックスキーマ
export const HeadingBlockSchema = v.object({
  type: v.literal(BlockType.Heading),
  level: v.picklist(["h1", "h2", "h3", "h4", "h5", "h6"]),
  content: v.string(),
  style: v.optional(StyleConfigSchema),
  className: v.optional(v.string()), // 後方互換性のため残す
});

// コンテナーブロックスキーマ
export const ContainerBlockSchema = v.object({
  type: v.literal(BlockType.Container),
  blocks: v.array(v.union([TextBlockSchema, HeadingBlockSchema])),
  style: v.optional(StyleConfigSchema),
  className: v.optional(v.string()), // 後方互換性のため残す
});

// ブロック全体のスキーマ
export const BlockSchema = v.variant("type", [
  TextBlockSchema,
  HeadingBlockSchema,
  ContainerBlockSchema,
]);

// セクションスキーマ
export const SectionSchema = v.object({
  id: v.string(),
  order: v.number(),
  enabled: v.boolean(),
  blocks: v.array(BlockSchema),
  style: v.optional(StyleConfigSchema),
  className: v.optional(v.string()), // 後方互換性のため残す
});

// 型エクスポート
export type Section = v.InferOutput<typeof SectionSchema>;
export type Block = v.InferOutput<typeof BlockSchema>;
export type StyleConfig = v.InferOutput<typeof StyleConfigSchema>;
export type TextBlock = v.InferOutput<typeof TextBlockSchema>;
export type HeadingBlock = v.InferOutput<typeof HeadingBlockSchema>;
export type ContainerBlock = v.InferOutput<typeof ContainerBlockSchema>;
