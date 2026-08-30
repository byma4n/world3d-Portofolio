import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AREAS } from "@/data/world";
import { SolidBox, AreaLabel, Flag } from "@/game/props";
import { useGameStore } from "@/store/gameStore";

const Train = () => {
  const ref = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    ref.current.position.x += dt * 6;
    if (ref.current.position.x > 30) ref.current.position.x = -30;
  });
  return (
    <group ref={ref} position={[-30, 0.6, -4]}>
      <mesh castShadow><boxGeometry args={[4, 1.6, 1.6]} /><meshStandardMaterial color="#2bb3b1" /></mesh>
      <mesh position={[1.4, 0.9, 0]}><boxGeometry args={[1.2, 0.6, 1.4]} /><meshStandardMaterial color="#f7f6f2" /></mesh>
      {[-1.2, 0, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.2, 0.85]}><boxGeometry args={[0.7, 0.7, 0.05]} /><meshStandardMaterial color="#bfe3ff" /></mesh>
      ))}
    </group>
  );
};

export const ExperienceStation = () => {
  const p = AREAS.experience.position;
  return (
    <group position={p}>
      {/* Platform */}
      <SolidBox position={[0, 0.4, 0]} args={[12, 0.8, 3]} color="#c9bfa8" />
      {/* Canopy pillars + roof */}
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <mesh key={x} position={[x, 1.7, -1]} castShadow><cylinderGeometry args={[0.12, 0.12, 2.4, 8]} /><meshStandardMaterial color="#8a939c" /></mesh>
      ))}
      <mesh position={[0, 3, -1]} castShadow><boxGeometry args={[12, 0.2, 2.4]} /><meshStandardMaterial color="#c0603f" /></mesh>
      {/* Year platform markers */}
      {["2023", "2024", "2025", "2026"].map((y, i) => (
        <mesh key={y} position={[-4.5 + i * 3, 0.95, 1.2]}><boxGeometry args={[0.9, 0.5, 0.1]} /><meshStandardMaterial color="#0b0f14" /></mesh>
      ))}
      {/* Tracks */}
      <mesh position={[0, 0.05, -4]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 2.4]} /><meshStandardMaterial color="#6b6b6b" /></mesh>
      <Train />
      <Flag position={[-6, 0.8, 1]} color="#2bb3b1" />
      <Flag position={[6, 0.8, 1]} color="#f08a6b" />
      <AreaLabel position={[0, 4.4, 0]} text="Experience Station" />
    </group>
  );
};
