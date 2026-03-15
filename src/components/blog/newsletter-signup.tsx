"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, open mailto with the email as subject
    // Replace with Buttondown or custom API later
    window.open(`mailto:contact@balajihariharan.com?subject=Newsletter signup: ${email}`);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 p-6 text-center">
        <p className="font-semibold text-foreground">Thanks for subscribing!</p>
        <p className="mt-1 text-sm text-muted-foreground">You&apos;ll hear from me soon.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">Get notified of new posts</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
