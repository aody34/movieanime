import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MovieCard.css';

const MovieCard = ({ movie, index = 0 }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const infoRef = useRef(null);
    const playBtnRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleMouseEnter = () => {
        const card = cardRef.current;

        // Card lift and scale - the "popping out" effect
        gsap.to(card, {
            scale: 1.05,
            y: -8,
            duration: 0.4,
            ease: 'power2.out',
            force3D: true
        });

        // Image zoom
        gsap.to(imageRef.current, {
            scale: 1.15,
            duration: 0.6,
            ease: 'power2.out'
        });

        // Overlay reveal
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3
        });

        // Glassmorphism info slides UP from bottom
        gsap.fromTo(infoRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
        );

        // Glow effect
        gsap.to(glowRef.current, {
            opacity: 0.8,
            scale: 1.3,
            duration: 0.4
        });

        // Play button entrance with bounce
        gsap.fromTo(playBtnRef.current,
            { scale: 0, opacity: 0, rotate: -180 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' }
        );
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;

        // Reset card
        gsap.to(card, {
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power3.out',
            force3D: true
        });

        // Reset image
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.5
        });

        // Hide overlay
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3
        });

        // Slide info back down
        gsap.to(infoRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });

        // Hide glow
        gsap.to(glowRef.current, {
            opacity: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5
        });

        // Hide play button
        gsap.to(playBtnRef.current, {
            scale: 0,
            opacity: 0,
            rotate: 180,
            duration: 0.3
        });
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 3D tilt effect
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
            force3D: true
        });

        // Move glow to follow cursor
        gsap.to(glowRef.current, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            duration: 0.3,
            force3D: true
        });
    };

    // Handle image load for fade-in effect
    const handleImageLoad = () => {
        setImageLoaded(true);
        gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        );
    };

    // Get dominant color for glow (simulate based on type)
    const glowColor = movie.type === 'anime'
        ? 'rgba(139, 92, 246, 0.7)'
        : 'rgba(229, 9, 20, 0.7)';

    return (
        <div
            className="movie-card-link demo-only"
            style={{ '--delay': `${index * 0.1}s`, cursor: 'default' }}
        >
            <div
                ref={cardRef}
                className="movie-card"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                {/* Glow Effect */}
                <div
                    ref={glowRef}
                    className="card-glow"
                    style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
                ></div>

                {/* Poster */}
                <div className="card-poster">
                    <img
                        ref={imageRef}
                        src={movie.poster}
                        alt={movie.title}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                    />

                    {/* Loading skeleton with shimmer */}
                    {!imageLoaded && (
                        <div className="card-skeleton">
                            <div className="skeleton-shimmer"></div>
                        </div>
                    )}

                    {/* Shine effect */}
                    <div className="card-shine"></div>
                </div>

                {/* Top Badges Row */}
                <div className="card-badges-top">
                    {/* Rating Badge */}
                    <div className="card-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        {movie.rating}
                    </div>

                    {/* Type Badge */}
                    <div className={`card-type-badge ${movie.type}`}>
                        {movie.type === 'anime' ? '🎌' : '🎬'}
                    </div>
                </div>

                {/* Dark Gradient Overlay */}
                <div ref={overlayRef} className="card-overlay"></div>

                {/* Glassmorphism Info Panel - Slides up from bottom */}
                <div ref={infoRef} className="card-info-panel">
                    {/* Large Rating */}
                    <div className="info-rating">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span>{movie.rating}</span>
                    </div>

                    {/* Title */}
                    <h3 className="info-title">{movie.title}</h3>

                    {/* Year & Duration */}
                    <div className="info-meta">
                        <span>{movie.year}</span>
                        {movie.duration && <span>• {movie.duration}</span>}
                    </div>

                    {/* Genres */}
                    <div className="info-genres">
                        {movie.genres?.slice(0, 3).map((genre, i) => (
                            <span key={i} className="info-genre">{genre}</span>
                        ))}
                    </div>
                </div>

                {/* Centered Play Button */}
                <button ref={playBtnRef} className="card-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
