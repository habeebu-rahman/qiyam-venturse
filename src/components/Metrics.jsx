import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Metrics() {
    const sectionRef = useRef(null);

    const metricsData = [
        { value: 3, suffix: "+", label: "Core Ventures" },
        { value: 100, suffix: "+", label: "Projects Delivered" },
        { value: 5, suffix: "+", label: "Industries" },
        { value: 360, suffix: "°", label: "Business Ecosystem" }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Loop over metrics counters targets
        gsap.utils.toArray('.counter-val').forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            
            gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: 'power3.out',
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top bottom-=50px',
                toggleActions: 'play none none none'
            }
            });
        });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
        ref={sectionRef} 
        className="w-full bg-bg-dark-3 py-24 px-6 lg:px-24 border-b border-white/[0.02]"
        aria-label="Operational Metrics"
        >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {metricsData.map((metric, idx) => (
            <div key={idx} className="flex flex-col border-l border-white/[0.05] pl-6 py-4">
                <div className="font-display text-4xl sm:text-6xl font-black text-text-white tracking-tight flex items-center">
                <span className="counter-val" data-target={metric.value}>0</span>
                <span className="text-logo-lightblue ml-0.5">{metric.suffix}</span>
                </div>
                <span className="text-xs uppercase tracking-widest font-medium text-accent-cyan mt-2">
                {metric.label}
                </span>
            </div>
            ))}
        </div>
        </section>
    );
}