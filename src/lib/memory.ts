import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MEMORY_DIR = path.join(process.cwd(), "content", "memory");

export interface MemoryEntry {
  slug: string;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  content: string;
}

export function getAllMemoryEntries(): MemoryEntry[] {
  if (!fs.existsSync(MEMORY_DIR)) return [];

  const files = fs
    .readdirSync(MEMORY_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(MEMORY_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: (data.title as string) || filename,
        category: (data.category as string) || "uncategorized",
        createdAt: (data.createdAt as string) || "",
        updatedAt: (data.updatedAt as string) || "",
        tags: (data.tags as string[]) || [],
        content,
      };
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
}

export function getMemoryBySlug(slug: string): MemoryEntry | null {
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    const filePath = path.join(MEMORY_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: (data.title as string) || slug,
        category: (data.category as string) || "uncategorized",
        createdAt: (data.createdAt as string) || "",
        updatedAt: (data.updatedAt as string) || "",
        tags: (data.tags as string[]) || [],
        content,
      };
    }
  }

  return null;
}

export function getMemoryCategories(): string[] {
  const entries = getAllMemoryEntries();
  return [...new Set(entries.map((e) => e.category))].sort();
}
