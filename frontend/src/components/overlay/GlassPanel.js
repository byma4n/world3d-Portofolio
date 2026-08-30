import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

export const GlassPanel = ({ variant = "base", className = "", children, ...rest }) => {
  const cls = variant === "strong" ? "glass-strong" : variant === "dark" ? "glass-dark" : "glass-base";
  return (
    <div className={`${cls} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export function usePanelMotion() {
  const reduced = useGameStore((s) => s.reducedMotion);
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.18 },
    };
  }
  return {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 8, scale: 0.985 },
    transition: { type: "spring", stiffness: 380, damping: 34, mass: 0.7 },
  };
}

export const Modal = ({ onClose, children, className = "", maxWidth = "max-w-2xl", testId, title }) => {
  const motionProps = usePanelMotion();
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6" data-testid={testId ? `${testId}-overlay` : undefined}>
      <motion.div
        className="absolute inset-0 bg-[rgba(11,15,20,0.5)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className={`relative w-full ${maxWidth} glass-strong rounded-[18px] overflow-hidden ${className}`}
        {...motionProps}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-testid={testId}
      >
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            data-testid={testId ? `${testId}-close` : "panel-close"}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/5 text-[color:var(--ui-text)] transition-colors hover:bg-black/10"
          >
            <X size={18} />
          </button>
        )}
        {children}
      </motion.div>
    </div>
  );
};
