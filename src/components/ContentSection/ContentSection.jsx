import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovieCard from '../MovieCard/MovieCard';
import './ContentSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({ id, title, subtitle, items, layout = 'slider' }) => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // === SECTION ENTRANCE/EXIT ANIMATION ===
            gsap.fromTo(sectionRef.current,
                { opacity: 0.3 },
                {
                    opacity: 1,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        end: 'top 50%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );

            // === TITLE ANIMATION (Bidirectional) ===
            gsap.fromTo(titleRef.current,
                {
                    x: -100,
                    opacity: 0,
                    skewX: -3
                },
                {
                    x: 0,
                    opacity: 1,
                    skewX: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse' // Bidirectional!
                    }
                }
            );

            // === SUBTITLE ANIMATION ===
            if (subtitleRef.current) {
                gsap.fromTo(subtitleRef.current,
                    {
                        y: 20,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // === INDIVIDUAL CARD ANIMATIONS (Each card triggers separately) ===
            const cards = gridRef.current?.querySelectorAll('.movie-card-link');
            if (cards?.length) {
                cards.forEach((card, index) => {
                    gsap.fromTo(card,
                        {
                            y: 80,
                            opacity: 0,
                            scale: 0.85,
                            rotateY: -8
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                            duration: 0.7,
                            delay: index * 0.06, // Stagger effect
                            ease: 'back.out(1.7)', // Bouncy reveal
                            force3D: true,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 95%',
                                end: 'top 70%',
                                toggleActions: 'play reverse play reverse' // Bidirectional!
                            }
                        }
                    );
                });
            }

            // === EXIT ANIMATION (When scrolling past section) ===
            gsap.to(sectionRef.current, {
                opacity: 0.5,
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'bottom 30%',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section ref={sectionRef} id={id} className="content-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <div className="section-titles">
                        <h2 ref={titleRef} className="section-title">{title}</h2>
                        {subtitle && <p ref={subtitleRef} className="section-subtitle">{subtitle}</p>}
                    </div>
                </div>

                {/* Content Grid/Slider */}
                <div
                    ref={gridRef}
                    className={`content-layout ${layout === 'grid' ? 'content-grid' : 'content-slider'}`}
                >
                    {items.map((item, index) => (
                        <MovieCard key={item.id} movie={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContentSection;
