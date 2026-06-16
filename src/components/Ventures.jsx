import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { triggerCursor } from './CustomCursor';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { pillersData } from '../data/pillersData';

gsap.registerPlugin(ScrollTrigger);

function ImageStack({ images, currentIndex }) {
    const orderedImages = [
        ...images.slice(currentIndex),
        ...images.slice(0, currentIndex)
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
        <AnimatePresence mode="popLayout">
            {orderedImages.map((image, index) => {
            const isTop = index === 0;
            const verticalStackOffset = -24; 

            return (
                <motion.div
                key={image.id}
                style={{ zIndex: orderedImages.length - index }}
                className="absolute w-full h-full rounded-2xl border border-white/[0.06] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-bg-dark-3"
                initial={{ scale: 0.95, y: 0, opacity: 0 }}
                animate={{
                    scale: isTop ? 1 : 1 - index * 0.03,
                    y: isTop ? 0 : index * verticalStackOffset,
                    opacity: index > 2 ? 0 : 1,
                }}
                exit={{ 
                    y: 80, 
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
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark-1 via-transparent to-bg-dark-2 mix-blend-overlay z-10 pointer-events-none" />
                
                <img 
                    src={image.src} 
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

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

    export default function Ventures() {
    const containerRef = useRef(null);
    const pinRef = useRef(null);
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

    return (
        <div ref={containerRef} className="bg-bg-dark-1">
        <div ref={pinRef} className="relative h-screen w-full flex overflow-hidden">
            {pillersData.map((panel, idx) => (
            <div 
                key={panel.id}
                onClick={() => handlePanelTap(panel.id, panel.cards.length)}
                className={`venture-panel shrink-0 w-screen h-screen flex items-center justify-between px-6 lg:px-24 bg-gradient-to-br ${panel.color} relative border-r border-white/[0.02] cursor-none group`}
                onMouseEnter={() => triggerCursor('interactive', 'Tap')}
                onMouseLeave={() => triggerCursor('default')}
            >
                {/* Functional Information Grid Left */}
                <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center h-full py-20">
                <div className="pointer-events-none select-none">
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

                {/* CRITICAL FIX: The Link container now stops event bubbling */}
                <div className="mt-12">
                    <Link 
                    to={panel.path} 
                    onClick={(e) => {
                        e.stopPropagation(); 
                    }}
                    // 👇 INTERCEPT THE CURSOR HOVER STATES HERE
                    onMouseEnter={(e) => {
                        e.stopPropagation();       // Stops the parent panel from overwriting the cursor state
                        triggerCursor('default');  // Forces custom cursor back to standard arrow/dot mode
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();       // Stops parent panel glitching on leave
                        triggerCursor('interactive', 'Tap'); // Safely restores the 'Tap' state when moving back to the panel
                    }}
                    className="inline-flex items-center space-x-2 font-bold px-0 py-2 group-hover:translate-x-2 transition-transform cursor-pointer pointer-events-auto" 
                    style={{ color: panel.accent }}
                    >
                    <span>Learn More</span>
                    <ArrowRight size={18} />
                    </Link>
                </div>
                </div>

                {/* Interactive Image-Stack Terminal Space Right */}
                <div className="hidden md:flex w-1/2 h-full items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[65%] border border-white/[0.04] bg-white/[0.005] rounded-2xl relative p-12 overflow-hidden flex items-center justify-center backdrop-blur-sm group-active:scale-[0.99] transition-transform duration-100">
                    <div 
                    className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
                    style={{ opacity: 0.06 }}
                    />
                    
                    <div className="w-full h-full relative max-w-sm max-h-[260px] pt-6">
                    <ImageStack images={panel.cards} currentIndex={activeIndices[panel.id]} />
                    </div>

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