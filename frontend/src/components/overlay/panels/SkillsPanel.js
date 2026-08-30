import React from "react";
import { Modal } from "@/components/overlay/GlassPanel";
import { skills } from "@/data/skills";

export const SkillsPanel = ({ onClose }) => {
  const categories = [...new Set(skills.map((s) => s.category))];
  return (
    <Modal onClose={onClose} testId="skills-panel" title="Skills" maxWidth="max-w-2xl">
      <div className="p-6 sm:p-8">
        <div className="mb-1 font-mono-ui text-xs uppercase tracking-[0.18em] text-[color:var(--accent-ocean)]">
          Skills Workshop
        </div>
        <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">The engine room</h2>

        <div className="max-h-[52vh] space-y-5 overflow-y-auto pr-1 thin-scroll">
          {categories.map((cat) => (
            <div key={cat}>
              <div className="mb-2 font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">{cat}</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {skills.filter((s) => s.category === cat).map((s) => (
                  <div
                    key={s.id}
                    data-testid="skills-tooltip"
                    className="flex items-start gap-3 rounded-xl border border-[color:var(--ui-border-2)] bg-white/50 p-3"
                  >
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span>
                      <span className="block font-display text-sm font-semibold">{s.name}</span>
                      <span className="block font-body text-xs leading-snug text-[color:var(--ui-text-muted)]">{s.blurb}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
