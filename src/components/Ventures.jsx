import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { triggerCursor } from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// Sub-Component Panel 1: R3F Parametric Mesh Wave
function WaveMesh({ color }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const pos = meshRef.current.geometry.attributes.position;
        
        // Mathematical deformation to simulate elegant corporate data optimization flow
        for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = Math.sin(x * 0.4 + t) * Math.cos(y * 0.4 + t) * 0.25;
        pos.setZ(i, z);
        }
        pos.needsUpdate = true;
        meshRef.current.rotation.z = t * 0.02;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 3.5, 0, 0]}>
        <planeGeometry args={[6, 6, 35, 35]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
    );
    }

    // Sub-Component Panel 2: Ambient Particle/Ember Field
    function FloatingParticles({ color }) {
    const pointsRef = useRef();

    const [positions] = React.useMemo(() => {
        const posArr = new Float32Array(120 * 3);
        for (let i = 0; i < 120; i++) {
        posArr[i * 3] = (Math.random() - 0.5) * 5;     // X-axis spread
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 5; // Y-axis spread
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 2; // Z-axis spread
        }
        return [posArr];
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = t * 0.015;
        // Slow structural up-drift manipulation
        pointsRef.current.position.y = (t * 0.05) % 2 - 1;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
            transparent
            color={color}
            size={0.06}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.6}
        />
        </Points>
    );
    }

    export default function Ventures() {
    const containerRef = useRef(null);
    const pinRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.venture-panel');
        
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${pinRef.current.offsetWidth}`,
            invalidateOnRefresh: true,
            }
        });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const panelsData = [
        {
        id: "qbs",
        title: "Qiyam Business Solutions",
        industry: "Enterprise Consulting",
        features: ["Business Strategy", "Digital Transformation", "Operations Scaling"],
        color: "from-[#07111F] to-[#030712]",
        accent: "#00E5FF"
        },
        {
        id: "qc",
        title: "Qiyam Celebrate",
        industry: "Luxury Events",
        features: ["Wedding Management", "Corporate Events", "Luxury Experiences"],
        color: "from-[#0B132B] to-[#07111F]",
        accent: "#7C3AED"
        },
        {
        id: "qm",
        title: "Qiyam Mart",
        industry: "Retail & E-Commerce",
        features: ["Retail Solutions", "Marketplace", "Fast Delivery"],
        color: "from-[#030712] to-[#0B132B]",
        accent: "#00E5FF"
        }
    ];

    return (
        <div ref={containerRef} className="bg-bg-dark-1">
        <div ref={pinRef} className="relative h-screen w-full flex overflow-hidden">
            {panelsData.map((panel, idx) => (
            <div 
                key={panel.id}
                className={`venture-panel shrink-0 w-screen h-screen flex items-center justify-between px-6 lg:px-24 bg-gradient-to-br ${panel.color} relative border-r border-white/[0.02]`}
                onMouseEnter={() => triggerCursor('interactive', 'Drag')}
                onMouseLeave={() => triggerCursor('default')}
            >
                {/* Functional Information Grid Left */}
                <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center">
                <span className="text-xs font-mono tracking-[0.2em] uppercase opacity-60 mb-2" style={{ color: panel.accent }}>
                    // Pillar {idx + 1} : {panel.industry}
                </span>
                <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black font-display text-text-white uppercase tracking-tighter max-w-xl leading-none">
                    {panel.title}
                </h3>
                
                <ul className="mt-8 space-y-4 max-w-sm" aria-label={`Core core offerings for ${panel.title}`}>
                    {panel.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-3 text-text-gray font-medium text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: panel.accent }} />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Interactive Dynamic Canvas Sub-Engine Zone Right */}
                <div className="hidden lg:flex w-1/2 h-full items-center justify-center pointer-events-auto">
                <div className="w-[85%] h-[65%] border border-white/[0.04] bg-white/[0.005] rounded-xl relative overflow-hidden flex items-center justify-center backdrop-blur-sm">
                    
                    {/* Conditional Sub-Engine Injection Mapping */}
                    {idx === 0 && (
                    <div className="w-full h-full opacity-80">
                        <Canvas camera={{ position: [0, 0, 3.2] }}>
                        <ambientLight intensity={0.6} />
                        <WaveMesh color={panel.accent} />
                        </Canvas>
                    </div>
                    )}

                    {idx === 1 && (
                    <div className="w-full h-full opacity-90 relative">
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-bg-dark-2/40 via-transparent to-transparent pointer-events-none" />
                        <Canvas camera={{ position: [0, 0, 2.5] }}>
                        <FloatingParticles color={panel.accent} />
                        </Canvas>
                    </div>
                    )}

                    {idx === 2 && (
                    <div className="p-8 w-full h-full flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-3 w-72 h-72">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                            key={i}
                            className="bg-white/[0.01] border border-white/[0.06] rounded-lg relative overflow-hidden flex items-center justify-center"
                            whileHover={{ 
                                scale: 1.08, 
                                borderColor: panel.accent, 
                                backgroundColor: 'rgba(0,229,255,0.03)',
                                boxShadow: `0 0 15px rgba(0,229,255,0.1)` 
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 22 }}
                            >
                            <div className="w-1 h-1 rounded-full bg-white/20 absolute top-2 right-2" />
                            <span className="font-mono text-[9px] text-text-gray/40">0{i+1}</span>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                    )}

                    {/* Micro-Overlay Coordinate Data Tags */}
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-text-gray/40 pointer-events-none">
                    SYS_RENDER_NODE_0{idx + 1} // ACTIVE
                    </div>
                </div>
                </div>

            </div>
            ))}
        </div>
        </div>
    );
}