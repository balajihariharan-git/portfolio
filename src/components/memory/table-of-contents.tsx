"use client";

import { useState, useEffect, useCallback } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2]
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

interface TableOfContentsProps {
  content: string;
  variant: "desktop" | "mobile";
}

export function TableOfContents({ content, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headings = extractHeadings(content);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings, handleObserver]);

  if (headings.length < 3) return null;

  const handleClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const tocList = (
    <nav className="space-y-0.5">
      {headings.map((h) => (
        <button
          key={h.id}
          onClick={() => handleClick(h.id)}
          className={cn(
            "block w-full text-left text-sm leading-snug transition-colors",
            "hover:text-foreground",
            h.level === 1 && "py-1.5 font-semibold",
            h.level === 2 && "py-1 pl-3",
            h.level === 3 && "py-0.5 pl-6 text-xs",
            h.level === 4 && "py-0.5 pl-9 text-xs",
            activeId === h.id
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          {h.text}
        </button>
      ))}
    </nav>
  );

  if (variant === "desktop") {
    return (
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <List className="h-3.5 w-3.5" />
          Contents
        </h4>
        {tocList}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4" />
          Table of Contents
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            mobileOpen && "rotate-180"
          )}
        />
      </button>
      {mobileOpen && (
        <div className="mt-2 rounded-lg border border-border bg-card p-4">
          {tocList}
        </div>
      )}
    </div>
  );
}
