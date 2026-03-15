import { getAllMemoryEntries, getMemoryCategories } from "@/lib/memory";
import { MemoryList } from "@/components/memory/memory-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory",
  robots: { index: false, follow: false },
};

export default function MemoryPage() {
  const entries = getAllMemoryEntries();
  const categories = getMemoryCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Memory
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your private knowledge base
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {entries.length} entries
        </span>
      </div>
      <MemoryList entries={entries} categories={categories} />
    </div>
  );
}
