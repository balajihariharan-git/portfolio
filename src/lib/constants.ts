export interface Project {
  name: string;
  description: string;
  tech: string[];
  metric: string;
  metricLabel: string;
  links: {
    github?: string;
    live?: string;
    npm?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    name: "ShackleAI Platform",
    description:
      "The Operating System for AI Agents — 11 microservices, 142 API routes, 539+ issues closed, 241+ PRs merged, 1,971 CI/CD workflow runs. LLM Gateway, Credential Vault, Agent Governance, Orchestrator, and MCP-native tool infrastructure.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Redis", "Docker", "MCP"],
    metric: "241+",
    metricLabel: "PRs Shipped",
    links: {
      github: "https://github.com/shackleai/platform",
      live: "https://shackleai.com",
    },
  },
  {
    name: "@shackleai/memory-mcp",
    description:
      "Open-source persistent memory for AI coding tools. The first MCP-native memory server with semantic search, offline embeddings, and zero-config setup. Used by Claude Code, Cursor, and Windsurf developers worldwide.",
    tech: ["TypeScript", "MCP Protocol", "Embeddings", "sqlite-vec", "Transformers.js"],
    metric: "1,784+",
    metricLabel: "Total Downloads",
    links: {
      github: "https://github.com/shackleai/memory-mcp",
      npm: "https://www.npmjs.com/package/@shackleai/memory-mcp",
    },
  },
  {
    name: "ShackleAI Orchestrator",
    description:
      "Open-source multi-agent orchestrator for production workflows. MCP-native, PostgreSQL-backed, multi-package monorepo on npm. 102 commits, 46 PRs merged, 66 issues closed across 3 milestones.",
    tech: ["TypeScript", "MCP Protocol", "PostgreSQL", "Docker", "npm Monorepo"],
    metric: "46",
    metricLabel: "PRs Merged",
    links: {
      github: "https://github.com/shackleai/orchestrator",
      npm: "https://www.npmjs.com/package/@shackleai/orchestrator",
    },
  },
  {
    name: "ShackleAI FinServ Platform",
    description:
      "Open-source reference platform for banking and financial services. Multi-service Java + TypeScript architecture with ML-powered credit scoring, fraud detection, and document AI. 253 commits, 53 PRs, 106 issues closed with 8 specialized AI agents.",
    tech: ["TypeScript", "Java", "Spring Boot", "Next.js", "PostgreSQL", "Python", "Docker"],
    metric: "253",
    metricLabel: "Commits Shipped",
    links: {},
  },
  {
    name: "ShackleAI Agent Framework (PyPI)",
    description:
      "Enterprise-grade async-first Python agent orchestration on PyPI. 37 built-in tools, per-call cost tracking across 100+ LLM providers, PyArmor-protected releases. 2,000+ tests at 97% coverage across 117 test files.",
    tech: ["Python 3.12", "AsyncIO", "LiteLLM", "Pydantic v2", "FastAPI", "OpenTelemetry"],
    metric: "2,000+",
    metricLabel: "Tests at 97% Coverage",
    links: {
      npm: "https://pypi.org/project/shackle/",
    },
  },
  {
    name: "WhatsApp AI Chat Platform",
    description:
      "RAG-powered WhatsApp AI assistant for small businesses. Semantic search over business catalogs and FAQs, automated payment flows via Razorpay, action token parsing for escalation and order management. 10 development phases completed.",
    tech: ["Node.js", "Express", "Next.js", "PostgreSQL", "pgvector", "OpenAI", "WhatsApp API"],
    metric: "10",
    metricLabel: "Phases Shipped",
    links: {},
  },
  {
    name: "ShackleGuard",
    description:
      "\"Lighthouse for AI Agents\" — AI agent security and red-team testing platform. Automated prompt injection detection, jailbreak testing, PII leakage scanning, hallucination measurement, and EU AI Act compliance reporting. Currently in design phase.",
    tech: ["AI Security", "Red Teaming", "OWASP LLM Top 10", "Prompt Injection", "Compliance"],
    metric: "6",
    metricLabel: "Attack Categories",
    links: {},
  },
  {
    name: "Errakaaram",
    description:
      "Production e-commerce platform serving real customers. 29 data models, 124+ pages, device-adaptive routing, Razorpay payments, AWS S3/CloudFront CDN, 563 commits across frontend and backend, automated CI/CD deployment.",
    tech: ["Next.js", "Express", "MongoDB", "Redis", "AWS", "Razorpay"],
    metric: "563",
    metricLabel: "Commits Shipped",
    links: {
      live: "https://errakaaram.com",
      github: "https://github.com/errakaaram",
    },
  },
];

