import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovieCard from '../MovieCard/MovieCard';
import './ContentSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({ id, title, subtitle, items, layout = 'slider' }) => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Cards stagger animation - THE WOW FACTOR
            const cards = gridRef.current?.querySelectorAll('.movie-card-link');
            if (cards?.length) {
                gsap.fromTo(cards,
                    {
                        y: 80,
                        opacity: 0,
                        scale: 0.85
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.08, // Creates "one-by-one" look
                        ease: 'back.out(1.7)', // Bouncy reveal
                        force3D: true,
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section ref={sectionRef} id={id} className="content-section">
            <div className="container">
                {/* Section Header */}
                <div ref={titleRef} className="section-header">
                    <div className="section-titles">
                        <h2 className="section-title">{title}</h2>
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
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
