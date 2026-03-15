"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";

const CAREER_HIGHLIGHTS = [
  {
    role: "Managing Director, APAC",
    company: "Softomotive",
    note: "Acquired by Microsoft → became Power Automate",
    highlight: true,
  },
  {
    role: "Principal Engineer",
    company: "Nagarro",
    note: "Enterprise application modernization",
    highlight: false,
  },
  {
    role: "Service Delivery Lead",
    company: "FIS",
    note: "Enterprise automation for BFSI production systems",
    highlight: false,
  },
  {
    role: "SAP Technology Consultant",
    company: "Deloitte",
    note: "Enterprise systems & process automation",
    highlight: false,
  },
];

const ENTERPRISE_BRANDS = [
  "Microsoft",
  "Walmart",
  "Flipkart",
  "Axis Bank",
  "Nedbank",
  "Sanofi",
  "Deloitte",
  "Capgemini",
];

const DOMAINS = [
  "BFSI & Core Banking",
  "Retail & E-Commerce",
  "Oil & Gas",
  "Pharma & Logistics",
  "Automobile",
  "Enterprise Automation",
];

export function Background() {
  return (
    <section id="background" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            18+ Years Before AI Agents
          </h2>
          <p className="mb-10 max-w-3xl text-base text-muted-foreground">
            From RPA to AI — I led the first wave of enterprise automation as
            Managing Director at Softomotive (acquired by Microsoft, became Power
            Automate). Now I&apos;m building the second wave: autonomous AI agents
            with governance, security, and enterprise trust built in.
          </p>
        </motion.div>

        {/* Career narrative */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.company}
              className={`rounded-xl border p-5 ${
                item.highlight
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-2 text-sm font-semibold text-foreground">
                {item.role}
              </div>
              <div className="mb-1 text-base font-bold text-primary">
                {item.company}
              </div>
              <div className="text-xs text-muted-foreground">{item.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Evolution arrow */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            RPA & Enterprise Automation
          </span>
          <ArrowRight className="h-5 w-5 text-primary rotate-90 sm:rotate-0" />
          <span className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            AI Agent Architecture
          </span>
        </motion.div>

        {/* Enterprise brands + domains */}
        <div className="grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Enterprise Clients
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {ENTERPRISE_BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Domain Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map((domain) => (
                <span
                  key={domain}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground"
                >
                  {domain}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
