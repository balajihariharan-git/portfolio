import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { memoryEntries } from "@/lib/db/schema";
import { requireAuth } from "@/lib/api-auth";
import { eq } from "drizzle-orm";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const [entry] = await db
    .select()
    .from(memoryEntries)
    .where(eq(memoryEntries.id, id));

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const body = await request.json();
  body.updatedAt = new Date();

  const [updated] = await db
    .update(memoryEntries)
    .set(body)
    .where(eq(memoryEntries.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const [deleted] = await db
    .delete(memoryEntries)
    .where(eq(memoryEntries.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
