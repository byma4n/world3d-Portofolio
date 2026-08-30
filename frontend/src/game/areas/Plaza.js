import React from "react";
import { AREAS } from "@/data/world";
import { Tree, Lamp, Bench, Path, Signpost, AreaLabel } from "@/game/props";
import { Fountain } from "@/game/areas/Fountain";

export const Plaza = () => {
  const p = AREAS.plaza.position;
  return (
    <group position={p}>
      {/* Plaza floor tiles */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[8, 36]} />
        <meshStandardMaterial color="#cdbfa0" />
      </mesh>

      <Fountain position={[0, 0, 0]} />

      {/* Paths radiating to the areas */}
      <Path position={[-9, 0, -4]} args={[3, 12]} rotation={0.9} />
      <Path position={[9, 0, -4]} args={[3, 12]} rotation={-0.9} />
      <Path position={[-9, 0, 6]} args={[3, 12]} rotation={-0.7} />
      <Path position={[9, 0, 7]} args={[3, 12]} rotation={0.7} />
      <Path position={[0, 0, -11]} args={[3, 12]} rotation={0} />

      {/* Benches */}
      <Bench position={[3.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Bench position={[-3.4, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

      {/* Lamps */}
      <Lamp position={[5, 0, 5]} />
      <Lamp position={[-5, 0, 5]} />
      <Lamp position={[5, 0, -5]} />
      <Lamp position={[-5, 0, -5]} />

      {/* Trees ring */}
      {[[-7, 0, 2], [7, 0, 2], [-7, 0, -2], [7, 0, -2], [-2, 0, 7], [2, 0, 7]].map((t, i) => (
        <Tree key={i} position={t} scale={0.9 + (i % 3) * 0.15} tone={i % 2 ? "#6faf7a" : "#7fbd83"} />
      ))}

      {/* Signposts hinting directions */}
      <Signpost position={[-2.4, 0, -2.4]} color="#f08a6b" />
      <Signpost position={[2.4, 0, -2.4]} color="#2bb3b1" />

      <AreaLabel position={[0, 5.4, 0]} text="Central Plaza" />
    </group>
  );
};
