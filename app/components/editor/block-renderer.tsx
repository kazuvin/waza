import {
  Block,
  BlockType,
  TextBlock,
  HeadingBlock,
  ButtonBlock,
  ContainerBlock,
} from "./schemas";
import { cn } from "@/lib/cn";

type BlockRendererProps = {
  block: Block;
};

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case BlockType.Text:
      return <TextBlockComponent block={block} />;
    case BlockType.Heading:
      return <HeadingBlockComponent block={block} />;
    case BlockType.Button:
      return <ButtonBlockComponent block={block} />;
    case BlockType.Container:
      return <ContainerBlockComponent block={block} />;
    default:
      return null;
  }
}

function TextBlockComponent({ block }: { block: TextBlock }) {
  return (
    <p className={cn(block.className)} style={block.style}>
      {block.content}
    </p>
  );
}

function HeadingBlockComponent({ block }: { block: HeadingBlock }) {
  const Tag = block.level;
  return (
    <Tag className={cn(block.className)} style={block.style}>
      {block.content}
    </Tag>
  );
}

function ButtonBlockComponent({ block }: { block: ButtonBlock }) {
  if (block.href) {
    return (
      <a href={block.href} className={cn(block.className)} style={block.style}>
        {block.content}
      </a>
    );
  }

  return (
    <button className={cn(block.className)} style={block.style}>
      {block.content}
    </button>
  );
}

function ContainerBlockComponent({ block }: { block: ContainerBlock }) {
  return (
    <div className={cn(block.className)} style={block.style}>
      {block.blocks.map((childBlock, index) => (
        <BlockRenderer key={index} block={childBlock} />
      ))}
    </div>
  );
}
