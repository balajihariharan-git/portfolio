import { NextResponse } from "next/server";

/**
 * Public API: /api/stats
 * Returns real-time portfolio stats from GitHub + npm.
 * Cached via Next.js ISR (revalidate every 1 hour).
 */

export const revalidate = 3600; // 1 hour ISR cache

interface RepoCommitInfo {
  repo: string;
  commits: number;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRepoCommits(owner: string, repo: string): Promise<number> {
  // Use contributors endpoint to sum commits (public, no auth needed)
  const contributors = await fetchJson<Array<{ contributions: number }>>(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
  );
  if (!contributors || !Array.isArray(contributors)) return 0;
  return contributors.reduce((sum, c) => sum + c.contributions, 0);
}

async function getMergedPRCount(owner: string, repo: string): Promise<number> {
  const data = await fetchJson<{ total_count: number }>(
    `https://api.github.com/search/issues?q=repo:${owner}/${repo}+is:pr+is:merged&per_page=1`
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
    fetchJson<{ "dist-tags": { latest: string } }>(
      `https://registry.npmjs.org/${pkg}/latest`
    ),
  ]);

  return {
    weeklyDownloads: weeklyData?.downloads ?? 0,
    totalDownloads: totalData?.downloads ?? 0,
    version: metaData?.["dist-tags"]?.latest ?? (metaData as Record<string, string>)?.version ?? "0.0.0",
  };
}

export async function GET() {
  // Fetch all data in parallel
  const [
    platformCommits,
    memoryMcpCommits,
    portfolioCommits,
    mergedPRs,
    npmStats,
    platformRepo,
  ] = await Promise.all([
    getRepoCommits("shackleai", "platform"),
    getRepoCommits("shackleai", "memory-mcp"),
    getRepoCommits("balajihariharan-git", "portfolio"),
    getMergedPRCount("shackleai", "platform"),
    getNpmStats("@shackleai/memory-mcp"),
    fetchJson<{ open_issues_count: number; stargazers_count: number }>(
      "https://api.github.com/repos/shackleai/platform"
    ),
  ]);

  const repos: RepoCommitInfo[] = [
    { repo: "shackleai/platform", commits: platformCommits },
    { repo: "shackleai/memory-mcp", commits: memoryMcpCommits },
    { repo: "balajihariharan-git/portfolio", commits: portfolioCommits },
  ];

  const totalCommits = repos.reduce((sum, r) => sum + r.commits, 0);

  // Static counts (updated via deploy pipeline, verified from filesystem)
  const staticStats = {
    linesOfCode: 69707,        // TypeScript LOC across all projects
    testCount: 3622,           // it()/test() calls in shackleai/platform
    testFiles: 115,            // .spec.ts/.test.ts files
    apiRoutes: 142,            // route.ts files in platform src/
    agentCount: 17,            // Claude Code agent ecosystem
    services: 11,              // ShackleAI platform services
  };

  const stats = {
    commits: {
      total: totalCommits,
      repos,
    },
    prs: {
      merged: mergedPRs,
    },
    npm: {
      package: "@shackleai/memory-mcp",
      ...npmStats,
    },
    github: {
      openIssues: platformRepo?.open_issues_count ?? 0,
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
