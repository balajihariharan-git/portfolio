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
  updatedAt: string;
}

async function fetchStats(): Promise<Stats> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/stats`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch {
    // fallback below
  }

  return {
    commits: { total: 1100 },
    prs: { merged: 241 },
    npm: { weeklyDownloads: 1784, totalDownloads: 8000, version: "0.5.2" },
    github: { openIssues: 539, stars: 0 },
    linesOfCode: 83153,
    testCount: 7852,
    apiRoutes: 142,
    agentCount: 25,
    services: 11,
    updatedAt: new Date().toISOString(),
  };
}

export default async function ResumePage() {
  const stats = await fetchStats();

  return <ResumeClient stats={stats} />;
}
