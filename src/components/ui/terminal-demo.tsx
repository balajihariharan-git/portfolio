"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "muted" | "highlight";
}

function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}

function buildLines(stats: Stats | null): TerminalLine[] {
  if (!stats) {
    return [
      { text: "$ balaji stats --live", type: "command" },
      { text: "  Connecting to GitHub & npm...", type: "muted" },
    ];
  }

  return [
    { text: "$ balaji stats --live", type: "command" },
    { text: "", type: "output" },
    {
      text: `  Commits        ${formatNum(stats.commits.total).padStart(7)}  across ${stats.commits.repos.length} repos`,
      type: "output",
    },
    {
      text: `  Lines of code  ${formatNum(stats.linesOfCode).padStart(7)}  TypeScript`,
      type: "output",
    },
    {
      text: `  Tests          ${formatNum(stats.testCount).padStart(7)}  passing (${stats.testFiles} specs)`,
      type: "success",
    },
    {
      text: `  PRs merged     ${formatNum(stats.prs.merged).padStart(7)}  shipped to production`,
      type: "output",
    },
    {
      text: `  API routes     ${formatNum(stats.apiRoutes).padStart(7)}  registered`,
      type: "output",
    },
    { text: "", type: "output" },
    { text: "$ shackle ecosystem", type: "command" },
    {
      text: `  Agents         ${formatNum(stats.agentCount).padStart(7)}  autonomous workers`,
      type: "highlight",
    },
    {
      text: `  npm            ${stats.npm.version.padStart(7)}  @shackleai/memory-mcp`,
      type: "output",
    },
    {
      text: `  Downloads      ${formatNum(stats.npm.totalDownloads).padStart(7)}  total  (${formatNum(stats.npm.weeklyDownloads)}/wk)`,
      type: "output",
    },
    { text: "", type: "output" },
    { text: "  All systems operational", type: "success" },
  ];
}

interface Stats {
  commits: { total: number; repos: Array<{ repo: string; commits: number }> };
  prs: { merged: number };
  npm: { package: string; version: string; weeklyDownloads: number; totalDownloads: number };
  github: { openIssues: number; stars: number };
  linesOfCode: number;
  testCount: number;
  testFiles: number;
  apiRoutes: number;
  agentCount: number;
  services: number;
  updatedAt: string;
}

export default function TerminalDemo() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const fetchedRef = useRef(false);

  // Fetch live stats
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setVisibleLines(0); // restart animation with real data
      })
      .catch(() => {
        // Fallback static data
        setStats({
          commits: { total: 311, repos: [{ repo: "shackleai/platform", commits: 252 }, { repo: "shackleai/memory-mcp", commits: 31 }, { repo: "balajihariharan-git/portfolio", commits: 28 }] },
          prs: { merged: 142 },
          npm: { package: "@shackleai/memory-mcp", version: "0.5.2", weeklyDownloads: 157, totalDownloads: 1775 },
          github: { openIssues: 42, stars: 0 },
          linesOfCode: 69707,
          testCount: 3622,
          testFiles: 115,
          apiRoutes: 142,
          agentCount: 17,
          services: 11,
          updatedAt: new Date().toISOString(),
        });
      });
  }, []);

  const lines = buildLines(stats);

  // Animate lines one by one
  useEffect(() => {
    if (!stats) return;
    if (visibleLines >= lines.length) return;

    const line = lines[visibleLines];
    const delay = line?.type === "command" ? 500 : 100;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [stats, visibleLines, lines]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <div className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          terminal — live stats
        </span>
      </div>

      {/* Content */}
      <div className="overflow-hidden p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={`${i}-${line.text}`}
            className={cn(
              "whitespace-pre-wrap",
              line.type === "command" && "text-primary font-semibold",
              line.type === "output" && "text-[var(--code-text)]",
              line.type === "success" && "text-[var(--success)]",
              line.type === "muted" && "text-muted-foreground",
              line.type === "highlight" && "text-primary"
            )}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
        )}
      </div>
    </div>
  );
}
