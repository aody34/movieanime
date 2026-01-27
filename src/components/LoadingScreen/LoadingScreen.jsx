import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    const loaderRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setShouldRender(true);
            gsap.set(loaderRef.current, { display: 'flex' });
            gsap.to(loaderRef.current, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.set(loaderRef.current, { display: 'none' });
                    setShouldRender(false);
                }
            });
        }
    }, [isLoading]);

    if (!shouldRender && !isLoading) return null;

    return (
        <div ref={loaderRef} className="loading-screen">
            <div className="loader-content">
                {/* Logo Animation */}
                <div className="loader-logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8L12 4L20 8V16L12 20L4 16V8Z" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12L20 8" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12V20" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 12L4 8" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#e50914" />
                                <stop offset="1" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Loading Text */}
                <div className="loader-text">
                    <span>S</span>
                    <span>t</span>
                    <span>r</span>
                    <span>e</span>
                    <span>a</span>
                    <span>m</span>
                    <span>V</span>
                    <span>e</span>
                    <span>r</span>
                    <span>s</span>
                    <span>e</span>
                </div>

                {/* Loading Bar */}
                <div className="loader-bar">
                    <div className="loader-bar-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
