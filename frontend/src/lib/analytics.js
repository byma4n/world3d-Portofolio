// Lightweight analytics abstraction. Logs to console; no external service required.
const enabled = true;

export function track(event, payload = {}) {
  if (!enabled) return;
  try {
    // eslint-disable-next-line no-console
    console.log(`%c[walkfolio] ${event}`, "color:#2bb3b1;font-weight:600", payload);
    if (typeof window !== "undefined" && window.posthog && window.posthog.capture) {
      window.posthog.capture(`walkfolio_${event}`, payload);
    }
  } catch (e) {
    /* no-op */
  }
}

export const EVENTS = {
  WORLD_LOADED: "world_loaded",
  CHARACTER_SPAWNED: "character_spawned",
  ABOUT_OPENED: "about_opened",
  PROJECT_DISCOVERED: "project_discovered",
  PROJECT_OPENED: "project_opened",
  DEMO_CLICKED: "demo_clicked",
  GITHUB_CLICKED: "github_clicked",
  RESUME_CLICKED: "resume_clicked",
  CONTACT_CLICKED: "contact_clicked",
  SKILL_DISCOVERED: "skill_discovered",
  EXPERIENCE_OPENED: "experience_opened",
  SECRET_FOUND: "secret_found",
  COLLECTIBLE_FOUND: "collectible_found",
  TWO_D_MODE_OPENED: "2d_mode_opened",
};
