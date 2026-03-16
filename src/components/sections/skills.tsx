"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { SKILLS, AI_AGENTS } from "@/lib/constants";

const categoryKeys = Object.keys(SKILLS) as (keyof typeof SKILLS)[];

export function Skills() {
  return (
    <section
      id="skills"
      className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills &amp; Expertise
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Deep specialization in agentic AI systems — from architecture and LLM
            engineering to the operational layer that makes agents production-ready.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categoryKeys.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS[category].map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    className="cursor-default rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground transition-all duration-200 hover:scale-105 hover:border-primary/40 hover:shadow-sm hover:shadow-primary/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: catIdx * 0.1 + skillIdx * 0.04,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 17-Agent Ecosystem */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex rounded-lg bg-primary/10 p-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                My 17-Agent AI Development Team
              </h3>
              <p className="text-sm text-muted-foreground">
                Custom-built AI agents I designed and operate — each specializes in a domain, collectively shipping production code 24/7
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {AI_AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <span className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  {agent.model}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-card-foreground">
                    {agent.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate overflow-hidden">
                    {agent.domain}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
