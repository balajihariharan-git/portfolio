"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export function MarkdownEditor({ value, onChange, onImageUpload }: MarkdownEditorProps) {
  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      if (!onImageUpload) return;
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length === 0) return;

      e.preventDefault();
      for (const file of files) {
        const url = await onImageUpload(file);
        onChange(value + `\n![${file.name}](${url})\n`);
      }
    },
    [value, onChange, onImageUpload]
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent) => {
      if (!onImageUpload) return;
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith("image/"));
      if (!imageItem) return;

      e.preventDefault();
      const file = imageItem.getAsFile();
      if (!file) return;
      const url = await onImageUpload(file);
      onChange(value + `\n![pasted image](${url})\n`);
    },
    [value, onChange, onImageUpload]
  );

  return (
    <div onDrop={handleDrop} onPaste={handlePaste} data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={500}
        preview="live"
      />
    </div>
  );
}
