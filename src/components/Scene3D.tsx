import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingSphere = ({ position, color, size = 1, speed = 1.5 }: { 
  position: [number, number, number]; 
  color: string; 
  size?: number;
  speed?: number;
}) => {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={2.5}>
      <Sphere args={[size, 100, 100]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

const GlowingRing = ({ position, color, size }: { position: [number, number, number]; color: string; size: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[size, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const FloatingCube = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const AnimatedTorus = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.2, 16, 50]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const MovingParticles = () => {
  const count = 500;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
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
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      arr[i * 3] = color.r;
      arr[i * 3 + 1] = color.g;
      arr[i * 3 + 2] = color.b;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={["#030014"]} />
        <fog attach="fog" args={["#030014", 10, 40]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#00ffff" distance={30} />
        <pointLight position={[10, -10, 5]} intensity={2} color="#ff00ff" distance={30} />
        <pointLight position={[0, 10, 0]} intensity={1.5} color="#8b5cf6" distance={25} />
        <spotLight position={[0, 20, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#06b6d4" />
        
        {/* Main floating spheres */}
        <FloatingSphere position={[-5, 3, -5]} color="#00ffff" size={1.5} speed={1.2} />
        <FloatingSphere position={[5, -2, -4]} color="#ff00ff" size={1.2} speed={1.8} />
        <FloatingSphere position={[4, 4, -6]} color="#8b5cf6" size={0.8} speed={1.5} />
        <FloatingSphere position={[-4, -4, -5]} color="#06b6d4" size={1.1} speed={1.3} />
        <FloatingSphere position={[0, 5, -8]} color="#f472b6" size={0.7} speed={2} />
        
        {/* Glowing rings */}
        <GlowingRing position={[-3, 1, -3]} color="#00ffff" size={1.5} />
        <GlowingRing position={[3, -1, -4]} color="#ff00ff" size={1.2} />
        <GlowingRing position={[0, 3, -5]} color="#8b5cf6" size={2} />
        
        {/* Floating cubes */}
        <FloatingCube position={[-6, -2, -6]} color="#00ffff" />
        <FloatingCube position={[6, 3, -7]} color="#ff00ff" />
        <FloatingCube position={[2, -4, -5]} color="#8b5cf6" />
        
        {/* Animated torus */}
        <AnimatedTorus position={[-2, -3, -4]} color="#06b6d4" />
        <AnimatedTorus position={[4, 1, -5]} color="#f472b6" />
        
        {/* Background elements */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1} />
        <MovingParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;