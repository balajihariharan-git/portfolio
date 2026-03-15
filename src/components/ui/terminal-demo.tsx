"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LINES = [
  { text: "$ npx @shackleai/memory-mcp init", type: "command" as const },
  { text: "Initializing memory store...", type: "output" as const },
  { text: "Created .shackle/memory.db", type: "success" as const },
  { text: "", type: "output" as const },
  { text: "$ shackle agent list", type: "command" as const },
  {
    text: "  frontend-engineer    opus    Next.js, React, shadcn/ui",
    type: "output" as const,
  },
  {
    text: "  platform-engineer    opus    Backend, API routes",
    type: "output" as const,
  },
  {
    text: "  code-reviewer        opus    Quality, architecture",
    type: "output" as const,
  },
  {
    text: "  ...14 more agents",
    type: "muted" as const,
  },
  { text: "", type: "output" as const },
  { text: "$ shackle status", type: "command" as const },
  { text: "  Services:     11/11 healthy", type: "success" as const },
  { text: "  API routes:   142 registered", type: "output" as const },
  { text: "  Tests:        917 passing", type: "success" as const },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;

    const delay = LINES[visibleLines]?.type === "command" ? 600 : 150;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <div className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          terminal
        </span>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre",
              line.type === "command" && "text-primary font-semibold",
              line.type === "output" && "text-[var(--code-text)]",
              line.type === "success" && "text-[var(--success)]",
              line.type === "muted" && "text-muted-foreground"
            )}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < LINES.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
        )}
      </div>
    </div>
  );
}
