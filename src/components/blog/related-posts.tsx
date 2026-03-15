import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="mt-12 border-t border-border pt-10">
      <h3 className="mb-6 text-lg font-bold text-foreground">Related Posts</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <h4 className="mb-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h4>
            <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
