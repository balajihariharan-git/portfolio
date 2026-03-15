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
      "The Operating System for AI Agents — 11 microservices, 142 API routes, 367 issues closed, 142 PRs merged, 1,836 CI/CD workflow runs. LLM Gateway, Credential Vault, Agent Governance, Orchestrator, and MCP-native tool infrastructure.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Redis", "Docker", "MCP"],
    metric: "142",
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
    metric: "1,440+",
    metricLabel: "Weekly Downloads",
    links: {
      github: "https://github.com/shackleai/memory-mcp",
      npm: "https://www.npmjs.com/package/@shackleai/memory-mcp",
    },
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
    "17-Agent Claude Code Ecosystem",
    "Automated GitHub Issue Management",
    "AI-Driven Sprint Execution",
    "Rapid Iteration (18 iterations in 3 days)",
    "1,836 Automated CI/CD Runs",
    "367 Issues Resolved via Agents",
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
  { value: 928, label: "Commits Shipped", suffix: "+" },
  { value: 2000, label: "Tests Passing", suffix: "+" },
  { value: 97, label: "Test Coverage", suffix: "%" },
  { value: 1440, label: "Weekly npm Downloads", suffix: "+" },
  { value: 1836, label: "CI/CD Runs" },
  { value: 367, label: "Issues Closed" },
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
      "Published @shackleai/memory-mcp on npm \u2014 now 1,440+ weekly downloads globally",
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
    title: "AI-Accelerated Development",
    description:
      "Built 17-agent ecosystem \u2014 928+ commits, 142 PRs merged, 1,836 CI/CD runs, 367 issues closed",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Work With Me", href: "#work-with-me" },
  { label: "Open Source", href: "#open-source" },
  { label: "Contact", href: "#contact" },
];
