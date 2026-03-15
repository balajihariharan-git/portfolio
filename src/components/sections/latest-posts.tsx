import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/post-card";

export async function LatestPosts() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="latest-posts" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Posts
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground">
              Deep dives into AI agent architecture, MCP protocol, and building production AI systems.
            </p>
          </div>
          <Link
            href="/post"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/post"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
