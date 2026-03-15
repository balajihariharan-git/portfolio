import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { PostContent } from "./post-content";
import { CtaEnd } from "./cta-end";
import { RelatedPosts } from "./related-posts";
import { SocialShare } from "@/components/admin/social-share";
import type { Post, PostMeta } from "@/lib/mdx";

interface PostLayoutProps {
  post: Post;
  relatedPosts: PostMeta[];
}

export function PostLayout({ post, relatedPosts }: PostLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/post"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All Posts
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
            {post.category}
          </span>
          {post.featured && (
            <span className="rounded-full bg-[var(--success)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--success)]">
              Featured
            </span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-6 text-lg text-muted-foreground">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTime}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Social share */}
        <div className="mt-6">
          <SocialShare
            url={`/post/${post.slug}`}
            title={post.title}
            description={post.description}
          />
        </div>
      </header>

      {/* Featured image */}
      {post.featuredImage && (
        <div className="mb-10 overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/uploads/${post.featuredImage}`}
            alt={post.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <PostContent content={post.content} />

      {/* Bottom share */}
      <div className="my-8 rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Share this post</p>
        <SocialShare
          url={`/post/${post.slug}`}
          title={post.title}
          description={post.description}
        />
      </div>

      <CtaEnd category={post.category} />

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

      {/* Author bio */}
      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            BH
          </div>
          <div>
            <div className="font-semibold text-card-foreground">Balaji Hariharan</div>
            <div className="text-sm text-muted-foreground">
              AI Solutions Architect building production agent systems, LLM gateways, and governance frameworks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
