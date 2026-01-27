import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;

        // Hide cursor on touch devices
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            return;
        }

        // Show custom cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e) => {
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
                force3D: true
            });

            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true
            });
        };

        const handleMouseEnter = (e) => {
            const target = e.target;

            // Check for interactive elements
            if (target.matches('a, button, .movie-card, .btn, [role="button"]')) {
                gsap.to(ring, {
                    scale: 1.5,
                    borderColor: 'var(--color-accent-primary)',
                    duration: 0.3
                });
                gsap.to(dot, {
                    scale: 0,
                    duration: 0.2
                });
            }

            // Check for play buttons
            if (target.matches('.btn-primary, .card-play-btn')) {
                gsap.to(ring, {
                    scale: 2,
                    backgroundColor: 'rgba(229, 9, 20, 0.2)',
                    duration: 0.3
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(ring, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'transparent',
                duration: 0.3
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.2
            });
        };

        const handleMouseDown = () => {
            gsap.to(ring, {
                scale: 0.8,
                duration: 0.1
            });
        };

        const handleMouseUp = () => {
            gsap.to(ring, {
                scale: 1,
                duration: 0.2
            });
        };

        // Event listeners
        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div ref={cursorRef} className="custom-cursor">
            <div ref={cursorDotRef} className="cursor-dot"></div>
            <div ref={cursorRingRef} className="cursor-ring"></div>
        </div>
    );
};

export default CustomCursor;
