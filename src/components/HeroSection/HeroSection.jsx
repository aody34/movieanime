import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';

const HeroSection = ({ content, onPlayTrailer }) => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const buttonsRef = useRef(null);
    const badgesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create timeline for hero animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Animate background
            tl.fromTo(heroRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5 }
            );

            // Animate badges
            tl.fromTo(badgesRef.current?.children || [],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
                '-=0.8'
            );

            // Animate title with character split effect
            tl.fromTo(titleRef.current,
                { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.8 },
                '-=0.4'
            );

            // Animate description
            tl.fromTo(descRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.3'
            );

            // Animate buttons
            tl.fromTo(buttonsRef.current?.children || [],
                { y: 30, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 },
                '-=0.2'
            );

            // Ken Burns effect on background
            gsap.to(heroRef.current?.querySelector('.hero-bg'), {
                scale: 1.05,
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        }, heroRef);

        return () => ctx.revert();
    }, [content]);

    if (!content) return null;

    return (
        <section ref={heroRef} className="hero-section">
            {/* Background Image */}
            <div
                className="hero-bg"
                style={{ backgroundImage: `url(${content.backdrop})` }}
            ></div>

            {/* Gradient Overlays */}
            <div className="hero-gradient"></div>
            <div className="hero-gradient-bottom"></div>

            {/* Content */}
            <div ref={contentRef} className="hero-content container">
                {/* Badges */}
                <div ref={badgesRef} className="hero-badges">
                    <span className="badge badge-new">NEW</span>
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

                {/* Buttons */}
                <div ref={buttonsRef} className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => onPlayTrailer?.(content)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                        Play Trailer
                    </button>
                    <button className="btn btn-secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M12 5V19M5 12H19" />
                        </svg>
                        Add to List
                    </button>
                    <button className="btn btn-icon btn-secondary" aria-label="More info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16V12M12 8H12.01" />
                        </svg>
                    </button>
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
