import { NextResponse } from "next/server";

/**
 * Public API: /api/stats
 * Returns real-time portfolio stats from GitHub + npm.
 * Cached via Next.js ISR (revalidate every 1 hour).
 *
 * Set GITHUB_TOKEN env var for access to private repos.
 * Without it, private repo stats use static fallbacks.
 */

export const revalidate = 3600; // 1 hour ISR cache

interface RepoCommitInfo {
  repo: string;
  commits: number;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function githubHeaders(): HeadersInit {
  const h: HeadersInit = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) h.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

async function fetchJson<T>(url: string, headers?: HeadersInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: headers ?? {},
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRepoCommits(owner: string, repo: string): Promise<number> {
  const contributors = await fetchJson<Array<{ contributions: number }>>(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
    githubHeaders()
  );
  if (!contributors || !Array.isArray(contributors)) return 0;
  return contributors.reduce((sum, c) => sum + c.contributions, 0);
}

async function getMergedPRCount(owner: string, repo: string): Promise<number> {
  const data = await fetchJson<{ total_count: number }>(
    `https://api.github.com/search/issues?q=repo:${owner}/${repo}+is:pr+is:merged&per_page=1`,
    githubHeaders()
  );
  return data?.total_count ?? 0;
}

async function getNpmStats(pkg: string) {
  const [weeklyData, totalData, metaData] = await Promise.all([
    fetchJson<{ downloads: number }>(
      `https://api.npmjs.org/downloads/point/last-week/${pkg}`
    ),
    fetchJson<{ downloads: number }>(
      `https://api.npmjs.org/downloads/point/2024-01-01:2099-12-31/${pkg}`
    ),
    fetchJson<{ version: string }>(
      `https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`
    ),
  ]);

  return {
    weeklyDownloads: weeklyData?.downloads ?? 0,
    totalDownloads: totalData?.downloads ?? 0,
    version: metaData?.version ?? "0.5.2",
  };
}

export async function GET() {
  // Fetch all repo data in parallel
  const [
    platformCommits,
    orchestratorCommits,
    memoryMcpCommits,
    lendingCommits,
    portfolioCommits,
    platformPRs,
    orchestratorPRs,
    memoryMcpPRs,
    lendingPRs,
    portfolioPRs,
    npmStats,
    platformRepo,
  ] = await Promise.all([
    getRepoCommits("shackleai", "platform"),
    getRepoCommits("shackleai", "orchestrator"),
    getRepoCommits("shackleai", "memory-mcp"),
    getRepoCommits("shackleai", "lending-platform"),
    getRepoCommits("balajihariharan-git", "portfolio"),
    getMergedPRCount("shackleai", "platform"),
    getMergedPRCount("shackleai", "orchestrator"),
    getMergedPRCount("shackleai", "memory-mcp"),
    getMergedPRCount("shackleai", "lending-platform"),
    getMergedPRCount("balajihariharan-git", "portfolio"),
    getNpmStats("@shackleai/memory-mcp"),
    fetchJson<{ open_issues_count: number; stargazers_count: number }>(
      "https://api.github.com/repos/shackleai/platform",
      githubHeaders()
    ),
  ]);

  // Static fallbacks (updated 2026-03-24)
  const FALLBACK = {
    platform: { commits: 252, prs: 142 },
    orchestrator: { commits: 214, prs: 112 },
    memoryMcp: { commits: 31, prs: 1 },
    lending: { commits: 253, prs: 53 },
    portfolio: { commits: 46, prs: 4 },
    errakaaram: { commits: 563 },  // ekbx 180 + ekfx 383 (private, local-only count)
    issuesClosed: 659,
  };

  const repos: RepoCommitInfo[] = [
    { repo: "shackleai/platform", commits: platformCommits || FALLBACK.platform.commits },
    { repo: "shackleai/orchestrator", commits: orchestratorCommits || FALLBACK.orchestrator.commits },
    { repo: "shackleai/memory-mcp", commits: memoryMcpCommits || FALLBACK.memoryMcp.commits },
    { repo: "shackleai/lending-platform", commits: lendingCommits || FALLBACK.lending.commits },
    { repo: "balajihariharan-git/portfolio", commits: portfolioCommits || FALLBACK.portfolio.commits },
    { repo: "errakaaram/ekbx+ekfx", commits: FALLBACK.errakaaram.commits },  // private repos, static count
  ];

  const totalCommits = repos.reduce((sum, r) => sum + r.commits, 0);

  const totalPRs = (platformPRs || FALLBACK.platform.prs)
    + (orchestratorPRs || FALLBACK.orchestrator.prs)
    + (memoryMcpPRs || FALLBACK.memoryMcp.prs)
    + (lendingPRs || FALLBACK.lending.prs)
    + (portfolioPRs || FALLBACK.portfolio.prs);

  // Static counts (updated 2026-03-24)
  const staticStats = {
    linesOfCode: 83153,        // TypeScript LOC across all projects
    testCount: 7852,           // it()/test() calls across all projects
    testFiles: 115,            // .spec.ts/.test.ts files
    apiRoutes: 142,            // route.ts files in platform src/
    agentCount: 25,            // AI agent ecosystem (17 platform + 8 fintech)
    services: 11,              // ShackleAI platform services
    issuesClosed: FALLBACK.issuesClosed,
  };

  const stats = {
    commits: {
      total: totalCommits,
      repos,
    },
    prs: {
      merged: totalPRs,
    },
    npm: {
      package: "@shackleai/memory-mcp",
      ...npmStats,
    },
    github: {
      openIssues: platformRepo?.open_issues_count ?? 64,
      stars: platformRepo?.stargazers_count ?? 0,
    },
    ...staticStats,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
