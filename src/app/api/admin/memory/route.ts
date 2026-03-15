import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { memoryEntries } from "@/lib/db/schema";
import { requireAuth } from "@/lib/api-auth";
import { generateSlug } from "@/lib/slug";
import { desc } from "drizzle-orm";

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  const entries = await db
    .select()
    .from(memoryEntries)
    .orderBy(desc(memoryEntries.createdAt));

  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const {
    title,
    slug: customSlug,
    content = "",
    category = "uncategorized",
    tags = [],
    attachments = [],
  } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const slug = customSlug || generateSlug(title);

  const [entry] = await db
    .insert(memoryEntries)
    .values({ slug, title, content, category, tags, attachments })
    .returning();

  return NextResponse.json(entry, { status: 201 });
}
