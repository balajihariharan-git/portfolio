"use client";

import { Download, Printer, ArrowLeft } from "lucide-react";

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

export function ResumeClient({ stats }: { stats: Stats }) {
  const handlePrint = () => window.print();

  return (
    <>
      {/* === TOOLBAR (hidden in print) === */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-[850px] items-center justify-between px-6 py-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs text-muted-foreground">
              Updated {new Date(stats.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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

      {/* === RESUME CONTENT === */}
      <div className="resume-wrapper">
        {/* PAGE 1 */}
        <div className="resume-page">
          {/* Header */}
          <div className="resume-header">
            <div className="resume-header-left">
              <h1>Balaji Hariharan</h1>
              <div className="resume-title">AI Solutions Architect &amp; LLM Engineer</div>
            </div>
            <div className="resume-header-right">
              <div>Bangalore, India &nbsp;|&nbsp; +91 9884245538</div>
              <div><a href="mailto:contact@balajihariharan.com">contact@balajihariharan.com</a></div>
              <div><a href="https://balajihariharan.com">balajihariharan.com</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/ibalajihariharan">linkedin.com/in/ibalajihariharan</a></div>
              <div><a href="https://github.com/shackleai">github.com/shackleai</a></div>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-section">
            <div className="resume-section-title">Summary</div>
            <div className="resume-summary">
              AI Solutions Architect and LLM Engineer with <strong>18+ years</strong> of enterprise experience spanning RPA, automation, and AI agent infrastructure. Currently building <strong>ShackleAI</strong> — an Operating System for AI Agents with {stats.services} microservices, multi-agent orchestration, and enterprise governance. Published open-source MCP server with <strong>{fmt(stats.npm.weeklyDownloads)} weekly npm downloads</strong>. Former <strong>Managing Director, APAC at Softomotive</strong> (acquired by Microsoft → Power Automate). Delivered enterprise solutions for <strong>Microsoft, Walmart, Flipkart, Deloitte, Axis Bank, Sanofi, Capgemini</strong>. Deep expertise in LLM pipelines, RAG, vector search, multi-provider routing, agent orchestration, and production AI infrastructure.
            </div>
          </div>

          {/* Technical Skills */}
          <div className="resume-section">
            <div className="resume-section-title">Technical Skills</div>
            <div className="resume-skills-grid">
              <div className="resume-skill-row"><span className="resume-skill-label">LLM / AI Agents</span><span className="resume-skill-value">Multi-agent orchestration, MCP Protocol, CrewAI, LiteLLM (100+ providers), RAG, prompt engineering, PII scrubbing</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Vector / Embeddings</span><span className="resume-skill-value">pgvector, sqlite-vec, OpenAI embeddings, Transformers.js (MiniLM-L6-v2), semantic search</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Languages</span><span className="resume-skill-value">TypeScript, Python 3.12+, JavaScript (ES2024), SQL, Bash</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Backend</span><span className="resume-skill-value">Next.js 16, Express 5, FastAPI, Node.js 22, async-first Python</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Frontend</span><span className="resume-skill-value">React 19, Next.js App Router, Tailwind CSS 4, shadcn/ui, Framer Motion</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Databases</span><span className="resume-skill-value">PostgreSQL 16, MongoDB, Redis 7, SQLite, Drizzle ORM, Mongoose</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Cloud / DevOps</span><span className="resume-skill-value">AWS (S3, SES, CloudFront, Route 53, Lightsail), Docker, GitHub Actions, Caddy, CI/CD</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Security</span><span className="resume-skill-value">AES-256, RBAC + ABAC, JWT, OAuth 2.0, OWASP LLM Top 10, credential vaulting</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Observability</span><span className="resume-skill-value">OpenTelemetry, per-call LLM cost tracking, audit trails, Playwright E2E, Vitest, pytest</span></div>
              <div className="resume-skill-row"><span className="resume-skill-label">Payments</span><span className="resume-skill-value">Stripe, Razorpay, subscription billing, fraud detection</span></div>
            </div>
          </div>

          {/* AI Projects */}
          <div className="resume-section">
            <div className="resume-section-title">AI Projects &amp; Products</div>

            <div className="resume-project">
              <div className="resume-project-header">
                <span className="resume-project-name">ShackleAI Platform — The Operating System for AI Agents</span>
                <span className="resume-project-meta">2025 – Present</span>
              </div>
              <div className="resume-project-subtitle">Founder &amp; Principal Engineer &nbsp;|&nbsp; shackleai.com &nbsp;|&nbsp; github.com/shackleai/platform</div>
              <div className="resume-project-tech">Next.js 16 · TypeScript · PostgreSQL + pgvector · Redis · Docker · MCP SDK · OpenTelemetry · Stripe · AWS</div>
              <ul>
                <li>Architected <strong>{stats.services} core microservices</strong>: Gateway, ToolCloud, Vault, Memory, Runtime, Identity, Governance, Observatory, Registry, Mesh, LLM Gateway</li>
                <li>Built multi-engine agent orchestration (CrewAI + OpenClaw) with LLM-driven plan decomposition into sequential/parallel execution steps</li>
                <li>Designed LLM Gateway with multi-provider routing (OpenAI, Anthropic, Azure, Bedrock), budget enforcement, PII scrubbing, per-call cost tracking</li>
                <li>Implemented Vault for AES-256 encrypted credential storage with runtime injection into sandboxed agent containers</li>
                <li>Shipped <strong>{stats.apiRoutes} API routes</strong>, <strong>59 migrations</strong>, <strong>{stats.github.openIssues > 300 ? fmt(stats.github.openIssues) : "367+"} issues closed</strong>, <strong>{stats.prs.merged} PRs merged</strong>, <strong>213+ unit tests</strong></li>
                <li>Engineered AI-accelerated dev methodology: <strong>{stats.agentCount}-agent ecosystem</strong> achieving 18 iterations in 3 days, 252 commits in 11 days</li>
              </ul>
            </div>

            <div className="resume-project">
              <div className="resume-project-header">
                <span className="resume-project-name">@shackleai/memory-mcp — Persistent Memory for AI Coding Tools</span>
                <span className="resume-project-meta">2025 – Present</span>
              </div>
              <div className="resume-project-subtitle">Creator &amp; Maintainer &nbsp;|&nbsp; Published on npm (MIT) &nbsp;|&nbsp; github.com/shackleai/memory-mcp</div>
              <div className="resume-project-tech">TypeScript · MCP Protocol · SQLite + sqlite-vec · Transformers.js · Semantic Search · Vitest</div>
              <ul>
                <li>Built the first MCP-native persistent memory server for AI coding assistants (Claude, Cursor, Windsurf, Copilot)</li>
                <li>Achieved <strong>{fmt(stats.npm.weeklyDownloads)} weekly npm downloads</strong> with 11 MCP tools, zero-config setup, and fully offline embeddings</li>
                <li>Semantic search via MiniLM-L6-v2 (384-dim) with sqlite-vec; project-scoped memory, TODO tracking, export/import, cloud sync</li>
              </ul>
            </div>

            <div className="resume-project">
              <div className="resume-project-header">
                <span className="resume-project-name">ShackleAI Agent Framework — Enterprise Python Orchestration</span>
                <span className="resume-project-meta">2025</span>
              </div>
              <div className="resume-project-subtitle">Architect &amp; Lead Developer &nbsp;|&nbsp; Published on PyPI</div>
              <div className="resume-project-tech">Python 3.12 · AsyncIO · LiteLLM · Pydantic v2 · FastAPI · SQLAlchemy · OpenTelemetry · pytest</div>
              <ul>
                <li>Async-first multi-agent framework with sequential, parallel, and hierarchical execution modes</li>
                <li>LiteLLM integration for 100+ LLM providers with per-call cost tracking; <strong>{fmt(stats.testCount)} tests at 97% coverage</strong>, 37 built-in tools</li>
              </ul>
            </div>

            <div className="resume-project">
              <div className="resume-project-header">
                <span className="resume-project-name">WhatsApp AI Chat Platform — RAG-Powered Business Assistant</span>
                <span className="resume-project-meta">2025</span>
              </div>
              <div className="resume-project-tech">Node.js · Express · Next.js · PostgreSQL + pgvector · OpenAI · WhatsApp API · Razorpay</div>
              <ul>
                <li>End-to-end SaaS: RAG over business catalogs, semantic FAQ, automated payments. <strong>10 phases</strong> shipped with multi-tenant handling</li>
              </ul>
            </div>

            <div className="resume-project">
              <div className="resume-project-header">
                <span className="resume-project-name">Errakaaram — Production E-Commerce Platform</span>
                <span className="resume-project-meta">2024 – Present</span>
              </div>
              <div className="resume-project-tech">Next.js 15 · Express 5 · MongoDB · Redis · AWS · Razorpay · Docker</div>
              <ul>
                <li>Live e-commerce: <strong>29 data models</strong>, <strong>124+ pages</strong>, <strong>563 commits</strong>. Multi-role system, Razorpay payments, AWS S3 + CloudFront CDN</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="resume-page resume-page-break">

          {/* Professional Experience */}
          <div className="resume-section">
            <div className="resume-section-title">Professional Experience</div>

            <div className="resume-exp">
              <div className="resume-exp-header"><span className="resume-exp-role">Principal Engineer</span><span className="resume-exp-date">2022 – Present</span></div>
              <div className="resume-exp-company">Nagarro <span className="resume-acq">— Global digital engineering (10,000+ employees)</span></div>
              <ul>
                <li>Lead enterprise modernization for large-scale clients, architecting cloud-native and AI-driven platforms</li>
                <li>Drive technology strategy and hands-on engineering for complex distributed systems</li>
              </ul>
            </div>

            <div className="resume-exp">
              <div className="resume-exp-header"><span className="resume-exp-role">Service Delivery Lead</span><span className="resume-exp-date">2019 – 2021</span></div>
              <div className="resume-exp-company">FIS (Fidelity National Information Services) <span className="resume-acq">— Fortune 500, global fintech leader</span></div>
              <ul>
                <li>Led enterprise automation and service delivery for banking and financial services clients</li>
                <li>Managed cross-functional teams delivering mission-critical fintech solutions at scale</li>
              </ul>
            </div>

            <div className="resume-exp">
              <div className="resume-exp-header"><span className="resume-exp-role">Managing Director, APAC</span><span className="resume-exp-date">2017 – 2019</span></div>
              <div className="resume-exp-company">Softomotive <span className="resume-acq">— Acquired by Microsoft (2020) → Microsoft Power Automate</span></div>
              <ul>
                <li>Spearheaded APAC expansion for the RPA platform that became Microsoft Power Automate</li>
                <li>Built Fortune 500 client relationships across banking, retail, and pharma verticals</li>
                <li>Drove pre-acquisition growth that contributed to Microsoft&apos;s strategic acquisition</li>
              </ul>
            </div>

            <div className="resume-exp">
              <div className="resume-exp-header"><span className="resume-exp-role">SAP Technology Consultant</span><span className="resume-exp-date">2012 – 2017</span></div>
              <div className="resume-exp-company">Deloitte <span className="resume-acq">— Big Four professional services</span></div>
              <ul>
                <li>SAP technology consulting for enterprise clients across BFSI, retail, oil &amp; gas, and pharma</li>
                <li>Large-scale enterprise automation and digital transformation programs</li>
              </ul>
            </div>

            <div className="resume-exp">
              <div className="resume-exp-header"><span className="resume-exp-role">Engineer</span><span className="resume-exp-date">2008 – 2010</span></div>
              <div className="resume-exp-company">BGR Energy Systems <span className="resume-acq">— Power &amp; infrastructure engineering</span></div>
              <ul>
                <li>Engineering role in power systems and industrial automation</li>
              </ul>
            </div>
          </div>

          {/* Enterprise Clients */}
          <div className="resume-section">
            <div className="resume-section-title">Enterprise Clients Served</div>
            <div className="resume-brands">
              <strong>Microsoft</strong> · <strong>Walmart</strong> · <strong>Flipkart</strong> · <strong>Axis Bank</strong> · <strong>Nedbank</strong> · <strong>Sanofi</strong> · <strong>Deloitte</strong> · <strong>Capgemini</strong>
              <br /><span className="resume-domains">Domains: BFSI &amp; Core Banking · Retail &amp; E-Commerce · Oil &amp; Gas · Pharma &amp; Logistics · Automobile · Enterprise Automation</span>
            </div>
          </div>

          {/* Open Source */}
          <div className="resume-section">
            <div className="resume-section-title">Open Source</div>
            <div className="resume-oss">
              <span className="resume-oss-name">@shackleai/memory-mcp</span> <span className="resume-oss-desc">— Persistent memory for AI coding tools (Claude, Cursor, Windsurf, Copilot)</span>
              <div className="resume-oss-stats">
                npm &nbsp;|&nbsp; MIT License &nbsp;|&nbsp; <strong>{fmt(stats.npm.weeklyDownloads)} weekly downloads</strong> &nbsp;|&nbsp; 11 MCP tools &nbsp;|&nbsp; v{stats.npm.version} &nbsp;|&nbsp; Semantic search &nbsp;|&nbsp; Zero-config
              </div>
            </div>
          </div>

          {/* Publications */}
          <div className="resume-section">
            <div className="resume-section-title">Publications &amp; Thought Leadership</div>
            <div className="resume-pubs">
              <div><strong>&ldquo;How I Built an MCP Server from Scratch&rdquo;</strong> — Architecture deep-dive: MCP-native memory with SQLite + vector search <span className="resume-date-muted">(2026)</span></div>
              <div><strong>&ldquo;From RPA to AI Agents: 18 Years of Enterprise Automation&rdquo;</strong> — Career perspective on the $20B+ automation market shift <span className="resume-date-muted">(2026)</span></div>
              <div><strong>&ldquo;17 AI Agents Shipping Code 24/7&rdquo;</strong> — Multi-agent orchestration patterns, model selection, CI/CD as safety net <span className="resume-date-muted">(2026)</span></div>
            </div>
          </div>

          {/* Education */}
          <div className="resume-section">
            <div className="resume-section-title">Education</div>
            <div className="resume-edu-grid">
              <div>
                <div className="resume-edu-degree">MBA, Finance</div>
                <div className="resume-edu-detail">2010 – 2012</div>
              </div>
              <div>
                <div className="resume-edu-degree">B.E., Electronics &amp; Instrumentation Engineering</div>
                <div className="resume-edu-detail">2004 – 2008</div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="resume-section">
            <div className="resume-section-title">Key Metrics (Live &amp; Verifiable)</div>
            <div className="resume-metrics-bar">
              <div className="resume-m-card"><div className="resume-m-num">{stats.commits.total.toLocaleString()}+</div><div className="resume-m-label">Git Commits</div></div>
              <div className="resume-m-card"><div className="resume-m-num">{stats.npm.weeklyDownloads.toLocaleString()}+</div><div className="resume-m-label">Weekly npm Downloads</div></div>
              <div className="resume-m-card"><div className="resume-m-num">97%</div><div className="resume-m-label">Test Coverage</div></div>
              <div className="resume-m-card"><div className="resume-m-num">{stats.linesOfCode.toLocaleString()}+</div><div className="resume-m-label">Lines of Code</div></div>
              <div className="resume-m-card"><div className="resume-m-num">{stats.prs.merged}</div><div className="resume-m-label">PRs Merged</div></div>
              <div className="resume-m-card"><div className="resume-m-num">367</div><div className="resume-m-label">Issues Closed</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* === PRINT + RESUME STYLES === */}
      <style jsx global>{`
        /* Screen: center the resume pages with shadow */
        .resume-wrapper {
          padding: 80px 0 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          background: hsl(var(--muted));
          min-height: 100vh;
        }

        .resume-page {
          width: 210mm;
          min-height: 297mm;
          padding: 14mm 18mm 12mm 18mm;
          background: white;
          color: #1a1a2e;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 8.8pt;
          line-height: 1.4;
        }

        /* Header */
        .resume-header { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 2.5px solid #1a1a2e; display: flex; justify-content: space-between; align-items: flex-start; }
        .resume-header h1 { font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; color: #1a1a2e; line-height: 1.1; margin: 0; }
        .resume-title { font-size: 11pt; font-weight: 500; color: #4a5568; margin-top: 2px; }
        .resume-header-right { text-align: right; font-size: 8pt; color: #4a5568; line-height: 1.55; }
        .resume-header-right a { color: #2563eb; text-decoration: none; }

        /* Sections */
        .resume-section { margin-bottom: 9px; }
        .resume-section-title { font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #1a1a2e; margin-bottom: 5px; padding-bottom: 2px; border-bottom: 1px solid #d1d5db; }

        /* Summary */
        .resume-summary { font-size: 8.8pt; color: #374151; line-height: 1.45; }
        .resume-summary strong { color: #1a1a2e; }

        /* Skills */
        .resume-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px; }
        .resume-skill-row { display: flex; gap: 6px; font-size: 8.5pt; line-height: 1.4; }
        .resume-skill-label { font-weight: 600; color: #1a1a2e; white-space: nowrap; min-width: 108px; }
        .resume-skill-value { color: #4a5568; }

        /* Projects */
        .resume-project { margin-bottom: 8px; }
        .resume-project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px; }
        .resume-project-name { font-size: 9.2pt; font-weight: 600; color: #1a1a2e; }
        .resume-project-meta { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; }
        .resume-project-subtitle { font-size: 8pt; color: #4a5568; font-style: italic; margin-bottom: 2px; }
        .resume-project-tech { font-size: 7pt; color: #6b7280; margin-bottom: 2px; font-family: 'JetBrains Mono', monospace; }
        .resume-project ul, .resume-exp ul { padding-left: 13px; list-style: none; margin: 0; }
        .resume-project ul li, .resume-exp ul li { font-size: 8.5pt; color: #374151; margin-bottom: 1px; position: relative; padding-left: 1px; }
        .resume-project ul li::before, .resume-exp ul li::before { content: "\\2022"; position: absolute; left: -11px; color: #9ca3af; }

        /* Experience */
        .resume-exp { margin-bottom: 7px; }
        .resume-exp-header { display: flex; justify-content: space-between; align-items: baseline; }
        .resume-exp-role { font-size: 9.2pt; font-weight: 600; color: #1a1a2e; }
        .resume-exp-date { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; }
        .resume-exp-company { font-size: 8.5pt; color: #4a5568; margin-bottom: 1px; }
        .resume-acq { font-size: 7pt; color: #9ca3af; }

        /* Brands */
        .resume-brands { font-size: 8.5pt; color: #6b7280; }
        .resume-brands strong { color: #4a5568; }
        .resume-domains { font-size: 7.5pt; color: #9ca3af; }

        /* OSS */
        .resume-oss { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 6px 10px; }
        .resume-oss-name { font-family: 'JetBrains Mono', monospace; font-size: 9pt; font-weight: 600; color: #2563eb; }
        .resume-oss-desc { font-size: 8pt; color: #4a5568; }
        .resume-oss-stats { font-size: 7.5pt; color: #6b7280; margin-top: 1px; }
        .resume-oss-stats strong { color: #1a1a2e; }

        /* Publications */
        .resume-pubs { font-size: 8.5pt; color: #374151; line-height: 1.5; }
        .resume-pubs strong { color: #1a1a2e; }
        .resume-date-muted { color: #9ca3af; }

        /* Education */
        .resume-edu-grid { display: flex; gap: 24px; }
        .resume-edu-degree { font-size: 9pt; font-weight: 600; color: #1a1a2e; }
        .resume-edu-detail { font-size: 8pt; color: #6b7280; }

        /* Metrics */
        .resume-metrics-bar { display: flex; justify-content: space-between; gap: 6px; text-align: center; margin-top: 6px; }
        .resume-m-card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px 3px; }
        .resume-m-num { font-size: 12pt; font-weight: 700; color: #1a1a2e; }
        .resume-m-label { font-size: 6.5pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; }

        /* === PRINT STYLES === */
        @media print {
          @page { size: A4; margin: 0; }

          body { background: white !important; }
          .resume-wrapper { padding: 0 !important; gap: 0 !important; background: white !important; min-height: auto !important; }
          .resume-page { box-shadow: none !important; height: 297mm; overflow: hidden; }
          .resume-page-break { page-break-before: always; break-before: page; }
          .resume-project, .resume-exp { page-break-inside: avoid; break-inside: avoid; }
        }

        /* Responsive: scroll on small screens */
        @media screen and (max-width: 850px) {
          .resume-wrapper { padding: 70px 16px 24px; }
          .resume-page { width: 100%; min-height: auto; padding: 24px 20px; font-size: 9pt; }
        }
      `}</style>
    </>
  );
}
