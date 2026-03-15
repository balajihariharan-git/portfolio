import { db } from "@/lib/db";
import { memoryEntries } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export interface MemoryEntry {
  id: string;
  slug: string;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  content: string;
  attachments: Array<{ name: string; path: string; size: number; type: string }>;
}

function toEntry(row: typeof memoryEntries.$inferSelect): MemoryEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    tags: row.tags || [],
    content: row.content,
    attachments: (row.attachments as MemoryEntry["attachments"]) || [],
  };
}

export async function getAllMemoryEntries(): Promise<MemoryEntry[]> {
  const rows = await db
    .select()
    .from(memoryEntries)
    .orderBy(desc(memoryEntries.createdAt));

  return rows.map(toEntry);
}

export async function getMemoryBySlug(slug: string): Promise<MemoryEntry | null> {
  const [row] = await db
    .select()
    .from(memoryEntries)
    .where(eq(memoryEntries.slug, slug));

  return row ? toEntry(row) : null;
}

export async function getMemoryCategories(): Promise<string[]> {
  const rows = await db
    .select({ category: memoryEntries.category })
    .from(memoryEntries);

  return [...new Set(rows.map((r) => r.category))].sort();
}
