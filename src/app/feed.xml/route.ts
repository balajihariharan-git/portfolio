import { getAllPosts } from "@/lib/mdx";

const SITE_URL = "https://balajihariharan.com";

export async function GET() {
  const posts = getAllPosts();

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/post/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/post/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Balaji Hariharan — AI Solutions Architect</title>
    <description>Insights on AI agent architecture, MCP protocol, LLM infrastructure, and building production AI systems.</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>contact@balajihariharan.com (Balaji Hariharan)</managingEditor>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
