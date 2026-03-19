import { NextResponse } from "next/server";

/**
 * GET /api/resume
 * Returns a standalone HTML resume page with live stats.
 * Opens in new tab — user prints to PDF via Ctrl+P / Cmd+P.
 * No Tailwind, no Next.js layout — clean A4 print output.
 */

export const revalidate = 3600;

interface Stats {
  commits: { total: number };
  prs: { merged: number };
  npm: { weeklyDownloads: number; version: string };
  linesOfCode: number;
  testCount: number;
  apiRoutes: number;
  agentCount: number;
  services: number;
}

async function getStats(): Promise<Stats> {
  const fallback: Stats = {
    commits: { total: 1100 },
    prs: { merged: 241 },
    npm: { weeklyDownloads: 1784, version: "0.5.2" },
    linesOfCode: 83153,
    testCount: 7852,
    apiRoutes: 142,
    agentCount: 25,
    services: 11,
  };

  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://balajihariharan.com";
    const res = await fetch(`${base}/api/stats`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      return { ...fallback, ...data };
    }
  } catch { /* use fallback */ }

  return fallback;
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+`;
  return `${n.toLocaleString()}+`;
}

export async function GET() {
  const s = await getStats();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Balaji Hariharan - AI Solutions Architect & LLM Engineer</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  body { font-family: 'Inter', -apple-system, sans-serif; font-size: 8.8pt; line-height: 1.4; color: #1a1a2e; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 14mm 18mm 12mm 18mm; margin: 0 auto; position: relative; overflow: hidden; }
  .page-break { page-break-before: always; break-before: page; }

  /* Print toolbar */
  .toolbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: #1a1a2e; color: #fff; padding: 10px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
  .toolbar a { color: #93c5fd; text-decoration: none; }
  .toolbar button { background: #2563eb; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
  .toolbar button:hover { background: #1d4ed8; }
  @media print { .toolbar { display: none !important; } .page { margin: 0; } body { background: white; } }
  @media screen { body { background: #e5e7eb; padding-top: 52px; } .page { box-shadow: 0 2px 12px rgba(0,0,0,0.15); margin-bottom: 24px; } }

  /* Header */
  .header { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 2.5px solid #1a1a2e; display: flex; justify-content: space-between; align-items: flex-start; }
  .header h1 { font-size: 24pt; font-weight: 700; letter-spacing: -0.5px; color: #1a1a2e; line-height: 1.1; }
  .title { font-size: 11pt; font-weight: 500; color: #4a5568; margin-top: 2px; }
  .header-right { text-align: right; font-size: 8pt; color: #4a5568; line-height: 1.55; }
  .header-right a { color: #2563eb; text-decoration: none; }

  /* Sections */
  .section { margin-bottom: 9px; }
  .section-title { font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #1a1a2e; margin-bottom: 5px; padding-bottom: 2px; border-bottom: 1px solid #d1d5db; }
  .summary { font-size: 8.8pt; color: #374151; line-height: 1.45; }
  .summary strong { color: #1a1a2e; }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px; }
  .skill-row { display: flex; gap: 6px; font-size: 8.5pt; line-height: 1.4; }
  .skill-label { font-weight: 600; color: #1a1a2e; white-space: nowrap; min-width: 108px; }
  .skill-value { color: #4a5568; }

  /* Projects */
  .project { margin-bottom: 8px; }
  .project-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px; }
  .project-name { font-size: 9.2pt; font-weight: 600; color: #1a1a2e; }
  .project-meta { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; }
  .project-subtitle { font-size: 8pt; color: #4a5568; font-style: italic; margin-bottom: 2px; }
  .project-tech { font-size: 7pt; color: #6b7280; margin-bottom: 2px; font-family: 'JetBrains Mono', monospace; }
  .project ul, .exp-item ul { padding-left: 13px; list-style-type: none; margin: 0; }
  .project ul li, .exp-item ul li { font-size: 8.5pt; color: #374151; margin-bottom: 1px; position: relative; padding-left: 1px; }
  .project ul li::before, .exp-item ul li::before { content: "\\2022"; position: absolute; left: -11px; color: #9ca3af; }
  .metric { font-weight: 600; color: #1a1a2e; }

  /* Experience */
  .exp-item { margin-bottom: 7px; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
  .exp-role { font-size: 9.2pt; font-weight: 600; color: #1a1a2e; }
  .exp-date { font-size: 7.5pt; color: #6b7280; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
  .exp-company { font-size: 8.5pt; color: #4a5568; margin-bottom: 1px; }
  .exp-company .acq { font-size: 7pt; color: #9ca3af; }

  /* Other */
  .edu-grid { display: flex; gap: 24px; }
  .edu-degree { font-size: 9pt; font-weight: 600; color: #1a1a2e; }
  .edu-detail { font-size: 8pt; color: #6b7280; }
  .brands { font-size: 8.5pt; color: #6b7280; }
  .brands strong { color: #4a5568; }
  .oss-highlight { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 6px 10px; }
  .oss-name { font-family: 'JetBrains Mono', monospace; font-size: 9pt; font-weight: 600; color: #2563eb; }
  .oss-desc { font-size: 8pt; color: #4a5568; }
  .oss-stats { font-size: 7.5pt; color: #6b7280; margin-top: 1px; }
  .oss-stats .metric { color: #1a1a2e; font-weight: 600; }
  .pubs { font-size: 8.5pt; color: #374151; line-height: 1.5; }
  .pubs strong { color: #1a1a2e; }
  .date-muted { color: #9ca3af; }
  .metrics-bar { display: flex; justify-content: space-between; gap: 6px; text-align: center; margin-top: 6px; }
  .m-card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px 3px; }
  .m-num { font-size: 12pt; font-weight: 700; color: #1a1a2e; }
  .m-label { font-size: 6.5pt; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; }

  .project, .exp-item { page-break-inside: avoid; break-inside: avoid; }
</style>
</head>
<body>

<div class="toolbar">
  <div><a href="/resume">&larr; Back to Resume</a> &nbsp;&middot;&nbsp; <span style="color:#94a3b8">Stats updated live from GitHub &amp; npm</span></div>
  <button onclick="window.print()">&#8681; Save as PDF (Ctrl+P)</button>
</div>

<!-- PAGE 1 -->
<div class="page">
  <div class="header">
    <div>
      <h1>Balaji Hariharan</h1>
      <div class="title">AI Solutions Architect &amp; LLM Engineer</div>
    </div>
    <div class="header-right">
      <div>Bangalore, India</div>
      <div><a href="mailto:contact@balajihariharan.com">contact@balajihariharan.com</a></div>
      <div><a href="https://balajihariharan.com">balajihariharan.com</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/ibalajihariharan">linkedin.com/in/ibalajihariharan</a></div>
      <div><a href="https://github.com/shackleai">github.com/shackleai</a></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Summary</div>
    <div class="summary">
      AI Solutions Architect and LLM Engineer with <strong>18+ years</strong> of enterprise experience spanning RPA, automation, and AI agent infrastructure. Currently building <strong>ShackleAI</strong> &mdash; an Operating System for AI Agents with ${s.services} microservices, multi-agent orchestration, and enterprise governance. Published open-source MCP server with <strong>${fmt(s.npm.weeklyDownloads)} weekly npm downloads</strong>. Former <strong>Managing Director, APAC at Softomotive</strong> (acquired by Microsoft &rarr; Power Automate). Delivered enterprise solutions for <strong>Microsoft, Walmart, Flipkart, Deloitte, Axis Bank, Sanofi, Capgemini</strong>. Deep expertise in LLM pipelines, RAG, vector search, multi-provider routing, agent orchestration, and production AI infrastructure.
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <div class="skill-row"><span class="skill-label">LLM / AI Agents</span><span class="skill-value">Multi-agent orchestration, MCP Protocol, CrewAI, LiteLLM (100+ providers), RAG, prompt engineering, PII scrubbing</span></div>
      <div class="skill-row"><span class="skill-label">Vector / Embeddings</span><span class="skill-value">pgvector, sqlite-vec, OpenAI embeddings, Transformers.js (MiniLM-L6-v2), semantic search</span></div>
      <div class="skill-row"><span class="skill-label">Languages</span><span class="skill-value">TypeScript, Python 3.12+, JavaScript (ES2024), SQL, Bash</span></div>
      <div class="skill-row"><span class="skill-label">Backend</span><span class="skill-value">Next.js 16, Express 5, FastAPI, Node.js 22, async-first Python</span></div>
      <div class="skill-row"><span class="skill-label">Frontend</span><span class="skill-value">React 19, Next.js App Router, Tailwind CSS 4, shadcn/ui, Framer Motion</span></div>
      <div class="skill-row"><span class="skill-label">Databases</span><span class="skill-value">PostgreSQL 16, MongoDB, Redis 7, SQLite, Drizzle ORM, Mongoose</span></div>
      <div class="skill-row"><span class="skill-label">Cloud / DevOps</span><span class="skill-value">AWS (S3, SES, CloudFront, Route 53, Lightsail), Docker, GitHub Actions, Caddy, CI/CD</span></div>
      <div class="skill-row"><span class="skill-label">Security</span><span class="skill-value">AES-256, RBAC + ABAC, JWT, OAuth 2.0, OWASP LLM Top 10, credential vaulting</span></div>
      <div class="skill-row"><span class="skill-label">Observability</span><span class="skill-value">OpenTelemetry, per-call LLM cost tracking, audit trails, Playwright E2E, Vitest, pytest</span></div>
      <div class="skill-row"><span class="skill-label">Payments</span><span class="skill-value">Stripe, Razorpay, subscription billing, fraud detection</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">AI Projects &amp; Products</div>
    <div class="project">
      <div class="project-header"><span class="project-name">ShackleAI Platform &mdash; The Operating System for AI Agents</span><span class="project-meta">2025 &ndash; Present</span></div>
      <div class="project-subtitle">Founder &amp; Principal Engineer &nbsp;|&nbsp; shackleai.com &nbsp;|&nbsp; github.com/shackleai/platform</div>
      <div class="project-tech">Next.js 16 &middot; TypeScript &middot; PostgreSQL + pgvector &middot; Redis &middot; Docker &middot; MCP SDK &middot; OpenTelemetry &middot; Stripe &middot; AWS</div>
      <ul>
        <li>Architected <span class="metric">${s.services} core microservices</span>: Gateway, ToolCloud, Vault, Memory, Runtime, Identity, Governance, Observatory, Registry, Mesh, LLM Gateway</li>
        <li>Built multi-engine agent orchestration (CrewAI + OpenClaw) with LLM-driven plan decomposition into sequential/parallel execution steps</li>
        <li>Designed LLM Gateway with multi-provider routing (OpenAI, Anthropic, Azure, Bedrock), budget enforcement, PII scrubbing, per-call cost tracking</li>
        <li>Implemented Vault for AES-256 encrypted credential storage with runtime injection into sandboxed agent containers</li>
        <li>Shipped <span class="metric">${s.apiRoutes} API routes</span>, <span class="metric">59 migrations</span>, <span class="metric">539+ issues closed</span>, <span class="metric">241+ PRs merged</span>, <span class="metric">213+ unit tests</span></li>
        <li>Engineered AI-accelerated dev methodology: <span class="metric">${s.agentCount}-agent ecosystem</span> achieving 18 iterations in 3 days, 252 commits in 11 days</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">@shackleai/memory-mcp &mdash; Persistent Memory for AI Coding Tools</span><span class="project-meta">2025 &ndash; Present</span></div>
      <div class="project-subtitle">Creator &amp; Maintainer &nbsp;|&nbsp; Published on npm (MIT) &nbsp;|&nbsp; github.com/shackleai/memory-mcp</div>
      <div class="project-tech">TypeScript &middot; MCP Protocol &middot; SQLite + sqlite-vec &middot; Transformers.js &middot; Semantic Search &middot; Vitest</div>
      <ul>
        <li>Built the first MCP-native persistent memory server for AI coding assistants (Claude, Cursor, Windsurf, Copilot)</li>
        <li>Achieved <span class="metric">${fmt(s.npm.weeklyDownloads)} weekly npm downloads</span> with 11 MCP tools, zero-config setup, and fully offline embeddings</li>
        <li>Semantic search via MiniLM-L6-v2 (384-dim) with sqlite-vec; project-scoped memory, TODO tracking, export/import, cloud sync</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">@shackleai/orchestrator &mdash; Open-Source Agent Orchestrator</span><span class="project-meta">2026 &ndash; Present</span></div>
      <div class="project-subtitle">Creator &amp; Lead Developer &nbsp;|&nbsp; Published on npm (MIT) &nbsp;|&nbsp; github.com/shackleai/orchestrator</div>
      <div class="project-tech">TypeScript &middot; MCP Protocol &middot; PostgreSQL &middot; Docker &middot; npm Monorepo</div>
      <ul>
        <li>Open-source multi-agent orchestrator with MCP-native tool infrastructure, 46 PRs merged across 3 milestones</li>
        <li>Multi-package monorepo (@shackleai/orchestrator, @shackleai/core, @shackleai/db, @shackleai/shared)</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">ShackleAI Lending Platform &mdash; Enterprise Banking Demo</span><span class="project-meta">2026 &ndash; Present</span></div>
      <div class="project-subtitle">Architect &amp; Lead Developer</div>
      <div class="project-tech">TypeScript &middot; Java &middot; Spring Boot &middot; Next.js &middot; PostgreSQL &middot; Python &middot; Docker</div>
      <ul>
        <li>Enterprise personal loan platform with ML credit scoring, fraud detection, document AI &mdash; 253 commits, 106 issues closed</li>
        <li>8 specialized banking agents (Architect, Backend, Security, Data, Frontend, Docs, DevOps, QA)</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">ShackleAI Agent Framework &mdash; Enterprise Python Orchestration</span><span class="project-meta">2025</span></div>
      <div class="project-subtitle">Architect &amp; Lead Developer &nbsp;|&nbsp; Published on PyPI</div>
      <div class="project-tech">Python 3.12 &middot; AsyncIO &middot; LiteLLM &middot; Pydantic v2 &middot; FastAPI &middot; SQLAlchemy &middot; OpenTelemetry &middot; pytest</div>
      <ul>
        <li>Async-first multi-agent framework with sequential, parallel, and hierarchical execution modes</li>
        <li>LiteLLM integration for 100+ LLM providers with per-call cost tracking; <span class="metric">${fmt(s.testCount)} tests at 97% coverage</span>, 37 built-in tools</li>
      </ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">WhatsApp AI Chat Platform &mdash; RAG-Powered Business Assistant</span><span class="project-meta">2025</span></div>
      <div class="project-tech">Node.js &middot; Express &middot; Next.js &middot; PostgreSQL + pgvector &middot; OpenAI &middot; WhatsApp API &middot; Razorpay</div>
      <ul><li>End-to-end SaaS: RAG over business catalogs, semantic FAQ, automated payments. <span class="metric">10 phases</span> shipped with multi-tenant handling</li></ul>
    </div>
    <div class="project">
      <div class="project-header"><span class="project-name">Errakaaram &mdash; Production E-Commerce Platform</span><span class="project-meta">2024 &ndash; Present</span></div>
      <div class="project-tech">Next.js 15 &middot; Express 5 &middot; MongoDB &middot; Redis &middot; AWS &middot; Razorpay &middot; Docker</div>
      <ul><li>Live e-commerce: <span class="metric">29 data models</span>, <span class="metric">124+ pages</span>, <span class="metric">563 commits</span>. Multi-role system, Razorpay payments, AWS S3 + CloudFront CDN</li></ul>
    </div>
  </div>
</div>

<!-- PAGE 2 -->
<div class="page page-break">
  <div class="section">
    <div class="section-title">Professional Experience</div>
    <div class="exp-item"><div class="exp-header"><span class="exp-role">Principal Engineer</span><span class="exp-date">2022 &ndash; Present</span></div><div class="exp-company">Nagarro <span class="acq">&mdash; Global digital engineering (10,000+ employees)</span></div><ul><li>Lead enterprise modernization for large-scale clients, architecting cloud-native and AI-driven platforms</li><li>Drive technology strategy and hands-on engineering for complex distributed systems</li></ul></div>
    <div class="exp-item"><div class="exp-header"><span class="exp-role">Service Delivery Lead</span><span class="exp-date">2019 &ndash; 2021</span></div><div class="exp-company">FIS (Fidelity National Information Services) <span class="acq">&mdash; Fortune 500, global fintech leader</span></div><ul><li>Led enterprise automation and service delivery for banking and financial services clients</li><li>Managed cross-functional teams delivering mission-critical fintech solutions at scale</li></ul></div>
    <div class="exp-item"><div class="exp-header"><span class="exp-role">Managing Director, APAC</span><span class="exp-date">2017 &ndash; 2019</span></div><div class="exp-company">Softomotive <span class="acq">&mdash; Acquired by Microsoft (2020) &rarr; Microsoft Power Automate</span></div><ul><li>Spearheaded APAC expansion for the RPA platform that became Microsoft Power Automate</li><li>Built Fortune 500 client relationships across banking, retail, and pharma verticals</li><li>Drove pre-acquisition growth that contributed to Microsoft&rsquo;s strategic acquisition</li></ul></div>
    <div class="exp-item"><div class="exp-header"><span class="exp-role">SAP Technology Consultant</span><span class="exp-date">2012 &ndash; 2017</span></div><div class="exp-company">Deloitte <span class="acq">&mdash; Big Four professional services</span></div><ul><li>SAP technology consulting for enterprise clients across BFSI, retail, oil &amp; gas, and pharma</li><li>Large-scale enterprise automation and digital transformation programs</li></ul></div>
    <div class="exp-item"><div class="exp-header"><span class="exp-role">Engineer</span><span class="exp-date">2008 &ndash; 2010</span></div><div class="exp-company">BGR Energy Systems <span class="acq">&mdash; Power &amp; infrastructure engineering</span></div><ul><li>Engineering role in power systems and industrial automation</li></ul></div>
  </div>

  <div class="section">
    <div class="section-title">Enterprise Clients Served</div>
    <div class="brands"><strong>Microsoft</strong> &middot; <strong>Walmart</strong> &middot; <strong>Flipkart</strong> &middot; <strong>Axis Bank</strong> &middot; <strong>Nedbank</strong> &middot; <strong>Sanofi</strong> &middot; <strong>Deloitte</strong> &middot; <strong>Capgemini</strong><br><span style="font-size:7.5pt;color:#9ca3af">Domains: BFSI &amp; Core Banking &middot; Retail &amp; E-Commerce &middot; Oil &amp; Gas &middot; Pharma &amp; Logistics &middot; Automobile &middot; Enterprise Automation</span></div>
  </div>

  <div class="section">
    <div class="section-title">Open Source</div>
    <div class="oss-highlight"><span class="oss-name">@shackleai/memory-mcp</span> <span class="oss-desc">&mdash; Persistent memory for AI coding tools (Claude, Cursor, Windsurf, Copilot)</span><div class="oss-stats">npm &nbsp;|&nbsp; MIT License &nbsp;|&nbsp; <span class="metric">${fmt(s.npm.weeklyDownloads)} weekly downloads</span> &nbsp;|&nbsp; 11 MCP tools &nbsp;|&nbsp; v${s.npm.version} &nbsp;|&nbsp; Semantic search &nbsp;|&nbsp; Zero-config</div></div>
  </div>

  <div class="section">
    <div class="section-title">Publications &amp; Thought Leadership</div>
    <div class="pubs">
      <div><strong>&ldquo;How I Built an MCP Server from Scratch&rdquo;</strong> &mdash; Architecture deep-dive: MCP-native memory with SQLite + vector search <span class="date-muted">(2026)</span></div>
      <div><strong>&ldquo;From RPA to AI Agents: 18 Years of Enterprise Automation&rdquo;</strong> &mdash; Career perspective on the $20B+ automation market shift <span class="date-muted">(2026)</span></div>
      <div><strong>&ldquo;25 AI Agents Shipping Code 24/7&rdquo;</strong> &mdash; Multi-agent orchestration patterns, model selection, CI/CD as safety net <span class="date-muted">(2026)</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-grid">
      <div><div class="edu-degree">MBA, Finance</div><div class="edu-detail">2010 &ndash; 2012</div></div>
      <div><div class="edu-degree">B.E., Electronics &amp; Instrumentation Engineering</div><div class="edu-detail">2004 &ndash; 2008</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Key Metrics (Live &amp; Verifiable)</div>
    <div class="metrics-bar">
      <div class="m-card"><div class="m-num">${s.commits.total.toLocaleString()}+</div><div class="m-label">Git Commits</div></div>
      <div class="m-card"><div class="m-num">${s.npm.weeklyDownloads.toLocaleString()}+</div><div class="m-label">Weekly npm Downloads</div></div>
      <div class="m-card"><div class="m-num">97%</div><div class="m-label">Test Coverage</div></div>
      <div class="m-card"><div class="m-num">${s.linesOfCode.toLocaleString()}+</div><div class="m-label">Lines of Code</div></div>
      <div class="m-card"><div class="m-num">${s.prs.merged}</div><div class="m-label">PRs Merged</div></div>
      <div class="m-card"><div class="m-num">539+</div><div class="m-label">Issues Closed</div></div>
    </div>
  </div>
</div>

</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
