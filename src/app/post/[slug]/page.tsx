import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/mdx";
import { PostLayout } from "@/components/blog/post-layout";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["Balaji Hariharan"],
      tags: post.tags,
      url: `https://balajihariharan.com/post/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `/post/${post.slug}`,
    },
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  // JSON-LD for BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      "@id": "https://balajihariharan.com/#person",
      name: "Balaji Hariharan",
      url: "https://balajihariharan.com",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://balajihariharan.com/#person",
      name: "Balaji Hariharan",
    },
    url: `https://balajihariharan.com/post/${post.slug}`,
    mainEntityOfPage: `https://balajihariharan.com/post/${post.slug}`,
    keywords: post.tags,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://balajihariharan.com" },
      { "@type": "ListItem", position: 2, name: "Posts", item: "https://balajihariharan.com/post" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://balajihariharan.com/post/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PostLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}
