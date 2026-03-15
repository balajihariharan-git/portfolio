import { notFound } from "next/navigation";
import { getMemoryBySlug, getAllMemoryEntries } from "@/lib/memory";
import { MemoryContent } from "@/components/memory/memory-content";
import { SignOutButton } from "@/components/memory/sign-out-button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getMemoryBySlug(slug);
  return {
    title: entry?.title || "Memory Entry",
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return getAllMemoryEntries().map((entry) => ({ slug: entry.slug }));
}

export default async function MemoryEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getMemoryBySlug(slug);

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
        <SignOutButton />
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
            {entry.createdAt}
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
    </div>
  );
}
