import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VideoPreview.css';

gsap.registerPlugin(ScrollTrigger);

const VideoPreview = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.fromTo('.video-section-title',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Video container reveal
            gsap.fromTo(containerRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Parallax effect on scroll
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
    }, []);

    // Sample trailer videos (using YouTube embeds with autoplay)
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
                    <h2 className="video-section-title">
                        <span className="title-icon">🎬</span>
                        <span className="title-text">Featured Trailers</span>
                    </h2>
                    <p className="video-section-subtitle">Watch the latest trailers from trending shows</p>
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
                <div className="video-thumbnails">
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
