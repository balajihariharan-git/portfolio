/**
 * One-time migration: MDX files → PostgreSQL
 *
 * Usage: npx tsx scripts/migrate-content.ts
 * Requires: DATABASE_URL env var
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { posts, memoryEntries } from "../src/lib/db/schema";

async function migrateContent() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);

  // Migrate blog posts
  const postsDir = path.join(process.cwd(), "content", "post");
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    console.log(`Found ${files.length} blog posts`);

    for (const filename of files) {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const slug = data.slug || filename.replace(/\.mdx?$/, "");
      console.log(`  Migrating post: ${slug}`);

      try {
        await db.insert(posts).values({
          slug,
          title: data.title || filename,
          description: data.description || "",
          content,
          category: data.category || "uncategorized",
          tags: data.tags || [],
          featured: data.featured || false,
          published: !!data.publishedAt,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
          createdAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          updatedAt: data.updatedAt
            ? new Date(data.updatedAt)
            : data.publishedAt
              ? new Date(data.publishedAt)
              : new Date(),
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("duplicate")) {
          console.log(`    Skipped (already exists): ${slug}`);
        } else {
          throw err;
        }
      }
    }
  }

  // Migrate memory entries
  const memoryDir = path.join(process.cwd(), "content", "memory");
  if (fs.existsSync(memoryDir)) {
    const files = fs
      .readdirSync(memoryDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    console.log(`Found ${files.length} memory entries`);

    for (const filename of files) {
      if (filename === ".gitkeep") continue;
      const filePath = path.join(memoryDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const slug = filename.replace(/\.mdx?$/, "");
      console.log(`  Migrating memory: ${slug}`);

      try {
        await db.insert(memoryEntries).values({
          slug,
          title: data.title || slug,
          content,
          category: data.category || "uncategorized",
          tags: data.tags || [],
          attachments: [],
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
          updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("duplicate")) {
          console.log(`    Skipped (already exists): ${slug}`);
        } else {
          throw err;
        }
      }
    }
  }

  console.log("\nMigration complete!");
  await pool.end();
}

migrateContent().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
