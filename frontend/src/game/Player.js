import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { toast } from "sonner";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { INTERACTABLES, SECRETS, SPAWN } from "@/data/world";
import { playerPosition } from "@/game/shared";
import { track, EVENTS } from "@/lib/analytics";

const WALK_SPEED = 3.4;
const RUN_SPEED = 6.8;
const JUMP_VELOCITY = 6.2;
const GRAVITY = -20;

function Character({ legL, legR, armL, armR, bob }) {
  const skin = "#ffd9c9";
  return (
    <group>
      <group ref={bob}>
        {/* Torso (streetwear) */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <capsuleGeometry args={[0.42, 0.7, 8, 16]} />
          <meshStandardMaterial color="#2bb3b1" />
        </mesh>
        {/* Backpack */}
        <mesh position={[0, 0.85, -0.42]} castShadow>
          <boxGeometry args={[0.55, 0.7, 0.35]} />
          <meshStandardMaterial color="#f08a6b" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.4, 18, 18]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.14, 1.52, 0.34]}><sphereGeometry args={[0.055, 10, 10]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        <mesh position={[-0.14, 1.52, 0.34]}><sphereGeometry args={[0.055, 10, 10]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
        {/* Hair cap */}
        <mesh position={[0, 1.68, -0.03]}><sphereGeometry args={[0.41, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#3a2a22" /></mesh>
        {/* Arms (pivot at shoulder) */}
        <group ref={armL} position={[0.5, 1.02, 0]}>
          <mesh position={[0, -0.32, 0]} castShadow><capsuleGeometry args={[0.13, 0.5, 6, 10]} /><meshStandardMaterial color="#2bb3b1" /></mesh>
        </group>
        <group ref={armR} position={[-0.5, 1.02, 0]}>
          <mesh position={[0, -0.32, 0]} castShadow><capsuleGeometry args={[0.13, 0.5, 6, 10]} /><meshStandardMaterial color="#2bb3b1" /></mesh>
        </group>
      </group>
      {/* Legs (pivot at hip) */}
      <group ref={legL} position={[0.2, 0.42, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow><capsuleGeometry args={[0.15, 0.42, 6, 10]} /><meshStandardMaterial color="#20303a" /></mesh>
        <mesh position={[0, -0.56, 0.12]} castShadow><boxGeometry args={[0.24, 0.14, 0.42]} /><meshStandardMaterial color="#f7f6f2" /></mesh>
      </group>
      <group ref={legR} position={[-0.2, 0.42, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow><capsuleGeometry args={[0.15, 0.42, 6, 10]} /><meshStandardMaterial color="#20303a" /></mesh>
        <mesh position={[0, -0.56, 0.12]} castShadow><boxGeometry args={[0.24, 0.14, 0.42]} /><meshStandardMaterial color="#f7f6f2" /></mesh>
      </group>
    </group>
  );
}

export const Player = () => {
  const bodyRef = useRef(null);
  const meshRef = useRef(null);
  const legL = useRef(), legR = useRef(), armL = useRef(), armR = useRef(), bob = useRef();
  const { world } = useRapier();
  const [, getKeys] = useKeyboardControls();
  const { camera } = useThree();

  const controllerRef = useRef(null);
  const controllerWorldRef = useRef(null);
  const velocityY = useRef(0);
  const currentSpeed = useRef(0);
  const groundedRef = useRef(false);
  const moveDir = useRef(new THREE.Vector3(0, 0, -1));
  const targetQuat = useRef(new THREE.Quaternion());
  const camPos = useRef(new THREE.Vector3(0, 6, 12));
  const camTarget = useRef(new THREE.Vector3());
  const walkPhase = useRef(0);
  const idleTime = useRef(0);
  const spawnedRef = useRef(false);

  useFrame((state, delta) => {
    const body = bodyRef.current;
    if (!body) return;
    const collider = body.collider(0);
    if (!collider) return;
    if (controllerRef.current === null || controllerWorldRef.current !== world) {
      const c = world.createCharacterController(0.01);
      c.enableAutostep(0.6, 0.25, true);
      c.enableSnapToGround(0.6);
      c.setApplyImpulsesToDynamicBodies(true);
      controllerRef.current = c;
      controllerWorldRef.current = world;
    }
    const controller = controllerRef.current;
    const dt = Math.min(delta, 0.05);
    const store = useGameStore.getState();
    const paused = !!store.activePanel || store.isMenuOpen;
    const reduced = store.reducedMotion;

    if (!spawnedRef.current) {
      spawnedRef.current = true;
      track(EVENTS.CHARACTER_SPAWNED, {});
    }

    // ---- Input ----
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0; camDir.normalize();
    const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    const input = new THREE.Vector3();
    let wantsJump = false;
    let wantsRun = false;
    if (!paused) {
      const keys = getKeys();
      if (keys.forward) input.add(camDir);
      if (keys.backward) input.sub(camDir);
      if (keys.right) input.add(camRight);
      if (keys.left) input.sub(camRight);
      wantsJump = keys.jump;
      wantsRun = keys.run;
      // Mobile joystick
      const m = store.mobileMove;
      if (m && (Math.abs(m.x) > 0.08 || Math.abs(m.y) > 0.08)) {
        input.add(camDir.clone().multiplyScalar(-m.y));
        input.add(camRight.clone().multiplyScalar(m.x));
        if (Math.hypot(m.x, m.y) > 0.75) wantsRun = true;
      }
      if (store.mobileJump) wantsJump = true;
    }

    const moving = input.lengthSq() > 0.001;
    if (moving) input.normalize();
    const maxSpeed = wantsRun ? RUN_SPEED : WALK_SPEED;
    const targetSpeed = moving ? maxSpeed : 0;
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, 1 - Math.pow(0.0015, dt));
    if (moving) moveDir.current.copy(input);

    // ---- Gravity + jump ----
    const grounded = groundedRef.current;
    if (grounded && velocityY.current <= 0) {
      velocityY.current = -0.6;
      if (wantsJump) velocityY.current = JUMP_VELOCITY;
    } else {
      velocityY.current += GRAVITY * dt;
    }

    const horiz = moving
      ? new THREE.Vector3().copy(moveDir.current).multiplyScalar(currentSpeed.current * dt)
      : new THREE.Vector3();
    const desired = new THREE.Vector3(horiz.x, velocityY.current * dt, horiz.z);
    controller.computeColliderMovement(collider, desired);
    groundedRef.current = controller.computedGrounded();
    const corr = controller.computedMovement();
    const t = body.translation();
    // respawn if fell off world
    if (t.y < -8) {
      body.setNextKinematicTranslation({ x: SPAWN.position[0], y: SPAWN.position[1], z: SPAWN.position[2] });
      velocityY.current = 0;
    } else {
      body.setNextKinematicTranslation({ x: t.x + corr.x, y: t.y + corr.y, z: t.z + corr.z });
    }

    // update shared position
    playerPosition.set(t.x, t.y, t.z);
    if (typeof window !== "undefined") window.__ppos = [Number(t.x.toFixed(2)), Number(t.y.toFixed(2)), Number(t.z.toFixed(2))];

    // ---- Rotate toward movement ----
    if (moving && meshRef.current) {
      const angle = Math.atan2(moveDir.current.x, moveDir.current.z);
      targetQuat.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      meshRef.current.quaternion.slerp(targetQuat.current, 1 - Math.pow(0.0008, dt));
    }

    // ---- Character animation ----
    const speedNorm = Math.min(currentSpeed.current / RUN_SPEED, 1);
    if (speedNorm > 0.02) {
      idleTime.current = 0;
      walkPhase.current += dt * (6 + speedNorm * 8);
      const amp = 0.5 + speedNorm * 0.5;
      const s = Math.sin(walkPhase.current) * amp;
      if (legL.current) legL.current.rotation.x = s;
      if (legR.current) legR.current.rotation.x = -s;
      if (armL.current) armL.current.rotation.x = -s * 0.8;
      if (armR.current) armR.current.rotation.x = s * 0.8;
      if (bob.current) bob.current.position.y = Math.abs(Math.sin(walkPhase.current)) * 0.06 * speedNorm;
    } else {
      idleTime.current += dt;
      const breathe = Math.sin(state.clock.elapsedTime * 1.6) * 0.03;
      if (bob.current) bob.current.position.y = breathe;
      // occasional wave when idle a while
      const waving = idleTime.current > 4 && idleTime.current < 6;
      const ease = 1 - Math.pow(0.01, dt);
      if (legL.current) legL.current.rotation.x = THREE.MathUtils.lerp(legL.current.rotation.x, 0, ease);
      if (legR.current) legR.current.rotation.x = THREE.MathUtils.lerp(legR.current.rotation.x, 0, ease);
      if (armR.current) armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, 0, ease);
      if (armL.current) {
        const target = waving ? -2.4 + Math.sin(state.clock.elapsedTime * 12) * 0.3 : 0;
        armL.current.rotation.x = THREE.MathUtils.lerp(armL.current.rotation.x, target, ease);
      }
      if (idleTime.current > 7) idleTime.current = 0;
    }

    // ---- Interaction detection ----
    let nearest = null;
    let nearestD = Infinity;
    for (const it of INTERACTABLES) {
      const dx = t.x - it.position[0];
      const dz = t.z - it.position[2];
      const d = Math.hypot(dx, dz);
      if (d < it.radius && d < nearestD) { nearestD = d; nearest = it; }
    }
    if (nearest) {
      store.setNearbyInteractable({ id: nearest.id, type: nearest.type, label: nearest.label, projectId: nearest.projectId });
      if (nearest.type === "project" && store.markDiscovered(nearest.projectId)) {
        track(EVENTS.PROJECT_DISCOVERED, { project: nearest.projectId });
      }
    } else {
      store.setNearbyInteractable(null);
    }

    // ---- Secret detection ----
    for (const s of SECRETS) {
      const dx = t.x - s.position[0];
      const dz = t.z - s.position[2];
      if (Math.hypot(dx, dz) < s.radius && !store.secrets.includes(s.id)) {
        store.addSecret(s.id);
        track(EVENTS.SECRET_FOUND, { id: s.id });
        toast.success(s.title, { description: s.message });
        if (store.soundEnabled && window.__walkfolioAudio) window.__walkfolioAudio("secret");
      }
    }

    // ---- Camera ----
    const camLag = reduced ? 0.00001 : 0.0006;
    const playerPos = new THREE.Vector3(t.x, t.y, t.z);
    const backDist = 8;
    const desiredCam = new THREE.Vector3(
      playerPos.x - camDir.x * backDist,
      playerPos.y + 4.6,
      playerPos.z - camDir.z * backDist
    );
    camPos.current.lerp(desiredCam, 1 - Math.pow(camLag, dt));
    if (camPos.current.y < playerPos.y + 1.2) camPos.current.y = playerPos.y + 1.2;
    camera.position.copy(camPos.current);
    camTarget.current.lerp(new THREE.Vector3(playerPos.x, playerPos.y + 1.3, playerPos.z), 1 - Math.pow(camLag, dt));
    camera.lookAt(camTarget.current);
  });

  return (
    <RigidBody
      ref={bodyRef}
      type="kinematicPosition"
      colliders={false}
      position={SPAWN.position}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.5, 0.45]} />
      <group ref={meshRef}>
        <Character legL={legL} legR={legR} armL={armL} armR={armR} bob={bob} />
      </group>
    </RigidBody>
  );
};
