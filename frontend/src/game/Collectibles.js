import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { toast } from "sonner";
import { COLLECTIBLES } from "@/data/world";
import { useGameStore } from "@/store/gameStore";
import { playerPosition } from "@/game/shared";
import { track, EVENTS } from "@/lib/analytics";

const Star = ({ position, collected, onCollect }) => {
  const ref = useRef();
  useFrame((state, dt) => {
    if (!ref.current || collected) return;
    ref.current.rotation.y += dt * 1.5;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    const dx = playerPosition.x - position[0];
    const dz = playerPosition.z - position[2];
    if (Math.hypot(dx, dz) < 1.4 && Math.abs(playerPosition.y - position[1]) < 2) {
      onCollect();
    }
  });
  if (collected) return null;
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#ffd76b" emissive="#ffbf3b" emissiveIntensity={1.1} flatShading />
      </mesh>
    </group>
  );
};

export const Collectibles = () => {
  const collected = useGameStore((s) => s.collectibles);
  const addCollectible = useGameStore((s) => s.addCollectible);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const [, force] = useState(0);

  const collect = (id) => {
    const ok = addCollectible(id);
    if (!ok) return;
    track(EVENTS.COLLECTIBLE_FOUND, { id });
    const count = useGameStore.getState().collectibles.length;
    if (soundEnabled && window.__walkfolioAudio) window.__walkfolioAudio("collect");
    if (count >= COLLECTIBLES.length) {
      toast.success("Explorer Mode Unlocked!", { description: "You found all 5 stars. Nice exploring." });
    } else {
      toast(`Star collected ★`, { description: `${count} / ${COLLECTIBLES.length} discovered` });
    }
    force((n) => n + 1);
  };

  return (
    <group>
      {COLLECTIBLES.map((c) => (
        <Star key={c.id} position={c.position} collected={collected.includes(c.id)} onCollect={() => collect(c.id)} />
      ))}
    </group>
  );
};
