import { create } from "zustand";

const getInitialReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const useGameStore = create((set, get) => ({
  // Flow
  phase: "intro", // intro | loading | playing
  setPhase: (phase) => set({ phase }),

  loadingProgress: 0,
  setLoadingProgress: (p) => set({ loadingProgress: p }),

  // Interaction
  nearbyInteractable: null, // { id, type, label, projectId }
  setNearbyInteractable: (i) => {
    const cur = get().nearbyInteractable;
    if ((cur && cur.id) === (i && i.id)) return; // avoid needless re-render
    set({ nearbyInteractable: i });
  },

  // Panels / menu
  activePanel: null, // 'about' | 'project' | 'skills' | 'experience' | 'contact' | 'settings'
  activeProjectId: null,
  isMenuOpen: false,
  openPanel: (panel, payload = {}) =>
    set({ activePanel: panel, activeProjectId: payload.projectId || null, isMenuOpen: false }),
  closePanel: () => set({ activePanel: null, activeProjectId: null }),
  setMenuOpen: (v) => set({ isMenuOpen: v }),

  // Whether player input should be frozen (a panel/menu is open)
  isPaused: () => {
    const s = get();
    return !!s.activePanel || s.isMenuOpen;
  },

  // Collectibles
  collectibles: [], // ids found
  addCollectible: (id) => {
    const cur = get().collectibles;
    if (cur.includes(id)) return false;
    set({ collectibles: [...cur, id] });
    return true;
  },

  // Secrets
  secrets: [],
  addSecret: (id) => {
    const cur = get().secrets;
    if (cur.includes(id)) return false;
    set({ secrets: [...cur, id] });
    return true;
  },

  // Discovered projects (for discovery event dedupe)
  discoveredProjects: [],
  markDiscovered: (id) => {
    const cur = get().discoveredProjects;
    if (cur.includes(id)) return false;
    set({ discoveredProjects: [...cur, id] });
    return true;
  },

  // Settings
  graphics: "high", // high | medium | low
  soundEnabled: true,
  musicEnabled: false,
  reducedMotion: getInitialReducedMotion(),
  controlsMode: "desktop", // desktop | mobile
  setGraphics: (g) => set({ graphics: g }),
  setSoundEnabled: (v) => set({ soundEnabled: v }),
  setMusicEnabled: (v) => set({ musicEnabled: v }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setControlsMode: (m) => set({ controlsMode: m }),

  // Mobile joystick input (set by MobileControls, read by Player)
  mobileMove: { x: 0, y: 0 },
  mobileJump: false,
  mobileRun: false,
  setMobileMove: (v) => set({ mobileMove: v }),
  setMobileJump: (v) => set({ mobileJump: v }),
}));
