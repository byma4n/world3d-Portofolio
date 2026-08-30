import React from "react";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { Modal } from "@/components/overlay/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject } from "@/data/projects";
import { track, EVENTS } from "@/lib/analytics";

export const ProjectModal = ({ projectId, onClose }) => {
  const project = getProject(projectId);
  if (!project) return null;

  return (
    <Modal onClose={onClose} testId="project-modal" title={project.title} maxWidth="max-w-2xl">
      {/* Hero image band */}
      <div
        className="relative h-40 w-full sm:h-48"
        style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}99)` }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-7xl font-bold text-white/25">{project.number}</span>
        </div>
        <div className="absolute bottom-3 left-5 font-mono-ui text-[11px] uppercase tracking-widest text-white/80">
          Project {project.number}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{project.title}</h2>
          <div className="font-mono-ui text-xs text-[color:var(--ui-text-muted)]">
            {project.year} · {project.role}
          </div>
        </div>

        <p className="mt-3 font-body text-sm leading-relaxed text-[color:var(--ui-text)]">
          {project.description}
        </p>

        <div className="mt-5">
          <div className="mb-2 font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">
            Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t} variant="secondary" className="font-body">{t}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            data-testid="project-live-demo-button"
            onClick={() => { track(EVENTS.DEMO_CLICKED, { project: project.id }); window.open(project.demoUrl, "_blank"); }}
            className="gap-2"
          >
            <ExternalLink size={16} /> Live Demo
          </Button>
          <Button
            variant="outline"
            data-testid="project-case-study-button"
            onClick={() => window.open(project.caseStudyUrl, "_blank")}
            className="gap-2"
          >
            <BookOpen size={16} /> Case Study
          </Button>
          <Button
            variant="ghost"
            data-testid="project-github-button"
            onClick={() => { track(EVENTS.GITHUB_CLICKED, { project: project.id }); window.open(project.githubUrl, "_blank"); }}
            className="gap-2"
          >
            <Github size={16} /> GitHub
          </Button>
        </div>
      </div>
    </Modal>
  );
};
