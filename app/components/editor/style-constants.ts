// Tailwind CSS マッピング定数

// Display
export const Display = {
  Block: "BLOCK",
  Flex: "FLEX",
  Grid: "GRID",
  InlineBlock: "INLINE_BLOCK",
} as const;

export const DisplayMapping = {
  [Display.Block]: "block",
  [Display.Flex]: "flex",
  [Display.Grid]: "grid",
  [Display.InlineBlock]: "inline-block",
} as const;

// Flex Direction
export const FlexDirection = {
  Row: "ROW",
  Column: "COLUMN",
} as const;

export const FlexDirectionMapping = {
  [FlexDirection.Row]: "flex-row",
  [FlexDirection.Column]: "flex-col",
} as const;

// Align Items
export const AlignItems = {
  Start: "START",
  Center: "CENTER",
  End: "END",
  Stretch: "STRETCH",
} as const;

export const AlignItemsMapping = {
  [AlignItems.Start]: "items-start",
  [AlignItems.Center]: "items-center",
  [AlignItems.End]: "items-end",
  [AlignItems.Stretch]: "items-stretch",
} as const;

// Justify Content
export const JustifyContent = {
  Start: "START",
  Center: "CENTER",
  End: "END",
  Between: "BETWEEN",
  Around: "AROUND",
} as const;

export const JustifyContentMapping = {
  [JustifyContent.Start]: "justify-start",
  [JustifyContent.Center]: "justify-center",
  [JustifyContent.End]: "justify-end",
  [JustifyContent.Between]: "justify-between",
  [JustifyContent.Around]: "justify-around",
} as const;

// Grid Cols
export const GridCols = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  6: "6",
  12: "12",
} as const;

export const GridColsMapping = {
  [GridCols[1]]: "grid-cols-1",
  [GridCols[2]]: "grid-cols-2",
  [GridCols[3]]: "grid-cols-3",
  [GridCols[4]]: "grid-cols-4",
  [GridCols[6]]: "grid-cols-6",
  [GridCols[12]]: "grid-cols-12",
} as const;

// Col Span
export const ColSpan = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "12",
} as const;

export const ColSpanMapping = {
  [ColSpan[1]]: "col-span-1",
  [ColSpan[2]]: "col-span-2",
  [ColSpan[3]]: "col-span-3",
  [ColSpan[4]]: "col-span-4",
  [ColSpan[5]]: "col-span-5",
  [ColSpan[6]]: "col-span-6",
  [ColSpan[7]]: "col-span-7",
  [ColSpan[8]]: "col-span-8",
  [ColSpan[9]]: "col-span-9",
  [ColSpan[10]]: "col-span-10",
  [ColSpan[11]]: "col-span-11",
  [ColSpan[12]]: "col-span-12",
} as const;

// Row Span
export const RowSpan = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
} as const;

export const RowSpanMapping = {
  [RowSpan[1]]: "row-span-1",
  [RowSpan[2]]: "row-span-2",
  [RowSpan[3]]: "row-span-3",
  [RowSpan[4]]: "row-span-4",
  [RowSpan[5]]: "row-span-5",
  [RowSpan[6]]: "row-span-6",
} as const;

// Spacing (padding, margin, gap)
export const Spacing = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  6: "6",
  8: "8",
  12: "12",
  16: "16",
  20: "20",
  24: "24",
} as const;

export const PaddingMapping = {
  [Spacing[0]]: "p-0",
  [Spacing[1]]: "p-1",
  [Spacing[2]]: "p-2",
  [Spacing[3]]: "p-3",
  [Spacing[4]]: "p-4",
  [Spacing[6]]: "p-6",
  [Spacing[8]]: "p-8",
  [Spacing[12]]: "p-12",
  [Spacing[16]]: "p-16",
  [Spacing[20]]: "p-20",
  [Spacing[24]]: "p-24",
} as const;

export const PaddingXMapping = {
  [Spacing[0]]: "px-0",
  [Spacing[1]]: "px-1",
  [Spacing[2]]: "px-2",
  [Spacing[3]]: "px-3",
  [Spacing[4]]: "px-4",
  [Spacing[6]]: "px-6",
  [Spacing[8]]: "px-8",
  [Spacing[12]]: "px-12",
  [Spacing[16]]: "px-16",
  [Spacing[20]]: "px-20",
  [Spacing[24]]: "px-24",
} as const;

export const PaddingYMapping = {
  [Spacing[0]]: "py-0",
  [Spacing[1]]: "py-1",
  [Spacing[2]]: "py-2",
  [Spacing[3]]: "py-3",
  [Spacing[4]]: "py-4",
  [Spacing[6]]: "py-6",
  [Spacing[8]]: "py-8",
  [Spacing[12]]: "py-12",
  [Spacing[16]]: "py-16",
  [Spacing[20]]: "py-20",
  [Spacing[24]]: "py-24",
} as const;

export const MarginMapping = {
  [Spacing[0]]: "m-0",
  [Spacing[1]]: "m-1",
  [Spacing[2]]: "m-2",
  [Spacing[3]]: "m-3",
  [Spacing[4]]: "m-4",
  [Spacing[6]]: "m-6",
  [Spacing[8]]: "m-8",
  [Spacing[12]]: "m-12",
  [Spacing[16]]: "m-16",
  [Spacing[20]]: "m-20",
  [Spacing[24]]: "m-24",
} as const;

export const MarginXMapping = {
  [Spacing[0]]: "mx-0",
  [Spacing[1]]: "mx-1",
  [Spacing[2]]: "mx-2",
  [Spacing[3]]: "mx-3",
  [Spacing[4]]: "mx-4",
  [Spacing[6]]: "mx-6",
  [Spacing[8]]: "mx-8",
  [Spacing[12]]: "mx-12",
  [Spacing[16]]: "mx-16",
  [Spacing[20]]: "mx-20",
  [Spacing[24]]: "mx-24",
} as const;

