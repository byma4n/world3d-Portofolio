import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WebGLFallback = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#f7f6f2] px-6 text-center"
      data-testid="webgl-unsupported"
    >
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[color:var(--accent-ocean)]/10 text-[color:var(--accent-ocean)]">
        <Compass size={30} />
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-[#0b0f14]">
        Your browser isn't ready for this world.
      </h1>
      <p className="mt-3 max-w-md font-body text-sm text-[color:var(--ui-text-muted)]">
        The interactive 3D experience needs WebGL. No worries — you can explore the full portfolio
        in a classic layout instead.
      </p>
      <Button
        className="mt-6"
        data-testid="webgl-unsupported-normal-portfolio"
        onClick={() => navigate("/portfolio")}
      >
        View portfolio normally
      </Button>
    </div>
  );
};
