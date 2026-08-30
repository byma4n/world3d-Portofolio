import React from "react";
import { Modal } from "@/components/overlay/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";

export const ExperiencePanel = ({ onClose }) => {
  return (
    <Modal onClose={onClose} testId="experience-panel" title="Experience" maxWidth="max-w-2xl">
      <div className="p-6 sm:p-8">
        <div className="mb-1 font-mono-ui text-xs uppercase tracking-[0.18em] text-[color:var(--accent-ocean)]">
          Experience Station
        </div>
        <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Traveling through my career</h2>

        <div className="max-h-[52vh] overflow-y-auto pr-1 thin-scroll">
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 h-full w-px bg-[color:var(--ui-border-2)]" />
            {experience.map((e) => (
              <div key={e.id} className="relative mb-6 last:mb-0" data-testid="experience-item">
                <div className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[color:var(--accent-ocean)] shadow" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-lg font-semibold">{e.role}</span>
                  <span className="font-mono-ui text-xs text-[color:var(--ui-text-muted)]">{e.year} · {e.company}</span>
                </div>
                <p className="mt-1 font-body text-sm leading-relaxed text-[color:var(--ui-text)]">{e.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.technologies.map((t) => (
                    <Badge key={t} variant="secondary" className="font-body text-[11px]">{t}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
