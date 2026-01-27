import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovieCard from '../components/MovieCard/MovieCard';
import TrailerModal from '../components/TrailerModal/TrailerModal';
import { getContentById, getRelatedContent, featuredContent } from '../data/mockData';
import './Details.css';

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null);
    const [relatedContent, setRelatedContent] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const pageRef = useRef(null);
    const backdropRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Fetch content by ID
        const data = getContentById(id) || featuredContent;
        setContent(data);
        setRelatedContent(getRelatedContent(id, data.type));

        // Scroll to top
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!content) return;

        const ctx = gsap.context(() => {
            // Parallax effect on backdrop
            gsap.to(backdropRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Animate content
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
            );

            // Animate info items
            const infoItems = contentRef.current?.querySelectorAll('.animate-item');
            if (infoItems?.length) {
                gsap.fromTo(infoItems,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                        delay: 0.5
                    }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, [content]);

    if (!content) {
        return (
            <div className="details-page page-content">
                <div className="container">
                    <div className="empty-state">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={pageRef} className="details-page">
            {/* Backdrop */}
            <div className="details-backdrop-wrapper">
                <div
                    ref={backdropRef}
                    className="details-backdrop"
                    style={{ backgroundImage: `url(${content.backdrop || content.poster})` }}
                />
                <div className="details-backdrop-gradient"></div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="details-content">
                <div className="container">
                    <div className="details-layout">
                        {/* Poster */}
                        <div className="details-poster animate-item">
                            <img src={content.poster} alt={content.title} />
                            <div className="poster-glow"></div>
                        </div>

                        {/* Info */}
                        <div className="details-info">
                            {/* Badges */}
                            <div className="details-badges animate-item">
                                <span className="badge badge-rating">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    {content.rating}
                                </span>
                                <span className="details-year">{content.year}</span>
                                {content.duration && <span className="details-duration">{content.duration}</span>}
                                <span className="badge badge-genre">{content.type}</span>
                            </div>

                            {/* Title */}
                            <h1 className="details-title animate-item">{content.title}</h1>

                            {/* Genres */}
                            <div className="details-genres animate-item">
                                {content.genres?.map((genre, index) => (
                                    <span key={index} className="details-genre">{genre}</span>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="details-description animate-item">
                                {content.description ||
                                    "An epic story that will take you on an unforgettable journey through breathtaking visuals and compelling characters. Experience the adventure that has captivated audiences worldwide."}
                            </p>

                            {/* Actions */}
                            <div className="details-actions animate-item">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsTrailerOpen(true)}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                    Watch Trailer
                                </button>
                                <button className="btn btn-secondary">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                        <path d="M12 5V19M5 12H19" />
                                    </svg>
                                    Add to List
                                </button>
                                <button className="btn btn-icon btn-secondary" aria-label="Share">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" />
                                    </svg>
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="details-extra animate-item">
                                <div className="extra-item">
                                    <span className="extra-label">Type</span>
                                    <span className="extra-value">{content.type === 'anime' ? 'Anime Series' : 'Movie'}</span>
                                </div>
                                <div className="extra-item">
                                    <span className="extra-label">Release</span>
                                    <span className="extra-value">{content.year}</span>
                                </div>
                                <div className="extra-item">
                                    <span className="extra-label">Rating</span>
                                    <span className="extra-value">{content.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Content */}
                    {relatedContent.length > 0 && (
                        <div className="details-related">
                            <h2 className="related-title">More Like This</h2>
                            <div className="related-grid grid grid-cols-6">
                                {relatedContent.map((item, index) => (
                                    <MovieCard key={item.id} movie={item} index={index} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="details-back">
                        <Link to="/" className="back-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                content={content}
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
            />
        </div>
    );
};

export default Details;
