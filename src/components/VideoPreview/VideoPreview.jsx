import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VideoPreview.css';

gsap.registerPlugin(ScrollTrigger);

const VideoPreview = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const thumbnailsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // === SECTION FADE IN/OUT ===
            gsap.fromTo(sectionRef.current,
                { opacity: 0.5 },
                {
                    opacity: 1,
                    duration: 0.6,
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
                    y: 60,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse' // Bidirectional!
                    }
                }
            );

            // === SUBTITLE ANIMATION ===
            gsap.fromTo(subtitleRef.current,
                {
                    y: 30,
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

            // === VIDEO CONTAINER REVEAL ===
            gsap.fromTo(containerRef.current,
                {
                    scale: 0.85,
                    opacity: 0,
                    y: 50,
                    rotateX: -5
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%',
                        toggleActions: 'play reverse play reverse' // Bidirectional!
                    }
                }
            );

            // === THUMBNAILS STAGGER ANIMATION ===
            const thumbnails = thumbnailsRef.current?.querySelectorAll('.video-thumbnail');
            if (thumbnails?.length) {
                thumbnails.forEach((thumb, index) => {
                    gsap.fromTo(thumb,
                        {
                            y: 50,
                            opacity: 0,
                            scale: 0.9
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.15,
                            ease: 'back.out(1.5)',
                            scrollTrigger: {
                                trigger: thumb,
                                start: 'top 95%',
                                toggleActions: 'play reverse play reverse' // Bidirectional!
                            }
                        }
                    );
                });
            }

            // === SUBTLE PARALLAX ON SCROLL ===
            gsap.to(containerRef.current, {
                y: -25,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            });

            // === EXIT ANIMATION ===
            gsap.to(sectionRef.current, {
                opacity: 0.6,
                y: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'bottom 40%',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Sample trailer videos
    const featuredTrailers = [
        {
            id: 1,
            title: 'Demon Slayer: Kimetsu no Yaiba',
            videoId: 'VQGCKyvzIM4',
            category: 'Anime'
        },
        {
            id: 2,
            title: 'Jujutsu Kaisen',
            videoId: 'pkKu9hLT-t8',
            category: 'Anime'
        },
        {
            id: 3,
            title: 'Attack on Titan',
            videoId: 'MGRm4IzK1SQ',
            category: 'Anime'
        }
    ];

    return (
        <section ref={sectionRef} className="video-preview-section">
            <div className="container">
                {/* Section Header */}
                <div className="video-section-header">
                    <h2 ref={titleRef} className="video-section-title">
                        <span className="title-icon">🎬</span>
                        <span className="title-text">Featured Trailers</span>
                    </h2>
                    <p ref={subtitleRef} className="video-section-subtitle">
                        Watch the latest trailers from trending shows
                    </p>
                </div>

                {/* Main Featured Video */}
                <div ref={containerRef} className="video-main-container">
                    <div className="video-wrapper">
                        <iframe
                            ref={videoRef}
                            src={`https://www.youtube.com/embed/${featuredTrailers[0].videoId}?autoplay=0&mute=1&loop=1&playlist=${featuredTrailers[0].videoId}&controls=1&modestbranding=1`}
                            title={featuredTrailers[0].title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="video-info-overlay">
                        <span className="video-category">{featuredTrailers[0].category}</span>
                        <h3 className="video-title">{featuredTrailers[0].title}</h3>
                    </div>

                    {/* Decorative Elements */}
                    <div className="video-glow"></div>
                </div>

                {/* Thumbnail Grid */}
                <div ref={thumbnailsRef} className="video-thumbnails">
                    {featuredTrailers.slice(1).map((trailer, index) => (
                        <a
                            key={trailer.id}
                            href={`https://www.youtube.com/watch?v=${trailer.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-thumbnail"
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${trailer.videoId}/maxresdefault.jpg`}
                                alt={trailer.title}
                            />
                            <div className="thumbnail-overlay">
                                <div className="thumbnail-play">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                </div>
                                <span className="thumbnail-title">{trailer.title}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoPreview;
