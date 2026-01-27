import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './MovieCard.css';

const MovieCard = ({ movie, index = 0 }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });

        gsap.to(cardRef.current.querySelector('.card-overlay'), {
            opacity: 1,
            duration: 0.3
        });

        gsap.to(glowRef.current, {
            opacity: 0.6,
            scale: 1.1,
            duration: 0.4
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power3.out'
        });

        gsap.to(cardRef.current.querySelector('.card-overlay'), {
            opacity: 0,
            duration: 0.3
        });

        gsap.to(glowRef.current, {
            opacity: 0,
            scale: 1,
            duration: 0.5
        });
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.2,
            ease: 'power2.out',
            transformPerspective: 1000
        });

        // Move glow to follow cursor
        gsap.to(glowRef.current, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            duration: 0.2
        });
    };

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
                <div ref={glowRef} className="card-glow"></div>

                {/* Poster */}
                <div className="card-poster">
                    <img src={movie.poster} alt={movie.title} loading="lazy" />
                </div>

                {/* Rating Badge */}
                <div className="card-rating">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    {movie.rating}
                </div>

                {/* Overlay with details */}
                <div className="card-overlay">
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
                        <button className="card-play-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M8 5V19L19 12L8 5Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
