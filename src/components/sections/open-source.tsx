"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Github, ExternalLink, Copy, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNpmStats } from "@/hooks/use-npm-stats";

const FEATURES = [
  "11 MCP tools",
  "Semantic search",
  "Offline embeddings",
  "Zero config",
];

const INSTALL_CMD = "npm install @shackleai/memory-mcp";

export function OpenSource() {
  const { weeklyDownloads, loading } = useNpmStats("@shackleai/memory-mcp");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="open-source" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Open Source
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Tools I have built and released for the developer community.
          </p>
        </motion.div>

        {/* Hero card */}
        <motion.div
          className="overflow-hidden rounded-xl border border-border bg-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="p-6 sm:p-8">
            {/* Header row */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-card-foreground">
                @shackleai/memory-mcp
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                v0.5.2
              </span>
            </div>

            {/* Description */}
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Persistent memory for AI coding tools. The first MCP-native memory
              server.
            </p>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {loading ? "..." : weeklyDownloads?.toLocaleString()}
                  </span>{" "}
                  weekly downloads
                </span>
              </div>
            </div>

            {/* Install command */}
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-[var(--code-bg)] px-4 py-3">
              <code className="flex-1 font-mono text-sm text-[var(--code-text)]">
                {INSTALL_CMD}
              </code>
              <button
                onClick={handleCopy}
                className={cn(
                  "shrink-0 rounded-md p-1.5 transition-colors",
                  "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-label="Copy install command"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--success)]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Features */}
            <div className="mb-6 flex flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <span
                  key={feature}
                  className="rounded-md border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 border-t border-border pt-6">
              <a
                href="https://www.npmjs.com/package/@shackleai/memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                npm
              </a>
              <a
                href="https://github.com/shackleai/memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
