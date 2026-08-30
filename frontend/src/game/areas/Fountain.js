import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";

export const Fountain = ({ position = [0, 0, 0] }) => {
  const waterRef = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((state) => {
    if (!waterRef.current || reduced) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
    waterRef.current.scale.set(s, 1, s);
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 2, 0.5, 24]} />
        <meshStandardMaterial color="#c9bfa8" />
      </mesh>
      <mesh ref={waterRef} position={[0, 0.42, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 24]} />
        <meshStandardMaterial color="#7ec8e3" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 1.1, 12]} />
        <meshStandardMaterial color="#c9bfa8" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#7ec8e3" emissive="#2bb3b1" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};
