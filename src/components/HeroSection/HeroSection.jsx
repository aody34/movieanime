import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton/MagneticButton';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ content }) => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const badgesRef = useRef(null);
    const bgContainerRef = useRef(null);
    const overlayRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isLowEndDevice, setIsLowEndDevice] = useState(false);

    // Ensure content is always an array
    const contentArray = Array.isArray(content) ? content : [content];
    const currentContent = contentArray[activeIndex] || contentArray[0];

    // Auto-rotate featured content
    useEffect(() => {
        if (contentArray.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % contentArray.length);
        }, 8000); // Change every 8 seconds

        return () => clearInterval(interval);
    }, [contentArray.length]);

    // Handle indicator click
    const handleIndicatorClick = useCallback((index) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    }, [activeIndex]);

    // Cross-fade animation when content changes
    useEffect(() => {
        if (!contentRef.current) return;

        // Animate content out and in
        const tl = gsap.timeline();

        // Fade out current content
        tl.to([titleRef.current, descRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.3,
            stagger: 0.1
        });

        // Fade in new content
        tl.to([titleRef.current, descRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1
        });

    }, [activeIndex]);

    // Detect low-end devices
    useEffect(() => {
        const checkDevice = () => {
            const isLowEnd =
                navigator.hardwareConcurrency <= 4 ||
                navigator.deviceMemory <= 4 ||
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsLowEndDevice(isLowEnd);
        };
        checkDevice();
    }, []);

    // Initial animations
    useEffect(() => {
        if (!heroRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            const masterTl = gsap.timeline({
                defaults: { ease: 'power4.out', force3D: true },
                onComplete: () => {
                    gsap.set([
                        titleRef.current,
                        subtitleRef.current,
                        descRef.current,
                        badgesRef.current?.children,
                        buttonsRef.current?.children
                    ].filter(Boolean), { opacity: 1, y: 0 });
                }
            });

            // Background reveal
            masterTl.fromTo(bgContainerRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
            );

            // Letterbox bars
            masterTl.fromTo('.hero-letterbox-top',
                { scaleY: 1 },
                { scaleY: 0, duration: 1.5, ease: 'power3.inOut' },
                '-=1.5'
            );
            masterTl.fromTo('.hero-letterbox-bottom',
                { scaleY: 1 },
                { scaleY: 0, duration: 1.5, ease: 'power3.inOut' },
                '-=1.5'
            );

            // Overlay reveal
            masterTl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2 },
                '-=1.5'
            );

            // Badges
            masterTl.fromTo(badgesRef.current?.children || [],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.5)' },
                '-=0.8'
            );

            // Title
            masterTl.fromTo(titleRef.current,
                { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
                '-=0.4'
            );

            // Subtitle
            masterTl.fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.8'
            );

            // Description
            masterTl.fromTo(descRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            );

            // Buttons
            masterTl.fromTo(buttonsRef.current?.children || [],
                { y: 40, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' },
                '-=0.3'
            );

            // Mouse parallax (desktop only)
            if (!isLowEndDevice) {
                const handleMouseMove = (e) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    const xPercent = (clientX / innerWidth - 0.5) * 2;
                    const yPercent = (clientY / innerHeight - 0.5) * 2;

                    gsap.to(contentRef.current, {
                        x: xPercent * 15,
                        y: yPercent * 10,
                        duration: 1,
                        ease: 'power2.out'
                    });

                    gsap.to(bgContainerRef.current, {
                        x: xPercent * -8,
                        y: yPercent * -5,
                        duration: 1.2,
                        ease: 'power2.out'
                    });
                };

                window.addEventListener('mousemove', handleMouseMove);
                return () => window.removeEventListener('mousemove', handleMouseMove);
            }

            // Scroll parallax
            gsap.to(bgContainerRef.current, {
                yPercent: 20,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to(contentRef.current, {
                yPercent: -15,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '50% top',
                    scrub: true
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, [isLowEndDevice]);

    if (!currentContent) return null;

    return (
        <section ref={heroRef} className="hero-section">
            {/* Cinematic Letterbox Bars */}
            <div className="hero-letterbox-top"></div>
            <div className="hero-letterbox-bottom"></div>

            {/* Dynamic Background Images - Cross-fade */}
            <div ref={bgContainerRef} className="hero-bg-container">
                {contentArray.map((item, index) => (
                    <div
                        key={item.id}
                        className={`hero-bg-slide ${index === activeIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${item.backdrop})` }}
                    />
                ))}
                <div className="hero-bg-gradient"></div>
            </div>

            {/* Cinematic Overlays */}
            <div ref={overlayRef} className="hero-overlay">
                <div className="hero-gradient-left"></div>
                <div className="hero-gradient-bottom"></div>
                <div className="hero-vignette"></div>
                <div className="hero-scanlines"></div>
            </div>

            {/* Film Grain */}
            <div className="hero-noise"></div>

            {/* Particles */}
            {!isLowEndDevice && (
                <div className="hero-particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
            )}

            {/* Main Content */}
            <div ref={contentRef} className="hero-content container">
                {/* Badges */}
                <div ref={badgesRef} className="hero-badges">
                    <span className="badge badge-live">
                        <span className="badge-pulse"></span>
                        STREAMING NOW
                    </span>
                    <span className="badge badge-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        {currentContent.rating}
                    </span>
                    <span className="badge badge-year">{currentContent.year}</span>
                    <span className="badge badge-duration">{currentContent.duration}</span>
                    <span className={`badge badge-type ${currentContent.type}`}>
                        {currentContent.type === 'anime' ? '🎌 Anime' : '🎬 Movie'}
                    </span>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="hero-subtitle">
                    EXPERIENCE THE ULTIMATE STREAMING
                </p>

                {/* Title */}
                <h1 ref={titleRef} className="hero-title">
                    {currentContent.title}
                </h1>

                {/* Genres */}
                <div className="hero-genres">
                    {currentContent.genres?.map((genre, index) => (
                        <span key={index} className="hero-genre">{genre}</span>
                    ))}
                </div>

                {/* Description */}
                <p ref={descRef} className="hero-description">
                    {currentContent.description}
                </p>

                {/* CTA Buttons */}
                <div ref={buttonsRef} className="hero-buttons">
                    <MagneticButton className="btn btn-primary btn-glow btn-large demo-only">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                        Watch Now
                    </MagneticButton>
                    <MagneticButton className="btn btn-secondary btn-glass demo-only">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10,8 16,12 10,16" fill="currentColor" />
                        </svg>
                        Trailer
                    </MagneticButton>
                    <MagneticButton className="btn btn-outline btn-glass demo-only">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M12 5V19M5 12H19" />
                        </svg>
                        Add to List
                    </MagneticButton>
                </div>

                {/* Slide Indicators - Now functional */}
                <div className="hero-indicators">
                    {contentArray.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => handleIndicatorClick(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll to Explore</span>
            </div>
        </section>
    );
};

export default HeroSection;
