"use client";

import { generateSlug } from "@/lib/slug";
import { RefreshCw } from "lucide-react";

interface SlugInputProps {
  slug: string;
  title: string;
  onChange: (slug: string) => void;
}

export function SlugInput({ slug, title, onChange }: SlugInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Slug
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={slug}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="auto-generated-from-title"
        />
        <button
          type="button"
          onClick={() => onChange(generateSlug(title))}
          className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Generate from title"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
