import {
  Block,
  BlockType,
  TextBlock,
  HeadingBlock,
  ContainerBlock,
} from "./schemas";
import { mergeStyles } from "./style-converter";

type BlockRendererProps = {
  block: Block;
};

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case BlockType.Text:
      return <TextBlockComponent block={block} />;
    case BlockType.Heading:
      return <HeadingBlockComponent block={block} />;
    case BlockType.Container:
      return <ContainerBlockComponent block={block} />;
    default:
      return null;
  }
}

function TextBlockComponent({ block }: { block: TextBlock }) {
  const className = mergeStyles(block.style, block.className);
  return <p className={className}>{block.content}</p>;
}

function HeadingBlockComponent({ block }: { block: HeadingBlock }) {
  const Tag = block.level;
  const className = mergeStyles(block.style, block.className);
  return <Tag className={className}>{block.content}</Tag>;
}

function ContainerBlockComponent({ block }: { block: ContainerBlock }) {
  const className = mergeStyles(block.style, block.className);
  return (
    <div className={className}>
      {block.blocks.map((childBlock, index) => (
        <BlockRenderer key={index} block={childBlock} />
      ))}
    </div>
  );
}
