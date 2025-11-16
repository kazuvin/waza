"use client";

import { LPEditor } from "@/app/components/lp";
import type { LP } from "@/app/components/lp/schemas";
import { BlockType } from "@/app/components/lp/schemas";

// Mock data for demonstration
const mockLP: LP = {
  id: "1",
  title: "Product Launch Landing Page",
  slug: "product-launch",
  description: "Experience our revolutionary new product",
  sections: [
    // ヒーローセクション
    {
      id: "hero",
      order: 0,
      enabled: true,
      style: {
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(to bottom, #ffffff, #ffffff, rgba(59, 130, 246, 0.1))",
        position: "relative",
      },
      blocks: [
        {
          id: "hero-container",
          type: BlockType.Container,
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "56rem",
            margin: "0 auto",
          },
          blocks: [
            {
              id: "hero-heading",
              type: BlockType.Heading,
              level: "h1",
              content: "Title",
              style: {
                fontSize: "4rem",
                fontWeight: "700",
                marginBottom: "1.5rem",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, rgba(59, 130, 246, 0.6))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: "-0.025em",
              },
            },
            {
              id: "hero-text",
              type: BlockType.Text,
              content: "description",
              style: {
                fontSize: "1.25rem",
                lineHeight: "1.75",
                marginBottom: "2.5rem",
                maxWidth: "42rem",
                color: "#64748b",
              },
            },
          ],
        },
      ],
    },
    // 特徴セクション
    {
      id: "features-1",
      order: 1,
      enabled: true,
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        backgroundColor: "#ffffff",
        gap: "2rem",
        padding: "4rem",
      },
      blocks: [
        {
          id: "features-heading",
          type: BlockType.Heading,
          level: "h2",
          content: "主な機能",
          style: {
            gridColumn: "span 12 / span 12",
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "#0f172a",
          },
        },
        {
          id: "features-text",
          type: BlockType.Text,
          content:
            "プロフェッショナルなランディングページを作成するために必要なすべての機能",
          style: {
            gridColumn: "span 12 / span 12",
            fontSize: "1.125rem",
            color: "#64748b",
            marginBottom: "2rem",
          },
        },
        {
          id: "feature-card-1",
          type: BlockType.Container,
          style: {
            gridColumn: "span 4 / span 4",
            backgroundColor: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "16px",
            height: "400px",
          },
          blocks: [
            {
              id: "feature-1-heading",
              type: BlockType.Heading,
              level: "h3",
              content: "🎨 柔軟なデザイン",
              style: {
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: "0.5rem",
              },
            },
            {
              id: "feature-1-text",
              type: BlockType.Text,
              content:
                "12カラムグリッドシステムで自由自在にレイアウト。レスポンシブデザインに完全対応。",
              style: {
                color: "#475569",
              },
            },
          ],
        },
        {
          id: "feature-card-2",
          type: BlockType.Container,
          style: {
            gridColumn: "span 4 / span 4",
            backgroundColor: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "16px",
            height: "400px",
          },
          blocks: [
            {
              id: "feature-2-heading",
              type: BlockType.Heading,
              level: "h3",
              content: "⚡ 高速パフォーマンス",
              style: {
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: "0.5rem",
              },
            },
            {
              id: "feature-2-text",
              type: BlockType.Text,
              content:
                "Next.jsとReactで構築された最適化されたコード。驚くほど高速な読み込み速度を実現。",
              style: {
                color: "#475569",
              },
            },
          ],
        },
        {
          id: "feature-card-3",
          type: BlockType.Container,
          style: {
            gridColumn: "span 4 / span 4",
            backgroundColor: "#f8fafc",
            padding: "1.5rem",
            borderRadius: "16px",
            height: "400px",
          },
          blocks: [
            {
              id: "feature-3-heading",
              type: BlockType.Heading,
              level: "h3",
              content: "🔧 簡単カスタマイズ",
              style: {
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: "0.5rem",
              },
            },
            {
              id: "feature-3-text",
              type: BlockType.Text,
              content:
                "直感的なUIで色、フォント、スペーシングなどを簡単に調整。コーディング不要。",
              style: {
                color: "#475569",
              },
            },
          ],
        },
      ],
    },
    // CTAセクション
    {
      id: "cta-1",
      order: 2,
      enabled: true,
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        backgroundColor: "#3b82f6",
        gap: "1.5rem",
        padding: "4rem",
      },
      blocks: [
        {
          id: "cta-heading",
          type: BlockType.Heading,
          level: "h2",
          content: "今すぐ始めましょう",
          style: {
            gridColumn: "span 12 / span 12",
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "0.5rem",
          },
        },
        {
          id: "cta-text",
          type: BlockType.Text,
          content:
            "数千のビジネスが既に使用しています。あなたも今日から美しいランディングページを作成できます。",
          style: {
            gridColumn: "span 12 / span 12",
            fontSize: "1.25rem",
            color: "#dbeafe",
            marginBottom: "1.5rem",
          },
        },
        {
          id: "cta-button",
          type: BlockType.Button,
          content: "無料トライアルを開始",
          style: {
            gridColumn: "span 12 / span 12",
            backgroundColor: "#ffffff",
            color: "#3b82f6",
            padding: "1rem",
            borderRadius: "2px",
            fontWeight: "700",
            fontSize: "1.125rem",
          },
        },
      ],
    },
  ],
  status: "published",
};

export default function LPEditorPage() {
  const handleSave = (sections: typeof mockLP.sections) => {
    console.log("Saving draft:", sections);
    // In production, save to API
  };

  const handlePublish = (sections: typeof mockLP.sections) => {
    console.log("Publishing:", sections);
    // In production, publish to API
  };

  return (
    <LPEditor
      initialSections={mockLP.sections}
      onSave={handleSave}
      onPublish={handlePublish}
    />
  );
}
