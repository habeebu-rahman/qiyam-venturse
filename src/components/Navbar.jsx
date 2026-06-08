import { useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const navRef = useRef(null);

    const handleMagnetic = (e) => {
        const bound = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bound.left - bound.width / 2;
        const y = e.clientY - bound.top - bound.height / 2;
        
        gsap.to(e.currentTarget, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: 'power2.out'
        });
    };

    const resetMagnetic = (e) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    return (
        <header 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-6 mix-blend-difference border-b border-white/[0.03] backdrop-blur-[2px]"
        aria-label="Global Corporate Navigation"
        >
        <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-xl tracking-tighter text-text-white">
            QIYAM <span className="text-accent-cyan">.</span>
            </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {['About', 'Ventures', 'Metrics', 'Vision', 'Timeline', 'Contact'].map((item) => (
            <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-widest font-medium text-text-gray hover:text-accent-cyan transition-colors duration-300 relative py-1 group"
            >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-cyan transition-all duration-300 group-hover:w-full" />
            </a>
            ))}
        </nav>

        <div>
            <button
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="relative px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest bg-white text-bg-dark-1 overflow-hidden transition-all duration-300 group"
            >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-text-white">Partner Portal</span>
            <span className="absolute inset-0 bg-accent-purple scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
            </button>
        </div>
        </header>
    );
}