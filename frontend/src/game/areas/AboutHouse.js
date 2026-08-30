import React from "react";
import { AREAS } from "@/data/world";
import { SolidBox, Tree, AreaLabel } from "@/game/props";

export const AboutHouse = () => {
  const p = AREAS.about.position;
  return (
    <group position={p}>
      {/* House body */}
      <SolidBox position={[0, 1.1, 0]} args={[4.4, 2.2, 3.6]} color="#f2e3c6" />
      {/* Roof */}
      <mesh position={[0, 2.7, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.4, 1.4, 4]} />
        <meshStandardMaterial color="#c0603f" flatShading />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.7, 1.81]}>
        <boxGeometry args={[0.9, 1.4, 0.06]} />
        <meshStandardMaterial color="#8a5a3a" />
      </mesh>
      {/* Windows */}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 1.3, 1.82]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#bfe3ff" emissive="#8bc6ec" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* Mailbox */}
      <group position={[2.4, 0, 1.6]}>
        <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.05, 0.05, 1.2, 6]} /><meshStandardMaterial color="#5a5a5a" /></mesh>
        <mesh position={[0, 1.15, 0]}><boxGeometry args={[0.35, 0.25, 0.5]} /><meshStandardMaterial color="#2bb3b1" /></mesh>
      </group>
      {/* Small garden plants */}
      {[[-1.8, 0, 2.2], [-1.2, 0, 2.4], [1.8, 0, 2.2]].map((g, i) => (
        <mesh key={i} position={[g[0], 0.2, g[2]]}><icosahedronGeometry args={[0.3, 0]} /><meshStandardMaterial color="#6faf7a" flatShading /></mesh>
      ))}
      <Tree position={[-3, 0, -1]} scale={1.1} />
      <Tree position={[3, 0, -1.5]} scale={0.9} tone="#7fbd83" />
      <AreaLabel position={[0, 4.2, 0]} text="About House" />
    </group>
  );
};
