import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './MovieCard.css';

const MovieCard = ({ movie, index = 0 }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const playBtnRef = useRef(null);

    const handleMouseEnter = () => {
        const card = cardRef.current;

        // Card lift and scale
        gsap.to(card, {
            scale: 1.05,
            y: -10,
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

        // Glow effect
        gsap.to(glowRef.current, {
            opacity: 0.7,
            scale: 1.2,
            duration: 0.4
        });

        // Play button entrance
        gsap.fromTo(playBtnRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
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
            duration: 0.2
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
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;

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

    // Get dominant color for glow (simulate based on type)
    const glowColor = movie.type === 'anime'
        ? 'rgba(139, 92, 246, 0.6)'
        : 'rgba(229, 9, 20, 0.6)';

    return (
        <Link
            to={`/details/${movie.id}`}
            className="movie-card-link"
            style={{ '--delay': `${index * 0.1}s` }}
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
                    <img ref={imageRef} src={movie.poster} alt={movie.title} loading="lazy" />

                    {/* Shine effect */}
                    <div className="card-shine"></div>
                </div>

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

                {/* Overlay with details */}
                <div ref={overlayRef} className="card-overlay">
                    <div className="card-info">
                        <h3 className="card-title">{movie.title}</h3>
                        <div className="card-meta">
                            <span className="card-year">{movie.year}</span>
                            <span className="card-type">{movie.type}</span>
                        </div>
                        <div className="card-genres">
                            {movie.genres?.slice(0, 2).map((genre, i) => (
                                <span key={i} className="card-genre">{genre}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Centered Play Button */}
                <button ref={playBtnRef} className="card-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                </button>
            </div>
        </Link>
    );
};

export default MovieCard;
