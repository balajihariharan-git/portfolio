"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
}
