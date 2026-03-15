interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  // Simple markdown rendering — content is raw markdown from gray-matter
  // For a production blog, you'd use MDX compilation, but this works for launch
  return (
    <article className="mb-12 text-base leading-relaxed text-foreground [&>*]:mb-4 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-muted-foreground [&_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-[var(--code-bg)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[var(--code-bg)] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_img]:rounded-xl [&_img]:border [&_img]:border-border [&_hr]:border-border">
      <div className="whitespace-pre-wrap">
        {content}
      </div>
    </article>
  );
}
