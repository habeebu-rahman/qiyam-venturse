import { useEffect, useState} from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [cursorState, setCursorState] = useState({ variant: 'default', text: '' });
    const [isVisible, setIsVisible] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Custom Event Listeners mapped to 3D and panel interaction bounds
        const handleCursorMorph = (e) => {
        const variant = e.detail?.variant || 'default';
        const text = e.detail?.text || '';
        setCursorState({ variant, text });
        };

        window.addEventListener('morphCursor', handleCursorMorph);

        return () => {
        window.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('morphCursor', handleCursorMorph);
        };
    }, [cursorX, cursorY, isVisible]);

    const variants = {
        default: {
        width: 12,
        height: 12,
        backgroundColor: '#00E5FF',
        border: '0px solid transparent'
        },
        interactive: {
        width: 64,
        height: 64,
        backgroundColor: 'rgba(7, 17, 31, 0.6)',
        border: '1px solid #00E5FF',
        backdropFilter: 'blur(4px)'
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center overflow-hidden text-[10px] tracking-wider font-semibold uppercase text-accent-cyan"
        style={{
            x: cursorXSpring,
            y: cursorYSpring,
        }}
        animate={cursorState.variant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        >
        {cursorState.variant === 'interactive' && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            {cursorState.text}
            </motion.span>
        )}
        </motion.div>
    );
    }

    // Utility functions to export global programmatic micro-cursor mutations
    export const triggerCursor = (variant, text = '') => {
    const event = new CustomEvent('morphCursor', { detail: { variant, text } });
    window.dispatchEvent(event);
};