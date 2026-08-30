import React from "react";
import { MapPin, GraduationCap, Heart } from "lucide-react";
import { Modal } from "@/components/overlay/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { owner } from "@/data/site";

export const AboutPanel = ({ onClose }) => {
  return (
    <Modal onClose={onClose} testId="about-panel" title="About Me" maxWidth="max-w-3xl">
      <div className="grid gap-0 sm:grid-cols-[240px_1fr]">
        {/* Left: avatar */}
        <div className="relative flex flex-col items-center justify-center gap-4 bg-[#0b0f14] p-8 text-white">
          <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-[#2bb3b1] to-[#6faf7a] font-display text-4xl font-bold">
            {owner.avatarInitials}
          </div>
          <div className="text-center">
            <div className="font-display text-xl font-semibold">{owner.name}</div>
            <div className="font-mono-ui text-[11px] tracking-wide text-white/60">{owner.role}</div>
          </div>
        </div>

        {/* Right: content */}
        <div className="p-6 sm:p-8">
          <div className="mb-1 font-mono-ui text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-ocean)]">
            About Me
          </div>
          <p className="font-body text-sm leading-relaxed text-[color:var(--ui-text)]">{owner.bio}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-[color:var(--accent-ocean)]" />
              <div>
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">Location</div>
                <div className="font-body text-sm">{owner.location}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap size={16} className="mt-0.5 text-[color:var(--accent-ocean)]" />
              <div>
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">Education</div>
                <div className="font-body text-sm">{owner.education}</div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-widest text-[color:var(--ui-text-muted)]">
              <Heart size={13} /> Interests
            </div>
            <div className="flex flex-wrap gap-2">
              {owner.interests.map((i) => (
                <Badge key={i} variant="secondary" className="font-body">{i}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
