import React from "react";
import { RigidBody } from "@react-three/rapier";

export const Ground = () => {
  return (
    <>
      {/* Physics collider (invisible-ish flat box), top surface at y = 0 */}
      <RigidBody type="fixed" colliders="cuboid" friction={1}>
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[80, 1, 80]} />
          <meshStandardMaterial color="#8ecb8a" />
        </mesh>
      </RigidBody>

      {/* Island grass top (visual, rounded) */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[34, 48]} />
        <meshStandardMaterial color="#93cf8c" />
      </mesh>

      {/* Sandy rim */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[33.5, 36, 48]} />
        <meshStandardMaterial color="#e7d6ad" side={2} />
      </mesh>

      {/* Water plane around the island */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[70, 48]} />
        <meshStandardMaterial color="#7ec8e3" transparent opacity={0.85} />
      </mesh>
    </>
  );
};
