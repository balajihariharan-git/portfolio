import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { requireAuth } from "@/lib/api-auth";
import { validateUpload, saveFile } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const type = (formData.get("type") as string) || "image";
  const entityType = formData.get("entityType") as string | null;
  const entityId = formData.get("entityId") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const uploadType = type === "attachment" ? "attachment" : "image";
  const validationError = validateUpload(file.type, file.size, uploadType);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { storedPath, filename } = await saveFile(buffer, file.name, file.type);

  const [upload] = await db
    .insert(uploads)
    .values({
      filename,
      storedPath,
      mimeType: file.type,
      sizeBytes: file.size,
      entityType: entityType || null,
      entityId: entityId || null,
    })
    .returning();

  return NextResponse.json({
    id: upload.id,
    url: `/api/uploads/${storedPath}`,
    filename: upload.filename,
    storedPath: upload.storedPath,
  }, { status: 201 });
}
