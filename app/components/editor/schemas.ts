import * as v from "valibot";
import {
  Display,
  FlexDirection,
  AlignItems,
  JustifyContent,
  GridCols,
  ColSpan,
  RowSpan,
  Spacing,
  BorderWidth,
  BorderRadius,
  FontSize,
  FontWeight,
  TextAlign,
  Animation,
  Transition,
} from "./style-constants";

// ブロックタイプの定義
export const BlockType = {
  Text: "TEXT",
  Heading: "HEADING",
  Container: "CONTAINER",
} as const;

// スタイル設定スキーマ（定数ベース）
export const StyleConfigSchema = v.object({
  // レイアウト
  display: v.optional(v.enum(Display)),
  flexDirection: v.optional(v.enum(FlexDirection)),
  alignItems: v.optional(v.enum(AlignItems)),
  justifyContent: v.optional(v.enum(JustifyContent)),

  // グリッド
  gridCols: v.optional(v.enum(GridCols)),
  colSpan: v.optional(v.enum(ColSpan)),
  rowSpan: v.optional(v.enum(RowSpan)),

  // スペーシング
  padding: v.optional(v.enum(Spacing)),
  paddingX: v.optional(v.enum(Spacing)),
  paddingY: v.optional(v.enum(Spacing)),
  margin: v.optional(v.enum(Spacing)),
  marginX: v.optional(v.enum(Spacing)),
  marginY: v.optional(v.enum(Spacing)),
  gap: v.optional(v.enum(Spacing)),

  // カラー（Tailwind色名 or HEX）
  backgroundColor: v.optional(v.string()),
  textColor: v.optional(v.string()),
  borderColor: v.optional(v.string()),

  // ボーダー
  borderWidth: v.optional(v.enum(BorderWidth)),
  borderRadius: v.optional(v.enum(BorderRadius)),

  // タイポグラフィ
  fontSize: v.optional(v.enum(FontSize)),
  fontWeight: v.optional(v.enum(FontWeight)),
  textAlign: v.optional(v.enum(TextAlign)),

  // サイズ（Tailwindの標準値）
  width: v.optional(v.string()),
  height: v.optional(v.string()),

  // アニメーション
  animation: v.optional(v.enum(Animation)),
  transition: v.optional(v.enum(Transition)),

  // 高度な設定用（GUI設定を上書き、任意値も可）
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
