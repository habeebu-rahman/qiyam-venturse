import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Dynamic resolution extraction of overall length parameters
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            
            // Formulate base vector configurations
            gsap.set(pathRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length
            });

            // Frame ScrollTrigger interpolation parameters tracking configuration
            gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
            });
        }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
        ref={containerRef} 
        className="w-full bg-bg-dark-2 py-32 px-6 lg:px-24 flex flex-col md:flex-row relative gap-16 border-b border-white/[0.02]"
        >
        {/* Sticky Left Column Heading Wrapper */}
        <div className="w-full md:w-1/2 md:sticky md:top-32 h-fit">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-text-white uppercase leading-none tracking-tight max-w-md">
            <span className="text-logo-darkyellow">One </span> <br />
            Ecosystem. <br />
            <span className="text-logo-lightyellow">Multiple</span> <br />
            Possibilities.
            </h2>
            <p className="mt-6 text-text-gray text-sm md:text-base max-w-sm leading-relaxed">
            Qiyam Ventures bridges markets through strategic scaling architecture, transforming isolated domains into high-performance structural systems.
            </p>
        </div>

        {/* Right Column Interlocking Infographic Asset Grid */}
        <div className="w-full md:w-1/2 flex items-center justify-center min-h-[400px]">
            <svg 
            viewBox="0 0 400 400" 
            className="w-full max-w-md" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Ecosystem architecture layout diagram"
            >
            {/* Structural Path Matrices Rendering */}
            <path 
                ref={pathRef}
                d="M 200 60 L 200 150 M 200 150 L 60 260 M 200 150 L 200 260 M 200 150 L 340 260" 
                stroke="url(#gradient-accent)" 
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Core Master Vector Group Mapping */}
            <circle cx="200" cy="60" r="16" fill="#030712" stroke="#c7973b" strokeWidth="2" />
            <text x="200" y="65" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">QV</text>
            <text x="200" y="35" fill="#F8FAFC" fontSize="12" letterSpacing="1" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">QIYAM VENTURES</text>

            {/* Child Node Array Definitions: 1. Business Solutions */}
            <circle cx="60" cy="260" r="10" fill="#07111F" stroke="#000333" strokeWidth="2" />
            <text x="60" y="265" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">BS</text>
            <text x="60" y="300" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Business Solutions</text>

            {/* Child Node Array Definitions: 2. Qiyam Celebrate */}
            <circle cx="200" cy="260" r="10" fill="#07111F" stroke="#000333" strokeWidth="2" />
            <text x="200" y="265" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">QC</text>
            <text x="200" y="300" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Qiyam Celebrate</text>

            {/* Child Node Array Definitions: 3. Qiyam Mart */}
            <circle cx="340" cy="260" r="10" fill="#07111F" stroke="#000333" strokeWidth="2" />
            <text x="340" y="265" fill="#F8FAFC" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">QM</text>
            <text x="340" y="300" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Qiyam Mart</text>

            <defs>
                <linearGradient id="gradient-accent" x1="200" y1="60" x2="200" y2="260" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c7973b" />
                <stop offset="1" stopColor="#000333" />
                </linearGradient>
            </defs>
            </svg>
        </div>
        </section>
    );
}