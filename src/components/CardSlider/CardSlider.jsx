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
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title with scrub
            gsap.fromTo(titleRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        end: 'top 60%',
                        scrub: 1,
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate cards with stagger and scrub for smooth reveal
            const cards = sliderRef.current?.querySelectorAll('.movie-card-link');
            if (cards?.length) {
                gsap.fromTo(cards,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.8,
                        rotateY: -15
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power4.out',
                        force3D: true,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            end: 'top 40%',
                            scrub: 0.5,
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            // Parallax effect on the whole section
            gsap.to(containerRef.current, {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    const scroll = (direction) => {
        const slider = sliderRef.current;
        const scrollAmount = slider.clientWidth * 0.8;

        gsap.to(slider, {
            scrollLeft: slider.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
            duration: 0.6,
            ease: 'power3.inOut'
        });
    };

    return (
        <section ref={sectionRef} className="card-slider-section">
            <div ref={containerRef} className="container">
                {/* Header */}
                <div ref={titleRef} className="slider-header">
                    <h2 className="slider-title">
                        <span className="title-icon">{title.split(' ')[0]}</span>
                        <span className="title-text">{title.split(' ').slice(1).join(' ')}</span>
                    </h2>
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
