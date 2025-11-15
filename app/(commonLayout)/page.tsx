import { Hero } from "@/app/components/home";
import {
  LPSection,
  Section,
  BlockType,
  Display,
  GridCols,
  ColSpan,
  Spacing,
  FontSize,
  FontWeight,
  BorderWidth,
} from "../components/editor";

// サンプルデータ（Tailwind定義値ベース）
const sampleSections: Section[] = [
  {
    id: "hero-1",
    order: 0,
    enabled: true,
    style: {
      display: Display.Grid,
      gridCols: GridCols[12],
      backgroundColor: "gray-50",
      gap: Spacing[8],
    },
    blocks: [
      {
        type: BlockType.Heading,
        level: "h1",
        content: "Welcome to Our Platform",
        style: {
          colSpan: ColSpan[8],
          fontSize: FontSize["4XL"],
          fontWeight: FontWeight.Bold,
          borderWidth: BorderWidth[1],
        },
      },
      {
        type: BlockType.Container,
        style: {
          colSpan: ColSpan[4],
        },
        blocks: [
          {
            type: BlockType.Text,
            content: "Build professional landing pages in minutes",
            style: {
              textColor: "gray-600",
              borderWidth: BorderWidth[1],
            },
          },
        ],
      },
      {
        type: BlockType.Container,
        style: {
          colSpan: ColSpan[12],
          borderWidth: BorderWidth[2],
          borderColor: "blue-500",
          padding: Spacing[4],
          display: Display.Grid,
          gridCols: GridCols[2],
          gap: Spacing[4],
        },
        blocks: [
          {
            type: BlockType.Heading,
            level: "h2",
            content: "Nested Heading",
            style: {
              fontSize: FontSize["2XL"],
              fontWeight: FontWeight.Bold,
            },
          },
          {
            type: BlockType.Text,
            content: "This is nested inside a container block",
            style: {
              textColor: "gray-600",
            },
          },
        ],
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LPSection sections={sampleSections} />
    </div>
  );
}
