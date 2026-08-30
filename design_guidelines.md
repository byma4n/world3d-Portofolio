{
  "project": {
    "name": "WALKFOLIO",
    "tagline": "Don’t scroll through my portfolio. Walk through it.",
    "routes": {
      "world": "/",
      "fallback_portfolio": "/portfolio"
    },
    "brand_attributes": [
      "playful-indie-game charm (3D world)",
      "premium creative-studio clarity (2D overlay)",
      "slightly surreal + mysterious, but warm",
      "high readability over bright 3D",
      "performance-first (60fps target)"
    ],
    "design_style_fusion": {
      "3d_world": "stylized low-poly cozy island (warm, inviting, not photorealistic)",
      "2d_ui_layer": "clean modern studio UI + subtle glassmorphism + precise typography + minimal controls",
      "layout_principles": [
        "Bento-like modular panels",
        "HUD corners + centered modals",
        "F-pattern reading inside panels",
        "large titles + small metadata"
      ]
    }
  },

  "design_tokens": {
    "color_system": {
      "notes": [
        "No purple for AI apps rule is irrelevant here; still avoid neon cyberpunk palettes.",
        "UI must remain readable over bright, colorful 3D: use ‘glass + veil’ (semi-opaque) rather than fully transparent glass.",
        "Gradients are decorative only and must stay under 20% viewport; prefer solid surfaces for reading areas."
      ],
      "palette_hex": {
        "ink": "#0B0F14",
        "ink_2": "#111827",
        "paper": "#F7F6F2",
        "paper_2": "#FFFFFF",

        "glass_surface": "rgba(255,255,255,0.14)",
        "glass_surface_strong": "rgba(255,255,255,0.22)",
        "glass_surface_dark": "rgba(11,15,20,0.42)",

        "border_light": "rgba(255,255,255,0.28)",
        "border_dark": "rgba(17,24,39,0.22)",

        "accent_ocean": "#2BB3B1",
        "accent_moss": "#6FAF7A",
        "accent_sand": "#E7C48A",
        "accent_coral": "#F08A6B",

        "info": "#2F80ED",
        "success": "#2EAD6B",
        "warning": "#F2C94C",
        "danger": "#EB5757"
      },
      "palette_hsl_for_shadcn": {
        "background": "36 33% 97%",
        "foreground": "215 35% 10%",

        "card": "0 0% 100%",
        "card-foreground": "215 35% 10%",

        "popover": "0 0% 100%",
        "popover-foreground": "215 35% 10%",

        "primary": "215 35% 10%",
        "primary-foreground": "36 33% 97%",

        "secondary": "210 20% 96%",
        "secondary-foreground": "215 35% 10%",

        "muted": "210 18% 94%",
        "muted-foreground": "215 12% 40%",

        "accent": "178 58% 43%",
        "accent-foreground": "0 0% 100%",

        "destructive": "0 78% 58%",
        "destructive-foreground": "0 0% 100%",

        "border": "215 18% 86%",
        "input": "215 18% 86%",
        "ring": "178 58% 43%",

        "radius": "14px"
      },
      "semantic_tokens": {
        "--ui-bg": "rgba(247,246,242,0.72)",
        "--ui-bg-strong": "rgba(247,246,242,0.86)",
        "--ui-bg-dark": "rgba(11,15,20,0.55)",
        "--ui-text": "#0B0F14",
        "--ui-text-muted": "rgba(11,15,20,0.68)",
        "--ui-text-inverse": "#F7F6F2",
        "--ui-border": "rgba(255,255,255,0.30)",
        "--ui-border-2": "rgba(17,24,39,0.14)",
        "--ui-ring": "rgba(43,179,177,0.55)",
        "--ui-shadow": "0 18px 50px rgba(11,15,20,0.18)",
        "--ui-shadow-tight": "0 10px 24px rgba(11,15,20,0.14)",
        "--ui-noise-opacity": "0.06"
      },
      "allowed_gradients_decorative_only": {
        "hero_overlay": "radial-gradient(1200px 600px at 20% 10%, rgba(43,179,177,0.18), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(240,138,107,0.14), transparent 55%)",
        "plaza_vignette": "radial-gradient(900px 600px at 50% 50%, rgba(11,15,20,0.10), rgba(11,15,20,0.22))"
      }
    },

    "typography": {
      "google_fonts": {
        "display": {
          "name": "Space Grotesk",
          "weights": ["400", "500", "600", "700"],
          "usage": "All headings, HUD labels, modal titles"
        },
        "body": {
          "name": "Inter",
          "weights": ["400", "500", "600"],
          "usage": "Body copy, descriptions, metadata"
        },
        "mono": {
          "name": "IBM Plex Mono",
          "weights": ["400", "500"],
          "usage": "Key prompts (WASD, [E]), debug-like status messages, loading status"
        }
      },
      "css_font_stack": {
        "--font-display": "'Space Grotesk', ui-sans-serif, system-ui",
        "--font-body": "'Inter', ui-sans-serif, system-ui",
        "--font-mono": "'IBM Plex Mono', ui-monospace, SFMono-Regular"
      },
      "type_scale_tailwind": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
        "h2": "text-base md:text-lg font-medium text-[color:var(--ui-text-muted)]",
        "panel_title": "text-xl sm:text-2xl font-semibold tracking-tight",
        "section_label": "text-xs font-semibold tracking-[0.18em] uppercase",
        "body": "text-sm sm:text-base leading-relaxed",
        "meta": "text-xs sm:text-sm text-[color:var(--ui-text-muted)]",
        "kbd": "font-mono text-[11px] tracking-wide"
      }
    },

    "spacing_radius_shadow": {
      "spacing": {
        "base_unit": "4px",
        "panel_padding": "p-4 sm:p-5",
        "modal_padding": "p-5 sm:p-6",
        "hud_gutters": "top/left/right/bottom: 16px mobile, 24px desktop",
        "stack_gaps": "gap-2 (tight), gap-3 (default), gap-5 (section)"
      },
      "radius": {
        "--radius-sm": "10px",
        "--radius-md": "14px",
        "--radius-lg": "18px",
        "--radius-xl": "24px",
        "usage": "HUD pills use md; modals use lg; cinematic cards use xl"
      },
      "shadows": {
        "glass": "0 18px 50px rgba(11,15,20,0.18)",
        "glass_hover": "0 22px 70px rgba(11,15,20,0.22)",
        "floating_prompt": "0 10px 24px rgba(11,15,20,0.16)"
      }
    },

    "glassmorphism_recipe": {
      "goal": "Readable premium glass over bright low-poly world (never fully transparent).",
      "base_class": "backdrop-blur-xl bg-[color:var(--ui-bg)] border border-[color:var(--ui-border)] shadow-[var(--ui-shadow)]",
      "strong_class": "backdrop-blur-2xl bg-[color:var(--ui-bg-strong)] border border-[color:var(--ui-border)] shadow-[var(--ui-shadow)]",
      "dark_class": "backdrop-blur-xl bg-[color:var(--ui-bg-dark)] text-[color:var(--ui-text-inverse)] border border-white/15 shadow-[var(--ui-shadow)]",
      "specular_highlight": "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06),rgba(255,255,255,0))] before:pointer-events-none before:opacity-60",
      "noise_overlay": {
        "implementation": "Add a fixed pseudo-element on the UI root with a tiny noise PNG/SVG or CSS noise; keep opacity <= 0.06.",
        "tailwind_hint": "after:content-[''] after:absolute after:inset-0 after:bg-[url('/noise.png')] after:opacity-[var(--ui-noise-opacity)] after:pointer-events-none"
      },
      "readability_rule": "If text sits over high-contrast 3D areas, switch panel to strong_class or add an inner veil: bg-white/30 + backdrop-blur-2xl."
    },

    "motion": {
      "principles": [
        "GPU-friendly: animate opacity + transform only",
        "No layout thrash: avoid animating height/width; use scale + clip-path sparingly",
        "Idle fade for HUD: reduce opacity slightly after 3s of no input",
        "Reduced motion: disable large entrance moves; keep fades"
      ],
      "durations": {
        "fast": "120ms",
        "base": "180ms",
        "slow": "260ms"
      },
      "easings": {
        "standard": "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "out": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      "framer_motion_presets": {
        "panel_in": {
          "initial": "{ opacity: 0, y: 10, scale: 0.98 }",
          "animate": "{ opacity: 1, y: 0, scale: 1 }",
          "exit": "{ opacity: 0, y: 8, scale: 0.985 }",
          "transition": "{ type: 'spring', stiffness: 380, damping: 34, mass: 0.7 }"
        },
        "reduced_motion_variant": {
          "initial": "{ opacity: 0 }",
          "animate": "{ opacity: 1 }",
          "exit": "{ opacity: 0 }",
          "transition": "{ duration: 0.18 }"
        }
      },
      "hover_microinteractions": {
        "buttons": "hover:translate-y-[-1px] hover:shadow-[var(--ui-shadow-tight)] active:translate-y-[0px] active:scale-[0.99]",
        "glass_panels": "hover:bg-white/80 (only if already strong), hover:border-white/40",
        "prompt_pill": "animate subtle pulse via opacity (not scale)"
      }
    },

    "accessibility": {
      "contrast": [
        "Default text uses --ui-text on --ui-bg-strong for modals.",
        "HUD text uses --ui-text-inverse on dark_class when placed over bright scenes."
      ],
      "focus": {
        "ring": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ui-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "keyboard_nav": "All dialogs/menus must trap focus (Radix via shadcn Dialog/Sheet)."
      },
      "reduced_motion": {
        "css": "@media (prefers-reduced-motion: reduce) { .motion-safe-only { display:none } }",
        "app_setting": "Settings toggle ‘Reduced Motion’ should also gate framer-motion animations (use useReducedMotion())."
      },
      "webgl_fallback": "Provide fully functional /portfolio route and a WebGL unsupported screen with clear CTA."
    }
  },

  "component_path": {
    "shadcn_primary": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "drawer": "/app/frontend/src/components/ui/drawer.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "hover_card": "/app/frontend/src/components/ui/hover-card.jsx",
      "progress": "/app/frontend/src/components/ui/progress.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "switch": "/app/frontend/src/components/ui/switch.jsx",
      "select": "/app/frontend/src/components/ui/select.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "recommended_new_components_to_create": [
      "/app/frontend/src/components/GlassPanel.js",
      "/app/frontend/src/components/HudPill.js",
      "/app/frontend/src/components/KbdHint.js",
      "/app/frontend/src/components/NoiseOverlay.js",
      "/app/frontend/src/components/MobileControls.js"
    ]
  },

  "ui_surfaces": {
    "cinematic_intro": {
      "layout": "Full-screen overlay above canvas. Center-left aligned text block (not perfectly centered).",
      "visual": {
        "background": "Use plaza_vignette + subtle film grain; keep mostly solid dark veil (no gradients >20%).",
        "text": "Large display font, high contrast, sequential reveal lines.",
        "cta": "‘Press any key to begin’ as mono smallcaps with subtle blinking caret (opacity only)."
      },
      "components": ["Card (custom glass dark)", "Button (ghost)", "Separator"],
      "micro_interactions": [
        "Type/line reveal: fade+slide 6–10px",
        "Skip appears after 1.5s: ‘Hold Esc to skip’",
        "Any key triggers quick fade-out (180ms)"
      ],
      "data_testids": {
        "root": "intro-screen",
        "skip": "intro-skip-button",
        "press_any_key": "intro-press-any-key"
      }
    },

    "loading_screen": {
      "layout": "Centered logo block + progress bar; status messages below; bottom-right tip rotates.",
      "components": ["Progress", "Badge", "Skeleton"],
      "visual": {
        "logo": "WALKFOLIO wordmark in Space Grotesk; small subtitle.",
        "progress": "Use shadcn Progress with custom height (h-2.5) and rounded-full.",
        "status": "IBM Plex Mono, 11–12px, muted."
      },
      "micro_interactions": [
        "Progress bar uses smooth width updates (no bouncing)",
        "Status message crossfade every 2.2s",
        "When complete: quick ‘door opening’ wipe via opacity + translateY"
      ],
      "data_testids": {
        "root": "loading-screen",
        "progress": "loading-progress",
        "status": "loading-status-message"
      }
    },

    "in_game_hud": {
      "layout": {
        "top_left": "Name + role pill",
        "bottom_left": "Menu button + small world hint",
        "bottom_right": "Controls cluster (kbd hints)",
        "center_near_interaction": "Interaction prompt pill near object (world-space anchored)"
      },
      "visual": {
        "default": "Use dark_class for HUD pills to guarantee readability.",
        "idle_fade": "After 3s no input: opacity 0.72; on input: back to 1."
      },
      "components": ["Button", "Badge", "Tooltip"],
      "data_testids": {
        "hud": "game-hud",
        "menu_button": "hud-menu-button",
        "controls": "hud-controls",
        "player_identity": "hud-player-identity"
      }
    },

    "interaction_prompt_pill": {
      "layout": "Floating pill near interactable; max width 280px; wraps gracefully.",
      "visual": {
        "surface": "dark_class + specular_highlight",
        "kbd": "Use KbdHint component with mono font and inset border"
      },
      "micro_interactions": [
        "Appear: opacity + y 6px",
        "Idle: subtle shimmer via gradient translate (very low opacity)"
      ],
      "data_testids": {
        "prompt": "interaction-prompt"
      }
    },

    "about_panel": {
      "pattern": "Glass modal (Dialog on desktop, Drawer on mobile).",
      "layout": "Left: avatar/mini scene still; Right: bio + facts grid.",
      "components": ["Dialog", "Drawer", "Avatar", "Separator", "Badge", "ScrollArea"],
      "visual": {
        "surface": "strong_class + specular_highlight",
        "facts": "Use 2-col grid with small labels (uppercase)"
      },
      "data_testids": {
        "open": "about-open-button",
        "panel": "about-panel",
        "close": "about-close-button"
      }
    },

    "project_modal": {
      "pattern": "Dialog with Tabs (Overview / Tech / Links) OR single scroll layout.",
      "layout": "Top: title + year + role; Middle: image (AspectRatio) + description; Bottom: CTA row.",
      "components": ["Dialog", "Tabs", "AspectRatio", "Badge", "Button", "ScrollArea"],
      "button_variants": {
        "primary": "Live Demo (accent_ocean)",
        "secondary": "Case Study (outline)",
        "ghost": "GitHub (ghost)"
      },
      "data_testids": {
        "modal": "project-modal",
        "live_demo": "project-live-demo-button",
        "github": "project-github-button",
        "case_study": "project-case-study-button",
        "close": "project-close-button"
      }
    },

    "skills_tooltip": {
      "pattern": "Tooltip or HoverCard depending on density.",
      "components": ["Tooltip", "HoverCard", "Badge"],
      "visual": "Small strong glass with tight padding p-2.5; max-w-[240px].",
      "data_testids": {
        "tooltip": "skills-tooltip"
      }
    },

    "experience_timeline": {
      "pattern": "Panel with vertical timeline; ScrollArea inside.",
      "layout": "Left rail with dots; right content cards.",
      "components": ["Dialog/Sheet", "ScrollArea", "Separator", "Badge"],
      "micro_interactions": [
        "Active item highlights with accent_ocean border",
        "On scroll: subtle shadow appears at top (ScrollArea)"
      ],
      "data_testids": {
        "panel": "experience-panel",
        "item": "experience-item"
      }
    },

    "contact_panel": {
      "pattern": "Dialog/Drawer with CTA grid.",
      "layout": "Friendly copy + 2x2 button grid (Email/LinkedIn/GitHub/Resume).",
      "components": ["Dialog", "Drawer", "Button", "Separator"],
      "data_testids": {
        "panel": "contact-panel",
        "email": "contact-email-button",
        "linkedin": "contact-linkedin-button",
        "github": "contact-github-button",
        "resume": "contact-resume-button"
      }
    },

    "npc_dialogue_bubble": {
      "pattern": "Small anchored bubble with tail; auto-dismiss.",
      "visual": "dark_class, rounded-xl, max-w-[260px], text-sm.",
      "micro_interactions": ["Pop-in scale 0.98->1", "Auto fade after 4s"],
      "data_testids": {
        "bubble": "npc-dialogue"
      }
    },

    "collectible_toast": {
      "pattern": "Sonner toast (top-center or bottom-center).",
      "visual": "Use dark_class toast with accent icon; keep short.",
      "components": ["sonner"],
      "data_testids": {
        "toast": "collectible-toast"
      }
    },

    "pause_menu": {
      "pattern": "Sheet from left on desktop; full-screen Drawer on mobile.",
      "layout": "Left nav list + right preview panel (optional).",
      "components": ["Sheet", "NavigationMenu or custom list", "Separator", "Button"],
      "items": [
        "Home",
        "About",
        "Projects",
        "Experience",
        "Skills",
        "Contact",
        "Resume",
        "Settings",
        "View Normal Portfolio",
        "Back to World"
      ],
      "data_testids": {
        "menu": "pause-menu",
        "open": "pause-menu-open",
        "close": "pause-menu-close",
        "normal_portfolio": "pause-menu-normal-portfolio"
      }
    },

    "settings_panel": {
      "pattern": "Tabs or stacked sections inside Dialog/Sheet.",
      "controls": {
        "graphics": "Select (HIGH/MED/LOW)",
        "sound": "Switch",
        "music": "Switch",
        "reduced_motion": "Switch",
        "controls_mode": "Select (Desktop/Mobile)"
      },
      "components": ["Select", "Switch", "Separator", "Tooltip"],
      "data_testids": {
        "panel": "settings-panel",
        "graphics": "settings-graphics-select",
        "sound": "settings-sound-switch",
        "music": "settings-music-switch",
        "reduced_motion": "settings-reduced-motion-switch",
        "controls": "settings-controls-select"
      }
    },

    "mobile_controls": {
      "pattern": "On-screen joystick + two action buttons.",
      "layout": "Left bottom: joystick; right bottom: Jump + Interact stacked.",
      "visual": "Use semi-opaque dark glass circles with clear icons; large hit targets.",
      "sizes": {
        "joystick_base": "w-28 h-28",
        "buttons": "w-14 h-14"
      },
      "data_testids": {
        "root": "mobile-controls",
        "joystick": "mobile-joystick",
        "jump": "mobile-jump-button",
        "interact": "mobile-interact-button"
      }
    },

    "webgl_unsupported_fallback": {
      "pattern": "Standalone screen with illustration placeholder + CTA.",
      "visual": "Paper background with subtle vignette; no glass needed.",
      "components": ["Card", "Button"],
      "data_testids": {
        "screen": "webgl-unsupported",
        "cta": "webgl-unsupported-normal-portfolio"
      }
    },

    "portfolio_2d_fallback": {
      "goal": "Must feel first-class: same brand tokens, same typography, same glass accents, but standard scroll UX.",
      "layout": {
        "hero": "Left aligned headline + short pitch + primary CTA (View Projects) + secondary (Download Resume).",
        "about": "Two-column on desktop; stacked on mobile.",
        "projects": "Bento grid cards with images; modal opens on click.",
        "experience": "Timeline section.",
        "skills": "Tag cloud + grouped categories.",
        "contact": "CTA panel with button grid."
      },
      "components": ["Card", "Button", "Badge", "Tabs", "Dialog", "ScrollArea", "Separator"],
      "data_testids": {
        "page": "portfolio-page",
        "hero": "portfolio-hero",
        "projects": "portfolio-projects",
        "contact": "portfolio-contact"
      }
    }
  },

  "implementation_notes_js": {
    "no_tsx": "All new components should be .js and follow existing shadcn patterns in /components/ui (named exports for components).",
    "tailwind_tokens": [
      "Add CSS variables in index.css :root and map to Tailwind via existing shadcn token usage.",
      "Prefer className strings; avoid inline styles except for dynamic positioning of world-space prompts."
    ],
    "data_testid_rule": "Every button/input/link/menu item and key info text must include data-testid in kebab-case."
  },

  "image_urls": {
    "notes": "Stock providers tool unavailable in this environment. Use lightweight custom SVG/illustrations or self-hosted low-poly renders from the 3D scene for /portfolio cards.",
    "categories": [
      {
        "category": "project_thumbnails",
        "description": "Render stills from the 3D world (Project District buildings) as thumbnails; fallback to gradient placeholder blocks.",
        "urls": []
      },
      {
        "category": "webgl_fallback_illustration",
        "description": "Simple SVG illustration: tiny island + warning sign; keep under 30KB.",
        "urls": []
      },
      {
        "category": "noise_texture",
        "description": "A tiny seamless noise PNG (64x64) for overlay grain.",
        "urls": ["/noise.png"]
      }
    ]
  },

  "instructions_to_main_agent": {
    "global_css_updates": [
      "Replace default shadcn tokens in /app/frontend/src/index.css with the palette_hsl_for_shadcn values above.",
      "Remove CRA demo styles from App.css (App-header centering etc.) and keep App.css minimal.",
      "Add font imports in public/index.html or via CSS @import (Google Fonts: Space Grotesk, Inter, IBM Plex Mono).",
      "Add a UI root overlay container positioned fixed over the canvas; ensure pointer-events are managed (HUD clickable, world pass-through elsewhere).",
      "Implement NoiseOverlay as a single fixed layer (opacity <= 0.06)."
    ],
    "component_build_plan": [
      "Create GlassPanel.js that encapsulates glass recipes (base/strong/dark) + specular highlight.",
      "Create KbdHint.js for consistent [E]/WASD pills.",
      "Use shadcn Dialog for modals; Drawer for mobile equivalents.",
      "Use Sonner for collectible toasts.",
      "Use framer-motion with useReducedMotion() and a Settings toggle to gate animations."
    ],
    "performance": [
      "Avoid heavy blur on huge full-screen layers; keep blur on panels only.",
      "Prefer opacity/transform transitions; avoid animating backdrop-filter.",
      "Throttle HUD idle detection with requestAnimationFrame or a debounced input listener."
    ]
  },

  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
