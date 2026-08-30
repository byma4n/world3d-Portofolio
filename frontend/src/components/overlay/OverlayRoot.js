import React from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { AboutPanel } from "@/components/overlay/panels/AboutPanel";
import { ProjectModal } from "@/components/overlay/panels/ProjectModal";
import { ContactPanel } from "@/components/overlay/panels/ContactPanel";
import { ExperiencePanel } from "@/components/overlay/panels/ExperiencePanel";
import { SkillsPanel } from "@/components/overlay/panels/SkillsPanel";
import { SettingsPanel } from "@/components/overlay/panels/SettingsPanel";

export const OverlayRoot = () => {
  const activePanel = useGameStore((s) => s.activePanel);
  const activeProjectId = useGameStore((s) => s.activeProjectId);
  const closePanel = useGameStore((s) => s.closePanel);

  return (
    <AnimatePresence>
      {activePanel === "about" && <AboutPanel key="about" onClose={closePanel} />}
      {activePanel === "project" && <ProjectModal key="project" projectId={activeProjectId} onClose={closePanel} />}
      {activePanel === "contact" && <ContactPanel key="contact" onClose={closePanel} />}
      {activePanel === "experience" && <ExperiencePanel key="experience" onClose={closePanel} />}
      {activePanel === "skills" && <SkillsPanel key="skills" onClose={closePanel} />}
      {activePanel === "settings" && <SettingsPanel key="settings" onClose={closePanel} />}
    </AnimatePresence>
  );
};
