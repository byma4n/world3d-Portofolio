import React from "react";

export const Kbd = ({ children, className = "" }) => (
  <span className={`kbd ${className}`}>{children}</span>
);

export const KbdHint = ({ keys = [], label, className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="flex items-center gap-1">
      {keys.map((k) => (
        <Kbd key={k}>{k}</Kbd>
      ))}
    </span>
    {label && <span className="font-mono-ui text-[11px] tracking-wide opacity-80">{label}</span>}
  </div>
);
