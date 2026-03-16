/**
 * Content migration: MDX files → PostgreSQL (upsert)
 *
 * Usage: npx tsx scripts/migrate-content.ts
 * Requires: DATABASE_URL env var
 *
 * Inserts new entries, updates existing ones (matched by slug).
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { posts, memoryEntries } from "../src/lib/db/schema";

function isDuplicateKeyError(err: unknown): boolean {
  const fullMsg = String(err);
  if (fullMsg.includes("duplicate") || fullMsg.includes("unique") || fullMsg.includes("23505")) {
    return true;
  }
  // Check nested cause (Drizzle wraps PG errors)
  if (err && typeof err === "object" && "cause" in err) {
    const causeMsg = String((err as { cause: unknown }).cause);
    if (causeMsg.includes("duplicate") || causeMsg.includes("unique") || causeMsg.includes("23505")) {
      return true;
    }
  }
  return false;
}

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
        console.log(`    Inserted: ${slug}`);
      } catch (err: unknown) {
        if (isDuplicateKeyError(err)) {
          console.log(`    Already exists, updating: ${slug}`);
          await db
            .update(posts)
            .set({
              title: data.title || filename,
              description: data.description || "",
              content,
              category: data.category || "uncategorized",
              tags: data.tags || [],
              featured: data.featured || false,
              updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
            })
            .where(eq(posts.slug, slug));
          console.log(`    Updated: ${slug}`);
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
        console.log(`    Inserted: ${slug}`);
      } catch (err: unknown) {
        if (isDuplicateKeyError(err)) {
          console.log(`    Already exists, updating: ${slug}`);
          await db
            .update(memoryEntries)
            .set({
              title: data.title || slug,
              content,
              category: data.category || "uncategorized",
              tags: data.tags || [],
              updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
            })
            .where(eq(memoryEntries.slug, slug));
          console.log(`    Updated: ${slug}`);
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
