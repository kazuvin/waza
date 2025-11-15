import { Hero } from "@/app/components/home";
import { LPSection, Section, BlockType } from "../components/editor";

// サンプルデータ
const sampleSections: Section[] = [
  {
    id: "hero-1",
    order: 0,
    enabled: true,
    style: {
      display: "grid",
      gridCols: 12,
      backgroundColor: "gray-50",
      gap: "lg",
    },
    blocks: [
      {
        type: BlockType.Heading,
        level: "h1",
        content: "Welcome to Our Platform",
        style: {
          colSpan: 8,
          fontSize: "4xl",
          fontWeight: "bold",
          borderWidth: 1,
        },
      },
      {
        type: BlockType.Container,
        style: {
          colSpan: 4,
        },
        blocks: [
          {
            type: BlockType.Text,
            content: "Build professional landing pages in minutes",
            style: {
              textColor: "gray-600",
              borderWidth: 1,
            },
          },
        ],
      },
      {
        type: BlockType.Container,
        style: {
          borderWidth: 2,
          borderColor: "blue-500",
          padding: "md",
          display: "grid",
          gridCols: 12,
          gap: "md",
        },
        blocks: [
          {
            type: BlockType.Heading,
            level: "h2",
            content: "Nested Heading",
            style: {
              fontSize: "2xl",
              fontWeight: "bold",
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
