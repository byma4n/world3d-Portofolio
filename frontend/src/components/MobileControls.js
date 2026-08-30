import React, { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUp, Hand } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

// Touch joystick + jump + interact buttons.
export const MobileControls = ({ onInteract }) => {
  const setMobileMove = useGameStore((s) => s.setMobileMove);
  const setMobileJump = useGameStore((s) => s.setMobileJump);
  const nearby = useGameStore((s) => s.nearbyInteractable);
  const baseRef = useRef(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const activeId = useRef(null);

  const handleMove = useCallback(
    (clientX, clientY) => {
      const base = baseRef.current;
      if (!base) return;
      const rect = base.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const max = rect.width / 2;
      const dist = Math.hypot(dx, dy);
      if (dist > max) {
        dx = (dx / dist) * max;
        dy = (dy / dist) * max;
      }
      setKnob({ x: dx, y: dy });
      setMobileMove({ x: dx / max, y: dy / max });
    },
    [setMobileMove]
  );

  const start = (e) => {
    const t = e.changedTouches[0];
    activeId.current = t.identifier;
    handleMove(t.clientX, t.clientY);
  };
  const move = (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === activeId.current) handleMove(t.clientX, t.clientY);
    }
  };
  const end = (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === activeId.current) {
        activeId.current = null;
        setKnob({ x: 0, y: 0 });
        setMobileMove({ x: 0, y: 0 });
      }
    }
  };

  useEffect(() => () => setMobileMove({ x: 0, y: 0 }), [setMobileMove]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[65]" data-testid="mobile-controls">
      {/* Joystick */}
      <div
        ref={baseRef}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        onTouchCancel={end}
        data-testid="mobile-joystick"
        className="glass-dark pointer-events-auto absolute bottom-8 left-6 h-28 w-28 touch-none rounded-full"
      >
        <div
          className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full bg-white/25"
          style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
        />
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-8 right-6 flex flex-col items-center gap-4">
        <button
          data-testid="mobile-interact-button"
          onPointerDown={() => nearby && onInteract && onInteract()}
          className={`glass-dark pointer-events-auto grid h-14 w-14 place-items-center rounded-full transition-opacity ${nearby ? "opacity-100" : "opacity-40"}`}
        >
          <Hand size={22} />
        </button>
        <button
          data-testid="mobile-jump-button"
          onTouchStart={() => setMobileJump(true)}
          onTouchEnd={() => setMobileJump(false)}
          className="glass-dark pointer-events-auto grid h-14 w-14 place-items-center rounded-full"
        >
          <ArrowUp size={22} />
        </button>
      </div>
    </div>
  );
};
