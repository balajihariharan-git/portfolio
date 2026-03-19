"use client";

import { useState, useEffect } from "react";

interface NpmStats {
  weeklyDownloads: number | null;
  loading: boolean;
  error: string | null;
}

export function useNpmStats(packageName: string): NpmStats {
  const [stats, setStats] = useState<NpmStats>({
    weeklyDownloads: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch(
          `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`
        );
        if (!res.ok) throw new Error("Failed to fetch npm stats");
        const data = await res.json();
        if (!cancelled) {
          setStats({
            weeklyDownloads: data.downloads ?? null,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setStats({
            weeklyDownloads: 129,
            loading: false,
            error: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [packageName]);

  return stats;
}
