import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AREAS } from "@/data/world";
import { SolidBox, AreaLabel } from "@/game/props";
import { useGameStore } from "@/store/gameStore";

const FloatCube = ({ position, color }) => {
  const ref = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((state) => {
    if (!ref.current) return;
    if (!reduced) {
      ref.current.rotation.x += 0.008;
      ref.current.rotation.y += 0.01;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} flatShading />
    </mesh>
  );
};

export const SkillsWorkshop = () => {
  const p = AREAS.skills.position;
  return (
    <group position={p}>
      {/* Workshop building */}
      <SolidBox position={[0, 1.3, 0]} args={[5, 2.6, 4]} color="#b7c0c9" />
      {/* Saw-tooth industrial roof */}
      {[-1.4, 0, 1.4].map((x) => (
        <mesh key={x} position={[x, 2.8, 0]} rotation={[0, 0, 0.5]}><boxGeometry args={[1.1, 0.1, 4]} /><meshStandardMaterial color="#8a939c" /></mesh>
      ))}
      {/* Big garage door */}
      <mesh position={[0, 0.9, 2.02]}><boxGeometry args={[2.4, 1.6, 0.06]} /><meshStandardMaterial color="#5a636c" /></mesh>
      {/* Chimney */}
      <mesh position={[1.7, 3.4, -1]}><cylinderGeometry args={[0.25, 0.25, 1.4, 8]} /><meshStandardMaterial color="#7a5a4a" /></mesh>

      {/* Floating glowing tech cubes */}
      <FloatCube position={[-2.4, 2.4, 2.6]} color="#61dafb" />
      <FloatCube position={[2.4, 2.6, 2.6]} color="#f7df1e" />
      <FloatCube position={[0, 3.4, 2.4]} color="#2bb3b1" />
      <FloatCube position={[-1.2, 2.8, 3]} color="#f08a6b" />

      <AreaLabel position={[0, 4.6, 0]} text="Skills Workshop" />
    </group>
  );
};
