import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { triggerCursor } from './CustomCursor';
import { HalfFloatType } from './../../node_modules/three/src/constants';

gsap.registerPlugin(ScrollTrigger);

function ImageStack({ images, currentIndex }) {
  // Slice the images array to dynamically rearrange the layout based on the active index
    const orderedImages = [
        ...images.slice(currentIndex),
        ...images.slice(0, currentIndex)
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
        <AnimatePresence mode="popLayout">
            {orderedImages.map((image, index) => {
            const isTop = index === 0;
            // Negative offset pushes underlying images upward, creating a stacked layer look
            const verticalStackOffset = -24; 

            return (
                <motion.div
                key={image.id}
                style={{ zIndex: orderedImages.length - index }}
                className="absolute w-full h-full rounded-2xl border border-white/[0.06] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-bg-dark-3"
                initial={{ scale: 0.95, y: 0, opacity: 0 }}
                animate={{
                    // Images further back scale down slightly and slide upward
                    scale: isTop ? 1 : 1 - index * 0.03,
                    y: isTop ? 0 : index * verticalStackOffset,
                    opacity: index > 2 ? 0 : 1, // Optimize performance by hiding deeper assets
                }}
                exit={{ 
                    y: 80, // Slide down and fade out elegantly on cycle
                    scale: 0.95,
                    opacity: 0,
                    zIndex: 0 
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 32 
                }}
                >
                {/* Premium glass specular reflection sheet */}
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark-1 via-transparent to-bg-dark-2 mix-blend-overlay z-10 pointer-events-none" />
                
                {/* Content Asset (Full cover image fill) */}
                <img 
                    src={image.src} 
                    alt={image.title}
                    // Inside ImageStack component -> Change the img className to this:
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Lower Text/Label Scrim protection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 flex flex-col justify-between p-6 pointer-events-none">
                    <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full uppercase border border-white/5">
                        {image.label}
                    </span>
                    </div>
                    <div>
                    <h4 className="hidden lg:flex font-display font-black text-lg sm:text-xl tracking-wide text-white uppercase leading-tight drop-shadow-md">
                        {image.title}
                    </h4>
                    </div>
                </div>
                </motion.div>
            );
            })}
        </AnimatePresence>
        </div>
    );
    }

    // ============================================================================
    // 2. MAIN VENTURES ORCHESTRATOR COMPONENT
    // ============================================================================
    export default function Ventures() {
    const containerRef = useRef(null);
    const pinRef = useRef(null);

    // Maintain separate cycle indexing state frames across the three core venture pillars
    const [activeIndices, setActiveIndices] = useState({ qbs: 0, qc: 0, qm: 0 });

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

    const handlePanelTap = (panelId, totalImages) => {
        setActiveIndices((prev) => ({
        ...prev,
        [panelId]: (prev[panelId] + 1) % totalImages
        }));
    };

    const panelsData = [
        {
        id: "qbs",
        title: "Qiyam Business Solutions",
        industry: "Enterprise Consulting",
        features: ["Business Strategy", "Digital Transformation", "Operations Scaling"],
        color: "from-bg-dark-1 to-bg-dark-2",
        accent: "#c4953b",
        cards: [
            { id: 'qbs-1', title: 'Strategy Architecture', label: 'Matrix 01', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
            { id: 'qbs-2', title: 'Digital Scale Systems', label: 'Matrix 02', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
            { id: 'qbs-3', title: 'Operational Velocity', label: 'Matrix 03', src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop' },
        ]
        },
        {
        id: "qc",
        title: "Qiyam Celebrate",
        industry: "Luxury Events",
        features: ["Wedding Management", "Corporate Events", "Luxury Experiences"],
        color: "from-bg-dark-3 to-bg-dark-1",
        accent: "#001c4a",
        cards: [
            { id: 'qc-1', title: 'Gala Experiences', label: 'Curate 01', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop' },
            { id: 'qc-2', title: 'Premium Weddings', label: 'Curate 02', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop' },
            { id: 'qc-3', title: 'Corporate Assemblies', label: 'Curate 03', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' },
        ]
        },
        {
        id: "qm",
        title: "Qiyam Mart",
        industry: "Retail & E-Commerce",
        features: ["Retail Solutions", "Marketplace", "Fast Delivery"],
        color: "from-bg-dark-2 to-bg-dark-3",
        accent: "#c7973b",
        cards: [
            { id: 'qm-1', title: 'Supply Networks', label: 'Logistics Node 01', src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
    { id: 'qm-2', title: 'Hyper-Local Delivery', label: 'Logistics Node 02', src: 'https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=800&auto=format&fit=crop' },
    { id: 'qm-3', title: 'Next-Gen Marketplace', label: 'Logistics Node 03', src: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        ]
        }
    ];

    return (
        <div ref={containerRef} className="bg-bg-dark-1 ">
        <div ref={pinRef} className="relative h-screen w-full flex overflow-hidden">
            {panelsData.map((panel, idx) => (
            <div 
                key={panel.id}
                onClick={() => handlePanelTap(panel.id, panel.cards.length)}
                className={`venture-panel shrink-0 w-screen h-screen flex items-center justify-between px-6 lg:px-24 bg-gradient-to-br ${panel.color} relative border-r border-white/[0.02] cursor-none group`}
                onMouseEnter={() => triggerCursor('interactive', 'Tap')}
                onMouseLeave={() => triggerCursor('default')}
            >
                {/* Functional Information Grid Left */}
                <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center pointer-events-none select-none">
                <span className="text-xs font-mono tracking-[0.2em] uppercase opacity-60 mb-2" style={{ color: panel.accent }}>
                    // Pillar {idx + 1} : {panel.industry}
                </span>
                <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black font-display text-text-white uppercase tracking-tighter max-w-xl leading-none">
                    {panel.title}
                </h3>
                
                <ul className="mt-8 space-y-4 max-w-sm" aria-label={`Core offerings for ${panel.title}`}>
                    {panel.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-3 text-text-gray font-medium text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: panel.accent }} />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Interactive Image-Stack Terminal Space Right */}
                <div className="hidden md:flex w-1/2 h-full items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[65%] border border-white/[0.04] bg-white/[0.005] rounded-2xl relative p-12 overflow-hidden flex items-center justify-center backdrop-blur-sm group-active:scale-[0.99] transition-transform duration-100">
                    
                    {/* Tech Blueprint Grid System Base */}
                    <div 
                    className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
                    style={{ opacity: 0.06 }}
                    />
                    
                    {/* Full-Bleed Image Layout Stack Module */}
                    <div className="w-full h-full relative max-w-sm max-h-[260px] pt-6">
                    <ImageStack images={panel.cards} currentIndex={activeIndices[panel.id]} />
                    </div>

                    {/* Micro-Overlay Tracking Tags */}
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-text-gray/30 pointer-events-none select-none">
                    QIYAM_VENTURES_IMAGE_STREAM_0{idx + 1} // ACTIVE // TAP ANYWHERE TO SWIPE
                    </div>
                </div>
                </div>

            </div>
            ))}
        </div>
        </div>
    );
}