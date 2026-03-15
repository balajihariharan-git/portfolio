import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { requireAuth } from "@/lib/api-auth";
import { generateSlug } from "@/lib/slug";
import { desc } from "drizzle-orm";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt));

  return NextResponse.json(allPosts);
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const {
    title,
    slug: customSlug,
    description = "",
    content = "",
    category = "uncategorized",
    tags = [],
    featured = false,
    featuredImage = null,
    published = false,
  } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = customSlug || generateSlug(title);

  const [post] = await db
    .insert(posts)
    .values({
      slug,
      title,
      description,
      content,
      category,
      tags,
      featured,
      featuredImage,
      published,
      publishedAt: published ? new Date() : null,
    })
    .returning();

  return NextResponse.json(post, { status: 201 });
}
