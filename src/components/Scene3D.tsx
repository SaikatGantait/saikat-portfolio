import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Suspense } from "react";

// Starfield warp effect
const StarField = ({ count = 1500 }) => {
  const mesh = useRef<THREE.Points>(null);
  
  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a cylinder around the camera
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 2;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      
      velocities[i] = Math.random() * 0.15 + 0.08;
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, velocities, sizes };
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Move stars toward camera (positive Z)
      posArray[i * 3 + 2] += velocities[i] * 0.5;
      
      // Reset star when it passes the camera
      if (posArray[i * 3 + 2] > 50) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 15 + 2;
        posArray[i * 3] = Math.cos(angle) * radius;
        posArray[i * 3 + 1] = Math.sin(angle) * radius;
        posArray[i * 3 + 2] = -50;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#ffffff" 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
      />
    </points>
  );
};

// Streak lines for motion blur effect
const StreakLines = ({ count = 200 }) => {
  const linesRef = useRef<THREE.Group>(null);
  
  const streaks = useMemo(() => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 20 + 3;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 100 - 50,
        length: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.15 + 0.1,
      };
    });
  }, [count]);

  useFrame(() => {
    if (!linesRef.current) return;
    
    linesRef.current.children.forEach((line, i) => {
      const streak = streaks[i];
      line.position.z += streak.speed * 0.5;
      
      if (line.position.z > 50) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20 + 3;
        line.position.x = Math.cos(angle) * radius;
        line.position.y = Math.sin(angle) * radius;
        line.position.z = -50;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {streaks.map((streak, i) => (
        <mesh key={i} position={[streak.x, streak.y, streak.z]}>
          <boxGeometry args={[0.02, 0.02, streak.length]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 30], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0, background: 'transparent' }}
        >
          <StarField count={1500} />
          <StreakLines count={200} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene3D;
