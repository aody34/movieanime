import { useEffect, useRef, useState } from 'react';
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
    const videoRef = useRef(null);
    const videoElementRef = useRef(null);
    const overlayRef = useRef(null);
    const [isLowEndDevice, setIsLowEndDevice] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Master timeline for cinematic entrance
            const masterTl = gsap.timeline({
                defaults: { ease: 'power4.out', force3D: true }
            });

            // Initial state - everything hidden
            gsap.set([
                titleRef.current,
                subtitleRef.current,
                descRef.current,
                badgesRef.current?.children,
                buttonsRef.current?.children
            ], {
                opacity: 0,
                y: 80
            });

            // === CINEMATIC INTRO SEQUENCE ===

            // 1. Video reveal with dramatic zoom
            masterTl.fromTo(videoRef.current,
                {
                    scale: 1.5,
                    opacity: 0,
                    filter: 'blur(20px)'
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'power2.out'
                }
            );

            // 2. Cinematic letterbox effect (top/bottom bars slide out)
            masterTl.fromTo('.hero-letterbox-top',
                { scaleY: 1 },
                { scaleY: 0, duration: 1.5, ease: 'power3.inOut' },
                '-=2'
            );
            masterTl.fromTo('.hero-letterbox-bottom',
                { scaleY: 1 },
                { scaleY: 0, duration: 1.5, ease: 'power3.inOut' },
                '-=1.5'
            );

            // 3. Overlay gradient reveal
            masterTl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2 },
                '-=1.5'
            );

            // 4. Badges stagger entrance with glow
            masterTl.to(badgesRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: 'back.out(1.5)'
            }, '-=0.8');

            // 5. Title dramatic reveal with split effect
            masterTl.fromTo(titleRef.current,
                {
                    y: 120,
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)',
                    skewY: 5,
                    rotateX: -20
                },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    skewY: 0,
                    rotateX: 0,
                    duration: 1.4,
                    ease: 'power4.out'
                },
                '-=0.4'
            );

            // 6. Subtitle with typewriter-like reveal
            masterTl.fromTo(subtitleRef.current,
                {
                    y: 40,
                    opacity: 0,
                    letterSpacing: '0.5em'
                },
                {
                    y: 0,
                    opacity: 1,
                    letterSpacing: '0.2em',
                    duration: 1,
                    ease: 'power3.out'
                },
                '-=0.8'
            );

            // 7. Description fade up
            masterTl.to(descRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, '-=0.5');

            // 8. Buttons cinematic stagger with scale bounce
            masterTl.fromTo(buttonsRef.current?.children || [],
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.7,
                    rotateY: -15
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'back.out(2)'
                },
                '-=0.3'
            );

            // === INTERACTIVE EFFECTS ===

            // Mouse-follow floating text effect (only on non-low-end)
            if (!isLowEndDevice) {
                const handleMouseMove = (e) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;

                    const xPercent = (clientX / innerWidth - 0.5) * 2;
                    const yPercent = (clientY / innerHeight - 0.5) * 2;

                    gsap.to(contentRef.current, {
                        x: xPercent * 20,
                        y: yPercent * 15,
                        rotateY: xPercent * 2,
                        rotateX: -yPercent * 2,
                        duration: 1,
                        ease: 'power2.out',
                        force3D: true
                    });

                    // Video subtle counter-movement
                    gsap.to(videoRef.current, {
                        x: xPercent * -10,
                        y: yPercent * -8,
                        duration: 1.2,
                        ease: 'power2.out',
                        force3D: true
                    });
                };

                window.addEventListener('mousemove', handleMouseMove);

                // Cleanup
                return () => {
                    window.removeEventListener('mousemove', handleMouseMove);
                };
            }

            // === SCROLL EFFECTS ===

            // Parallax zoom on scroll
            gsap.to(videoRef.current, {
                yPercent: 30,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Content parallax with fade
            gsap.to(contentRef.current, {
                yPercent: -20,
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
    }, [content, isLowEndDevice]);

    // Handle video load
    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

    if (!content) return null;

    return (
        <section ref={heroRef} className="hero-section">
            {/* Cinematic Letterbox Bars */}
            <div className="hero-letterbox-top"></div>
            <div className="hero-letterbox-bottom"></div>

            {/* Animated Video Background */}
            <div ref={videoRef} className="hero-video-container">
                {/* Main Video - Multiple sources for compatibility */}
                <video
                    ref={videoElementRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
                    poster={content.backdrop}
                    onLoadedData={handleVideoLoad}
                >
                    {/* High quality cinematic anime video */}
                    <source
                        src="https://cdn.coverr.co/videos/coverr-ink-in-water-1582/1080p.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Fallback poster image for slow devices */}
                <div
                    className="hero-fallback-image"
                    style={{
                        backgroundImage: `url(${content.backdrop})`,
                        opacity: videoLoaded ? 0 : 1
                    }}
                ></div>

                {/* Animated gradient overlay */}
                <div className="hero-video-gradient"></div>
            </div>

            {/* Cinematic Overlays */}
            <div ref={overlayRef} className="hero-overlay">
                <div className="hero-gradient-left"></div>
                <div className="hero-gradient-bottom"></div>
                <div className="hero-vignette"></div>
                <div className="hero-scanlines"></div>
            </div>

            {/* Animated Film Grain */}
            <div className="hero-noise"></div>

            {/* Floating Particles (disabled on low-end) */}
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
                        {content.rating}
                    </span>
                    <span className="badge badge-year">{content.year}</span>
                    <span className="badge badge-duration">{content.duration}</span>
                </div>

                {/* Subtitle / Tagline */}
                <p ref={subtitleRef} className="hero-subtitle">
                    EXPERIENCE THE ULTIMATE STREAMING
                </p>

                {/* Title */}
                <h1 ref={titleRef} className="hero-title">
                    {content.title}
                </h1>

                {/* Genres */}
                <div className="hero-genres">
                    {content.genres?.map((genre, index) => (
                        <span key={index} className="hero-genre">{genre}</span>
                    ))}
                </div>

                {/* Description */}
                <p ref={descRef} className="hero-description">
                    {content.description}
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

                {/* Slide Indicators */}
                <div className="hero-indicators">
                    <span className="indicator active"></span>
                    <span className="indicator"></span>
                    <span className="indicator"></span>
                    <span className="indicator"></span>
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
