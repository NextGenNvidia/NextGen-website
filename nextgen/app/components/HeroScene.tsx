'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// ─── Constants ───────────────────────────────────────────────────────────────
const GREEN = '#4DBC1B';
const GREEN_DIM = '#2a8010';
const GREEN_GLOW = '#6fef3a';
const DARK_METAL = '#0a0a0a';
const METAL_ACCENT = '#1a1a1a';

// ─── LED Indicator Row ──────────────────────────────────────────────────────
function LEDRow({
  count,
  position,
  spacing = 0.08,
  rowIndex = 0,
}: {
  count: number;
  position: [number, number, number];
  spacing?: number;
  rowIndex?: number;
}) {
  const meshesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseColor = useMemo(() => new THREE.Color(GREEN), []);
  const dimColor = useMemo(() => new THREE.Color(GREEN_DIM).multiplyScalar(0.3), []);

  useEffect(() => {
    if (!meshesRef.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        position[0] + (i - (count - 1) / 2) * spacing,
        position[1],
        position[2]
      );
      dummy.updateMatrix();
      meshesRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshesRef.current.instanceMatrix.needsUpdate = true;
  }, [count, position, spacing, dummy]);

  useFrame(({ clock }) => {
    if (!meshesRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      // Staggered wave pulse per LED
      const phase = t * 1.5 + i * 0.6 + rowIndex * 2.1;
      const intensity = 0.3 + 0.7 * Math.max(0, Math.sin(phase));
      const color = dimColor.clone().lerp(baseColor, intensity);
      meshesRef.current.setColorAt(i, color);
    }
    if (meshesRef.current.instanceColor) {
      meshesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshStandardMaterial
        emissive={GREEN}
        emissiveIntensity={2}
        color={GREEN}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// ─── Single Server Cabinet ──────────────────────────────────────────────────
function ServerCabinet({
  position,
  height = 2.4,
  cabinetIndex = 0,
}: {
  position: [number, number, number];
  height?: number;
  cabinetIndex?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const width = 0.7;
  const depth = 0.5;
  const ledRows = 6;

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh castShadow={false}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={DARK_METAL}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Front panel (slightly recessed) */}
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <boxGeometry args={[width - 0.06, height - 0.06, 0.01]} />
        <meshStandardMaterial
          color={METAL_ACCENT}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Horizontal slot lines on front panel */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`slot-${i}`}
          position={[0, -height / 2 + 0.3 + i * (height / 9), depth / 2 + 0.015]}
        >
          <boxGeometry args={[width - 0.12, 0.005, 0.005]} />
          <meshStandardMaterial
            color="#222222"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* LED indicator rows */}
      {Array.from({ length: ledRows }).map((_, i) => (
        <LEDRow
          key={`led-${i}`}
          count={5}
          position={[
            0.18,
            -height / 2 + 0.3 + i * (height / (ledRows + 1)),
            depth / 2 + 0.025,
          ]}
          spacing={0.065}
          rowIndex={cabinetIndex * ledRows + i}
        />
      ))}

      {/* Side green accent strip */}
      <mesh position={[-width / 2 - 0.005, 0, 0]}>
        <boxGeometry args={[0.008, height * 0.85, depth * 0.02]} />
        <meshStandardMaterial
          emissive={GREEN}
          emissiveIntensity={1.5}
          color={GREEN}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[width / 2 + 0.005, 0, 0]}>
        <boxGeometry args={[0.008, height * 0.85, depth * 0.02]} />
        <meshStandardMaterial
          emissive={GREEN}
          emissiveIntensity={1.5}
          color={GREEN}
          toneMapped={false}
        />
      </mesh>

      {/* Top edge glow */}
      <mesh position={[0, height / 2 + 0.005, 0]}>
        <boxGeometry args={[width + 0.02, 0.008, depth + 0.02]} />
        <meshStandardMaterial
          emissive={GREEN}
          emissiveIntensity={0.8}
          color={GREEN_DIM}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// ─── Holographic Floating Particles ─────────────────────────────────────────
function HoloParticles({ count = 60, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const actualCount = isMobile ? Math.floor(count / 2) : count;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const sz = new Float32Array(actualCount);
    for (let i = 0; i < actualCount; i++) {
      // Distribute in a cylindrical volume around the rack cluster
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 1.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      sz[i] = 0.5 + Math.random() * 1.5;
    }
    return [pos, sz];
  }, [actualCount]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      // Gentle orbital motion
      const angle = t * 0.15 + i * 0.1;
      const baseRadius = 1.0 + (i % 10) * 0.18;
      posArray[i3] = Math.cos(angle + i * 0.5) * baseRadius;
      posArray[i3 + 1] += Math.sin(t * 0.5 + i) * 0.0008;
      posArray[i3 + 2] = Math.sin(angle + i * 0.5) * baseRadius;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={GREEN_GLOW}
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Data Stream Lines ──────────────────────────────────────────────────────
function DataStreams() {
  const linesRef = useRef<THREE.Group>(null);
  const streamCount = 6;

  const streamData = useMemo(() => {
    return Array.from({ length: streamCount }).map((_, i) => {
      const points: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 2;
      const startZ = (Math.random() - 0.5) * 1;
      for (let j = 0; j < 20; j++) {
        points.push(
          new THREE.Vector3(
            startX + Math.sin(j * 0.3) * 0.2,
            -1.5 + j * 0.16,
            startZ + Math.cos(j * 0.3) * 0.2
          )
        );
      }
      return { points, phase: i * 1.2 };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    const t = clock.getElapsedTime();
    linesRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line) {
        const mat = child.material as THREE.LineBasicMaterial;
        mat.opacity = 0.15 + 0.25 * Math.sin(t * 1.2 + streamData[i].phase);
      }
    });
  });

  return (
    <group ref={linesRef}>
      {streamData.map((stream, i) => {
        const curve = new THREE.CatmullRomCurve3(stream.points);
        const curvePoints = curve.getPoints(40);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        return (
          <primitive
            key={i}
            object={new THREE.Line(
              geometry,
              new THREE.LineBasicMaterial({
                color: GREEN,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending,
              })
            )}
          />
        );
      })}
    </group>
  );
}

// ─── Mouse Parallax Camera Rig ──────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Smooth lerp toward mouse position
    targetRef.current.x += (mouseRef.current.x * 0.6 - targetRef.current.x) * 0.03;
    targetRef.current.y += (mouseRef.current.y * 0.4 - targetRef.current.y) * 0.03;

    camera.position.x = 3.8 + targetRef.current.x;
    camera.position.y = 1.2 - targetRef.current.y * 0.5;
    camera.position.z = 3.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Ground Glow ────────────────────────────────────────────────────────────
function GroundGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.12 + 0.05 * Math.sin(clock.getElapsedTime() * 0.8);
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial
        color={GREEN}
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── Floating Holographic Cube ─────────────────────────────────────────────
function FloatingHoloCube() {
  const meshRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = 1.8 + Math.sin(t * 1.5) * 0.12;

    if (wireRef.current) {
      (wireRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(t * 3) * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.8;
    }
  });

  return (
    <group ref={meshRef} position={[0, 1.8, 0]}>
      {/* Outer wireframe box */}
      <mesh ref={wireRef}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshBasicMaterial
          color={GREEN_GLOW}
          wireframe
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner glowing chip core */}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial
          emissive={GREEN}
          emissiveIntensity={2.5}
          color={GREEN}
          toneMapped={false}
        />
      </mesh>
      {/* Soft inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Main Scene Content ─────────────────────────────────────────────────────
function SceneContent({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <spotLight
        position={[3, 4, 2]}
        intensity={1.2}
        color={GREEN}
        angle={0.5}
        penumbra={0.8}
        castShadow={false}
      />
      <spotLight
        position={[-2, 3, -2]}
        intensity={0.6}
        color="#ffffff"
        angle={0.6}
        penumbra={1}
        castShadow={false}
      />
      <pointLight position={[0, 0, 2]} intensity={0.8} color={GREEN} distance={5} decay={2} />

      <CameraRig />

      <Float speed={0.8} rotationIntensity={0} floatIntensity={0.15} floatingRange={[-0.05, 0.05]}>
        <group ref={groupRef} scale={0.78}>
          {/* Floating Holographic AI Cube */}
          <FloatingHoloCube />

          {/* Server Rack Cluster — 3 cabinets */}
          <ServerCabinet position={[-0.8, 0, 0]} cabinetIndex={0} />
          <ServerCabinet position={[0, 0, 0.15]} height={2.6} cabinetIndex={1} />
          <ServerCabinet position={[0.8, 0, 0]} cabinetIndex={2} />

          {/* Holographic particles */}
          <HoloParticles count={isMobile ? 25 : 60} isMobile={isMobile} />

          {/* Data stream lines */}
          {!isMobile && <DataStreams />}
        </group>
      </Float>
    </>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    let timeout: NodeJS.Timeout;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 200);
    };
    window.addEventListener('resize', debounced);
    return () => {
      window.removeEventListener('resize', debounced);
      clearTimeout(timeout);
    };
  }, []);

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [3.8, 1.2, 3.8], fov: 52, near: 0.1, far: 50 }}
        dpr={dpr as any}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
