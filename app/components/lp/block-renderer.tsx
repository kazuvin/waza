import * as React from "react";
import {
  Block,
  BlockType,
  TextBlock,
  HeadingBlock,
  ButtonBlock,
  ContainerBlock,
} from "./schemas";
import { cn } from "@/lib/cn";
import { JSX } from "react";

type BlockRendererProps = {
  block: Block;
  isEditMode?: boolean;
  selectedBlockId?: string | null;
  onBlockSelect?: (blockId: string) => void;
};

export function BlockRenderer({
  block,
  isEditMode = false,
  selectedBlockId = null,
  onBlockSelect,
}: BlockRendererProps) {
  switch (block.type) {
    case BlockType.Text:
      return (
        <TextBlockComponent
          block={block}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      );
    case BlockType.Heading:
      return (
        <HeadingBlockComponent
          block={block}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      );
    case BlockType.Button:
      return (
        <ButtonBlockComponent
          block={block}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      );
    case BlockType.Container:
      return (
        <ContainerBlockComponent
          block={block}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      );
    default:
      return null;
  }
}

type BlockComponentProps = {
  block: Block;
  isEditMode?: boolean;
  selectedBlockId?: string | null;
  onBlockSelect?: (blockId: string) => void;
};

type BaseBlockComponentProps = {
  block: Block;
  isEditMode?: boolean;
  selectedBlockId?: string | null;
  onBlockSelect?: (blockId: string) => void;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  additionalClassName?: string;
  onClickOverride?: (e: React.MouseEvent) => void;
};

function BaseBlockComponent({
  block,
  isEditMode,
  selectedBlockId,
  onBlockSelect,
  children,
  as: Component = "div",
  additionalClassName,
  onClickOverride,
  ...props
}: BaseBlockComponentProps & React.HTMLAttributes<HTMLElement>) {
  const isSelected = isEditMode && selectedBlockId === block.id;

  const className = cn(
    block.className,
    additionalClassName,
    isEditMode &&
      "hover:ring-muted-foreground cursor-pointer transition-all hover:ring-2 hover:ring-offset-2",
    isSelected && "!ring-primary ring-2 ring-offset-2"
  );

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      onBlockSelect?.(block.id);
    }
    onClickOverride?.(e);
  };

  return React.createElement(
    Component,
    {
      className,
      style: block.style,
      onClick: handleClick,
      ...props,
    },
    children
  );
}

function TextBlockComponent({
  block,
  isEditMode,
  selectedBlockId,
  onBlockSelect,
}: BlockComponentProps & { block: TextBlock }) {
  return (
    <BaseBlockComponent
      block={block}
      isEditMode={isEditMode}
      selectedBlockId={selectedBlockId}
      onBlockSelect={onBlockSelect}
      as="p"
    >
      {block.content}
    </BaseBlockComponent>
  );
}

function HeadingBlockComponent({
  block,
  isEditMode,
  selectedBlockId,
  onBlockSelect,
}: BlockComponentProps & { block: HeadingBlock }) {
  return (
    <BaseBlockComponent
      block={block}
      isEditMode={isEditMode}
      selectedBlockId={selectedBlockId}
      onBlockSelect={onBlockSelect}
      as={block.level}
    >
      {block.content}
    </BaseBlockComponent>
  );
}

function ButtonBlockComponent({
  block,
  isEditMode,
  selectedBlockId,
  onBlockSelect,
}: BlockComponentProps & { block: ButtonBlock }) {
  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      e.preventDefault();
    }
  };

  return (
    <BaseBlockComponent
      block={block}
      isEditMode={isEditMode}
      selectedBlockId={selectedBlockId}
      onBlockSelect={onBlockSelect}
      as={block.href ? "a" : "button"}
      onClickOverride={handleClick}
      href={block.href}
    >
      {block.content}
    </BaseBlockComponent>
  );
}

function ContainerBlockComponent({
  block,
  isEditMode,
  selectedBlockId,
  onBlockSelect,
}: BlockComponentProps & { block: ContainerBlock }) {
  return (
    <BaseBlockComponent
      block={block}
      isEditMode={isEditMode}
      selectedBlockId={selectedBlockId}
      onBlockSelect={onBlockSelect}
      as="div"
    >
      {block.blocks.map((childBlock) => (
        <BlockRenderer
          key={childBlock.id}
          block={childBlock}
          isEditMode={isEditMode}
          selectedBlockId={selectedBlockId}
          onBlockSelect={onBlockSelect}
        />
      ))}
    </BaseBlockComponent>
  );
}
