import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import { track, EVENTS } from "@/lib/analytics";
import { Ground } from "@/game/Ground";
import { Player } from "@/game/Player";
import { Plaza } from "@/game/areas/Plaza";
import { AboutHouse } from "@/game/areas/AboutHouse";
import { ProjectDistrict } from "@/game/areas/ProjectDistrict";
import { SkillsWorkshop } from "@/game/areas/SkillsWorkshop";
import { ExperienceStation } from "@/game/areas/ExperienceStation";
import { ContactCafe } from "@/game/areas/ContactCafe";
import { Collectibles } from "@/game/Collectibles";
import { NPCs } from "@/game/NPCs";
import { Cloud } from "@/game/props";
import { SECRETS } from "@/data/world";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["ShiftLeft", "ShiftRight"] },
  { name: "jump", keys: ["Space"] },
];

const SecretObjects = () => (
  <group>
    {/* Hidden room desk behind project district */}
    <group position={SECRETS[0].position}>
      <mesh position={[0, 0.6, 0]} castShadow><boxGeometry args={[1.4, 0.1, 0.7]} /><meshStandardMaterial color="#7a5a3a" /></mesh>
      <mesh position={[0, 1, -0.25]}><boxGeometry args={[0.7, 0.45, 0.05]} /><meshStandardMaterial color="#0b0f14" emissive="#2bb3b1" emissiveIntensity={0.4} /></mesh>
    </group>
    {/* Secret floating island object */}
    <group position={SECRETS[2].position}>
      <mesh position={[0, 2.5, 0]} castShadow><torusKnotGeometry args={[0.5, 0.16, 64, 8]} /><meshStandardMaterial color="#ffd76b" emissive="#ffbf3b" emissiveIntensity={0.8} flatShading /></mesh>
    </group>
  </group>
);

export const GameWorld = () => {
  const graphics = useGameStore((s) => s.graphics);
  const reduced = useGameStore((s) => s.reducedMotion);

  useEffect(() => {
    track(EVENTS.WORLD_LOADED, {});
  }, []);

  const shadows = graphics !== "low";
  const shadowSize = graphics === "high" ? 1536 : 1024;
  const dpr = graphics === "high" ? [1, 1.5] : graphics === "medium" ? [1, 1.25] : [1, 1];

  return (
    <KeyboardControls map={controlsMap}>
      <Canvas
        shadows={shadows}
        dpr={dpr}
        camera={{ position: [0, 6, 14], fov: 55, near: 0.1, far: 200 }}
        style={{ position: "fixed", inset: 0 }}
        gl={{ antialias: graphics !== "low", powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#bfe6ff"]} />
        <fog attach="fog" args={["#cfeeff", 45, 95]} />
        <hemisphereLight args={["#ffffff", "#9ccf90", 0.85]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[18, 26, 12]}
          intensity={1.7}
          castShadow={shadows}
          shadow-mapSize-width={shadowSize}
          shadow-mapSize-height={shadowSize}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-camera-far={80}
          shadow-bias={-0.0004}
        />
        {/* Sun */}
        <mesh position={[18, 30, -20]}>
          <sphereGeometry args={[3, 16, 16]} />
          <meshBasicMaterial color="#fff3c4" />
        </mesh>

        <Suspense fallback={null}>
          <Physics gravity={[0, GRAVITY_VEC, 0]}>
            <Ground />
            <Plaza />
            <AboutHouse />
            <ProjectDistrict />
            <SkillsWorkshop />
            <ExperienceStation />
            <ContactCafe />
            <SecretObjects />
            <Collectibles />
            <NPCs />
            <Player />
          </Physics>

          {!reduced && (
            <>
              <Cloud position={[-20, 18, -10]} speed={0.5} />
              <Cloud position={[10, 22, -25]} speed={0.35} />
              <Cloud position={[25, 16, 5]} speed={0.6} />
            </>
          )}
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

const GRAVITY_VEC = -20;
