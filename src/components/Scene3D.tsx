import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Suspense } from "react";

// Global scroll state
let scrollProgress = 0;

const ScrollTracker = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return null;
};

// Flowing wave particles
const WaveParticles = ({ count = 2000 }) => {
  const mesh = useRef<THREE.Points>(null);
  const time = useRef(0);
  
  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 25 - 8;
      const y = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return { positions, originalPositions };
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    time.current += delta * 0.4;
    
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      
      posArray[i * 3 + 1] = oy + Math.sin(ox * 0.2 + time.current) * 0.8 + Math.sin(oz * 0.15 + time.current * 0.6) * 0.5;
      posArray[i * 3] = ox + Math.sin(time.current * 0.4 + oy * 0.08) * 0.3;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = scrollProgress * 0.4;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#6366f1" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

// Glowing orbs floating around
const GlowingOrb = ({ position, size, color, speed }: { 
  position: [number, number, number]; 
  size: number; 
  color: string; 
  speed: number 
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);
  
  useFrame((_, delta) => {
    if (!mesh.current) return;
    time.current += delta * speed;
    
    mesh.current.position.y = position[1] + Math.sin(time.current) * 1;
    mesh.current.position.x = position[0] + Math.cos(time.current * 0.6) * 0.6;
    mesh.current.scale.setScalar(size + Math.sin(time.current * 1.5) * 0.15);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
};

// Floating geometric shapes
const FloatingShape = ({ position, type, color, rotationSpeed }: { 
  position: [number, number, number]; 
  type: 'icosahedron' | 'octahedron' | 'dodecahedron';
  color: string;
  rotationSpeed: number;
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);
  
  useFrame((_, delta) => {
    if (!mesh.current) return;
    time.current += delta;
    
    mesh.current.rotation.x += delta * rotationSpeed * 0.25;
    mesh.current.rotation.y += delta * rotationSpeed * 0.15;
    mesh.current.position.y = position[1] + Math.sin(time.current * 0.4) * 0.6;
  });

  return (
    <mesh ref={mesh} position={position}>
      {type === 'icosahedron' && <icosahedronGeometry args={[0.6, 0]} />}
      {type === 'octahedron' && <octahedronGeometry args={[0.5, 0]} />}
      {type === 'dodecahedron' && <dodecahedronGeometry args={[0.4, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050a] via-[#0a0a12] to-[#05050a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]" />
      
      <ScrollTracker />
      
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0, background: 'transparent' }}
        >
          {/* Wave particles */}
          <WaveParticles count={2000} />
          
          {/* Glowing orbs */}
          <GlowingOrb position={[-7, 2, -6]} size={2} color="#6366f1" speed={0.4} />
          <GlowingOrb position={[6, -1, -7]} size={2.5} color="#8b5cf6" speed={0.35} />
          <GlowingOrb position={[0, 4, -10]} size={3} color="#a855f7" speed={0.25} />
          <GlowingOrb position={[-5, -3, -5]} size={1.5} color="#6366f1" speed={0.5} />
          <GlowingOrb position={[8, 3, -8]} size={1.8} color="#8b5cf6" speed={0.45} />
          
          {/* Floating shapes */}
          <FloatingShape position={[-6, 1, -4]} type="icosahedron" color="#6366f1" rotationSpeed={0.6} />
          <FloatingShape position={[5, 2, -5]} type="octahedron" color="#8b5cf6" rotationSpeed={0.8} />
          <FloatingShape position={[7, -2, -6]} type="dodecahedron" color="#a855f7" rotationSpeed={0.5} />
          <FloatingShape position={[-4, -2, -7]} type="octahedron" color="#6366f1" rotationSpeed={0.7} />
          <FloatingShape position={[2, 5, -8]} type="icosahedron" color="#8b5cf6" rotationSpeed={0.55} />
          <FloatingShape position={[-8, 0, -6]} type="dodecahedron" color="#a855f7" rotationSpeed={0.65} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene3D;
