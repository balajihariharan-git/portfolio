"use client";

import { useState } from "react";
import { Paperclip, X, Upload } from "lucide-react";

interface Attachment {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  entityType?: string;
  entityId?: string;
}

export function FileUploader({ attachments, onChange, entityType, entityId }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    try {
      const newAttachments: Attachment[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "attachment");
        if (entityType) formData.append("entityType", entityType);
        if (entityId) formData.append("entityId", entityId);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          alert(`Failed to upload ${file.name}: ${err.error}`);
          continue;
        }

        const data = await res.json();
        newAttachments.push({
          name: file.name,
          path: data.storedPath,
          size: file.size,
          type: file.type,
        });
      }

      onChange([...attachments, ...newAttachments]);
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    onChange(attachments.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        Attachments
      </label>
      {attachments.length > 0 && (
        <div className="mb-3 space-y-2">
          {attachments.map((att, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{att.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(att.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeAttachment(i)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
        {uploading ? (
          <span className="text-sm">Uploading...</span>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            <span className="text-sm">Upload files</span>
          </>
        )}
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleUpload(e.target.files);
          }}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
