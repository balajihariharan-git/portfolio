import { ArrowRight, Mail } from "lucide-react";

interface CtaEndProps {
  category: string;
}

const CTA_MAP: Record<string, { title: string; description: string }> = {
  "mcp-protocol": {
    title: "Need help building MCP servers?",
    description: "I've built production MCP servers from scratch. Let me help you design yours.",
  },
  "multi-agent": {
    title: "Building a multi-agent system?",
    description: "From orchestration to governance, I can help you architect agent systems that work in production.",
  },
  "llm-infrastructure": {
    title: "Designing LLM infrastructure?",
    description: "I've built LLM gateways, cost tracking, and PII scrubbing at scale. Let's talk architecture.",
  },
  default: {
    title: "Want to work together?",
    description: "I help enterprises and startups build production AI systems — from architecture to deployment.",
  },
};

export function CtaEnd({ category }: CtaEndProps) {
  const cta = CTA_MAP[category] || CTA_MAP.default;

  return (
    <div className="my-12 rounded-xl border border-border bg-card p-6 sm:p-8">
      <h3 className="mb-2 text-xl font-bold text-card-foreground">{cta.title}</h3>
      <p className="mb-6 text-muted-foreground">{cta.description}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get In Touch
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="mailto:contact@balajihariharan.com"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted"
        >
          <Mail className="h-4 w-4" />
          Email Me
        </a>
      </div>
    </div>
  );
}
