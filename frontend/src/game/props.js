import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";

// A fixed solid box obstacle with a cuboid collider.
export const SolidBox = ({ position = [0, 0, 0], args = [1, 1, 1], color = "#ffffff", ...rest }) => (
  <RigidBody type="fixed" colliders="cuboid" position={position} {...rest}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  </RigidBody>
);

export const Tree = ({ position = [0, 0, 0], scale = 1, tone = "#6faf7a" }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.6, 0]} castShadow>
      <cylinderGeometry args={[0.16, 0.22, 1.2, 8]} />
      <meshStandardMaterial color="#8a6a4a" />
    </mesh>
    <mesh position={[0, 1.5, 0]} castShadow>
      <icosahedronGeometry args={[0.85, 0]} />
      <meshStandardMaterial color={tone} flatShading />
    </mesh>
    <mesh position={[0.35, 2.05, 0.1]} castShadow>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={tone} flatShading />
    </mesh>
  </group>
);

export const Lamp = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <mesh position={[0, 1.2, 0]} castShadow>
      <cylinderGeometry args={[0.06, 0.08, 2.4, 6]} />
      <meshStandardMaterial color="#3a4048" />
    </mesh>
    <mesh position={[0, 2.45, 0]}>
      <sphereGeometry args={[0.18, 12, 12]} />
      <meshStandardMaterial color="#ffe9a8" emissive="#ffd76b" emissiveIntensity={1.6} />
    </mesh>
  </group>
);

export const Bench = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.35, 0]} castShadow>
      <boxGeometry args={[1.4, 0.1, 0.45]} />
      <meshStandardMaterial color="#b98a5e" />
    </mesh>
    <mesh position={[0, 0.62, -0.18]} castShadow>
      <boxGeometry args={[1.4, 0.4, 0.1]} />
      <meshStandardMaterial color="#b98a5e" />
    </mesh>
    {[-0.6, 0.6].map((x) => (
      <mesh key={x} position={[x, 0.17, 0]}>
        <boxGeometry args={[0.1, 0.34, 0.4]} />
        <meshStandardMaterial color="#7a5a3a" />
      </mesh>
    ))}
  </group>
);

export const Path = ({ position = [0, 0, 0], args = [3, 6], rotation = 0 }) => (
  <mesh position={[position[0], 0.02, position[2]]} rotation={[-Math.PI / 2, 0, rotation]} receiveShadow>
    <planeGeometry args={args} />
    <meshStandardMaterial color="#d8c8a6" />
  </mesh>
);

export const Cloud = ({ position = [0, 0, 0], speed = 0.4, range = 40 }) => {
  const ref = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    ref.current.position.x += speed * dt;
    if (ref.current.position.x > range) ref.current.position.x = -range;
  });
  return (
    <group ref={ref} position={position}>
      {[[0, 0, 0, 1.6], [1.3, -0.2, 0, 1.1], [-1.3, -0.1, 0.2, 1.2], [0.4, 0.4, -0.3, 1]].map((c, i) => (
        <mesh key={i} position={[c[0], c[1], c[2]]}>
          <sphereGeometry args={[c[3], 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
};

export const Flag = ({ position = [0, 0, 0], color = "#2bb3b1" }) => {
  const ref = useRef();
  const reduced = useGameStore.getState().reducedMotion;
  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.25;
  });
  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 6]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh ref={ref} position={[0.4, 1.9, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color={color} side={2} />
      </mesh>
    </group>
  );
};

export const AreaLabel = ({ position = [0, 3, 0], text }) => (
  <Html position={position} center distanceFactor={16} zIndexRange={[20, 0]}>
    <div
      style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      className="glass-dark rounded-full px-3 py-1 font-display text-sm font-semibold"
    >
      {text}
    </div>
  </Html>
);

// A little signpost with a colored board.
export const Signpost = ({ position = [0, 0, 0], color = "#2bb3b1" }) => (
  <group position={position}>
    <mesh position={[0, 0.7, 0]} castShadow>
      <cylinderGeometry args={[0.07, 0.07, 1.4, 6]} />
      <meshStandardMaterial color="#8a6a4a" />
    </mesh>
    <mesh position={[0, 1.4, 0]} castShadow>
      <boxGeometry args={[0.9, 0.5, 0.08]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
);
