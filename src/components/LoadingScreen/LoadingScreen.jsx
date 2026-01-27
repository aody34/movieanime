import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    const loaderRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const barRef = useRef(null);
    const counterRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(isLoading);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            setShouldRender(true);
            gsap.set(loaderRef.current, { display: 'flex' });

            // Cinematic intro timeline
            const tl = gsap.timeline();

            // Animate counter from 0 to 100
            const counter = { value: 0 };
            tl.to(counter, {
                value: 100,
                duration: 2.5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    setLoadProgress(Math.floor(counter.value));
                }
            });

            // Logo pulse animation
            gsap.to(logoRef.current, {
                scale: 1.1,
                duration: 0.8,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });

            // Letters stagger wave
            const letters = textRef.current?.querySelectorAll('span');
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

        } else {
            // Cinematic exit animation
            const exitTl = gsap.timeline({
                onComplete: () => {
                    gsap.set(loaderRef.current, { display: 'none' });
                    setShouldRender(false);
                }
            });

            // Counter flashes
            exitTl.to(counterRef.current, {
                scale: 1.2,
                color: '#e50914',
                duration: 0.2
            });

            // Logo expands
            exitTl.to(logoRef.current, {
                scale: 3,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.in'
            }, '-=0.1');

            // Screen wipes away dramatically
            exitTl.to(loaderRef.current, {
                clipPath: 'circle(0% at 50% 50%)',
                duration: 0.8,
                ease: 'power4.inOut'
            }, '-=0.4');
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
                <div ref={barRef} className="loader-bar">
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
