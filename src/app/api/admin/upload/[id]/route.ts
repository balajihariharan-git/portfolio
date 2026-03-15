import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { requireAuth } from "@/lib/api-auth";
import { deleteFile } from "@/lib/upload";
import { eq } from "drizzle-orm";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await context.params;
  const [upload] = await db
    .select()
    .from(uploads)
    .where(eq(uploads.id, id));

  if (!upload) {
    return NextResponse.json({ error: "Upload not found" }, { status: 404 });
  }

  await deleteFile(upload.storedPath);
  await db.delete(uploads).where(eq(uploads.id, id));

  return NextResponse.json({ success: true });
}
