import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
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

const AnimatedSphere = ({ 
  position, 
  color, 
  size = 1,
  scrollOffset = 0
}: { 
  position: [number, number, number]; 
  color: string; 
  size?: number;
  scrollOffset?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = useMemo(() => [...position] as [number, number, number], [position]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const scroll = scrollProgress;
      
      // Floating animation + scroll-based movement
      meshRef.current.position.x = startPos[0] + Math.sin(time * 0.5 + scrollOffset) * 0.5 + scroll * 2 * Math.sin(scrollOffset);
      meshRef.current.position.y = startPos[1] + Math.cos(time * 0.3 + scrollOffset) * 0.5 + scroll * 3 * Math.cos(scrollOffset);
      meshRef.current.position.z = startPos[2] + scroll * -5;
      
      // Rotation based on scroll
      meshRef.current.rotation.x = time * 0.2 + scroll * Math.PI * 2;
      meshRef.current.rotation.y = time * 0.3 + scroll * Math.PI;
      
      // Scale pulse
      const scale = size * (1 + Math.sin(time + scrollOffset) * 0.1 + scroll * 0.3);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const ScrollRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const scroll = scrollProgress;
      groupRef.current.rotation.x = scroll * Math.PI * 2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scroll * Math.PI;
      
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + scroll * (i + 1) * 0.4;
        child.scale.setScalar(scale);
      });
    }
  });

  const colors = ["#00ffff", "#ff00ff", "#8b5cf6", "#06b6d4"];

  return (
    <group ref={groupRef}>
      {colors.map((color, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 4]}>
          <torusGeometry args={[1.5 + i * 0.4, 0.03, 16, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorOptions = [
      new THREE.Color("#00ffff"),
      new THREE.Color("#ff00ff"),
      new THREE.Color("#8b5cf6"),
    ];
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI;
      pointsRef.current.rotation.x = scrollProgress * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const HelixStructure = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 30;
  
  useFrame((state) => {
    if (groupRef.current) {
      const scroll = scrollProgress;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scroll * Math.PI * 3;
      
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const phase = (i / count) * Math.PI * 4 + scroll * Math.PI * 6;
        const radius = 2 + scroll * 1.5;
        mesh.position.x = Math.cos(phase) * radius;
        mesh.position.z = Math.sin(phase) * radius;
        mesh.position.y = (i - count / 2) * 0.35;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00ffff" : "#ff00ff"} 
            emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10" style={{ width: '100vw', height: '100vh' }}>
      {/* Gradient fallback background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#030014] via-[#0a0520] to-[#030014]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <ScrollTracker />
      
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent' 
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[-10, 10, 10]} intensity={1.5} color="#00ffff" />
          <pointLight position={[10, -10, -10]} intensity={1.5} color="#ff00ff" />
          <pointLight position={[0, 0, 10]} intensity={1} color="#8b5cf6" />
          
          {/* Animated spheres */}
          <AnimatedSphere position={[-4, 2, -2]} color="#00ffff" size={1.2} scrollOffset={0} />
          <AnimatedSphere position={[4, -1, -3]} color="#ff00ff" size={1} scrollOffset={Math.PI / 2} />
          <AnimatedSphere position={[2, 3, -4]} color="#8b5cf6" size={0.8} scrollOffset={Math.PI} />
          <AnimatedSphere position={[-3, -3, -3]} color="#06b6d4" size={0.9} scrollOffset={Math.PI * 1.5} />
          <AnimatedSphere position={[0, -2, -5]} color="#f472b6" size={0.7} scrollOffset={Math.PI * 0.75} />
          
          {/* Scroll rings */}
          <ScrollRings />
          
          {/* Helix structure */}
          <HelixStructure />
          
          {/* Particles */}
          <FloatingParticles />
          
          {/* Stars */}
          <Stars radius={80} depth={50} count={1500} factor={4} saturation={0.5} fade speed={1} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene3D;