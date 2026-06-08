import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import { triggerCursor } from './CustomCursor';

export default function Hero() {
    const containerRef = useRef(null);
    const titleLineRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Isolate overflow container up-sliding tracking timeline
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        
        tl.from('.tracker-text', { opacity: 0, y: 10, duration: 1, delay: 0.5 })
            .from(titleLineRefs.current, {
            yPercent: 100,
            duration: 1.2,
            stagger: 0.15
            }, '-=0.7')
            .from('.hero-desc', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
            .from('.hero-cta', { opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1 }, '-=0.8');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMagneticCTA = (e) => {
        const bound = e.currentTarget.getBoundingClientRect();
        gsap.to(e.currentTarget, {
        x: (e.clientX - bound.left - bound.width / 2) * 0.3,
        y: (e.clientY - bound.top - bound.height / 2) * 0.3,
        duration: 0.3
        });
    };

    const resetMagneticCTA = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex flex-col justify-center bg-gradient-to-b from-bg-dark-1 to-bg-dark-2 px-6 lg:px-24 border-b border-white/[0.02]">
        
        {/* Decoupled High Performance 3D Node Subsystem Container */}
        <div 
            className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
            onMouseEnter={() => triggerCursor('interactive', 'Orbit')}
            onMouseLeave={() => triggerCursor('default')}
        >
            <HeroCanvas />
        </div>

        <div className="relative z-10 w-full max-w-4xl pointer-events-none mt-16">
            <span className="tracker-text block text-accent-cyan font-mono text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            QIYAM VENTURES // MULTI-VENTURE ECOSYSTEM
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display text-text-white tracking-tighter leading-[0.9] uppercase flex flex-col mb-8">
            {['Building', 'Extraordinary', 'Business', 'Ecosystems'].map((line, i) => (
                <span key={i} className="block overflow-hidden h-fit py-1">
                <span 
                    ref={(el) => (titleLineRefs.current[i] = el)} 
                    className="block will-change-transform"
                >
                    {line}
                </span>
                </span>
            ))}
            </h1>

            <p className="hero-desc text-text-gray font-body max-w-lg text-sm sm:text-base md:text-lg leading-relaxed mb-12 pointer-events-auto">
            We architect, upscale, and integrate dynamic market solutions across enterprise advisory, luxury experiences, and highly responsive retail networks.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 pointer-events-auto">
            <button 
                onMouseMove={handleMagneticCTA}
                onMouseLeave={resetMagneticCTA}
                className="group relative px-8 py-4 bg-transparent border border-accent-cyan/30 rounded-md text-xs font-semibold uppercase tracking-widest text-text-white overflow-hidden transition-all duration-300"
            >
                <span className="relative z-10">Explore Ventures</span>
                <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-px border border-accent-cyan scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-md blur-[2px]" />
            </button>

            <button 
                onMouseMove={handleMagneticCTA}
                onMouseLeave={resetMagneticCTA}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-md text-xs font-semibold uppercase tracking-widest text-text-white border border-white/10"
            >
                Our Vision
            </button>
            </div>
        </div>
        </div>
    );
}