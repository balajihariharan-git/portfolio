import { Metadata } from "next";
import { ResumeClient } from "./resume-client";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Balaji Hariharan — AI Solutions Architect & LLM Engineer. 18+ years of enterprise experience. Download my resume with real-time project metrics.",
  robots: { index: true, follow: true },
};

export const revalidate = 3600; // ISR: regenerate every 1 hour

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
  issuesClosed: number;
  updatedAt: string;
}

async function fetchStats(): Promise<Stats> {
  // Use internal URL for server-side fetch (container can't reach itself via public URL)
  const internalUrl = `http://127.0.0.1:${process.env.PORT || 5000}`;

  try {
    const res = await fetch(`${internalUrl}/api/stats`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch {
    // fallback below
  }

  return {
    commits: { total: 1359 },
    prs: { merged: 312 },
    npm: { weeklyDownloads: 69, totalDownloads: 1853, version: "0.5.2" },
    github: { openIssues: 64, stars: 0 },
    linesOfCode: 83153,
    testCount: 7852,
    apiRoutes: 142,
    agentCount: 25,
    services: 11,
    issuesClosed: 659,
    updatedAt: new Date().toISOString(),
  };
}

export default async function ResumePage() {
  const stats = await fetchStats();

  return <ResumeClient stats={stats} />;
}
