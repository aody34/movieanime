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
        // Safety check
        if (!sectionRef.current || !gridRef.current) return;

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            try {
                const ctx = gsap.context(() => {
                    // === TITLE ANIMATION ===
                    if (titleRef.current) {
                        gsap.fromTo(titleRef.current,
                            { x: -30, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 1,
                                ease: 'power4.out',
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: 'top 80%',
                                    toggleActions: 'play none none none'
                                }
                            }
                        );
                    }

                    // === SUBTITLE ANIMATION ===
                    if (subtitleRef.current) {
                        gsap.fromTo(subtitleRef.current,
                            { y: 30, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 1,
                                delay: 0.1,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: 'top 80%',
                                    toggleActions: 'play none none none'
                                }
                            }
                        );
                    }

                    // === CARDS STAGGER ANIMATION ===
                    const cards = gridRef.current?.querySelectorAll('.movie-card-link');
                    if (cards?.length) {
                        gsap.fromTo(cards,
                            { y: 100, opacity: 0, scale: 0.95 },
                            {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                duration: 0.8,
                                stagger: 0.1,
                                ease: 'power3.out', // Smoother, less bouncy
                                scrollTrigger: {
                                    trigger: gridRef.current,
                                    start: 'top 85%',
                                    toggleActions: 'play none none none'
                                }
                            }
                        );
                    }
                }, sectionRef);

                return () => ctx.revert();
            } catch (e) {
                console.warn('ContentSection animation error:', e);
                // Fallback: make everything visible
                if (gridRef.current) {
                    const cards = gridRef.current.querySelectorAll('.movie-card-link');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                    });
                }
            }
        }, 100);

        return () => clearTimeout(timeoutId);
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
