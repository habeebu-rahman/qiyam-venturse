import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
    const containerRef = useRef(null);
    const progressLineRef = useRef(null);

    const milestones = [
        { year: "2024", title: "Foundation", desc: "Inception of Qiyam Ventures structural core and enterprise modeling assets." },
        { year: "2025", title: "Expansion", desc: "Branching vectors launch into luxury event curation ecosystems via Qiyam Celebrate." },
        { year: "2026", title: "Multi-Venture Growth", desc: "Integration of modern supply matrix layers with Qiyam Mart deployment arrays." },
        { year: "Future", title: "Global Ecosystem", desc: "Cross-border system expansions running unified technological operations nodes." }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Animate vertical scale mapping track indicator line directly on-scroll
        gsap.to(progressLineRef.current, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true
            }
        });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-bg-dark-2 py-32 px-6 lg:px-24 relative border-b border-white/[0.02]">
        <div className="max-w-4xl mx-auto relative">
            
            {/* Central Tracking Progress Pathway Guide Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            <div 
                ref={progressLineRef}
                className="w-full h-full bg-gradient-to-b from-accent-cyan to-accent-purple origin-top scale-y-0 will-change-transform"
            />
            </div>

            {/* Milestone Block Generation Map */}
            <div className="space-y-16 relative">
            {milestones.map((item, idx) => (
                <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-start justify-between relative w-full ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                >
                {/* Central Target Orb Node Positioner Marker */}
                <div className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 rounded-full bg-bg-dark-2 border-2 border-accent-cyan -translate-x-1/2 z-10" />

                {/* Text Layout Containers */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="font-display font-black text-2xl text-accent-cyan">{item.year}</span>
                    <h4 className="font-display font-bold text-lg text-text-white mt-1 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-sm text-text-gray mt-2 leading-relaxed max-w-sm md:ml-auto md:mr-0">{item.desc}</p>
                </div>
                <div className="hidden md:block w-[45%]" />
                </div>
            ))}
            </div>

        </div>
        </section>
    );
}