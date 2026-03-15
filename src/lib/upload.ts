import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];

const ALLOWED_ATTACHMENT_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
  "text/plain",
  "text/markdown",
  "application/json",
  "application/zip",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_ATTACHMENT_SIZE = 50 * 1024 * 1024; // 50MB

export function validateUpload(
  mimeType: string,
  sizeBytes: number,
  type: "image" | "attachment"
): string | null {
  const allowed = type === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_ATTACHMENT_TYPES;
  const maxSize = type === "image" ? MAX_IMAGE_SIZE : MAX_ATTACHMENT_SIZE;

  if (!allowed.includes(mimeType)) {
    return `File type ${mimeType} is not allowed`;
  }
  if (sizeBytes > maxSize) {
    return `File too large (max ${maxSize / 1024 / 1024}MB)`;
  }
  return null;
}

export async function saveFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string
): Promise<{ storedPath: string; filename: string }> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const ext = path.extname(originalName) || getExtFromMime(mimeType);
  const uuid = randomUUID();
  const filename = `${uuid}${ext}`;
  const relDir = `${year}/${month}`;
  const absDir = path.join(UPLOAD_DIR, relDir);

  await fs.mkdir(absDir, { recursive: true });
  await fs.writeFile(path.join(absDir, filename), buffer);

  return {
    storedPath: `${relDir}/${filename}`,
    filename: originalName,
  };
}

export async function deleteFile(storedPath: string): Promise<void> {
  const absPath = path.join(UPLOAD_DIR, storedPath);
  try {
    await fs.unlink(absPath);
  } catch {
    // File may not exist — ignore
  }
}

export async function getFilePath(storedPath: string): Promise<string> {
  return path.join(UPLOAD_DIR, storedPath);
}

function getExtFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
    "text/plain": ".txt",
    "text/markdown": ".md",
    "application/json": ".json",
    "application/zip": ".zip",
  };
  return map[mime] || "";
}
