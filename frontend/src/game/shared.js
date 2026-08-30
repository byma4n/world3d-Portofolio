import * as THREE from "three";

// Shared mutable player position, updated by Player each frame and read by
// NPCs / collectibles for proximity checks without causing React re-renders.
export const playerPosition = new THREE.Vector3(0, 2, 6);
