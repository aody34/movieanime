import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './MagneticButton.css';

const MagneticButton = ({ children, className = '', onClick, ...props }) => {
    const buttonRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const content = contentRef.current;

        // Skip on touch devices
        if ('ontouchstart' in window) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true
            });

            gsap.to(content, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: 'power2.out',
                force3D: true
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
                force3D: true
            });

            gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
                force3D: true
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className={`magnetic-btn ${className}`}
            onClick={onClick}
            {...props}
        >
            <span ref={contentRef} className="magnetic-btn-content">
                {children}
            </span>
        </button>
    );
};

export default MagneticButton;
