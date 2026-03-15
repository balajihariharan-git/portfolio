"use client";

import { motion } from "framer-motion";
import { Mail, Github, Package, ArrowUpRight } from "lucide-react";

const LINKS = [
  {
    label: "ShackleAI Platform",
    href: "https://github.com/shackleai/platform",
    icon: Github,
    desc: "11-service agent OS",
  },
  {
    label: "Memory MCP",
    href: "https://www.npmjs.com/package/@shackleai/memory-mcp",
    icon: Package,
    desc: "1,440+ weekly downloads",
  },
  {
    label: "GitHub",
    href: "https://github.com/balajihariharan-git",
    icon: Github,
    desc: "Personal projects",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Talk
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground">
            Whether you&apos;re hiring for an AI infrastructure role, need a
            freelance specialist for a complex agent project, looking for a
            technical co-builder for your AI startup, or want to bring hands-on
            AI workshops to your team — I&apos;d love to hear from you.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:contact@balajihariharan.com"
            className="mb-12 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Mail className="h-5 w-5" />
            contact@balajihariharan.com
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Links */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 text-sm transition-colors hover:border-primary/40 hover:bg-muted"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-card-foreground">{link.label}</div>
                  <div className="text-xs text-muted-foreground">{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
