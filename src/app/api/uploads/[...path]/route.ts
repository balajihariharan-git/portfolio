import { NextRequest, NextResponse } from "next/server";
import { getFilePath } from "@/lib/upload";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs/promises";

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".json": "application/json",
  ".zip": "application/zip",
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { path: pathSegments } = await context.params;
  const storedPath = pathSegments.join("/");

  // Check if this file belongs to a memory entity — requires auth
  const [upload] = await db
    .select()
    .from(uploads)
    .where(eq(uploads.storedPath, storedPath));

  if (upload?.entityType === "memory") {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const filePath = await getFilePath(storedPath);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = "." + storedPath.split(".").pop();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