export const AI_AGENTS = [
  { name: "Platform Engineer", model: "Opus", domain: "Backend services, API routes, core logic" },
  { name: "Frontend Engineer", model: "Opus", domain: "Next.js, React, dashboard UI" },
  { name: "Database Architect", model: "Opus", domain: "PostgreSQL, pgvector, migrations" },
  { name: "Security Engineer", model: "Opus", domain: "Auth, RBAC, encryption, OWASP" },
  { name: "Code Reviewer", model: "Opus", domain: "Quality, patterns, architecture review" },
  { name: "Issue Architect", model: "Opus", domain: "Sprint planning, gap analysis, GitHub ops" },
  { name: "SEO Engineer", model: "Opus", domain: "Technical SEO, meta tags, JSON-LD" },
  { name: "API Designer", model: "Sonnet", domain: "REST/MCP protocol, OpenAPI specs" },
  { name: "DevOps Engineer", model: "Sonnet", domain: "Docker, CI/CD, VPS, deployment" },
  { name: "Test Engineer", model: "Sonnet", domain: "Vitest, Playwright, E2E, security tests" },
  { name: "QA Orchestrator", model: "Sonnet", domain: "Quality gates, lint/build/test validation" },
  { name: "Docs Writer", model: "Sonnet", domain: "API docs, user guides, runbooks" },
  { name: "Release Manager", model: "Sonnet", domain: "Versioning, changelogs, rollbacks" },
  { name: "Business Analyst", model: "Sonnet", domain: "Market research, pricing, positioning" },
  { name: "Content Strategist", model: "Sonnet", domain: "SEO keywords, content planning" },
  { name: "Ecosystem Auditor", model: "Sonnet", domain: "Health checks, velocity tracking" },
  { name: "UX Auditor", model: "Sonnet", domain: "Accessibility, responsive, usability" },
  { name: "FinTech Architect", model: "Opus", domain: "Financial system design, microservices, compliance" },
  { name: "FinTech Backend", model: "Opus", domain: "Java Spring Boot, API services, credit scoring" },
  { name: "FinTech Security", model: "Opus", domain: "PCI-DSS, data encryption, fraud prevention" },
  { name: "FinTech Data", model: "Sonnet", domain: "ML pipelines, risk models, analytics" },
  { name: "FinTech Frontend", model: "Sonnet", domain: "Next.js financial UI, dashboards, forms" },
  { name: "FinTech Docs", model: "Sonnet", domain: "Financial API docs, compliance documentation" },
  { name: "FinTech DevOps", model: "Sonnet", domain: "Java CI/CD, Docker, multi-service deploys" },
  { name: "FinTech QA", model: "Sonnet", domain: "Financial test suites, integration testing" },
];

export const SKILLS = {
  "Agent Architecture": [
    "Multi-Agent Orchestration",
    "MCP Protocol (built server from scratch)",
    "CrewAI / OpenClaw Integration",
    "Tool Calling & Function Execution",
    "Agent Governance (RBAC + ABAC)",
    "Pipeline Decomposition",
  ],
  "LLM Engineering": [
    "Multi-Provider Routing (OpenAI, Anthropic, Azure, Bedrock)",
    "RAG Pipelines",
    "Embedding Models (OpenAI, MiniLM-L6-v2)",
    "Vector Search (pgvector, sqlite-vec)",
    "LiteLLM (100+ providers)",
    "Prompt Engineering & Policy Enforcement",
  ],
  "AI Operational Layer": [
    "LLM Gateway (budget, metering, fallback)",
    "PII Detection & Scrubbing",
    "Per-Call Cost Tracking",
    "Credential Vault (AES-256, rotation, audit)",
    "Agent Observability (OpenTelemetry)",
    "Kill-Switch & Approval Workflows",
  ],
  "AI-Accelerated Development": [
    "25-Agent AI Ecosystem",
    "Automated GitHub Issue Management",
    "AI-Driven Sprint Execution",
    "Rapid Iteration (18 iterations in 3 days)",
    "1,971 Automated CI/CD Runs",
    "539+ Issues Resolved via Agents",
  ],
  "Platform Engineering": [
    "PostgreSQL + pgvector",
    "Redis",
    "Docker & Container Orchestration",
    "AWS (S3, SES, Route 53, Lightsail)",
    "CI/CD (GitHub Actions)",
    "Caddy (Reverse Proxy, Auto-SSL)",
  ],
  "Languages & Frameworks": [
    "TypeScript / Python",
    "Next.js / React 19",
    "FastAPI / Express",
    "Pydantic v2 / Zod",
    "Vitest / Playwright / pytest",
    "Async-First Architecture",
  ],
} as const;

export const STATS = [
  { value: 675, label: "Commits Shipped", suffix: "+" },
  { value: 7852, label: "Tests Passing", suffix: "+" },
  { value: 97, label: "Test Coverage", suffix: "%" },
  { value: 1784, label: "npm Downloads", suffix: "+" },
  { value: 1971, label: "CI/CD Runs" },
  { value: 539, label: "Issues Closed", suffix: "+" },
] as const;

export const TIMELINE_ITEMS = [
  {
    year: "2025",
    title: "Founded ShackleAI",
    description: "Started building the Operating System for AI Agents",
  },
  {
    year: "2025",
    title: "Launched Memory MCP",
    description:
      "Published @shackleai/memory-mcp on npm \u2014 now 1,784+ weekly downloads globally",
  },
  {
    year: "2025",
    title: "Built Agent Framework",
    description:
      "Python async-first orchestration on PyPI \u2014 2,000+ tests, 97% coverage, 37 built-in tools",
  },
  {
    year: "2025",
    title: "Shipped Chat Platform",
    description:
      "WhatsApp AI assistant with RAG \u2014 10 development phases completed",
  },
  {
    year: "2026",
    title: "V2 Platform Pivot",
    description:
      "Integrated OpenClaw + CrewAI for browser automation and multi-agent workflows",
  },
  {
    year: "2026",
    title: "Launched Orchestrator",
    description:
      "Open-source agent orchestrator on npm \u2014 102 commits, 46 PRs merged, multi-package monorepo",
  },
  {
    year: "2026",
    title: "Built FinServ Platform",
    description:
      "Open-source banking reference platform \u2014 253 commits, 53 PRs, 106 issues closed, 8 specialized AI agents",
  },
  {
    year: "2026",
    title: "AI-Accelerated Development",
    description:
      "Built 25-agent ecosystem \u2014 675+ commits, 241+ PRs merged, 1,971 CI/CD runs, 539+ issues closed",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  // { label: "Work With Me", href: "#work-with-me" },
  { label: "Open Source", href: "#open-source" },
  { label: "Contact", href: "#contact" },
];
