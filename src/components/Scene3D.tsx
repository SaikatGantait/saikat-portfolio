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

// Glowing grid plane
const TechGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = -scrollProgress * 10;
      gridRef.current.rotation.x = Math.PI / 2 + scrollProgress * 0.3;
    }
  });

  return (
    <gridHelper 
      ref={gridRef}
      args={[40, 40, "#1a3a4a", "#0a1018"]} 
      position={[0, -5, -10]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};

// Floating tech cubes
const FloatingCube = ({ 
  position, 
  size = 1,
  rotationSpeed = 1,
  color = "#00ffff"
}: { 
  position: [number, number, number]; 
  size?: number;
  rotationSpeed?: number;
  color?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const initialPos = useMemo(() => [...position] as [number, number, number], [position]);
  
  useFrame((state) => {
    if (meshRef.current && edgesRef.current) {
      const time = state.clock.elapsedTime;
      const scroll = scrollProgress;
      
      // Floating motion
      meshRef.current.position.y = initialPos[1] + Math.sin(time * 0.5) * 0.5;
      meshRef.current.position.z = initialPos[2] - scroll * 8;
      
      // Rotation
      meshRef.current.rotation.x = time * 0.2 * rotationSpeed + scroll * Math.PI;
      meshRef.current.rotation.y = time * 0.3 * rotationSpeed;
      
      // Sync edges
      edgesRef.current.position.copy(meshRef.current.position);
      edgesRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      <lineSegments ref={edgesRef} position={position} geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
    </>
  );
};

// Neural network nodes with connections
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      points.push([
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      ]);
    }
    return points;
  }, []);

  const connections = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    nodes.forEach((node, i) => {
      // Connect to 2-3 nearby nodes
      const nearby = nodes
        .map((n, j) => ({ node: n, index: j, dist: Math.hypot(n[0] - node[0], n[1] - node[1], n[2] - node[2]) }))
        .filter(n => n.index !== i && n.dist < 6)
        .slice(0, 3);
      
      nearby.forEach(n => {
        if (n.index > i) {
          lines.push([
            new THREE.Vector3(...node),
            new THREE.Vector3(...n.node)
          ]);
        }
      });
    });
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI * 0.5;
      groupRef.current.position.z = -scrollProgress * 5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#2d5a6a" : i % 3 === 1 ? "#4a3a6a" : "#1a4a5a"} />
        </mesh>
      ))}
      
      {/* Connections */}
      {connections.map((points, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...points[0].toArray(), ...points[1].toArray()])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a4a5a" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
};

// Orbiting ring
const OrbitRing = ({ radius, color, speed }: { radius: number; color: string; speed: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * speed + scrollProgress * Math.PI;
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

// Data particles flowing
const DataParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 8;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += 0.02;
        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = -8;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.1 + scrollProgress * Math.PI;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#2a4a5a" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020008] via-[#050510] to-[#020008]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-transparent to-transparent" />
      
      <ScrollTracker />
      
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0, background: 'transparent' }}
        >
          {/* Tech grid floor */}
          <TechGrid />
          
          {/* Floating wireframe cubes */}
          <FloatingCube position={[-5, 2, -3]} size={1.5} color="#2a4a5a" rotationSpeed={0.8} />
          <FloatingCube position={[5, -1, -4]} size={1.2} color="#3a3a5a" rotationSpeed={1.2} />
          <FloatingCube position={[3, 3, -6]} size={0.8} color="#1a3a4a" rotationSpeed={1} />
          <FloatingCube position={[-4, -2, -5]} size={1} color="#2a4a5a" rotationSpeed={0.6} />
          
          {/* Neural network */}
          <NeuralNetwork />
          
          {/* Orbit rings */}
          <OrbitRing radius={4} color="#1a3a4a" speed={0.2} />
          <OrbitRing radius={5} color="#2a2a4a" speed={-0.15} />
          <OrbitRing radius={6} color="#1a4a5a" speed={0.1} />
          
          {/* Data particles */}
          <DataParticles />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Scene3D;
