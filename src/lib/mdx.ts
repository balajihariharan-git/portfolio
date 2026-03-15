import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "post");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(POSTS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      return {
        slug: data.slug || filename.replace(/\.mdx?$/, ""),
        title: data.title || filename,
        description: data.description || "",
        publishedAt: data.publishedAt || "",
        updatedAt: data.updatedAt || data.publishedAt || "",
        category: data.category || "uncategorized",
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: stats.text,
      };
    })
    .filter((post) => post.publishedAt) // Only published posts
    .sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const fileSlug = data.slug || filename.replace(/\.mdx?$/, "");

    if (fileSlug === slug) {
      const stats = readingTime(content);
      return {
        slug: fileSlug,
        title: data.title || filename,
        description: data.description || "",
        publishedAt: data.publishedAt || "",
        updatedAt: data.updatedAt || data.publishedAt || "",
        category: data.category || "uncategorized",
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: stats.text,
        content,
      };
    }
  }

  return null;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getPostCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))].sort();
}
