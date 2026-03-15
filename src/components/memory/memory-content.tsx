"use client";

interface MemoryContentProps {
  content: string;
}

export function MemoryContent({ content }: MemoryContentProps) {
  return (
    <article className="text-base leading-relaxed text-foreground">
      <div className="whitespace-pre-wrap font-sans">{content}</div>
    </article>
  );
}
