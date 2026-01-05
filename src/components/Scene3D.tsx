import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// Hook to track scroll progress
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return scrollProgress;
};

// Shared scroll state for Three.js components
let globalScrollProgress = 0;

const ScrollTracker = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      globalScrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return null;
};

const FloatingSphere = ({ 
  position, 
  color, 
  size = 1, 
  speed = 1.5,
  scrollMultiplier = 1 
}: { 
  position: [number, number, number]; 
  color: string; 
  size?: number;
  speed?: number;
  scrollMultiplier?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animate based on scroll
      const scrollOffset = globalScrollProgress * scrollMultiplier * 5;
      meshRef.current.position.y = initialPos.current[1] + Math.sin(scrollOffset) * 2;
      meshRef.current.position.x = initialPos.current[0] + Math.cos(scrollOffset * 0.5) * 1.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + globalScrollProgress * Math.PI * 2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + globalScrollProgress * Math.PI;
      
      // Scale based on scroll
      const scale = 1 + globalScrollProgress * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={2.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4 + globalScrollProgress * 0.2}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const MorphingShape = ({ position, baseColor, scrollPhase }: { 
  position: [number, number, number]; 
  baseColor: string;
  scrollPhase: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scroll = globalScrollProgress;
      const phase = scroll * Math.PI * 4 + scrollPhase;
      
      // Morph between shapes by changing geometry scale
      meshRef.current.rotation.x = phase;
      meshRef.current.rotation.y = phase * 0.7;
      meshRef.current.rotation.z = phase * 0.3;
      
      // Move in a spiral pattern based on scroll
      const radius = 3 + scroll * 2;
      meshRef.current.position.x = position[0] + Math.cos(phase) * radius;
      meshRef.current.position.y = position[1] + Math.sin(phase * 2) * 2;
      meshRef.current.position.z = position[2] + Math.sin(phase) * radius;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial 
        color={baseColor} 
        metalness={0.8} 
        roughness={0.2}
        wireframe={globalScrollProgress > 0.5}
      />
    </mesh>
  );
};

const ScrollingRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsCount = 5;
  
  useFrame(() => {
    if (groupRef.current) {
      const scroll = globalScrollProgress;
      groupRef.current.rotation.x = scroll * Math.PI * 2;
      groupRef.current.rotation.y = scroll * Math.PI;
      
      // Expand rings as you scroll
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + scroll * (i + 1) * 0.5;
        child.scale.setScalar(scale);
        (child as THREE.Mesh).rotation.z = scroll * Math.PI * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: ringsCount }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / ringsCount]}>
          <torusGeometry args={[1.5 + i * 0.3, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color={["#00ffff", "#ff00ff", "#8b5cf6", "#06b6d4", "#f472b6"][i]} 
            transparent 
            opacity={0.6} 
          />
        </mesh>
      ))}
    </group>
  );
};

const ParticleWave = () => {
  const count = 800;
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 20;
      const radius = 5 + (i / count) * 10;
      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const colorOptions = [
      new THREE.Color("#00ffff"),
      new THREE.Color("#ff00ff"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#f472b6"),
    ];
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor((i / count) * colorOptions.length)];
      arr[i * 3] = color.r;
      arr[i * 3 + 1] = color.g;
      arr[i * 3 + 2] = color.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const scroll = globalScrollProgress;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scroll * Math.PI * 2;
      pointsRef.current.rotation.x = scroll * Math.PI * 0.5;
      
      // Wave effect on particles
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const originalY = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 1] = Math.sin(scroll * 10 + i * 0.1) * 3 + originalY * (1 - scroll * 0.5);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
};

const DNA_Helix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereCount = 40;
  
  useFrame((state) => {
    if (groupRef.current) {
      const scroll = globalScrollProgress;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scroll * Math.PI * 4;
      
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const phase = (i / sphereCount) * Math.PI * 4 + scroll * Math.PI * 8;
        const radius = 2 + scroll * 2;
        mesh.position.x = Math.cos(phase) * radius;
        mesh.position.z = Math.sin(phase) * radius;
        mesh.position.y = (i - sphereCount / 2) * 0.4 + Math.sin(scroll * 10) * 2;
        
        const scale = 0.1 + Math.abs(Math.sin(phase)) * 0.15;
        mesh.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {Array.from({ length: sphereCount }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00ffff" : "#ff00ff"} 
            emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  
  useFrame(() => {
    const scroll = globalScrollProgress;
    // Move camera in a subtle arc as user scrolls
    camera.position.z = 12 - scroll * 4;
    camera.position.y = scroll * 3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <ScrollTracker />
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={["#030014"]} />
        <fog attach="fog" args={["#030014", 8, 35]} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#00ffff" distance={30} />
        <pointLight position={[10, -10, 5]} intensity={2} color="#ff00ff" distance={30} />
        <pointLight position={[0, 10, 0]} intensity={1.5} color="#8b5cf6" distance={25} />
        
        {/* Main floating spheres that react to scroll */}
        <FloatingSphere position={[-4, 2, -3]} color="#00ffff" size={1.2} speed={1.2} scrollMultiplier={1} />
        <FloatingSphere position={[4, -1, -4]} color="#ff00ff" size={1} speed={1.8} scrollMultiplier={1.5} />
        <FloatingSphere position={[3, 3, -5]} color="#8b5cf6" size={0.7} speed={1.5} scrollMultiplier={2} />
        <FloatingSphere position={[-3, -3, -4]} color="#06b6d4" size={0.9} speed={1.3} scrollMultiplier={1.2} />
        
        {/* Morphing shapes */}
        <MorphingShape position={[-5, 0, -6]} baseColor="#00ffff" scrollPhase={0} />
        <MorphingShape position={[5, 0, -6]} baseColor="#ff00ff" scrollPhase={Math.PI / 2} />
        <MorphingShape position={[0, 4, -7]} baseColor="#8b5cf6" scrollPhase={Math.PI} />
        
        {/* Scrolling rings */}
        <ScrollingRings />
        
        {/* DNA Helix */}
        <DNA_Helix />
        
        {/* Particle wave */}
        <ParticleWave />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        
        {/* Camera animation */}
        <CameraController />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;