import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    const loaderRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const counterRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(isLoading);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        if (!loaderRef.current) return;

        if (isLoading) {
            setShouldRender(true);

            // Safety timeout - always hide after 3 seconds max
            const safetyTimeout = setTimeout(() => {
                if (loaderRef.current) {
                    loaderRef.current.style.display = 'none';
                    setShouldRender(false);
                }
            }, 3500);

            try {
                // Animate counter from 0 to 100
                const counter = { value: 0 };
                gsap.to(counter, {
                    value: 100,
                    duration: 2.5,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        setLoadProgress(Math.floor(counter.value));
                    }
                });

                // Logo pulse animation
                if (logoRef.current) {
                    gsap.to(logoRef.current, {
                        scale: 1.1,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }

                // Letters stagger wave
                const letters = textRef.current?.querySelectorAll('span');
                if (letters?.length) {
                    gsap.to(letters, {
                        y: -10,
                        duration: 0.5,
                        stagger: {
                            each: 0.08,
                            repeat: -1,
                            yoyo: true
                        },
                        ease: 'power2.inOut'
                    });
                }
            } catch (e) {
                console.warn('Loading animation error:', e);
            }

            return () => clearTimeout(safetyTimeout);

        } else {
            // Exit animation with fallback
            try {
                const exitTl = gsap.timeline({
                    onComplete: () => {
                        if (loaderRef.current) {
                            loaderRef.current.style.display = 'none';
                        }
                        setShouldRender(false);
                    }
                });

                exitTl.to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
            } catch (e) {
                // Fallback: just hide it
                if (loaderRef.current) {
                    loaderRef.current.style.display = 'none';
                }
                setShouldRender(false);
            }
        }
    }, [isLoading]);

    if (!shouldRender && !isLoading) return null;

    return (
        <div ref={loaderRef} className="loading-screen">
            {/* Animated background particles */}
            <div className="loader-particles">
                <div className="loader-particle"></div>
                <div className="loader-particle"></div>
                <div className="loader-particle"></div>
                <div className="loader-particle"></div>
                <div className="loader-particle"></div>
                <div className="loader-particle"></div>
            </div>

            <div className="loader-content">
                {/* Logo Animation */}
                <div ref={logoRef} className="loader-logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 8L12 4L20 8V16L12 20L4 16V8Z"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="logo-path"
                        />
                        <path
                            d="M12 12L20 8"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="logo-path"
                        />
                        <path
                            d="M12 12V20"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="logo-path"
                        />
                        <path
                            d="M12 12L4 8"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="logo-path"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#e50914" />
                                <stop offset="1" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Glow ring */}
                    <div className="logo-ring"></div>
                    <div className="logo-ring ring-2"></div>
                </div>

                {/* Loading Text */}
                <div ref={textRef} className="loader-text">
                    <span>S</span>
                    <span>t</span>
                    <span>r</span>
                    <span>e</span>
                    <span>a</span>
                    <span>m</span>
                    <span className="text-gradient">V</span>
                    <span className="text-gradient">e</span>
                    <span className="text-gradient">r</span>
                    <span className="text-gradient">s</span>
                    <span className="text-gradient">e</span>
                </div>

                {/* Progress Counter */}
                <div ref={counterRef} className="loader-counter">
                    {loadProgress}%
                </div>

                {/* Loading Bar */}
                <div className="loader-bar">
                    <div
                        className="loader-bar-fill"
                        style={{ width: `${loadProgress}%` }}
                    ></div>
                    <div className="loader-bar-glow"></div>
                </div>

                {/* Loading Message */}
                <p className="loader-message">
                    Preparing your cinematic experience...
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
