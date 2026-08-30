import React, { useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { useGameStore } from "@/store/gameStore";
import { GameWorld } from "@/game/GameWorld";
import { IntroScreen } from "@/components/overlay/IntroScreen";
import { LoadingScreen } from "@/components/overlay/LoadingScreen";
import { Hud } from "@/components/overlay/Hud";
import { GameMenu } from "@/components/overlay/GameMenu";
import { OverlayRoot } from "@/components/overlay/OverlayRoot";
import { MobileControls } from "@/components/MobileControls";
import { playSound } from "@/lib/audio";
import { track, EVENTS } from "@/lib/analytics";
import { isTouchDevice } from "@/lib/webgl";

const PANEL_EVENT = {
  about: EVENTS.ABOUT_OPENED,
  experience: EVENTS.EXPERIENCE_OPENED,
  skills: EVENTS.SKILL_DISCOVERED,
};

export default function WorldPage() {
  const phase = useGameStore((s) => s.phase);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const controlsMode = useGameStore((s) => s.controlsMode);
  const setControlsMode = useGameStore((s) => s.setControlsMode);

  // Default to mobile controls on touch devices (first mount only)
  useEffect(() => {
    if (isTouchDevice()) setControlsMode("mobile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wire audio hook used across the game
  useEffect(() => {
    window.__walkfolioAudio = soundEnabled ? playSound : () => {};
    return () => { window.__walkfolioAudio = () => {}; };
  }, [soundEnabled]);

  const handleInteract = useCallback(() => {
    const s = useGameStore.getState();
    const nearby = s.nearbyInteractable;
    if (!nearby || s.activePanel) return;
    if (s.soundEnabled) playSound("interact");
    if (nearby.type === "project") {
      s.openPanel("project", { projectId: nearby.projectId });
      track(EVENTS.PROJECT_OPENED, { project: nearby.projectId });
    } else {
      s.openPanel(nearby.type);
      if (PANEL_EVENT[nearby.type]) track(PANEL_EVENT[nearby.type], {});
    }
  }, []);

  // Global keyboard: E to interact, Esc to toggle menu / close panels
  useEffect(() => {
    const onKey = (e) => {
      if (useGameStore.getState().phase !== "playing") return;
      if (e.code === "KeyE") {
        handleInteract();
      } else if (e.code === "Escape") {
        e.preventDefault();
        const s = useGameStore.getState();
        if (s.activePanel) s.closePanel();
        else s.setMenuOpen(!s.isMenuOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInteract]);

  const showWorld = phase === "loading" || phase === "playing";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#bfe6ff]">
      {showWorld && <GameWorld />}

      <AnimatePresence>{phase === "intro" && <IntroScreen key="intro" />}</AnimatePresence>
      <AnimatePresence>{phase === "loading" && <LoadingScreen key="loading" />}</AnimatePresence>

      {phase === "playing" && (
        <>
          <Hud />
          <GameMenu />
          <OverlayRoot />
          {controlsMode === "mobile" && <MobileControls onInteract={handleInteract} />}
        </>
      )}

      <Toaster position="top-center" theme="dark" />
    </div>
  );
}
