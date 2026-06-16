import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Shield, Cpu, Target } from 'lucide-react';
import { triggerCursor } from '../components/CustomCursor';

// Import your data array module directly
import { pillersData } from '../data/pillersData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutVenturesPage() {
    const { id } = useParams();
    const containerRef = useRef(null);
    const heroRef = useRef(null);

    // Find the matching venture dataset matching the dynamic URL parameter ID frame
    const venture = pillersData.find((item) => item.id.toLowerCase() === id.toLowerCase());

    useEffect(() => {
        // Scroll right to the top of the browser view when entering a dynamic route destination
        window.scrollTo(0, 0);

        if (!venture) return;

        const ctx = gsap.context(() => {
        // High-end cinematic reveal sequence for title elements and data layers
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

        tl.fromTo('.reveal-eyebrow', { opacity: 0, y: 30 }, { opacity: 0.6, y: 0 })
            .fromTo('.reveal-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.9')
            .fromTo('.reveal-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.9')
            .fromTo('.reveal-images', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, '-=0.8');

        // Parallax scroll effects across the gallery system grid elements
        gsap.utils.toArray('.parallax-img').forEach((img) => {
            gsap.to(img, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                scrub: true,
            },
            });
        });
        }, containerRef);

        return () => ctx.revert();
    }, [id, venture]);

    // Premium Custom Error Boundary Screen if dynamic ID mismatch passes through router parameters
    if (!venture) {
        return (
        <div className="h-screen w-full bg-[#030712] flex flex-col items-center justify-center font-mono px-6">
            <span className="text-sm tracking-widest text-[#00E5FF] mb-2">// ERROR: 404_NODE_NOT_FOUND</span>
            <h1 className="text-2xl font-black font-display text-white uppercase mb-8">Venture Pillar Does Not Exist</h1>
            <Link 
            to="/" 
            className="px-6 py-2 border border-white/10 rounded-full text-xs text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
            Return to Matrix
            </Link>
        </div>
        );
    }

    return (
        <div ref={containerRef} className="bg-[#030712] min-h-screen text-white overflow-hidden relative selection:bg-[#00E5FF]/30">
        
        {/* Structural Minimal Tech Blueprint Ambient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

        {/* Floating Header Floating Navigation Control */}
        <div className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 h-24 flex items-center justify-between mix-blend-difference pointer-events-none">
            <Link 
            to="/#ventures"
            className="inline-flex items-center space-x-3 pointer-events-auto group font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
            >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return</span>
            </Link>
            <span className="font-mono text-[9px] tracking-widest text-white/20 hidden sm:inline">
            SYS_NODE_SPEC // {venture.id.toUpperCase()} // ACTIVE
            </span>
        </div>

        {/* ============================================================================
            SECTION 1: HERO CONTAINER
            ============================================================================ */}
        <section ref={heroRef} className="min-h-[85vh] w-full flex items-center pt-32 px-6 md:px-16 lg:px-24 border-b border-white/[0.03] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
            
            {/* Detailed Branding Information Matrix Frame Left */}
            <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="reveal-eyebrow text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: venture.accent }}>
                // Core Venture Sector : {venture.industry}
                </span>
                <h1 className="reveal-title text-4xl sm:text-6xl lg:text-8xl font-black font-display tracking-tighter uppercase leading-[0.9] text-[#F8FAFC]">
                {venture.title}
                </h1>
                <p className="reveal-desc text-sm sm:text-base md:text-lg text-[#94A3B8] font-medium max-w-xl mt-8 leading-relaxed">
                Accelerating technological distribution architecture and operational optimization modules across premium industry verticals. Tailored execution strategy vectors integrated seamlessly into sustainable framework footprints.
                </p>

                <div className="reveal-desc mt-12 flex flex-wrap gap-3">
                {venture.features.map((feature, idx) => (
                    <span 
                    key={idx}
                    className="font-mono text-[10px] tracking-wider uppercase border border-white/[0.06] bg-white/[0.01] backdrop-blur-md px-4 py-2 rounded-full"
                    >
                    // {feature}
                    </span>
                ))}
                </div>
            </div>

            {/* Large Aspect Full-Bleed Media Visual Frame Right */}
            <div className="reveal-images lg:col-span-5 h-[450px] w-full rounded-2xl border border-white/[0.06] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] relative bg-white/[0.002]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#030712]/50 via-transparent to-white/10 z-10 pointer-events-none" />
                <img 
                src={venture.cards[0]?.src} 
                alt={venture.title} 
                className="w-full h-full object-cover object-center scale-105"
                />
            </div>

            </div>
        </section>

        {/* ============================================================================
            SECTION 2: GRID GALLERY VIEW
            ============================================================================ */}
        <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto relative z-10">
            <div className="mb-16 font-mono">
            <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase block mb-2">// CAPABILITIES GRID</span>
            <h2 className="text-2xl font-black tracking-tight uppercase font-display">Operational Landscapes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venture.cards.map((card, idx) => (
                <div 
                key={card.id}
                className="group rounded-2xl border border-white/[0.04] bg-[#07111F]/30 backdrop-blur-sm p-4 overflow-hidden flex flex-col h-[380px] shadow-2xl transition-all duration-500 hover:border-white/[0.12]"
                >
                <div className="w-full h-48 overflow-hidden rounded-xl relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                    <img 
                    src={card.src} 
                    alt={card.title}
                    className="parallax-img absolute inset-0 w-full h-[120%] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="px-2 mt-auto pb-4">
                    <span className="font-mono text-[9px] tracking-widest text-white/30 block mb-1 uppercase">
                    {card.label}
                    </span>
                    <h3 className="text-lg font-black tracking-wide uppercase font-display text-[#F8FAFC]">
                    {card.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-2 font-medium leading-relaxed">
                    Systematic synchronization protocols tailored specifically to ensure maximum infrastructure uptime deployment loops.
                    </p>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* ============================================================================
            SECTION 3: CONTEXT FOOTER (MATRIX ROUTER CONTROLLER)
            ============================================================================ */}
        <footer className="py-20 border-t border-white/[0.03] px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 bg-gradient-to-t from-[#07111F]/20 to-transparent">
            <div className="text-center md:text-left">
            <h4 className="text-sm font-mono tracking-widest text-white/30 uppercase">// SYSTEM RE-ROUTING TERMINAL</h4>
            <p className="text-text-gray text-xs font-medium mt-1">Ready to inspect another enterprise ecosystem framework?</p>
            </div>
            
            <Link 
            to="/#about"
            className="group inline-flex items-center space-x-4 bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-accent-cyan hover:text-black transition-all duration-300"
            >
            <span>Main Ecosystem</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </footer>

        </div>
    );
}