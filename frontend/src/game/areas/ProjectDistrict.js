import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { INTERACTABLES, AREAS } from "@/data/world";
import { projects } from "@/data/projects";
import { SolidBox, AreaLabel } from "@/game/props";
import { useGameStore } from "@/store/gameStore";

// A distinct building per project kind.
const ProjectBuilding = ({ position, project }) => {
  const spinRef = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((_, dt) => {
    if (spinRef.current && !reduced) spinRef.current.rotation.y += dt * 0.6;
  });
  const c = project.color;
  return (
    <group position={position}>
      {project.kind === "shop" && (
        <>
          <SolidBox position={[0, 1, 0]} args={[2.6, 2, 2.4]} color={c} />
          <mesh position={[0, 2.1, 1.3]} rotation={[0.5, 0, 0]}><boxGeometry args={[2.6, 0.1, 0.9]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0, 0.7, 1.21]}><boxGeometry args={[1.6, 1, 0.05]} /><meshStandardMaterial color="#bfe3ff" /></mesh>
        </>
      )}
      {project.kind === "control" && (
        <>
          <SolidBox position={[0, 0.9, 0]} args={[2.8, 1.8, 2.4]} color={c} />
          <mesh position={[0.8, 2.4, 0]} rotation={[0, 0, -0.4]}><cylinderGeometry args={[0.05, 0.05, 1.4, 6]} /><meshStandardMaterial color="#333" /></mesh>
          <mesh ref={spinRef} position={[1.2, 3, 0]}><torusGeometry args={[0.5, 0.08, 8, 20]} /><meshStandardMaterial color="#fff" /></mesh>
        </>
      )}
      {project.kind === "lab" && (
        <>
          <SolidBox position={[0, 0.6, 0]} args={[2.4, 1.2, 2.4]} color={c} />
          <mesh ref={spinRef} position={[0, 2.4, 0]} castShadow><icosahedronGeometry args={[0.9, 0]} /><meshStandardMaterial color="#ffffff" emissive={c} emissiveIntensity={0.5} flatShading /></mesh>
        </>
      )}
      {project.kind === "phone" && (
        <>
          <SolidBox position={[0, 1.6, 0]} args={[1.8, 3.2, 0.6]} color={c} />
          <mesh position={[0, 1.7, 0.32]}><boxGeometry args={[1.4, 2.6, 0.05]} /><meshStandardMaterial color="#0b0f14" emissive="#2bb3b1" emissiveIntensity={0.25} /></mesh>
        </>
      )}
      {/* Number sign */}
      <mesh position={[0, project.kind === "phone" ? 3.6 : 3.1, 0]}>
        <boxGeometry args={[1, 0.7, 0.1]} />
        <meshStandardMaterial color="#0b0f14" />
      </mesh>
    </group>
  );
};

export const ProjectDistrict = () => {
  const items = INTERACTABLES.filter((i) => i.type === "project");
  return (
    <group>
      {/* District plaza floor */}
      <mesh position={[AREAS.projects.position[0], 0.015, AREAS.projects.position[2]]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 32]} />
        <meshStandardMaterial color="#cdbfa0" />
      </mesh>
      {items.map((it) => {
        const project = projects.find((p) => p.id === it.projectId);
        return <ProjectBuilding key={it.id} position={it.position} project={project} />;
      })}
      <AreaLabel position={[AREAS.projects.position[0], 5.4, AREAS.projects.position[2]]} text="Project District" />
    </group>
  );
};
