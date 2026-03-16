"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import TerminalDemo from "@/components/ui/terminal-demo";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-73px)] items-center px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — Text content */}
        <motion.div
          className="flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 flex flex-wrap gap-2"
          >
            {["AI Solutions Architect", "LLM Engineer", "Founder"].map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Balaji Hariharan
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-3 text-xl text-muted-foreground sm:text-2xl"
          >
            I build production AI agent systems that enterprises trust
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            From multi-agent orchestration and LLM gateways to governance frameworks
            and MCP protocol servers — I design, build, and ship the complex AI
            infrastructure that moves agentic AI from prototype to production.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#work-with-me"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Work With Me
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Terminal */}
        <motion.div
          className="flex items-center overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <TerminalDemo />
        </motion.div>
      </div>
    </section>
  );
}
