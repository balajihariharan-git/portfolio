import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc, and, ne } from "drizzle-orm";
import readingTime from "reading-time";

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  featuredImage: string | null;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
  published: boolean;
}

function toPostMeta(row: typeof posts.$inferSelect): PostMeta {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    publishedAt: row.publishedAt?.toISOString() || "",
    updatedAt: row.updatedAt.toISOString(),
    category: row.category,
    tags: row.tags || [],
    featured: row.featured,
    featuredImage: row.featuredImage,
    readingTime: readingTime(row.content).text,
  };
}

function toPost(row: typeof posts.$inferSelect): Post {
  return {
    ...toPostMeta(row),
    content: row.content,
    published: row.published,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));

  return rows.map(toPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const [row] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)));

  return row ? toPost(row) : null;
}

export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.category, category)))
    .orderBy(desc(posts.publishedAt));

  return rows.map(toPostMeta);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<PostMeta[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.published, true),
        eq(posts.category, category),
        ne(posts.slug, currentSlug)
      )
    )
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

  return rows.map(toPostMeta);
}

export async function getPostCategories(): Promise<string[]> {
  const rows = await db
    .select({ category: posts.category })
    .from(posts)
    .where(eq(posts.published, true));

  return [...new Set(rows.map((r) => r.category))].sort();
}