export const MarginYMapping = {
  [Spacing[0]]: "my-0",
  [Spacing[1]]: "my-1",
  [Spacing[2]]: "my-2",
  [Spacing[3]]: "my-3",
  [Spacing[4]]: "my-4",
  [Spacing[6]]: "my-6",
  [Spacing[8]]: "my-8",
  [Spacing[12]]: "my-12",
  [Spacing[16]]: "my-16",
  [Spacing[20]]: "my-20",
  [Spacing[24]]: "my-24",
} as const;

export const GapMapping = {
  [Spacing[0]]: "gap-0",
  [Spacing[1]]: "gap-1",
  [Spacing[2]]: "gap-2",
  [Spacing[3]]: "gap-3",
  [Spacing[4]]: "gap-4",
  [Spacing[6]]: "gap-6",
  [Spacing[8]]: "gap-8",
  [Spacing[12]]: "gap-12",
  [Spacing[16]]: "gap-16",
  [Spacing[20]]: "gap-20",
  [Spacing[24]]: "gap-24",
} as const;

// Border Width
export const BorderWidth = {
  0: "0",
  1: "1",
  2: "2",
  4: "4",
  8: "8",
} as const;

export const BorderWidthMapping = {
  [BorderWidth[0]]: "border-0",
  [BorderWidth[1]]: "border",
  [BorderWidth[2]]: "border-2",
  [BorderWidth[4]]: "border-4",
  [BorderWidth[8]]: "border-8",
} as const;

// Border Radius
export const BorderRadius = {
  None: "NONE",
  SM: "SM",
  MD: "MD",
  LG: "LG",
  XL: "XL",
  "2XL": "2XL",
  "3XL": "3XL",
  Full: "FULL",
} as const;

export const BorderRadiusMapping = {
  [BorderRadius.None]: "rounded-none",
  [BorderRadius.SM]: "rounded-sm",
  [BorderRadius.MD]: "rounded-md",
  [BorderRadius.LG]: "rounded-lg",
  [BorderRadius.XL]: "rounded-xl",
  [BorderRadius["2XL"]]: "rounded-2xl",
  [BorderRadius["3XL"]]: "rounded-3xl",
  [BorderRadius.Full]: "rounded-full",
} as const;

// Font Size
export const FontSize = {
  XS: "XS",
  SM: "SM",
  Base: "BASE",
  LG: "LG",
  XL: "XL",
  "2XL": "2XL",
  "3XL": "3XL",
  "4XL": "4XL",
  "5XL": "5XL",
  "6XL": "6XL",
  "7XL": "7XL",
  "8XL": "8XL",
  "9XL": "9XL",
} as const;

export const FontSizeMapping = {
  [FontSize.XS]: "text-xs",
  [FontSize.SM]: "text-sm",
  [FontSize.Base]: "text-base",
  [FontSize.LG]: "text-lg",
  [FontSize.XL]: "text-xl",
  [FontSize["2XL"]]: "text-2xl",
  [FontSize["3XL"]]: "text-3xl",
  [FontSize["4XL"]]: "text-4xl",
  [FontSize["5XL"]]: "text-5xl",
  [FontSize["6XL"]]: "text-6xl",
  [FontSize["7XL"]]: "text-7xl",
  [FontSize["8XL"]]: "text-8xl",
  [FontSize["9XL"]]: "text-9xl",
} as const;

// Font Weight
export const FontWeight = {
  Thin: "THIN",
  Extralight: "EXTRALIGHT",
  Light: "LIGHT",
  Normal: "NORMAL",
  Medium: "MEDIUM",
  Semibold: "SEMIBOLD",
  Bold: "BOLD",
  Extrabold: "EXTRABOLD",
  Black: "BLACK",
} as const;

export const FontWeightMapping = {
  [FontWeight.Thin]: "font-thin",
  [FontWeight.Extralight]: "font-extralight",
  [FontWeight.Light]: "font-light",
  [FontWeight.Normal]: "font-normal",
  [FontWeight.Medium]: "font-medium",
  [FontWeight.Semibold]: "font-semibold",
  [FontWeight.Bold]: "font-bold",
  [FontWeight.Extrabold]: "font-extrabold",
  [FontWeight.Black]: "font-black",
} as const;

// Text Align
export const TextAlign = {
  Left: "LEFT",
  Center: "CENTER",
  Right: "RIGHT",
  Justify: "JUSTIFY",
} as const;

export const TextAlignMapping = {
  [TextAlign.Left]: "text-left",
  [TextAlign.Center]: "text-center",
  [TextAlign.Right]: "text-right",
  [TextAlign.Justify]: "text-justify",
} as const;

// Animation
export const Animation = {
  None: "NONE",
  FadeIn: "FADE_IN",
  SlideUp: "SLIDE_UP",
  Bounce: "BOUNCE",
} as const;

export const AnimationMapping = {
  [Animation.None]: "",
  [Animation.FadeIn]: "animate-fade-in",
  [Animation.SlideUp]: "animate-slide-up",
  [Animation.Bounce]: "animate-bounce",
} as const;

// Transition
export const Transition = {
  None: "NONE",
  All: "ALL",
  Colors: "COLORS",
  Transform: "TRANSFORM",
} as const;

export const TransitionMapping = {
  [Transition.None]: "",
  [Transition.All]: "transition-all",
  [Transition.Colors]: "transition-colors",
  [Transition.Transform]: "transition-transform",
} as const;
