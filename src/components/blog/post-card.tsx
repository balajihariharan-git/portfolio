import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {post.category}
        </span>
        {post.featured && (
          <span className="rounded-full bg-[var(--success)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--success)]">
            Featured
          </span>
        )}
      </div>

      <h2 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {post.title}
      </h2>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}
