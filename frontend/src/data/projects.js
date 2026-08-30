// Project data \u2014 edit here to customize. Do NOT hardcode into 3D components.
export const projects = [
  {
    id: "creative-ecommerce",
    number: "01",
    title: "Creative E-Commerce",
    year: 2026,
    role: "Frontend Developer",
    description:
      "A modern e-commerce experience focused on fast navigation and immersive product discovery. Built with a snappy, motion-rich interface and a headless commerce backend.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
    image: null,
    color: "#f08a6b",
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/alexdoe/creative-ecommerce",
    caseStudyUrl: "https://example.com/case/ecommerce",
    kind: "shop",
  },
  {
    id: "interactive-dashboard",
    number: "02",
    title: "Interactive Dashboard",
    year: 2025,
    role: "Full-stack Developer",
    description:
      "A real-time analytics control center with live charts, customizable widgets, and a command palette. Designed to make dense data feel calm and readable.",
    technologies: ["React", "D3.js", "WebSocket", "PostgreSQL"],
    image: null,
    color: "#2bb3b1",
    demoUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/alexdoe/interactive-dashboard",
    caseStudyUrl: "https://example.com/case/dashboard",
    kind: "control",
  },
  {
    id: "3d-product-experience",
    number: "03",
    title: "3D Product Experience",
    year: 2025,
    role: "Creative Developer",
    description:
      "A floating laboratory where users configure a product in real-time 3D. Physically-based materials, smooth camera choreography, and buttery interactions.",
    technologies: ["Three.js", "React Three Fiber", "GLSL", "Blender"],
    image: null,
    color: "#8bc6ec",
    demoUrl: "https://example.com/3d-product",
    githubUrl: "https://github.com/alexdoe/3d-product",
    caseStudyUrl: "https://example.com/case/3d-product",
    kind: "lab",
  },
  {
    id: "mobile-application",
    number: "04",
    title: "Mobile Application",
    year: 2024,
    role: "Mobile Developer",
    description:
      "A cross-platform habit-tracking app with delightful micro-interactions, offline sync, and a friendly onboarding flow that people actually finish.",
    technologies: ["React Native", "Expo", "TypeScript", "SQLite"],
    image: null,
    color: "#e7c48a",
    demoUrl: "https://example.com/mobile",
    githubUrl: "https://github.com/alexdoe/mobile-app",
    caseStudyUrl: "https://example.com/case/mobile",
    kind: "phone",
  },
];

export const getProject = (id) => projects.find((p) => p.id === id);
