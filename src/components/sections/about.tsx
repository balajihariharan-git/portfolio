"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const FALLBACK_STATS: StatItem[] = [
  { value: 675, label: "Commits Shipped", suffix: "+" },
  { value: 7852, label: "Tests Passing", suffix: "+" },
  { value: 97, label: "Test Coverage", suffix: "%" },
  { value: 1784, label: "npm Downloads", suffix: "+" },
  { value: 241, label: "PRs Merged" },
  { value: 83153, label: "Lines of Code", suffix: "+" },
];

function buildStats(data: Record<string, unknown>): StatItem[] {
  const commits = (data.commits as { total: number })?.total ?? 675;
  const testCount = (data.testCount as number) ?? 7852;
  const prs = (data.prs as { merged: number })?.merged ?? 241;
  const npm = data.npm as { totalDownloads: number } | undefined;
  const loc = (data.linesOfCode as number) ?? 83153;
  const agentCount = (data.agentCount as number) ?? 25;

  return [
    { value: commits, label: "Commits Shipped", suffix: "+" },
    { value: testCount, label: "Tests Passing", suffix: "+" },
    { value: 97, label: "Test Coverage", suffix: "%" },
    { value: npm?.totalDownloads ?? 1784, label: "npm Downloads", suffix: "+" },
    { value: prs, label: "PRs Merged" },
    { value: loc, label: "Lines of Code", suffix: "+" },
  ];
}

export function About() {
  const [stats, setStats] = useState<StatItem[]>(FALLBACK_STATS);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => setStats(buildStats(data)))
      .catch(() => {}); // keep fallbacks
  }, []);

  return (
    <section
      id="about"
      className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About
          </h2>
          <div className="mb-12 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m an <strong className="text-foreground">AI Solutions Architect and LLM Infrastructure Engineer</strong> who
              builds the systems that make agentic AI work in production — not demos,
              not wrappers, but the <strong className="text-foreground">governance, security, cost controls,
              and orchestration layers</strong> that enterprises need before trusting
              autonomous agents with real workflows.
            </p>
            <p>
              As the founder of <strong className="text-foreground">ShackleAI</strong>, I designed and built an
              11-microservice agent platform from scratch: an LLM gateway with
              multi-provider routing and PII scrubbing, a credential vault with
              AES-256 encryption and auto-rotation, RBAC+ABAC governance with
              kill-switches, and an orchestrator that decomposes natural language
              into executable multi-agent pipelines using CrewAI and OpenClaw.
            </p>
            <p>
              My open-source contributions include an{" "}
              <strong className="text-foreground">MCP memory server</strong> (1,784+ npm downloads)
              and a <strong className="text-foreground">Python async agent framework</strong> on PyPI with
              2,000+ tests at 97% coverage, per-call cost tracking across 100+ LLM
              providers, and 37 built-in tools.
            </p>
            <p>
              I developed a <strong className="text-foreground">rapid AI-accelerated development
              methodology</strong> — automated GitHub issue management, AI-driven sprint
              execution, and a 25-agent AI ecosystem that ships production
              code at lightning speed: 18 iterations in 3 days, 675+ commits across
              5 repositories, 7 PyPI releases. This isn&apos;t just
              building AI — it&apos;s using AI to build AI, faster than any traditional team.
            </p>
          </div>
        </motion.div>

        {/* Stats grid — live from /api/stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="mb-1 text-xl font-bold text-primary sm:text-2xl md:text-3xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix ?? ""}
                />
              </div>
              <div className="text-xs font-medium text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
