import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function NodeSystem() {
    const pointsRef = useRef();
    const groupRef = useRef();

    // Create explicit mathematical orbits for three coordinate node vectors
    const [positions, connections] = useMemo(() => {
        const nodes = [];
        // Anchor Node Core Targets: 1. Enterprise, 2. Events, 3. Retail
        nodes.push(new THREE.Vector3(-2.5, 1, 0));
        nodes.push(new THREE.Vector3(2.5, -0.5, 1));
        nodes.push(new THREE.Vector3(0.5, -2, -1));

        // Dynamic Fill Points array allocation mapping
        const posArr = new Float32Array(150 * 3);
        for (let i = 0; i < 150; i++) {
        const stride = i * 3;
        posArr[stride] = (Math.random() - 0.5) * 8;
        posArr[stride + 1] = (Math.random() - 0.5) * 8;
        posArr[stride + 2] = (Math.random() - 0.5) * 4;
        }
        return [posArr, nodes];
    }, []);

    useFrame((state) => {
        const { x, y } = state.pointer;
        // Apply smooth linear interpolations (lerp math) to input vectors
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3, 0.05);
        
        // Constant signature baseline micro-rotation
        pointsRef.current.rotation.z += 0.0008;
    });

    return (
        <group ref={groupRef}>
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
            transparent
            color="#00E5FF"
            size={0.04}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            />
        </Points>

        {/* Primary Pillar Structural Connection Formations */}
        <Line points={[connections[0], connections[1]]} color="#7C3AED" lineWidth={1.5} dashed={false} />
        <Line points={[connections[1], connections[2]]} color="#00E5FF" lineWidth={1.5} dashed={false} />
        <Line points={[connections[2], connections[0]]} color="#7C3AED" lineWidth={1.5} dashed={false} />

        {/* Explicit Core Mesh Glow Signifiers */}
        {connections.map((pos, idx) => (
            <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#00E5FF" : "#7C3AED"} transparent opacity={0.8} />
            </mesh>
        ))}
        </group>
    );
    }

    export default function HeroCanvas() {
    return (
        <div className="w-full h-full opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <NodeSystem />
        </Canvas>
        </div>
    );
}