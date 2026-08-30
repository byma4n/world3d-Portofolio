import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

const LINES = [
  "Welcome.",
  "This is my portfolio.",
  "But there's a small problem.",
  "You have to walk through it.",
];

export const IntroScreen = () => {
  const setPhase = useGameStore((s) => s.setPhase);
  const reduced = useGameStore((s) => s.reducedMotion);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("loading");
  };

  useEffect(() => {
    const perLine = reduced ? 700 : 1200;
    const timers = [];
    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setIndex(i + 1), perLine * (i + 1)));
    });
    timers.push(setTimeout(() => setReady(true), perLine * LINES.length + 300));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = () => {
      if (ready) finish();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#080b0f]"
      data-testid="intro-screen"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 45%, rgba(43,179,177,0.10), transparent 60%), radial-gradient(700px 500px at 70% 80%, rgba(240,138,107,0.08), transparent 55%)",
        }}
      />
      <div className="relative w-full max-w-3xl px-8">
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            {index > 0 && (
              <motion.h1
                key={index}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {LINES[index - 1]}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {ready && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={finish}
              data-testid="intro-press-any-key"
              className="mt-6 font-mono-ui text-sm tracking-widest text-[color:var(--accent-ocean)]"
            >
              PRESS ANY KEY TO BEGIN <span className="caret-blink">_</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={finish}
        data-testid="intro-skip-button"
        className="absolute bottom-6 right-6 font-mono-ui text-xs tracking-widest text-white/50 transition-colors hover:text-white"
      >
        SKIP ›
      </button>
    </div>
  );
};
