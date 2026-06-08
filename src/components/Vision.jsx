import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
    const containerRef = useRef(null);
    const bgMeshRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Background gradient mesh position manipulation tracking
        gsap.to(bgMeshRef.current, {
            scale: 1.2,
            rotate: 45,
            ease: 'none',
            scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
            }
        });

        // Word by word scroll-tied staggering opacity engine
        if (textRef.current) {
            const words = textRef.current.querySelectorAll('.vision-word');
            gsap.to(words, {
            opacity: 1,
            stagger: 0.1,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: true
            }
            });
        }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const statement = "We Don't Build Companies. We Build Ecosystems.";

    return (
        <div 
        ref={containerRef} 
        className="relative w-full h-screen flex items-center justify-center bg-bg-dark-1 overflow-hidden border-b border-white/[0.02]"
        >
        {/* Background Animated Gradient Mesh Layer */}
        <div 
            ref={bgMeshRef}
            className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-accent-purple/10 to-accent-cyan/10 blur-[120px] pointer-events-none z-0 will-change-transform"
        />

        <div className="relative z-10 max-w-5xl px-6 text-center select-none">
            <span className="block text-accent-cyan font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-6">
            // EXECUTIVE ETHOS
            </span>
            
            <h2 
            ref={textRef}
            className="text-3xl sm:text-5xl md:text-7xl font-black font-display text-text-white uppercase tracking-tight leading-tight"
            >
            {statement.split(" ").map((word, idx) => (
                <span 
                key={idx} 
                className="vision-word inline-block mr-3 sm:mr-5 opacity-15 transition-opacity duration-300 will-change-transform"
                >
                {word}
                </span>
            ))}
            </h2>
        </div>
        </div>
    );
}