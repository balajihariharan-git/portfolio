"use client";

import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  entityType?: string;
  entityId?: string;
}

export function ImageUploader({ value, onChange, entityType, entityId }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        if (entityType) formData.append("entityType", entityType);
        if (entityId) formData.append("entityId", entityId);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Upload failed");
          return;
        }

        const data = await res.json();
        onChange(data.storedPath);
      } finally {
        setUploading(false);
      }
    },
    [onChange, entityType, entityId]
  );

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Featured Image
      </label>
      {value ? (
        <div className="relative rounded-lg border border-border overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/uploads/${value}`}
            alt="Featured"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
          {uploading ? (
            <span className="text-sm">Uploading...</span>
          ) : (
            <>
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm">Click or drag to upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

// Helper to upload inline images for markdown editor
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "image");

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}
