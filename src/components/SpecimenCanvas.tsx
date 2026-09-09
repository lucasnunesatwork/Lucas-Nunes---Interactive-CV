import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Blob({ color, distort, speed, isNudged, showWireframe }: { color: string, distort: number, speed: number, isNudged: boolean, showWireframe: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      const targetScale = isNudged ? 1.15 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.3}
          distort={distort}
          speed={speed * 2}
          wireframe={showWireframe}
        />
      </mesh>
    </Float>
  );
}

interface SpecimenCanvasProps {
  traitColor: string;
  firmness: number;
  energy: number;
  isNudged: boolean;
  autoRotateSpeed: number;
  showWireframe: boolean;
}

export function SpecimenCanvas({ traitColor, firmness, energy, isNudged, autoRotateSpeed, showWireframe }: SpecimenCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing" shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b0c4de" />
      <Environment preset="city" />
      
      <Blob color={traitColor} distort={firmness} speed={energy} isNudged={isNudged} showWireframe={showWireframe} />
      
      <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={8} blur={2.5} far={4} />
      <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={autoRotateSpeed} minDistance={3} maxDistance={10} />
    </Canvas>
  );
}
