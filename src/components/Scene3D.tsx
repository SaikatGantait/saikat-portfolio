import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const FloatingSphere = ({ position, color, size = 1, speed = 1.5 }: { 
  position: [number, number, number]; 
  color: string; 
  size?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ffff" transparent opacity={0.6} />
    </points>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#ff00ff" />
        
        <FloatingSphere position={[-4, 2, -3]} color="#00ffff" size={1.2} speed={1.2} />
        <FloatingSphere position={[4, -2, -2]} color="#ff00ff" size={0.8} speed={1.8} />
        <FloatingSphere position={[3, 3, -4]} color="#8b5cf6" size={0.6} speed={1.5} />
        <FloatingSphere position={[-3, -3, -3]} color="#06b6d4" size={1} speed={1.3} />
        
        <Particles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
