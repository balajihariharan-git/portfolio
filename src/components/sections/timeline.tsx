"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TIMELINE_ITEMS } from "@/lib/constants";

export function Timeline() {
  return (
    <section
      id="timeline"
      className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Journey
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Key milestones in building AI infrastructure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />
          <div className="absolute left-4 top-0 block h-full w-px bg-border md:hidden" />

          <div className="space-y-12">
            {TIMELINE_ITEMS.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background",
                      "md:left-1/2"
                    )}
                  />

                  {/* Content card */}
                  <div
                    className={cn(
                      "ml-10 md:ml-0 md:w-[calc(50%-2rem)]",
                      isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                    )}
                  >
                    <div className="rounded-xl border border-border bg-card p-5">
                      <span className="mb-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-base font-semibold text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
