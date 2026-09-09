'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ──────────────────────────────────────────────
   Shared interaction state (passed via ref for perf)
   ────────────────────────────────────────────── */
interface InteractionState {
  x: number;           // normalized mouse x  (-1 to 1)
  y: number;           // normalized mouse y  (-1 to 1)
  hovering: boolean;   // is cursor inside canvas
  clicked: boolean;    // was just clicked (single pulse)
  clickTime: number;   // timestamp of last click
}

/* ──────────────────────────────────────────────
   Reactive particles that scatter on click
   and get attracted toward cursor on hover
   ────────────────────────────────────────────── */
function Particles({ count = 60, state }: { count?: number; state: React.MutableRefObject<InteractionState> }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Each particle stores: base position (orbit) + current offset + velocity
  const data = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const currentPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const orbitSpeeds = new Float32Array(count);
    const orbitRadii = new Float32Array(count);
    const orbitPhases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;
      const x = r * Math.cos(theta) * Math.cos(phi);
      const y = r * Math.sin(phi);
      const z = r * Math.sin(theta) * Math.cos(phi);
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      orbitSpeeds[i] = 0.15 + Math.random() * 0.35;
      orbitRadii[i] = r;
      orbitPhases[i] = theta;
    }
    return { basePositions, currentPositions, velocities, orbitSpeeds, orbitRadii, orbitPhases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const { hovering, x: mx, y: my, clickTime } = state.current;
    const timeSinceClick = t - clickTime;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Mouse position in 3D space (projected to z=0 plane)
    const mouseX = mx * 3;
    const mouseY = my * 3;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Orbit base position (always rotating)
      const speed = data.orbitSpeeds[i];
      const phase = data.orbitPhases[i] + t * speed;
      const r = data.orbitRadii[i];
      const baseX = r * Math.cos(phase) * Math.cos(data.basePositions[idx + 1] / r);
      const baseY = data.basePositions[idx + 1] + Math.sin(t * 0.5 + i) * 0.15;
      const baseZ = r * Math.sin(phase) * Math.cos(data.basePositions[idx + 1] / r);

      let targetX = baseX;
      let targetY = baseY;
      let targetZ = baseZ;

      // Click explosion: push particles outward
      if (timeSinceClick < 1.2) {
        const explosionStrength = Math.max(0, 1 - timeSinceClick / 1.2) * 2.5;
        const dx = posArr[idx] || baseX;
        const dy = posArr[idx + 1] || baseY;
        const dz = posArr[idx + 2] || baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        targetX += (dx / dist) * explosionStrength;
        targetY += (dy / dist) * explosionStrength;
        targetZ += (dz / dist) * explosionStrength * 0.5;
      }

      // Hover attraction: particles drift toward cursor
      if (hovering) {
        const attractStrength = 0.6;
        targetX += (mouseX - targetX) * attractStrength * 0.15;
        targetY += (mouseY - targetY) * attractStrength * 0.15;
        targetZ += (0 - targetZ) * 0.05; // flatten toward camera
      }

      // Smooth lerp toward target
      const lerp = 0.06;
      posArr[idx] += (targetX - posArr[idx]) * lerp;
      posArr[idx + 1] += (targetY - posArr[idx + 1]) * lerp;
      posArr[idx + 2] += (targetZ - posArr[idx + 2]) * lerp;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Change particle size/opacity based on hover
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    const targetSize = hovering ? 0.09 : 0.05;
    const targetOpacity = hovering ? 0.9 : 0.6;
    mat.size += (targetSize - mat.size) * 0.08;
    mat.opacity += (targetOpacity - mat.opacity) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c084fc"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────
   Glowing ring that reacts to hover & click
   ────────────────────────────────────────────── */
function GlowRing({ state }: { state: React.MutableRefObject<InteractionState> }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const { hovering, clickTime } = state.current;
    const timeSinceClick = t - clickTime;

    // Base pulsation
    let scale = 1 + Math.sin(t * 1.5) * 0.06;
    let opacity = 0.12 + Math.sin(t * 2) * 0.05;

    // Expand & brighten on hover
    if (hovering) {
      scale += 0.15;
      opacity += 0.1;
    }

    // Click shockwave
    if (timeSinceClick < 0.8) {
      const wave = Math.max(0, 1 - timeSinceClick / 0.8);
      scale += wave * 0.5;
      opacity += wave * 0.3;
    }

    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;

    // Slowly rotate
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 0, -0.35]}>
      <ringGeometry args={[1.5, 2.6, 64]} />
      <meshBasicMaterial
        color="#843aed"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ──────────────────────────────────────────────
   Second inner glow ring
   ────────────────────────────────────────────── */
