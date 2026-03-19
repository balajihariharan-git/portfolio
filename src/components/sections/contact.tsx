"use client";

import { motion } from "framer-motion";
import { Mail, Github, Package, ArrowUpRight, Linkedin, FileText } from "lucide-react";

const LINKS = [
  {
    label: "Resume",
    href: "/resume",
    icon: FileText,
    desc: "Live stats, download PDF",
    color: "bg-primary/10 text-primary" as const,
    external: false,
  },
  {
    label: "ShackleAI Platform",
    href: "https://github.com/shackleai/platform",
    icon: Github,
    desc: "11-service agent OS",
    color: "bg-[#333]/10 text-[#e6edf3]" as const,
    external: true,
  },
  {
    label: "Memory MCP",
    href: "https://www.npmjs.com/package/@shackleai/memory-mcp",
    icon: Package,
    desc: "1,784+ downloads",
    color: "bg-red-500/10 text-red-400" as const,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/balajihariharan-git",
    icon: Github,
    desc: "Open source work",
    color: "bg-[#333]/10 text-[#e6edf3]" as const,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ibalajihariharan",
    icon: Linkedin,
    desc: "Professional network",
    color: "bg-blue-500/10 text-blue-400" as const,
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s Talk
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
              Hiring for an AI infrastructure role, need a specialist for agent
              projects, looking for a technical co-builder, or want hands-on AI
              workshops for your team — I&apos;d love to hear from you.
            </p>
          </div>

          {/* Email CTA — prominent, full-width on mobile */}
          <a
            href="mailto:contact@balajihariharan.com"
            className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-5 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 sm:px-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/20">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-primary-foreground/70">
                  Get in touch
                </div>
                <div className="text-base font-semibold text-primary-foreground">
                  contact@balajihariharan.com
                </div>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-primary-foreground/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* Link cards — grid, connected feel */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-5 text-center transition-all hover:border-primary/40 hover:shadow-md"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-card-foreground">
                    {link.label}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {link.desc}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
