import { getAllPosts } from "@/lib/mdx";
import { SignOutButton } from "@/components/memory/sign-out-button";
import { ArrowLeft, Calendar, Clock, Eye, ExternalLink, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Posts",
  robots: { index: false, follow: false },
};

export default function ManagePostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/memory"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Manage Posts
            </h1>
            <p className="mt-1 text-muted-foreground">
              {posts.length} published posts
            </p>
          </div>
        </div>
        <SignOutButton />
      </div>

      {/* How to add posts */}
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="mb-2 text-sm font-semibold text-foreground">How to publish a new post</h3>
        <ol className="space-y-1 text-sm text-muted-foreground">
          <li>1. Create a <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 font-mono text-xs">.mdx</code> file in <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 font-mono text-xs">content/post/</code></li>
          <li>2. Add frontmatter (title, slug, description, publishedAt, category, tags)</li>
          <li>3. Write your article in markdown</li>
          <li>4. <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 font-mono text-xs">git add . && git commit && git push</code> — auto-deploys via GitHub Actions</li>
        </ol>
      </div>

      {/* Posts list */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-card-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {post.featured && (
                    <span className="rounded-full bg-[var(--success)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--success)]">
                      Featured
                    </span>
                  )}
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Meta row */}
              <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
                {post.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {post.tags.join(", ")}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 border-t border-border pt-3">
                <Link
                  href={`/post/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Live
                </Link>
                <a
                  href={`https://github.com/balajihariharan-git/portfolio/blob/main/content/post/${post.slug}.mdx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Edit on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
