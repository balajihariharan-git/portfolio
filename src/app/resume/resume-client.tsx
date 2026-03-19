"use client";

import { useEffect, useState } from "react";
import { Download, ArrowLeft, MapPin, Mail, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

interface Stats {
  commits: { total: number };
  prs: { merged: number };
  npm: { weeklyDownloads: number; totalDownloads: number; version: string };
  github: { openIssues: number; stars: number };
  linesOfCode: number;
  testCount: number;
  apiRoutes: number;
  agentCount: number;
  services: number;
  updatedAt: string;
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+`;
  return `${n.toLocaleString()}+`;
}

export function ResumeClient({ stats: initialStats }: { stats: Stats }) {
  const [stats, setStats] = useState(initialStats);

  // Refresh stats client-side for the freshest data
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => setStats((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const handleDownload = () => {
    window.open("/api/resume", "_blank");
  };

  return (
    <>
      {/* ===== TOOLBAR ===== */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Live stats · Updated {new Date(stats.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* ===== WEB RESUME (screen view) ===== */}
      <div className="resume-web-wrapper print:hidden">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16">

          {/* HEADER */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Balaji Hariharan
            </h1>
            <p className="mt-2 text-xl font-medium text-primary">
              AI Solutions Architect & LLM Engineer
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bangalore, India</span>
                            <a href="mailto:contact@balajihariharan.com" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"><Mail className="h-3.5 w-3.5" /> contact@balajihariharan.com</a>
              <a href="https://balajihariharan.com" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"><Globe className="h-3.5 w-3.5" /> balajihariharan.com</a>
              <a href="https://linkedin.com/in/ibalajihariharan" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
              <a href="https://github.com/shackleai" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"><Github className="h-3.5 w-3.5" /> GitHub</a>
            </div>
          </header>

          {/* LIVE METRICS BAR */}
          <div className="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {[
              { value: stats.commits.total.toLocaleString() + "+", label: "Commits" },
              { value: fmt(stats.npm.weeklyDownloads), label: "npm / week" },
              { value: "97%", label: "Coverage" },
              { value: stats.linesOfCode.toLocaleString() + "+", label: "Lines of Code" },
              { value: String(stats.prs.merged), label: "PRs Merged" },
              { value: "539+", label: "Issues Closed" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="text-lg font-bold text-primary sm:text-xl">{m.value}</div>
                <div className="text-[11px] font-medium text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <Section title="Summary">
            <p className="text-base leading-relaxed text-muted-foreground">
              AI Solutions Architect and LLM Engineer with <strong className="text-foreground">18+ years</strong> of enterprise experience spanning RPA, automation, and AI agent infrastructure. Currently building <strong className="text-foreground">ShackleAI</strong> — an Operating System for AI Agents with {stats.services} microservices, multi-agent orchestration, and enterprise governance. Published open-source MCP server with <strong className="text-foreground">{fmt(stats.npm.weeklyDownloads)} weekly npm downloads</strong>. Former <strong className="text-foreground">Managing Director, APAC at Softomotive</strong> (acquired by Microsoft → Power Automate). Delivered enterprise solutions for <strong className="text-foreground">Microsoft, Walmart, Flipkart, Deloitte, Axis Bank, Sanofi, Capgemini</strong>. Deep expertise in LLM pipelines, RAG, vector search, multi-provider routing, agent orchestration, and production AI infrastructure.
            </p>
          </Section>

          {/* TECHNICAL SKILLS */}
          <Section title="Technical Skills">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: "LLM / AI Agents", value: "Multi-agent orchestration, MCP Protocol, CrewAI, LiteLLM (100+ providers), RAG, prompt engineering, PII scrubbing" },
                { label: "Vector / Embeddings", value: "pgvector, sqlite-vec, OpenAI embeddings, Transformers.js (MiniLM-L6-v2), semantic search" },
                { label: "Languages", value: "TypeScript, Python 3.12+, JavaScript (ES2024), SQL, Bash" },
                { label: "Backend", value: "Next.js 16, Express 5, FastAPI, Node.js 22, async-first Python" },
                { label: "Frontend", value: "React 19, Next.js App Router, Tailwind CSS 4, shadcn/ui, Framer Motion" },
                { label: "Databases", value: "PostgreSQL 16, MongoDB, Redis 7, SQLite, Drizzle ORM, Mongoose" },
                { label: "Cloud / DevOps", value: "AWS (S3, SES, CloudFront, Route 53, Lightsail), Docker, GitHub Actions, Caddy, CI/CD" },
                { label: "Security", value: "AES-256, RBAC + ABAC, JWT, OAuth 2.0, OWASP LLM Top 10, credential vaulting" },
                { label: "Observability", value: "OpenTelemetry, per-call LLM cost tracking, audit trails, Playwright E2E, Vitest, pytest" },
                { label: "Payments", value: "Stripe, Razorpay, subscription billing, fraud detection" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card/50 px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">{s.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.value}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* AI PROJECTS */}
          <Section title="AI Projects & Products">
            <div className="space-y-6">
              <ProjectCard
                name="ShackleAI Platform — The Operating System for AI Agents"
                date="2025 – Present"
                role="Founder & Principal Engineer"
                links={[{ label: "shackleai.com", href: "https://shackleai.com" }, { label: "GitHub", href: "https://github.com/shackleai/platform" }]}
                tech="Next.js 16 · TypeScript · PostgreSQL + pgvector · Redis · Docker · MCP SDK · OpenTelemetry · Stripe · AWS"
                bullets={[
                  <>Architected <strong>{stats.services} core microservices</strong>: Gateway, ToolCloud, Vault, Memory, Runtime, Identity, Governance, Observatory, Registry, Mesh, LLM Gateway</>,
                  "Built multi-engine agent orchestration (CrewAI + OpenClaw) with LLM-driven plan decomposition into sequential/parallel execution steps",
                  "Designed LLM Gateway with multi-provider routing (OpenAI, Anthropic, Azure, Bedrock), budget enforcement, PII scrubbing, per-call cost tracking",
                  "Implemented Vault for AES-256 encrypted credential storage with runtime injection into sandboxed agent containers",
                  <>Shipped <strong>{stats.apiRoutes} API routes</strong>, <strong>59 migrations</strong>, <strong>539+ issues closed</strong>, <strong>241+ PRs merged</strong>, <strong>213+ unit tests</strong></>,
                  <>Engineered AI-accelerated dev methodology: <strong>{stats.agentCount}-agent ecosystem</strong> achieving 18 iterations in 3 days, 675+ commits across the platform</>,
                ]}
              />
              <ProjectCard
                name="@shackleai/memory-mcp — Persistent Memory for AI Coding Tools"
                date="2025 – Present"
                role="Creator & Maintainer"
                links={[{ label: "npm", href: "https://npmjs.com/package/@shackleai/memory-mcp" }, { label: "GitHub", href: "https://github.com/shackleai/memory-mcp" }]}
                tech="TypeScript · MCP Protocol · SQLite + sqlite-vec · Transformers.js · Semantic Search · Vitest"
                bullets={[
                  "Built the first MCP-native persistent memory server for AI coding assistants (Claude, Cursor, Windsurf, Copilot)",
                  <>Achieved <strong>{fmt(stats.npm.weeklyDownloads)} weekly npm downloads</strong> with 11 MCP tools, zero-config setup, and fully offline embeddings</>,
                  "Semantic search via MiniLM-L6-v2 (384-dim) with sqlite-vec; project-scoped memory, TODO tracking, export/import, cloud sync",
                ]}
              />
              <ProjectCard
                name="@shackleai/orchestrator — Open-Source Agent Orchestrator"
                date="2026 – Present"
                role="Creator & Lead Developer"
                links={[{ label: "npm", href: "https://npmjs.com/package/@shackleai/orchestrator" }, { label: "GitHub", href: "https://github.com/shackleai/orchestrator" }]}
                tech="TypeScript · MCP Protocol · PostgreSQL · Docker · npm Monorepo"
                bullets={[
                  "Open-source multi-agent orchestrator with MCP-native tool infrastructure, 46 PRs merged across 3 milestones",
                  "Multi-package monorepo (@shackleai/orchestrator, @shackleai/core, @shackleai/db, @shackleai/shared)",
                ]}
              />
              <ProjectCard
                name="ShackleAI FinServ Platform — Open-Source Financial Services"
                date="2026 – Present"
                role="Architect & Lead Developer"
                tech="TypeScript · Java · Spring Boot · Next.js · PostgreSQL · Python · Docker"
                bullets={[
                  "Open-source reference platform for banking with ML credit scoring, fraud detection, document AI — 253 commits, 106 issues closed",
                  "8 specialized FinTech AI agents (Architect, Backend, Security, Data, Frontend, Docs, DevOps, QA)",
                ]}
              />
              <ProjectCard
                name="ShackleAI Agent Framework — Enterprise Python Orchestration"
                date="2025"
                role="Architect & Lead Developer"
                links={[{ label: "PyPI", href: "#" }]}
                tech="Python 3.12 · AsyncIO · LiteLLM · Pydantic v2 · FastAPI · SQLAlchemy · OpenTelemetry · pytest"
                bullets={[
                  "Async-first multi-agent framework with sequential, parallel, and hierarchical execution modes",
                  <>LiteLLM integration for 100+ LLM providers with per-call cost tracking; <strong>{fmt(stats.testCount)} tests at 97% coverage</strong>, 37 built-in tools</>,
                ]}
              />
              <ProjectCard
                name="WhatsApp AI Chat Platform — RAG-Powered Business Assistant"
                date="2025"
                role="Full-Stack Engineer"
                tech="Node.js · Express · Next.js · PostgreSQL + pgvector · OpenAI · WhatsApp API · Razorpay"
                bullets={[
                  <>End-to-end SaaS: RAG over business catalogs, semantic FAQ, automated payments. <strong>10 phases</strong> shipped with multi-tenant handling</>,
                ]}
              />
              <ProjectCard
                name="Errakaaram — Production E-Commerce Platform"
                date="2024 – Present"
                role="Founder & Full-Stack Engineer"
                links={[{ label: "errakaaram.com", href: "https://errakaaram.com" }]}
                tech="Next.js 15 · Express 5 · MongoDB · Redis · AWS · Razorpay · Docker"
                bullets={[
                  <>Live e-commerce: <strong>29 data models</strong>, <strong>124+ pages</strong>, <strong>563 commits</strong>. Multi-role system, Razorpay payments, AWS S3 + CloudFront CDN</>,
                ]}
              />
            </div>
          </Section>

          {/* PROFESSIONAL EXPERIENCE */}
          <Section title="Professional Experience">
            <div className="space-y-5">
              <ExpCard role="Principal Engineer" company="Nagarro" note="Global digital engineering (10,000+ employees)" date="2022 – Present" bullets={[
                "Lead enterprise modernization for large-scale clients, architecting cloud-native and AI-driven platforms",
                "Drive technology strategy and hands-on engineering for complex distributed systems",
              ]} />
              <ExpCard role="Service Delivery Lead" company="FIS (Fidelity National Information Services)" note="Fortune 500, global fintech leader" date="2019 – 2021" bullets={[
                "Led enterprise automation and service delivery for banking and financial services clients",
                "Managed cross-functional teams delivering mission-critical fintech solutions at scale",
              ]} />
              <ExpCard role="Managing Director, APAC" company="Softomotive" note="Acquired by Microsoft (2020) → Microsoft Power Automate" date="2017 – 2019" highlight bullets={[
                "Spearheaded APAC expansion for the RPA platform that became Microsoft Power Automate",
                "Built Fortune 500 client relationships across banking, retail, and pharma verticals",
                "Drove pre-acquisition growth that contributed to Microsoft's strategic acquisition",
              ]} />
              <ExpCard role="SAP Technology Consultant" company="Deloitte" note="Big Four professional services" date="2012 – 2017" bullets={[
                "SAP technology consulting for enterprise clients across BFSI, retail, oil & gas, and pharma",
                "Large-scale enterprise automation and digital transformation programs",
              ]} />
              <ExpCard role="Engineer" company="BGR Energy Systems" note="Power & infrastructure engineering" date="2008 – 2010" bullets={[
                "Engineering role in power systems and industrial automation",
              ]} />
            </div>
          </Section>

          {/* ENTERPRISE CLIENTS */}
          <Section title="Enterprise Clients Served">
            <div className="flex flex-wrap gap-2">
              {["Microsoft", "Walmart", "Flipkart", "Axis Bank", "Nedbank", "Sanofi", "Deloitte", "Capgemini"].map((c) => (
                <span key={c} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground">{c}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Domains: BFSI & Core Banking · Retail & E-Commerce · Oil & Gas · Pharma & Logistics · Automobile · Enterprise Automation
            </p>
          </Section>

          {/* OPEN SOURCE */}
          <Section title="Open Source">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-base font-bold text-primary">@shackleai/memory-mcp</span>
                  <span className="ml-2 text-sm text-muted-foreground">v{stats.npm.version}</span>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">MIT</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Persistent memory for AI coding tools (Claude, Cursor, Windsurf, Copilot)
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-card border border-border px-3 py-1 font-semibold text-foreground">{fmt(stats.npm.weeklyDownloads)} weekly downloads</span>
                <span className="rounded-full bg-card border border-border px-3 py-1">11 MCP tools</span>
                <span className="rounded-full bg-card border border-border px-3 py-1">Semantic search</span>
                <span className="rounded-full bg-card border border-border px-3 py-1">Zero-config</span>
                <span className="rounded-full bg-card border border-border px-3 py-1">Offline embeddings</span>
              </div>
            </div>
          </Section>

          {/* PUBLICATIONS */}
          <Section title="Publications & Thought Leadership">
            <div className="space-y-3">
              {[
                { title: "How I Built an MCP Server from Scratch", desc: "Architecture deep-dive: MCP-native memory with SQLite + vector search", year: "2026" },
                { title: "From RPA to AI Agents: 18 Years of Enterprise Automation", desc: "Career perspective on the $20B+ automation market shift", year: "2026" },
                { title: "25 AI Agents Shipping Code 24/7", desc: "Multi-agent orchestration patterns, model selection, CI/CD as safety net", year: "2026" },
              ].map((p) => (
                <div key={p.title} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">&ldquo;{p.title}&rdquo;</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{p.year}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section title="Education">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card/50 px-4 py-3">
                <div className="text-sm font-semibold text-foreground">MBA, Finance</div>
                <div className="text-xs text-muted-foreground">2010 – 2012</div>
              </div>
              <div className="rounded-lg border border-border bg-card/50 px-4 py-3">
                <div className="text-sm font-semibold text-foreground">B.E., Electronics & Instrumentation Engineering</div>
                <div className="text-xs text-muted-foreground">2004 – 2008</div>
              </div>
            </div>
          </Section>

        </div>
      </div>

    </>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-5 text-lg font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function ProjectCard({ name, date, role, links, tech, bullets }: {
  name: string; date: string; role?: string;
  links?: { label: string; href: string }[];
  tech: string; bullets: React.ReactNode[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <span className="font-mono text-xs text-muted-foreground">{date}</span>
      </div>
      {(role || links) && (
        <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
          {role && <span className="italic">{role}</span>}
          {links?.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80">
              {l.label} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
      <div className="mt-2 font-mono text-[11px] text-muted-foreground">{tech}</div>
      <ul className="mt-3 space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpCard({ role, company, note, date, highlight, bullets }: {
  role: string; company: string; note: string; date: string; highlight?: boolean; bullets: string[];
}) {
  return (
    <div className={`rounded-lg border px-5 py-4 ${highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card/50"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground">{role}</h3>
        <span className="font-mono text-xs text-muted-foreground">{date}</span>
      </div>
      <div className="mt-0.5 text-sm text-muted-foreground">
        {company} <span className="text-xs text-muted-foreground/70">— {note}</span>
      </div>
      <ul className="mt-2.5 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

