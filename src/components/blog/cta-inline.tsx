import { ArrowRight } from "lucide-react";

export function CtaInline() {
  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <p className="mb-3 text-base font-semibold text-foreground">
        Building something like this?
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        I help enterprises and startups design and build production AI agent systems.
      </p>
      <a
        href="/#contact"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        Let&apos;s talk
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
