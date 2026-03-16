"use client";

import { useEffect, useState } from "react";
import { Download, ArrowLeft, MapPin, Phone, Mail, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

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

  const handlePrint = () => window.print();

  return (
    <>
      {/* ===== TOOLBAR (hidden in print) ===== */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md print:hidden">
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
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download PDF
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
              <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +91 9884245538</span>
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
              { value: "367", label: "Issues Closed" },
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
                  <>Shipped <strong>{stats.apiRoutes} API routes</strong>, <strong>59 migrations</strong>, <strong>367+ issues closed</strong>, <strong>{stats.prs.merged} PRs merged</strong>, <strong>213+ unit tests</strong></>,
                  <>Engineered AI-accelerated dev methodology: <strong>{stats.agentCount}-agent ecosystem</strong> achieving 18 iterations in 3 days, 252 commits in 11 days</>,
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
                { title: "17 AI Agents Shipping Code 24/7", desc: "Multi-agent orchestration patterns, model selection, CI/CD as safety net", year: "2026" },
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

      {/* ===== PRINT-ONLY RESUME (A4 optimized, hidden on screen) ===== */}
      <div className="hidden print:block">
        <div className="print-page">
          {/* Page 1 Header */}
          <div className="print-header">
            <div>
              <h1 className="print-name">Balaji Hariharan</h1>
              <div className="print-title">AI Solutions Architect & LLM Engineer</div>
            </div>
            <div className="print-contact">
              <div>Bangalore, India &nbsp;|&nbsp; +91 9884245538</div>
              <div>contact@balajihariharan.com</div>
              <div>balajihariharan.com &nbsp;|&nbsp; linkedin.com/in/ibalajihariharan</div>
              <div>github.com/shackleai</div>
            </div>
          </div>

          {/* Print Summary */}
          <div className="print-section">
            <div className="print-section-title">Summary</div>
            <p className="print-body">
              AI Solutions Architect and LLM Engineer with <b>18+ years</b> of enterprise experience spanning RPA, automation, and AI agent infrastructure. Currently building <b>ShackleAI</b> — an Operating System for AI Agents with {stats.services} microservices, multi-agent orchestration, and enterprise governance. Published open-source MCP server with <b>{fmt(stats.npm.weeklyDownloads)} weekly npm downloads</b>. Former <b>Managing Director, APAC at Softomotive</b> (acquired by Microsoft → Power Automate). Delivered enterprise solutions for <b>Microsoft, Walmart, Flipkart, Deloitte, Axis Bank, Sanofi, Capgemini</b>. Deep expertise in LLM pipelines, RAG, vector search, multi-provider routing, agent orchestration, and production AI infrastructure.
            </p>
          </div>

          {/* Print Skills */}
          <div className="print-section">
            <div className="print-section-title">Technical Skills</div>
            <div className="print-skills-grid">
              {[
                ["LLM / AI Agents", "Multi-agent orchestration, MCP Protocol, CrewAI, LiteLLM (100+ providers), RAG, prompt engineering, PII scrubbing"],
                ["Vector / Embeddings", "pgvector, sqlite-vec, OpenAI embeddings, Transformers.js (MiniLM-L6-v2), semantic search"],
                ["Languages", "TypeScript, Python 3.12+, JavaScript (ES2024), SQL, Bash"],
                ["Backend", "Next.js 16, Express 5, FastAPI, Node.js 22, async-first Python"],
                ["Frontend", "React 19, Next.js App Router, Tailwind CSS 4, shadcn/ui, Framer Motion"],
                ["Databases", "PostgreSQL 16, MongoDB, Redis 7, SQLite, Drizzle ORM, Mongoose"],
                ["Cloud / DevOps", "AWS (S3, SES, CloudFront, Route 53, Lightsail), Docker, GitHub Actions, Caddy, CI/CD"],
                ["Security", "AES-256, RBAC + ABAC, JWT, OAuth 2.0, OWASP LLM Top 10, credential vaulting"],
                ["Observability", "OpenTelemetry, per-call LLM cost tracking, audit trails, Playwright E2E, Vitest, pytest"],
                ["Payments", "Stripe, Razorpay, subscription billing, fraud detection"],
              ].map(([label, value]) => (
                <div key={label} className="print-skill-row">
                  <span className="print-skill-label">{label}</span>
                  <span className="print-skill-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Print Projects */}
          <div className="print-section">
            <div className="print-section-title">AI Projects & Products</div>

            <PrintProject name="ShackleAI Platform — The Operating System for AI Agents" date="2025 – Present" subtitle="Founder & Principal Engineer | shackleai.com | github.com/shackleai/platform" tech="Next.js 16 · TypeScript · PostgreSQL + pgvector · Redis · Docker · MCP SDK · OpenTelemetry · Stripe · AWS" bullets={[
              `Architected ${stats.services} core microservices: Gateway, ToolCloud, Vault, Memory, Runtime, Identity, Governance, Observatory, Registry, Mesh, LLM Gateway`,
              "Built multi-engine agent orchestration (CrewAI + OpenClaw) with LLM-driven plan decomposition into sequential/parallel execution steps",
              "Designed LLM Gateway with multi-provider routing (OpenAI, Anthropic, Azure, Bedrock), budget enforcement, PII scrubbing, per-call cost tracking",
              "Implemented Vault for AES-256 encrypted credential storage with runtime injection into sandboxed agent containers",
              `Shipped ${stats.apiRoutes} API routes, 59 migrations, 367+ issues closed, ${stats.prs.merged} PRs merged, 213+ unit tests`,
              `Engineered AI-accelerated dev methodology: ${stats.agentCount}-agent ecosystem achieving 18 iterations in 3 days, 252 commits in 11 days`,
            ]} />

            <PrintProject name="@shackleai/memory-mcp — Persistent Memory for AI Coding Tools" date="2025 – Present" subtitle="Creator & Maintainer | Published on npm (MIT) | github.com/shackleai/memory-mcp" tech="TypeScript · MCP Protocol · SQLite + sqlite-vec · Transformers.js · Semantic Search · Vitest" bullets={[
              "Built the first MCP-native persistent memory server for AI coding assistants (Claude, Cursor, Windsurf, Copilot)",
              `Achieved ${fmt(stats.npm.weeklyDownloads)} weekly npm downloads with 11 MCP tools, zero-config setup, and fully offline embeddings`,
              "Semantic search via MiniLM-L6-v2 (384-dim) with sqlite-vec; project-scoped memory, TODO tracking, export/import, cloud sync",
            ]} />

            <PrintProject name="ShackleAI Agent Framework — Enterprise Python Orchestration" date="2025" subtitle="Architect & Lead Developer | Published on PyPI" tech="Python 3.12 · AsyncIO · LiteLLM · Pydantic v2 · FastAPI · SQLAlchemy · OpenTelemetry · pytest" bullets={[
              "Async-first multi-agent framework with sequential, parallel, and hierarchical execution modes",
              `LiteLLM integration for 100+ LLM providers with per-call cost tracking; ${fmt(stats.testCount)} tests at 97% coverage, 37 built-in tools`,
            ]} />

            <PrintProject name="WhatsApp AI Chat Platform — RAG-Powered Business Assistant" date="2025" tech="Node.js · Express · Next.js · PostgreSQL + pgvector · OpenAI · WhatsApp API · Razorpay" bullets={[
              "End-to-end SaaS: RAG over business catalogs, semantic FAQ, automated payments. 10 phases shipped with multi-tenant handling",
            ]} />

            <PrintProject name="Errakaaram — Production E-Commerce Platform" date="2024 – Present" tech="Next.js 15 · Express 5 · MongoDB · Redis · AWS · Razorpay · Docker" bullets={[
              "Live e-commerce: 29 data models, 124+ pages, 563 commits. Multi-role system, Razorpay payments, AWS S3 + CloudFront CDN",
            ]} />
          </div>
        </div>

        {/* Page 2 */}
        <div className="print-page print-page-break">
          <div className="print-section">
            <div className="print-section-title">Professional Experience</div>
            <PrintExp role="Principal Engineer" company="Nagarro" note="Global digital engineering (10,000+ employees)" date="2022 – Present" bullets={["Lead enterprise modernization for large-scale clients, architecting cloud-native and AI-driven platforms", "Drive technology strategy and hands-on engineering for complex distributed systems"]} />
            <PrintExp role="Service Delivery Lead" company="FIS (Fidelity National Information Services)" note="Fortune 500, global fintech leader" date="2019 – 2021" bullets={["Led enterprise automation and service delivery for banking and financial services clients", "Managed cross-functional teams delivering mission-critical fintech solutions at scale"]} />
            <PrintExp role="Managing Director, APAC" company="Softomotive" note="Acquired by Microsoft (2020) → Microsoft Power Automate" date="2017 – 2019" bullets={["Spearheaded APAC expansion for the RPA platform that became Microsoft Power Automate", "Built Fortune 500 client relationships across banking, retail, and pharma verticals", "Drove pre-acquisition growth that contributed to Microsoft's strategic acquisition"]} />
            <PrintExp role="SAP Technology Consultant" company="Deloitte" note="Big Four professional services" date="2012 – 2017" bullets={["SAP technology consulting for enterprise clients across BFSI, retail, oil & gas, and pharma", "Large-scale enterprise automation and digital transformation programs"]} />
            <PrintExp role="Engineer" company="BGR Energy Systems" note="Power & infrastructure engineering" date="2008 – 2010" bullets={["Engineering role in power systems and industrial automation"]} />
          </div>

          <div className="print-section">
            <div className="print-section-title">Enterprise Clients Served</div>
            <div className="print-brands"><b>Microsoft</b> · <b>Walmart</b> · <b>Flipkart</b> · <b>Axis Bank</b> · <b>Nedbank</b> · <b>Sanofi</b> · <b>Deloitte</b> · <b>Capgemini</b></div>
            <div className="print-domains">Domains: BFSI & Core Banking · Retail & E-Commerce · Oil & Gas · Pharma & Logistics · Automobile · Enterprise Automation</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Open Source</div>
            <div className="print-oss">
              <b className="print-oss-name">@shackleai/memory-mcp</b> — Persistent memory for AI coding tools (Claude, Cursor, Windsurf, Copilot)<br />
              <span className="print-oss-stats">npm | MIT License | <b>{fmt(stats.npm.weeklyDownloads)} weekly downloads</b> | 11 MCP tools | v{stats.npm.version} | Semantic search | Zero-config</span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Publications & Thought Leadership</div>
            <div className="print-pubs">
              <div><b>&ldquo;How I Built an MCP Server from Scratch&rdquo;</b> — Architecture deep-dive: MCP-native memory with SQLite + vector search <span className="print-muted">(2026)</span></div>
              <div><b>&ldquo;From RPA to AI Agents: 18 Years of Enterprise Automation&rdquo;</b> — Career perspective on the $20B+ automation market shift <span className="print-muted">(2026)</span></div>
              <div><b>&ldquo;17 AI Agents Shipping Code 24/7&rdquo;</b> — Multi-agent orchestration patterns, model selection, CI/CD as safety net <span className="print-muted">(2026)</span></div>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Education</div>
            <div className="print-edu"><b>MBA, Finance</b> (2010 – 2012) &nbsp;&nbsp;&nbsp;&nbsp; <b>B.E., Electronics & Instrumentation Engineering</b> (2004 – 2008)</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Key Metrics (Live & Verifiable)</div>
            <div className="print-metrics-bar">
              <div className="print-m-card"><div className="print-m-num">{stats.commits.total.toLocaleString()}+</div><div className="print-m-label">Git Commits</div></div>
              <div className="print-m-card"><div className="print-m-num">{stats.npm.weeklyDownloads.toLocaleString()}+</div><div className="print-m-label">Weekly npm Downloads</div></div>
              <div className="print-m-card"><div className="print-m-num">97%</div><div className="print-m-label">Test Coverage</div></div>
              <div className="print-m-card"><div className="print-m-num">{stats.linesOfCode.toLocaleString()}+</div><div className="print-m-label">Lines of Code</div></div>
              <div className="print-m-card"><div className="print-m-num">{stats.prs.merged}</div><div className="print-m-label">PRs Merged</div></div>
              <div className="print-m-card"><div className="print-m-num">367</div><div className="print-m-label">Issues Closed</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PRINT CSS ===== */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; margin: 0; padding: 0; }
          header, footer, nav, .fixed { display: none !important; }

          .print-page {
            width: 210mm; height: 297mm; padding: 14mm 18mm 12mm 18mm;
            font-family: 'Inter', -apple-system, sans-serif; font-size: 8.8pt; line-height: 1.4; color: #1a1a2e;
            overflow: hidden; background: white;
          }
          .print-page-break { page-break-before: always; break-before: page; }

          .print-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 2.5px solid #1a1a2e; }
          .print-name { font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; line-height: 1.1; margin: 0; }
          .print-title { font-size: 11pt; font-weight: 500; color: #4a5568; margin-top: 2px; }
          .print-contact { text-align: right; font-size: 8pt; color: #4a5568; line-height: 1.55; }

          .print-section { margin-bottom: 9px; }
          .print-section-title { font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 5px; padding-bottom: 2px; border-bottom: 1px solid #d1d5db; }
          .print-body { font-size: 8.8pt; color: #374151; line-height: 1.45; margin: 0; }

          .print-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px; }
          .print-skill-row { display: flex; gap: 6px; font-size: 8.5pt; line-height: 1.4; }
          .print-skill-label { font-weight: 600; white-space: nowrap; min-width: 108px; }
          .print-skill-value { color: #4a5568; }

          .print-project { margin-bottom: 8px; page-break-inside: avoid; }
          .print-project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px; }
          .print-project-name { font-size: 9.2pt; font-weight: 600; }
          .print-project-meta { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; }
          .print-project-subtitle { font-size: 8pt; color: #4a5568; font-style: italic; margin-bottom: 2px; }
          .print-project-tech { font-size: 7pt; color: #6b7280; margin-bottom: 2px; font-family: 'JetBrains Mono', monospace; }
          .print-project ul, .print-exp ul { padding-left: 13px; list-style: none; margin: 0; }
          .print-project li, .print-exp li { font-size: 8.5pt; color: #374151; margin-bottom: 1px; position: relative; padding-left: 1px; }
          .print-project li::before, .print-exp li::before { content: "\\2022"; position: absolute; left: -11px; color: #9ca3af; }

          .print-exp { margin-bottom: 7px; page-break-inside: avoid; }
          .print-exp-header { display: flex; justify-content: space-between; align-items: baseline; }
          .print-exp-role { font-size: 9.2pt; font-weight: 600; }
          .print-exp-date { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; }
          .print-exp-company { font-size: 8.5pt; color: #4a5568; margin-bottom: 1px; }
          .print-acq { font-size: 7pt; color: #9ca3af; }

          .print-brands { font-size: 8.5pt; color: #6b7280; }
          .print-brands b { color: #4a5568; }
          .print-domains { font-size: 7.5pt; color: #9ca3af; margin-top: 1px; }

          .print-oss { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 6px 10px; font-size: 8pt; color: #4a5568; }
          .print-oss-name { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: #2563eb; }
          .print-oss-stats { font-size: 7.5pt; color: #6b7280; }

          .print-pubs { font-size: 8.5pt; color: #374151; line-height: 1.5; }
          .print-muted { color: #9ca3af; }
          .print-edu { font-size: 9pt; }

          .print-metrics-bar { display: flex; gap: 6px; text-align: center; margin-top: 6px; }
          .print-m-card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px 3px; }
          .print-m-num { font-size: 12pt; font-weight: 700; }
          .print-m-label { font-size: 6.5pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; }
        }
      `}</style>
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

function PrintProject({ name, date, subtitle, tech, bullets }: {
  name: string; date: string; subtitle?: string; tech: string; bullets: string[];
}) {
  return (
    <div className="print-project">
      <div className="print-project-header">
        <span className="print-project-name">{name}</span>
        <span className="print-project-meta">{date}</span>
      </div>
      {subtitle && <div className="print-project-subtitle">{subtitle}</div>}
      <div className="print-project-tech">{tech}</div>
      <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
    </div>
  );
}

function PrintExp({ role, company, note, date, bullets }: {
  role: string; company: string; note: string; date: string; bullets: string[];
}) {
  return (
    <div className="print-exp">
      <div className="print-exp-header">
        <span className="print-exp-role">{role}</span>
        <span className="print-exp-date">{date}</span>
      </div>
      <div className="print-exp-company">{company} <span className="print-acq">— {note}</span></div>
      <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
    </div>
  );
}
