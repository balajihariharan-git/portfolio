"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { STATS } from "@/lib/constants";

export function About() {
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
              <strong className="text-foreground">MCP memory server</strong> (1,440+ weekly npm downloads)
              and a <strong className="text-foreground">Python async agent framework</strong> on PyPI with
              2,000+ tests at 97% coverage, per-call cost tracking across 100+ LLM
              providers, and 37 built-in tools.
            </p>
            <p>
              I developed a <strong className="text-foreground">rapid AI-accelerated development
              methodology</strong> — automated GitHub issue management, AI-driven sprint
              execution, and a 17-agent Claude Code ecosystem that ships production
              code at lightning speed: 18 iterations in 3 days, 252 commits across
              the platform in 11 active days, 7 PyPI releases. This isn&apos;t just
              building AI — it&apos;s using AI to build AI, faster than any traditional team.
            </p>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((stat, i) => (
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
                  suffix={"suffix" in stat ? stat.suffix : ""}
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
