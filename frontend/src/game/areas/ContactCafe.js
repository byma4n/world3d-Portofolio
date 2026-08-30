import React from "react";
import { AREAS } from "@/data/world";
import { SolidBox, AreaLabel, Tree } from "@/game/props";

export const ContactCafe = () => {
  const p = AREAS.contact.position;
  return (
    <group position={p}>
      {/* Cafe body */}
      <SolidBox position={[0, 1, 0]} args={[4, 2, 3.4]} color="#f6d9a0" />
      {/* Flat roof lip */}
      <mesh position={[0, 2.1, 0]}><boxGeometry args={[4.4, 0.2, 3.8]} /><meshStandardMaterial color="#c0603f" /></mesh>
      {/* Striped awning */}
      <mesh position={[0, 1.5, 1.9]} rotation={[0.5, 0, 0]}><boxGeometry args={[4, 0.08, 1]} /><meshStandardMaterial color="#f08a6b" /></mesh>
      {/* Big window */}
      <mesh position={[0, 1, 1.72]}><boxGeometry args={[2.4, 1.2, 0.05]} /><meshStandardMaterial color="#bfe3ff" /></mesh>
      {/* Coffee cup sign */}
      <group position={[0, 3, 0]}>
        <mesh><cylinderGeometry args={[0.4, 0.32, 0.5, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
        <mesh position={[0.45, 0, 0]}><torusGeometry args={[0.18, 0.05, 8, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
      </group>
      {/* Outdoor tables */}
      {[[-2.6, 1.8], [2.6, 1.8]].map((t, i) => (
        <group key={i} position={[t[0], 0, t[1]]}>
          <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.5, 0.5, 0.08, 16]} /><meshStandardMaterial color="#b98a5e" /></mesh>
          <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.06, 0.06, 0.6, 8]} /><meshStandardMaterial color="#7a5a3a" /></mesh>
        </group>
      ))}
      <Tree position={[3.2, 0, -1]} scale={1} tone="#7fbd83" />
      <AreaLabel position={[0, 4.2, 0]} text="Contact Cafe" />
    </group>
  );
};
