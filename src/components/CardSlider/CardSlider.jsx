import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovieCard from '../MovieCard/MovieCard';
import './CardSlider.css';

gsap.registerPlugin(ScrollTrigger);

const CardSlider = ({ title, items, link, linkText = 'See All' }) => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.fromTo(titleRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate cards with stagger
            const cards = sliderRef.current?.querySelectorAll('.movie-card-link');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    const scroll = (direction) => {
        const slider = sliderRef.current;
        const scrollAmount = slider.clientWidth * 0.8;

        gsap.to(slider, {
            scrollLeft: slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
            duration: 0.5,
            ease: 'power2.inOut'
        });
    };

    return (
        <section ref={sectionRef} className="card-slider-section">
            <div className="container">
                {/* Header */}
                <div ref={titleRef} className="slider-header">
                    <h2 className="slider-title">{title}</h2>
                    {link && (
                        <Link to={link} className="slider-link">
                            {linkText}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Slider Container */}
                <div className="slider-container">
                    {/* Navigation Arrows */}
                    <button
                        className="slider-arrow slider-arrow-left"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18L9 12L15 6" />
                        </svg>
                    </button>

                    {/* Cards */}
                    <div ref={sliderRef} className="slider-track">
                        {items.map((item, index) => (
                            <MovieCard key={item.id} movie={item} index={index} />
                        ))}
                    </div>

                    <button
                        className="slider-arrow slider-arrow-right"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18L15 12L9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CardSlider;
