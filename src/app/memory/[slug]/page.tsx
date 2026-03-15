import { notFound } from "next/navigation";
import { getMemoryBySlug } from "@/lib/memory";
import { MemoryContent } from "@/components/memory/memory-content";
import { SignOutButton } from "@/components/memory/sign-out-button";
import { ArrowLeft, Calendar, Tag, Pencil, Paperclip } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getMemoryBySlug(slug);
  return {
    title: entry?.title || "Memory Entry",
    robots: { index: false, follow: false },
  };
}

export default async function MemoryEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getMemoryBySlug(slug);

  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/memory"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Memory
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/memory/edit/${entry.id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
          <SignOutButton />
        </div>
      </div>

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          {entry.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            {entry.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          {entry.tags.length > 0 && (
            <span className="flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              {entry.tags.join(", ")}
            </span>
          )}
        </div>
      </header>

      <MemoryContent content={entry.content} />

      {/* Attachments */}
      {entry.attachments.length > 0 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Paperclip className="h-4 w-4" />
            Attachments
          </h3>
          <div className="space-y-2">
            {entry.attachments.map((att, i) => (
              <a
                key={i}
                href={`/api/uploads/${att.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted"
              >
                <span className="font-medium text-primary">{att.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(att.size / 1024).toFixed(1)} KB
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
