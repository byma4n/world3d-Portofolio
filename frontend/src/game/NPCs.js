import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { NPCS } from "@/data/world";
import { playerPosition } from "@/game/shared";

const Npc = ({ npc }) => {
  const ref = useRef();
  const [near, setNear] = useState(false);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 0.02 + Math.sin(state.clock.elapsedTime * 2 + npc.position[0]) * 0.04;
    const dx = playerPosition.x - npc.position[0];
    const dz = playerPosition.z - npc.position[2];
    const d = Math.hypot(dx, dz);
    const isNear = d < 3.5;
    setNear((prev) => (prev !== isNear ? isNear : prev));
  });
  return (
    <group position={npc.position}>
      <group ref={ref}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <capsuleGeometry args={[0.32, 0.7, 6, 12]} />
          <meshStandardMaterial color={npc.color} />
        </mesh>
        <mesh position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.3, 14, 14]} />
          <meshStandardMaterial color="#ffd9c9" />
        </mesh>
      </group>
      {near && (
        <Html position={[0, 2.2, 0]} center distanceFactor={12} zIndexRange={[30, 0]}>
          <div
            style={{ pointerEvents: "none", maxWidth: 220 }}
            className="glass-dark rounded-2xl px-3 py-2 text-center font-body text-xs"
            data-testid="npc-dialogue"
          >
            <div className="mb-0.5 font-mono-ui text-[9px] uppercase tracking-widest opacity-60">{npc.name}</div>
            {npc.line}
          </div>
        </Html>
      )}
    </group>
  );
};

export const NPCs = () => (
  <group>
    {NPCS.map((n) => (
      <Npc key={n.id} npc={n} />
    ))}
  </group>
);
