import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { triggerCursor } from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function Ventures() {
    const containerRef = useRef(null);
    const pinRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.venture-panel');
        
        // Pin horizontal translation timeline calculation loop
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

                {/* Micro-abstract Mesh/Matrix Placeholder Frame Area Right */}
                <div className="hidden lg:flex w-1/2 h-full items-center justify-center opacity-20 lg:opacity-40 pointer-events-none">
                <div className="w-[80%] h-[60%] border border-white/[0.05] rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div 
                    className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
                    style={{ opacity: 0.15 }}
                    />
                    <span className="text-[10px] font-mono tracking-widest text-text-gray uppercase">
                    [ Immersive Canvas Sub-Engine Zone {idx + 1} ]
                    </span>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}