import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PostForm } from "@/components/admin/post-form";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.id, id));

  if (!post) notFound();

  return (
    <PostForm
      initialData={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        tags: post.tags || [],
        featured: post.featured,
        featuredImage: post.featuredImage,
        published: post.published,
      }}
    />
  );
}
