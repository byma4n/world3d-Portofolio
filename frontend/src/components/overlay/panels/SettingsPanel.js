import React from "react";
import { Modal } from "@/components/overlay/GlassPanel";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useGameStore } from "@/store/gameStore";

const Row = ({ title, desc, children }) => (
  <div className="flex items-center justify-between gap-4 border-b border-[color:var(--ui-border-2)] py-4 last:border-0">
    <div>
      <div className="font-display text-sm font-semibold">{title}</div>
      <div className="font-body text-xs text-[color:var(--ui-text-muted)]">{desc}</div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export const SettingsPanel = ({ onClose }) => {
  const graphics = useGameStore((s) => s.graphics);
  const setGraphics = useGameStore((s) => s.setGraphics);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const musicEnabled = useGameStore((s) => s.musicEnabled);
  const setMusicEnabled = useGameStore((s) => s.setMusicEnabled);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const setReducedMotion = useGameStore((s) => s.setReducedMotion);
  const controlsMode = useGameStore((s) => s.controlsMode);
  const setControlsMode = useGameStore((s) => s.setControlsMode);

  return (
    <Modal onClose={onClose} testId="settings-panel" title="Settings" maxWidth="max-w-lg">
      <div className="p-6 sm:p-8">
        <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight">Settings</h2>
        <div className="mt-2">
          <Row title="Graphics" desc="Higher looks better; lower runs faster.">
            <Select value={graphics} onValueChange={setGraphics}>
              <SelectTrigger className="w-32" data-testid="settings-graphics-select"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row title="Sound Effects" desc="Footsteps, jumps, collectibles.">
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} data-testid="settings-sound-switch" />
          </Row>
          <Row title="Music" desc="Ambient background music.">
            <Switch checked={musicEnabled} onCheckedChange={setMusicEnabled} data-testid="settings-music-switch" />
          </Row>
          <Row title="Reduced Motion" desc="Calmer camera and UI transitions.">
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} data-testid="settings-reduced-motion-switch" />
          </Row>
          <Row title="Controls" desc="Desktop keyboard or on-screen touch.">
            <Select value={controlsMode} onValueChange={setControlsMode}>
              <SelectTrigger className="w-32" data-testid="settings-controls-select"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
