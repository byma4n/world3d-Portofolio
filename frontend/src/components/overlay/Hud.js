import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { owner } from "@/data/site";
import { KbdHint } from "@/components/overlay/KbdHint";

export const Hud = () => {
  const setMenuOpen = useGameStore((s) => s.setMenuOpen);
  const nearby = useGameStore((s) => s.nearbyInteractable);
  const collectibles = useGameStore((s) => s.collectibles);
  const controlsMode = useGameStore((s) => s.controlsMode);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    const bump = () => {
      setIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdle(true), 3500);
    };
    bump();
    window.addEventListener("keydown", bump);
    window.addEventListener("pointermove", bump);
    window.addEventListener("pointerdown", bump);
    return () => {
      window.removeEventListener("keydown", bump);
      window.removeEventListener("pointermove", bump);
      window.removeEventListener("pointerdown", bump);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] select-none transition-opacity duration-500"
      style={{ opacity: idle ? 0.72 : 1 }}
      data-testid="game-hud"
    >
      {/* Top-left identity */}
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <div className="glass-dark pointer-events-auto rounded-[14px] px-4 py-2.5" data-testid="hud-player-identity">
          <div className="font-display text-sm font-semibold leading-tight">{owner.name}</div>
          <div className="font-mono-ui text-[11px] tracking-wide opacity-70">{owner.role}</div>
        </div>
      </div>

      {/* Top-right collectibles */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <div className="glass-dark rounded-[14px] px-3 py-2 font-mono-ui text-[11px] tracking-wide">
          ★ {collectibles.length} / 5
        </div>
      </div>

      {/* Bottom-left menu */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <button
          onClick={() => setMenuOpen(true)}
          data-testid="hud-menu-button"
          className="glass-dark pointer-events-auto flex items-center gap-2 rounded-[14px] px-4 py-2.5 text-sm transition-colors hover:bg-[rgba(11,15,20,0.7)]"
        >
          <Menu size={16} /> <span className="font-display font-medium">Menu</span>
        </button>
      </div>

      {/* Bottom-right controls */}
      {controlsMode === "desktop" && (
        <div className="absolute bottom-4 right-4 hidden sm:block sm:bottom-6 sm:right-6" data-testid="hud-controls">
          <div className="glass-dark flex flex-col gap-1.5 rounded-[14px] px-4 py-3">
            <KbdHint keys={["W", "A", "S", "D"]} label="Move" />
            <KbdHint keys={["Shift"]} label="Run" />
            <KbdHint keys={["Space"]} label="Jump" />
            <KbdHint keys={["E"]} label="Interact" />
            <KbdHint keys={["Esc"]} label="Menu" />
          </div>
        </div>
      )}

      {/* Center interaction prompt */}
      <AnimatePresence>
        {nearby && (
          <motion.div
            key={nearby.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-[62%] -translate-x-1/2"
            data-testid="interaction-prompt"
          >
            <div className="glass-dark prompt-pulse flex items-center gap-2.5 rounded-full px-4 py-2.5">
              <span className="kbd">E</span>
              <span className="font-display text-sm font-medium">{nearby.label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
