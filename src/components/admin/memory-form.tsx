"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "./markdown-editor";
import { SlugInput } from "./slug-input";
import { TagInput } from "./tag-input";
import { FileUploader } from "./file-uploader";
import { uploadImage } from "./image-uploader";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Attachment {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface MemoryFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    attachments: Attachment[];
  };
}

export function MemoryForm({ initialData }: MemoryFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [attachments, setAttachments] = useState<Attachment[]>(
    initialData?.attachments || []
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const body = { title, slug, content, category, tags, attachments };

      const url = isEditing
        ? `/api/admin/memory/${initialData.id}`
        : "/api/admin/memory";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to save");
        return;
      }

      router.push("/memory");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/memory"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? "Edit Memory Entry" : "New Memory Entry"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-lg font-semibold text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Entry title"
          />
        </div>

        {/* Slug */}
        <SlugInput slug={slug} title={title} onChange={setSlug} />

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g., architecture"
          />
        </div>

        {/* Tags */}
        <TagInput tags={tags} onChange={setTags} />

        {/* Content */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Content
          </label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            onImageUpload={uploadImage}
          />
        </div>

        {/* Attachments */}
        <FileUploader
          attachments={attachments}
          onChange={setAttachments}
          entityType="memory"
        />
      </div>
    </form>
  );
}
