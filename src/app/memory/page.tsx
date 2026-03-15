import { getAllMemoryEntries, getMemoryCategories } from "@/lib/memory";
import { getAllPosts } from "@/lib/mdx";
import { MemoryList } from "@/components/memory/memory-list";
import { SignOutButton } from "@/components/memory/sign-out-button";
import { FileText, Brain, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MemoryPage() {
  const entries = await getAllMemoryEntries();
  const categories = await getMemoryCategories();
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Memory
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your private knowledge base
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/memory/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{entries.length}</div>
          <div className="text-xs text-muted-foreground">Memory Entries</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{categories.length}</div>
          <div className="text-xs text-muted-foreground">Categories</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{posts.length}</div>
          <div className="text-xs text-muted-foreground">Published Posts</div>
        </div>
        <Link
          href="/memory/posts"
          className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center transition-all hover:border-primary/50 hover:bg-primary/10"
        >
          <FileText className="mx-auto mb-1 h-6 w-6 text-primary" />
          <div className="text-xs font-medium text-primary">Manage Posts</div>
        </Link>
      </div>

      {/* Memory entries */}
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
      </div>
      <MemoryList entries={entries} categories={categories} />
    </div>
  );
}
