"use client";

import { useState, useMemo } from "react";
import { PostCard } from "./post-card";
import type { PostMeta } from "@/lib/mdx";

interface PostListProps {
  posts: PostMeta[];
  categories: string[];
}

export function PostList({ posts, categories }: PostListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
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
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
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

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
