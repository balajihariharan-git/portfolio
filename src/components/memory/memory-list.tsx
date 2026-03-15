"use client";

import { useState, useMemo } from "react";
import { Search, Tag, Calendar, FolderOpen, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteMemoryButton } from "@/components/admin/delete-memory-button";
import type { MemoryEntry } from "@/lib/memory";

interface MemoryListProps {
  entries: MemoryEntry[];
  categories: string[];
}

export function MemoryList({ entries, categories }: MemoryListProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        !search ||
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        !activeCategory || entry.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [entries, search, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-card-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <FolderOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            {entries.length === 0
              ? "No memory entries yet."
              : "No entries match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.slug}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <Link href={`/memory/${entry.slug}`} className="block">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
                    {entry.title}
                  </h2>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {entry.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  {entry.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {entry.tags.join(", ")}
                    </span>
                  )}
                </div>
              </Link>
              <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                <Link
                  href={`/memory/edit/${entry.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <DeleteMemoryButton
                  entryId={entry.id}
                  entryTitle={entry.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
