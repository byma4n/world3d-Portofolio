import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, User, FolderKanban, TrainFront, Wrench, Coffee, FileText, Settings, LayoutGrid, X, Gamepad2 } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { contact } from "@/data/site";
import { track, EVENTS } from "@/lib/analytics";

export const GameMenu = () => {
  const isMenuOpen = useGameStore((s) => s.isMenuOpen);
  const setMenuOpen = useGameStore((s) => s.setMenuOpen);
  const openPanel = useGameStore((s) => s.openPanel);
  const reduced = useGameStore((s) => s.reducedMotion);
  const navigate = useNavigate();

  const go = (fn) => () => {
    fn();
  };

  const items = [
    { icon: Home, label: "Home", testid: "menu-home", action: () => setMenuOpen(false) },
    { icon: User, label: "About", testid: "menu-about", action: () => openPanel("about") },
    { icon: FolderKanban, label: "Projects", testid: "menu-projects", action: () => openPanel("project", { projectId: "creative-ecommerce" }) },
    { icon: TrainFront, label: "Experience", testid: "menu-experience", action: () => openPanel("experience") },
    { icon: Wrench, label: "Skills", testid: "menu-skills", action: () => openPanel("skills") },
    { icon: Coffee, label: "Contact", testid: "menu-contact", action: () => openPanel("contact") },
    { icon: FileText, label: "Resume", testid: "menu-resume", action: () => { track(EVENTS.RESUME_CLICKED, { from: "menu" }); window.open(contact.resumeUrl, "_blank"); } },
    { icon: Settings, label: "Settings", testid: "menu-settings", action: () => openPanel("settings") },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 z-[85]" data-testid="pause-menu">
          <motion.div
            className="absolute inset-0 bg-[rgba(11,15,20,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
          />
          <motion.aside
            className="glass-strong absolute left-0 top-0 flex h-full w-full max-w-sm flex-col p-6"
            initial={reduced ? { opacity: 0 } : { x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="font-display text-2xl font-bold tracking-tight">WALKFOLIO</div>
                <div className="font-mono-ui text-[11px] tracking-wide text-[color:var(--ui-text-muted)]">Paused</div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                data-testid="pause-menu-close"
                className="grid h-9 w-9 place-items-center rounded-full bg-black/5 transition-colors hover:bg-black/10"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto thin-scroll">
              {items.map((it) => (
                <button
                  key={it.label}
                  onClick={go(it.action)}
                  data-testid={it.testid}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-left font-display font-medium transition-colors hover:bg-black/5"
                >
                  <it.icon size={18} className="text-[color:var(--accent-ocean)]" />
                  {it.label}
                </button>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-2 border-t border-[color:var(--ui-border-2)] pt-4">
              <button
                onClick={() => { track(EVENTS.TWO_D_MODE_OPENED, {}); navigate("/portfolio"); }}
                data-testid="pause-menu-normal-portfolio"
                className="flex items-center gap-3 rounded-xl bg-[#0b0f14] px-3 py-3 text-left font-display font-medium text-white transition-transform hover:-translate-y-px"
              >
                <LayoutGrid size={18} /> View Normal Portfolio
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                data-testid="pause-menu-back-to-world"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-left font-display font-medium transition-colors hover:bg-black/5"
              >
                <Gamepad2 size={18} className="text-[color:var(--accent-ocean)]" /> Back to World
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
