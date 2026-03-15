"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  GraduationCap,
  Code2,
  Users,
  Briefcase,
  Zap,
} from "lucide-react";

const ENGAGEMENT_TYPES = [
  {
    icon: Building2,
    title: "Enterprise & Corporate",
    description:
      "AI agent platform architecture, LLM gateway design, governance frameworks, and production deployment strategy for enterprise teams.",
    audience: "CTOs, VPs of Engineering, AI Directors",
  },
  {
    icon: Rocket,
    title: "AI Startups & Founders",
    description:
      "Technical co-building, architecture review, and hands-on engineering for startups building agentic AI products — from zero to production.",
    audience: "AI Founders, Technical Co-founders",
  },
  {
    icon: Code2,
    title: "Complex AI Projects",
    description:
      "Multi-agent orchestration, MCP server development, LLM pipeline engineering, RAG systems, and custom agent frameworks as a freelance specialist.",
    audience: "Teams needing senior AI engineering",
  },
  {
    icon: Zap,
    title: "Rapid AI Development",
    description:
      "I use an AI-accelerated iteration methodology — automated GitHub issue management, AI-driven sprint execution, and a 17-agent ecosystem that ships production code at lightning speed. 18 iterations in 3 days, 252 commits in 11 days.",
    audience: "Teams that need to move fast",
  },
  {
    icon: GraduationCap,
    title: "Training & Workshops",
    description:
      "Hands-on workshops on building production agent systems, MCP protocol, LLM infrastructure patterns, and AI-native development workflows.",
    audience: "Engineering teams, Bootcamps, Conferences",
  },
  {
    icon: Users,
    title: "Advisory & Consulting",
    description:
      "AI strategy consulting, technology due diligence, agent architecture reviews, and vendor-neutral guidance on LLM infrastructure decisions.",
    audience: "Executives, Investors, Product Leaders",
  },
  {
    icon: Briefcase,
    title: "Full-Time Roles",
    description:
      "Open to Staff/Principal AI Engineer, AI Platform Architect, or Head of AI Infrastructure roles at companies building serious agent systems.",
    audience: "Recruiters, Hiring Managers",
  },
];

export function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Work With Me
          </h2>
          <p className="mb-12 max-w-2xl text-base text-muted-foreground">
            Whether you need an AI architect for your enterprise, a technical
            co-builder for your startup, or a specialist for a complex agent
            project — here&apos;s how I can help.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENT_TYPES.map((item, i) => (
            <motion.div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {item.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <p className="text-xs font-medium text-primary/70">
                {item.audience}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
