import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../MagneticButton/MagneticButton';
import './HeroSection.css';

const HeroSection = ({ content, onPlayTrailer }) => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const badgesRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Master timeline for cinematic entrance
            const masterTl = gsap.timeline({
                defaults: { ease: 'power4.out', force3D: true }
            });

            // Initial state - everything hidden
            gsap.set([titleRef.current, descRef.current, badgesRef.current?.children, buttonsRef.current?.children], {
                opacity: 0,
                y: 60
            });

            // Video reveal with zoom
            masterTl.fromTo(videoRef.current,
                { scale: 1.3, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
            );

            // Overlay gradient reveal
            masterTl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                '-=1.5'
            );

            // Badges stagger entrance
            masterTl.to(badgesRef.current?.children || [], {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1
            }, '-=0.8');

            // Title dramatic reveal with clip-path
            masterTl.fromTo(titleRef.current,
                {
                    y: 100,
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)',
                    skewY: 3
                },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    skewY: 0,
                    duration: 1.2,
                    ease: 'power4.out'
                },
                '-=0.5'
            );

            // Description fade up
            masterTl.to(descRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8
            }, '-=0.6');

            // Buttons stagger with scale
            masterTl.fromTo(buttonsRef.current?.children || [],
                { y: 40, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.5)'
                },
                '-=0.4'
            );

            // Mouse-follow floating text effect
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                const xPercent = (clientX / innerWidth - 0.5) * 2;
                const yPercent = (clientY / innerHeight - 0.5) * 2;

                gsap.to(contentRef.current, {
                    x: xPercent * 15,
                    y: yPercent * 10,
                    duration: 0.8,
                    ease: 'power2.out',
                    force3D: true
                });

                // Video subtle counter-movement
                gsap.to(videoRef.current, {
                    x: xPercent * -8,
                    y: yPercent * -5,
                    duration: 1,
                    ease: 'power2.out',
                    force3D: true
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Parallax effect on scroll for video
            gsap.to(videoRef.current, {
                yPercent: 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Content parallax (moves slower than video)
            gsap.to(contentRef.current, {
                yPercent: -15,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Cleanup
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };

        }, heroRef);

        return () => ctx.revert();
    }, [content]);

    if (!content) return null;

    return (
        <section ref={heroRef} className="hero-section">
            {/* Animated Video Background */}
            <div ref={videoRef} className="hero-video-container">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                    poster={content.backdrop}
                >
                    {/* High-quality background video */}
                    <source src="https://cdn.coverr.co/videos/coverr-an-animation-of-glowing-particles-5663/1080p.mp4" type="video/mp4" />
                </video>
                {/* Fallback image */}
                <div
                    className="hero-bg-fallback"
                    style={{ backgroundImage: `url(${content.backdrop})` }}
                ></div>
            </div>

            {/* Dark Overlay for readability */}
            <div ref={overlayRef} className="hero-overlay">
                <div className="hero-gradient"></div>
                <div className="hero-gradient-bottom"></div>
                <div className="hero-vignette"></div>
            </div>

            {/* Animated Particles/Grain */}
            <div className="hero-noise"></div>

            {/* Floating movie posters */}
            <div className="hero-posters-container">
                <div className="hero-posters">
                    <img src="https://image.tmdb.org/t/p/w300/qNBAXBIQlnOThrVvA6mA2B5ber9.jpg" alt="" className="floating-poster" loading="lazy" />
                    <img src="https://image.tmdb.org/t/p/w300/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg" alt="" className="floating-poster" loading="lazy" />
                    <img src="https://image.tmdb.org/t/p/w300/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" alt="" className="floating-poster" loading="lazy" />
                    <img src="https://image.tmdb.org/t/p/w300/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" alt="" className="floating-poster" loading="lazy" />
                    <img src="https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VT39b0rA8JB.jpg" alt="" className="floating-poster" loading="lazy" />
                    <img src="https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" alt="" className="floating-poster" loading="lazy" />
                </div>
            </div>

            {/* Content - Floats with mouse */}
            <div ref={contentRef} className="hero-content container">
                {/* Badges */}
                <div ref={badgesRef} className="hero-badges">
                    <span className="badge badge-new">
                        <span className="badge-pulse"></span>
                        NEW EPISODE
                    </span>
                    <span className="badge badge-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        {content.rating}
                    </span>
                    <span className="hero-year">{content.year}</span>
                    <span className="hero-duration">{content.duration}</span>
                </div>

                {/* Title */}
                <h1 ref={titleRef} className="hero-title">{content.title}</h1>

                {/* Genres */}
                <div className="hero-genres">
                    {content.genres?.map((genre, index) => (
                        <span key={index} className="hero-genre">{genre}</span>
                    ))}
                </div>

                {/* Description */}
                <p ref={descRef} className="hero-description">{content.description}</p>

                {/* Buttons with Magnetic Effect - Animation Only */}
                <div ref={buttonsRef} className="hero-buttons">
                    <MagneticButton className="btn btn-primary btn-glow demo-only">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                        Watch Now
                    </MagneticButton>
                    <MagneticButton className="btn btn-secondary btn-glass demo-only">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M12 5V19M5 12H19" />
                        </svg>
                        Add to List
                    </MagneticButton>
                    <MagneticButton className="btn btn-icon btn-glass demo-only" aria-label="More info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16V12M12 8H12.01" />
                        </svg>
                    </MagneticButton>
                </div>

                {/* Slide indicators */}
                <div className="hero-indicators">
                    <span className="indicator active"></span>
                    <span className="indicator"></span>
                    <span className="indicator"></span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
