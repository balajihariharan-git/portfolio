"use client";

import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <a
      href="/api/auth/signout"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </a>
  );
}
