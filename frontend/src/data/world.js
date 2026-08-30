// World layout: positions for areas, interactables, collectibles, secrets, NPCs.
// Coordinates are in world units. Player spawns near the plaza center.

export const SPAWN = { position: [0, 2, 6] };

export const AREAS = {
  plaza: { id: "plaza", label: "Central Plaza", position: [0, 0, 0] },
  about: { id: "about", label: "About House", position: [-16, 0, -8] },
  projects: { id: "projects", label: "Project District", position: [16, 0, -8] },
  skills: { id: "skills", label: "Skills Workshop", position: [-16, 0, 12] },
  experience: { id: "experience", label: "Experience Station", position: [0, 0, -22] },
  contact: { id: "contact", label: "Contact Cafe", position: [16, 0, 14] },
};

// Interactables: proximity triggers. type maps to the panel that opens.
export const INTERACTABLES = [
  { id: "about", type: "about", label: "Enter About House", position: [-16, 0, -3.5], radius: 3.2 },
  { id: "skills", type: "skills", label: "Inspect Skills Workshop", position: [-16, 0, 7.5], radius: 3.4 },
  { id: "experience", type: "experience", label: "Board the Experience Line", position: [0, 0, -17], radius: 3.6 },
  { id: "contact", type: "contact", label: "Talk to the Barista", position: [16, 0, 10.5], radius: 3.2 },
  // Project buildings (4) inside Project District
  { id: "proj-01", type: "project", projectId: "creative-ecommerce", label: "Explore Project 01", position: [10, 0, -6], radius: 2.8 },
  { id: "proj-02", type: "project", projectId: "interactive-dashboard", label: "Explore Project 02", position: [16, 0, -4], radius: 2.8 },
  { id: "proj-03", type: "project", projectId: "3d-product-experience", label: "Explore Project 03", position: [22, 0, -6], radius: 2.8 },
  { id: "proj-04", type: "project", projectId: "mobile-application", label: "Explore Project 04", position: [16, 0, -11], radius: 2.8 },
];

// Collectibles: glowing stars scattered around the world.
export const COLLECTIBLES = [
  { id: "c1", position: [4, 1.2, -4] },
  { id: "c2", position: [-9, 1.2, 3] },
  { id: "c3", position: [9, 1.2, 6] },
  { id: "c4", position: [-4, 1.2, -14] },
  { id: "c5", position: [22, 1.4, -12] },
];

// Secret discovery trigger volumes (hidden). type just used for the message.
export const SECRETS = [
  {
    id: "secret-room",
    position: [24, 0, 2],
    radius: 2.6,
    title: "Hidden Room",
    message: "Hello, curious human. \u2014 the developer's desk",
  },
  {
    id: "secret-npc",
    position: [-22, 0, -14],
    radius: 2.6,
    title: "A Mysterious Stranger",
    message: "You weren't supposed to find me.",
  },
  {
    id: "secret-island",
    position: [-4, 0, 24],
    radius: 3.0,
    title: "Achievement Unlocked",
    message: "YOU LOOKED EVERYWHERE.",
  },
];

// NPCs with short dialogue.
export const NPCS = [
  { id: "gardener", name: "Gardener", position: [-6, 0, 2], color: "#6faf7a", line: "Careful. I spent three hours placing that tree." },
  { id: "developer", name: "Developer", position: [7, 0, -3], color: "#2bb3b1", line: "It works on my machine." },
  { id: "barista", name: "Barista", position: [15, 0, 12], color: "#f08a6b", line: "Looking for the person who built this place?" },
  { id: "stranger", name: "Mysterious Stranger", position: [-22, 0, -14], color: "#8b7bd8", line: "You found this place?" },
];
