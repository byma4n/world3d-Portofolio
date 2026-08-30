import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

const MESSAGES = [
  "Building the world...",
  "Spawning character...",
  "Planting trees...",
  "Charging the creativity...",
  "Convincing JavaScript to behave...",
  "Warming up the fountain...",
  "Almost there...",
];

const DURATION = 2600; // ms

export const LoadingScreen = () => {
  const setPhase = useGameStore((s) => s.setPhase);
  const setLoadingProgress = useGameStore((s) => s.setLoadingProgress);
  const [displayed, setDisplayed] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const startRef = useRef(Date.now());
  const doneRef = useRef(false);

  useEffect(() => {
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      // easeOutCubic to 100 over DURATION
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);
      setDisplayed(pct);
      setLoadingProgress(pct);
      if (t >= 1 && !doneRef.current) {
        doneRef.current = true;
        setTimeout(() => setPhase("playing"), 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setLoadingProgress, setPhase]);

  useEffect(() => {
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % MESSAGES.length), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#080b0f]"
      data-testid="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(900px 600px at 50% 40%, rgba(43,179,177,0.12), transparent 60%)" }}
      />
      <div className="relative flex w-full max-w-md flex-col items-center px-8 text-center">
        <div className="mb-1 font-mono-ui text-[11px] tracking-[0.4em] text-[color:var(--accent-ocean)]">
          W A L K F O L I O
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight text-white">WALKFOLIO</h1>
        <p className="mt-2 font-body text-sm text-white/60">A portfolio you can walk through.</p>

        <div className="mt-8 w-full">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${displayed}%`, background: "linear-gradient(90deg,#2bb3b1,#6faf7a)" }}
              data-testid="loading-progress"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono-ui text-[11px] text-white/50" data-testid="loading-status-message">
              {MESSAGES[msgIndex]}
            </span>
            <span className="font-mono-ui text-[11px] text-white/70">{displayed}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
