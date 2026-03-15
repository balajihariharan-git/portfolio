import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { memoryEntries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { MemoryForm } from "@/components/admin/memory-form";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Memory Entry",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditMemoryPage({ params }: PageProps) {
  const { id } = await params;
  const [entry] = await db
    .select()
    .from(memoryEntries)
    .where(eq(memoryEntries.id, id));

  if (!entry) notFound();

  return (
    <MemoryForm
      initialData={{
        id: entry.id,
        slug: entry.slug,
        title: entry.title,
        content: entry.content,
        category: entry.category,
        tags: entry.tags || [],
        attachments:
          (entry.attachments as Array<{
            name: string;
            path: string;
            size: number;
            type: string;
          }>) || [],
      }}
    />
  );
}
