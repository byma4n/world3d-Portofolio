import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  CapsuleCollider,
  useRapier,
} from "@react-three/rapier";
import { KeyboardControls, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------- Controls map ----------------------------- */
const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["ShiftLeft", "ShiftRight"] },
  { name: "jump", keys: ["Space"] },
];

/* ----------------------------- Player ----------------------------- */
const WALK_SPEED = 3.2;
const RUN_SPEED = 6.4;
const JUMP_VELOCITY = 6.0;
const GRAVITY = -18;

function Player() {
  const bodyRef = useRef(null);
  const meshRef = useRef(null);
  const { world } = useRapier();
  const [, getKeys] = useKeyboardControls();
  const { camera } = useThree();

  // Character controller (created lazily, recreated if world changes - StrictMode safe)
  const controllerRef = useRef(null);
  const controllerWorldRef = useRef(null);

  const velocityY = useRef(0);
  const currentSpeed = useRef(0);
  const groundedRef = useRef(false);
  const moveDir = useRef(new THREE.Vector3());
  const targetQuat = useRef(new THREE.Quaternion());
  const camTarget = useRef(new THREE.Vector3());
  const camPos = useRef(new THREE.Vector3(0, 6, 10));

  useFrame((state, delta) => {
    const body = bodyRef.current;
    if (!body) return;
    const collider = body.collider(0);
    if (!collider) return;

    // (Re)create character controller bound to the current physics world
    if (controllerRef.current === null || controllerWorldRef.current !== world) {
      const c = world.createCharacterController(0.01);
      c.enableAutostep(0.5, 0.2, true);
      c.enableSnapToGround(0.5);
      c.setApplyImpulsesToDynamicBodies(true);
      controllerRef.current = c;
      controllerWorldRef.current = world;
    }
    const controller = controllerRef.current;

    const dt = Math.min(delta, 1 / 30);
    const keys = getKeys();

    // Camera-relative movement basis
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();
    const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    const input = new THREE.Vector3();
    if (keys.forward) input.add(camDir);
    if (keys.backward) input.sub(camDir);
    if (keys.right) input.add(camRight);
    if (keys.left) input.sub(camRight);

    const moving = input.lengthSq() > 0.001;
    if (moving) input.normalize();

    const maxSpeed = keys.run ? RUN_SPEED : WALK_SPEED;
    const targetSpeed = moving ? maxSpeed : 0;
    // accel / decel
    currentSpeed.current = THREE.MathUtils.lerp(
      currentSpeed.current,
      targetSpeed,
      1 - Math.pow(0.001, dt)
    );

    if (moving) moveDir.current.copy(input);

    // gravity + jump using PREVIOUS frame grounded state
    const grounded = groundedRef.current;
    if (grounded && velocityY.current <= 0) {
      velocityY.current = -0.5; // keep grounded
      if (keys.jump) velocityY.current = JUMP_VELOCITY;
    } else {
      velocityY.current += GRAVITY * dt;
    }

    const horizontal = moving
      ? new THREE.Vector3().copy(moveDir.current).multiplyScalar(currentSpeed.current * dt)
      : new THREE.Vector3(0, 0, 0);
    const desired = new THREE.Vector3(horizontal.x, velocityY.current * dt, horizontal.z);

    controller.computeColliderMovement(collider, desired);
    groundedRef.current = controller.computedGrounded();
    const corrected = controller.computedMovement();

    const t = body.translation();
    body.setNextKinematicTranslation({
      x: t.x + corrected.x,
      y: t.y + corrected.y,
      z: t.z + corrected.z,
    });

    // Rotate mesh toward movement direction
    if (moving && meshRef.current) {
      const angle = Math.atan2(moveDir.current.x, moveDir.current.z);
      targetQuat.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      meshRef.current.quaternion.slerp(targetQuat.current, 1 - Math.pow(0.001, dt));
    }

    // Third-person camera follow
    const playerPos = new THREE.Vector3(t.x, t.y, t.z);
    const desiredCamPos = new THREE.Vector3(
      playerPos.x - camDir.x * 8,
      playerPos.y + 4.5,
      playerPos.z - camDir.z * 8
    );
    camPos.current.lerp(desiredCamPos, 1 - Math.pow(0.0001, dt));
    camera.position.copy(camPos.current);
    camTarget.current.lerp(
      new THREE.Vector3(playerPos.x, playerPos.y + 1.2, playerPos.z),
      1 - Math.pow(0.0001, dt)
    );
    camera.lookAt(camTarget.current);
  });

  return (
    <RigidBody
      ref={bodyRef}
      type="kinematicPosition"
      colliders={false}
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.6, 0.5]} />
      <group ref={meshRef}>
        {/* body */}
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.5, 1.2, 8, 16]} />
          <meshStandardMaterial color="#ff7a59" />
        </mesh>
        {/* head */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshStandardMaterial color="#ffd9c9" />
        </mesh>
        {/* face direction marker */}
        <mesh position={[0, 1.15, 0.38]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
    </RigidBody>
  );
}

/* ----------------------------- World ----------------------------- */
function World() {
  return (
    <>
      {/* Ground */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[60, 1, 60]} />
          <meshStandardMaterial color="#8ecb8a" />
        </mesh>
      </RigidBody>

      {/* Some obstacle boxes */}
      {[
        [6, 1, 0, "#c98bdb"],
        [-6, 1.5, 4, "#7ec8e3"],
        [0, 1, -8, "#f2c14e"],
        [8, 2, -6, "#f08a5d"],
      ].map(([x, h, z, color], i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid" position={[x, h, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, h * 2, 2]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}

/* ----------------------------- App ----------------------------- */
export default function Poc() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#bfe3ff" }}>
      <KeyboardControls map={controlsMap}>
        <Canvas shadows camera={{ position: [0, 6, 10], fov: 55 }}>
          <Suspense fallback={null}>
            <color attach="background" args={["#bfe3ff"]} />
            <fog attach="fog" args={["#bfe3ff", 40, 90]} />
            <hemisphereLight args={["#ffffff", "#8ecb8a", 0.9]} />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 20, 10]}
              intensity={1.8}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-left={-30}
              shadow-camera-right={30}
              shadow-camera-top={30}
              shadow-camera-bottom={-30}
            />
            <Physics gravity={[0, -18, 0]}>
              <World />
              <Player />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          color: "#0b2b3a",
          fontFamily: "system-ui, sans-serif",
          background: "rgba(255,255,255,0.7)",
          padding: "8px 12px",
          borderRadius: 8,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        WASD move · SHIFT run · SPACE jump
      </div>
    </div>
  );
}
