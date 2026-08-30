# WALKFOLIO — Interactive 3D Portfolio (plan & status)

"Don't scroll through my portfolio. Walk through it."

## Stack
React 19 + CRA(craco) + react-three-fiber v9 + drei v10 + rapier v2 (physics) + zustand + shadcn/ui + framer-motion + TailwindCSS. Frontend-only (NO backend). Placeholder owner "Alex Doe / Creative Developer".

## Confirmed user choices
- Placeholder Alex Doe content, centralized in `src/data/`.
- Stylized character built from 3D primitives.
- Build polished playable core first, then expand.
- No backend (mailto/social, static /resume.pdf, console analytics).
- Follow spec art direction (warm stylized low-poly + premium glass UI).

## STATUS: Phase 1 (POC) + Phase 2 (full core app) COMPLETE — tested 100% pass.

### Phase 1 — POC (DONE)
- Validated rapier kinematic character controller + primitive character + WASD/run/jump + collision + third-person camera in isolation via screenshots.

### Phase 2 — Full app (DONE, tested 100%)
- App shell, routing ("/" world, "/portfolio" 2D), WebGL detection + fallback screen.
- Zustand store, settings (graphics/sound/music/reduced-motion/controls), analytics abstraction, WebAudio SFX.
- Centralized data: site, projects, skills, experience, world layout.
- Cinematic intro (skippable), deterministic loading screen (rotating messages).
- 3D world "The Little World": Central Plaza (fountain, trees, benches, lamps, signposts, paths, clouds), About House, Project District (4 unique project buildings), Skills Workshop (floating tech cubes), Experience Station (train + canopy + year markers), Contact Cafe. Area labels via drei Html.
- Animated mascot: walk/run/idle/jump limb animation, rotates toward movement, idle wave/breathe, respawn if fell.
- Interaction system (proximity prompts + E), plus click-based Menu (recruiter shortcuts to every section).
- Premium glass panels: About, Project modal, Experience timeline, Skills, Contact (email/linkedin/github/resume), Settings.
- HUD (identity, collectible counter, controls, menu, fading), pause Menu (all sections + View Normal Portfolio + Back to World).
- 5 collectibles (toast + "Explorer Mode Unlocked"), 3 secrets (toasts), 2-4 NPCs with dialogue bubbles.
- Mobile controls (joystick + jump + interact), reduced-motion support, SEO meta/OG/favicon, analytics events.
- Complete 2D fallback portfolio at /portfolio (Hero/About/Projects/Experience/Skills/Contact) sharing the same data.

### Key fixes made
- Disabled `@emergentbase/visual-edits` (it injected `x-*` JSX attrs that crash react-three-fiber). Set in craco.config.js.
- Loading gate made deterministic (drei useProgress `active` never resolved without async assets).
- Removed ~15 real-time point lights (used emissive materials) + lowered shadow map/dpr for performance.

## Potential future phases (not yet done)
- Richer audio (ambient music track, footstep timing), more secret-room interiors.
- Day/night cycle, more environmental animation (grass, birds).
- Replace primitive character with a GLB when available.
- Real contact form (would need a backend) if desired.
- Perf profiling on low-end devices + KTX2/instancing if assets grow.
