import { getAllPosts, getPostCategories } from "@/lib/mdx";
import { PostList } from "@/components/blog/post-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Insights on AI agent architecture, MCP protocol, LLM infrastructure, and building production AI systems — by Balaji Hariharan.",
  openGraph: {
    title: "Posts — Balaji Hariharan",
    description: "Insights on AI agent architecture, MCP protocol, LLM infrastructure, and building production AI systems.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = await getPostCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Posts
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Deep dives into AI agent architecture, MCP protocol, LLM infrastructure,
          and lessons from building production AI systems.
        </p>
      </div>
      <PostList posts={posts} categories={categories} />
    </div>
  );
}
