import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovieCard from '../components/MovieCard/MovieCard';
import { allAnime, animeGenres } from '../data/mockData';
import './Movies.css'; // Reusing Movies styles

gsap.registerPlugin(ScrollTrigger);

const Anime = () => {
    const [activeGenre, setActiveGenre] = useState('All');
    const [filteredAnime, setFilteredAnime] = useState(allAnime);
    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        // Filter anime by genre
        if (activeGenre === 'All') {
            setFilteredAnime(allAnime);
        } else {
            setFilteredAnime(allAnime.filter(anime =>
                anime.genres?.includes(activeGenre)
            ));
        }
    }, [activeGenre]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header
            gsap.fromTo(headerRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );

            // Animate grid items
            const cards = gridRef.current?.querySelectorAll('.movie-card-link');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: 'power3.out',
                        delay: 0.3
                    }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, [filteredAnime]);

    return (
        <div ref={pageRef} className="anime-page page-content">
            <div className="container">
                {/* Header */}
                <div ref={headerRef} className="page-header">
                    <h1 className="page-title">
                        Anime <span className="text-gradient">Universe</span>
                    </h1>
                    <p className="page-description">
                        Explore the best anime series and movies from Japan and beyond
                    </p>
                </div>

                {/* Genre Filter */}
                <div className="genre-filter">
                    {animeGenres.map((genre) => (
                        <button
                            key={genre}
                            className={`genre-btn ${activeGenre === genre ? 'active' : ''}`}
                            onClick={() => setActiveGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                {/* Anime Grid */}
                <div ref={gridRef} className="movies-grid grid grid-cols-6">
                    {filteredAnime.map((anime, index) => (
                        <MovieCard key={anime.id} movie={anime} index={index} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredAnime.length === 0 && (
                    <div className="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21L16.65 16.65" />
                        </svg>
                        <h3>No anime found</h3>
                        <p>Try selecting a different genre</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Anime;
