"use client";

import { ExternalLink, Github, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card p-6",
        "transition-all duration-300",
        "hover:border-primary/40 hover:shadow-md"
      )}
    >
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          {project.name}
        </h3>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
          <span className="text-sm font-bold text-primary">
            {project.metric}
          </span>
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {project.metricLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.links.github || project.links.live || project.links.npm) && (
        <div className="flex items-center gap-3 border-t border-border pt-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${project.name} on GitHub`}
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${project.name} live site`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live</span>
            </a>
          )}
          {project.links.npm && (
            <a
              href={project.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${project.name} on npm`}
            >
              <Package className="h-4 w-4" />
              <span>npm</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