function InnerGlow({ state }: { state: React.MutableRefObject<InteractionState> }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const { hovering } = state.current;
    const targetOpacity = hovering ? 0.25 : 0.08;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity += (targetOpacity - mat.opacity) * 0.06;
    ref.current.rotation.z = -t * 0.15;
    ref.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.04);
  });

  return (
    <mesh ref={ref} position={[0, 0, -0.25]}>
      <ringGeometry args={[0.9, 1.6, 48]} />
      <meshBasicMaterial
        color="#4349ff"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ──────────────────────────────────────────────
   The main chip – detailed, interactive
   ────────────────────────────────────────────── */
function ChipModel({ state }: { state: React.MutableRefObject<InteractionState> }) {
  const groupRef = useRef<THREE.Group>(null!);
  // Track smoothed values for lerp
  const smoothed = useRef({ rotX: 0, rotY: 0, posX: 0, posY: 0, scale: 1, emissive: 0.5 });

  const chipParts = useMemo(() => {
    const parts: { pos: [number, number, number]; size: [number, number, number]; isBody?: boolean; isPin?: boolean }[] = [];
    const s = 0.8;

    // Central body
    parts.push({ pos: [0, 0, 0], size: [1.6 * s, 1.6 * s, 0.3 * s], isBody: true });

    // Pins – top, bottom, left, right (3 each)
    for (let i = -1; i <= 1; i++) {
      parts.push({ pos: [i * 0.45 * s, 1.1 * s, 0], size: [0.2 * s, 0.55 * s, 0.22 * s], isPin: true });
      parts.push({ pos: [i * 0.45 * s, -1.1 * s, 0], size: [0.2 * s, 0.55 * s, 0.22 * s], isPin: true });
      parts.push({ pos: [-1.1 * s, i * 0.45 * s, 0], size: [0.55 * s, 0.2 * s, 0.22 * s], isPin: true });
      parts.push({ pos: [1.1 * s, i * 0.45 * s, 0], size: [0.55 * s, 0.2 * s, 0.22 * s], isPin: true });
    }

    return parts;
  }, []);

  // Circuit trace lines on the chip face
  const circuitTraces = useMemo(() => {
    const traces: { start: [number, number]; end: [number, number]; width: number }[] = [
      // Horizontal traces
      { start: [-0.45, 0.2], end: [0.1, 0.2], width: 0.02 },
      { start: [0.15, 0.2], end: [0.45, 0.2], width: 0.015 },
      { start: [-0.3, -0.15], end: [0.35, -0.15], width: 0.02 },
      // Vertical traces
      { start: [0.1, 0.2], end: [0.1, -0.15], width: 0.015 },
      { start: [-0.25, 0.35], end: [-0.25, -0.3], width: 0.015 },
      { start: [0.3, 0.1], end: [0.3, -0.35], width: 0.02 },
      // Diagonal
      { start: [-0.1, 0.35], end: [0.1, 0.2], width: 0.012 },
      { start: [0.35, -0.15], end: [0.45, -0.3], width: 0.012 },
    ];
    return traces;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const { x: mx, y: my, hovering, clickTime } = state.current;
    const sm = smoothed.current;
    const timeSinceClick = t - clickTime;

    // ─── Mouse-driven rotation (DOMINANT when hovering) ───
    const mouseInfluence = hovering ? 0.85 : 0;
    const autoInfluence = hovering ? 0.15 : 1;

    // Auto rotation (gentle idle)
    const autoRotY = Math.sin(t * 0.4) * 0.2 + t * 0.06;
    const autoRotX = Math.sin(t * 0.25) * 0.1;

    // Mouse target rotation (strong when hovering)
    const mouseRotY = mx * 1.2;  // up to ±1.2 radians
    const mouseRotX = -my * 0.8; // up to ±0.8 radians

    const targetRotY = autoRotY * autoInfluence + mouseRotY * mouseInfluence;
    const targetRotX = autoRotX * autoInfluence + mouseRotX * mouseInfluence;

    // Click: add a full spin
    let clickSpin = 0;
    if (timeSinceClick < 1.0) {
      const progress = timeSinceClick / 1.0;
      clickSpin = (1 - progress) * Math.PI * 2 * Math.pow(1 - progress, 2);
    }

    // Smooth lerp (fast for responsiveness)
    const lerpSpeed = hovering ? 0.12 : 0.05;
    sm.rotX += (targetRotX - sm.rotX) * lerpSpeed;
    sm.rotY += (targetRotY + clickSpin - sm.rotY) * lerpSpeed;

    groupRef.current.rotation.x = sm.rotX;
    groupRef.current.rotation.y = sm.rotY;

    // ─── Mouse-driven position (magnetic pull toward cursor) ───
    const targetPosX = hovering ? mx * 0.3 : 0;
    const targetPosY = hovering ? my * 0.3 : Math.sin(t * 0.8) * 0.08;
    sm.posX += (targetPosX - sm.posX) * 0.08;
    sm.posY += (targetPosY - sm.posY) * 0.08;
    groupRef.current.position.x = sm.posX;
    groupRef.current.position.y = sm.posY;

    // ─── Scale: enlarge on hover, pulse on click ───
    let targetScale = hovering ? 1.12 : 1.0;
    if (timeSinceClick < 0.5) {
      const p = timeSinceClick / 0.5;
      targetScale *= 1 + Math.sin(p * Math.PI) * 0.15;
    }
    sm.scale += (targetScale - sm.scale) * 0.1;
    groupRef.current.scale.setScalar(sm.scale);

    // ─── Emissive intensity: glow brighter on hover ───
    const targetEmissive = hovering ? 1.2 : 0.5;
    sm.emissive += (targetEmissive - sm.emissive) * 0.08;

    // Update all pin materials
    groupRef.current.children.forEach((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat.userData?.isPin) {
          mat.emissiveIntensity = sm.emissive;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {chipParts.map((part, i) => {
        const isBody = part.isBody;
        return (
          <mesh key={i} position={part.pos}>
            <boxGeometry args={part.size} />
            <meshStandardMaterial
              color={isBody ? '#1a0a2e' : '#b06ae0'}
              emissive={isBody ? '#2d1050' : '#9333ea'}
              emissiveIntensity={isBody ? 0.3 : 0.5}
              metalness={isBody ? 0.8 : 0.6}
              roughness={isBody ? 0.15 : 0.3}
              userData={{ isPin: !isBody }}
            />
          </mesh>
        );
      })}

      {/* Inner cutout – dark core */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[0.9 * 0.8, 0.9 * 0.8, 0.06]} />
        <meshStandardMaterial
          color="#030012"
          emissive="#1a0a2e"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Circuit traces on chip face */}
      {circuitTraces.map((trace, i) => {
        const dx = trace.end[0] - trace.start[0];
        const dy = trace.end[1] - trace.start[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const cx = (trace.start[0] + trace.end[0]) / 2;
        const cy = (trace.start[1] + trace.end[1]) / 2;
        return (
          <mesh
            key={`trace-${i}`}
            position={[cx * 0.8, cy * 0.8, 0.175]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[length * 0.8, trace.width, 0.015]} />
            <meshStandardMaterial
              color="#6d28d9"
              emissive="#7c3aed"
              emissiveIntensity={0.8}
              metalness={0.5}
              roughness={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}

      {/* Trace junction dots */}
      {[[-0.25, 0.2], [0.1, 0.2], [0.3, -0.15], [-0.25, -0.15], [0.1, -0.15]].map(([x, y], i) => (
        <mesh key={`dot-${i}`} position={[x * 0.8, y * 0.8, 0.18]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Wireframe body outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.62 * 0.8, 1.62 * 0.8, 0.32 * 0.8]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────
   Mouse-following spotlight
   ────────────────────────────────────────────── */
function CursorLight({ state }: { state: React.MutableRefObject<InteractionState> }) {
  const lightRef = useRef<THREE.PointLight>(null!);
  const smoothPos = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!lightRef.current) return;
    const { x, y, hovering } = state.current;

    // Smooth follow
    smoothPos.current.x += (x * 3 - smoothPos.current.x) * 0.1;
    smoothPos.current.y += (y * 3 - smoothPos.current.y) * 0.1;

    lightRef.current.position.x = smoothPos.current.x;
    lightRef.current.position.y = smoothPos.current.y;
    lightRef.current.position.z = 3;

    // Brighten on hover
    const targetIntensity = hovering ? 2.5 : 0.5;
    lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.08;
  });

  return <pointLight ref={lightRef} color="#e9d5ff" intensity={0.5} distance={10} />;
}

/* ──────────────────────────────────────────────
   Energy tendrils connecting cursor to chip
   ────────────────────────────────────────────── */
function EnergyTendrils({ state }: { state: React.MutableRefObject<InteractionState> }) {
  const count = 3;
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const { x, y, hovering } = state.current;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const targetOpacity = hovering ? 0.15 + Math.sin(t * 3 + i * 2) * 0.08 : 0;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity += (targetOpacity - mat.opacity) * 0.1;

      // Position between cursor and center with slight offset per tendril
      const offset = (i - 1) * 0.4;
      const mx = x * 2.5;
      const my = y * 2.5;
      mesh.position.x = mx * 0.5 + Math.sin(t * 2 + i) * 0.2;
      mesh.position.y = my * 0.5 + Math.cos(t * 2.5 + i) * 0.2 + offset;
      mesh.position.z = 0.5;

      // Scale to stretch toward cursor
      const dist = Math.sqrt(mx * mx + my * my);
      mesh.scale.x = 0.5 + dist * 0.3;
      mesh.scale.y = 0.02 + Math.sin(t * 4 + i) * 0.01;

      // Rotate toward cursor
      mesh.rotation.z = Math.atan2(my - mesh.position.y, mx - mesh.position.x);
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={`tendril-${i}`}
          ref={(el) => { refs.current[i] = el; }}
        >
          <planeGeometry args={[2, 0.04]} />
          <meshBasicMaterial
            color={i === 1 ? '#a855f7' : '#6366f1'}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────
   Scene – orchestrates everything
   ────────────────────────────────────────────── */
function Scene({ state }: { state: React.MutableRefObject<InteractionState> }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 5]} intensity={1.0} color="#e0c0ff" />
      <pointLight position={[-3, -2, 4]} intensity={0.7} color="#4349ff" />
      <pointLight position={[0, 0, -3]} intensity={0.4} color="#843aed" />
      <CursorLight state={state} />
      <ChipModel state={state} />
      <GlowRing state={state} />
      <InnerGlow state={state} />
      <Particles count={60} state={state} />
      <EnergyTendrils state={state} />
    </>
  );
}

/* ──────────────────────────────────────────────
   Exported component
   ────────────────────────────────────────────── */
export default function Logo3D() {
  const state = useRef<InteractionState>({
    x: 0,
    y: 0,
    hovering: false,
    clicked: false,
    clickTime: -10,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    state.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    state.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  const handleMouseEnter = useCallback(() => {
    state.current.hovering = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    state.current.hovering = false;
    state.current.x = 0;
    state.current.y = 0;
  }, []);

  const handleClick = useCallback(() => {
    state.current.clicked = true;
    state.current.clickTime = performance.now() / 1000;
    // Reset clicked flag after a frame
    requestAnimationFrame(() => { state.current.clicked = false; });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: 'grab' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene state={state} />
      </Canvas>
    </div>
  );
}
