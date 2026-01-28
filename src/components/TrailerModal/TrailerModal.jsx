import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TrailerModal.css';

const TrailerModal = ({ content, isOpen, onClose }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Open animation
            gsap.set(modalRef.current, { display: 'flex' });

            // Lock background scroll
            document.body.style.overflow = 'hidden';

            const tl = gsap.timeline();

            // 1. Backdrop fade in
            tl.fromTo(backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );

            // 2. Content expands from center (mimicking card expansion)
            tl.fromTo(contentRef.current,
                {
                    scale: 0.85,
                    opacity: 0,
                    y: 100,
                    borderRadius: '24px'
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    borderRadius: '0px', // Expand to full screen feel
                    duration: 0.6,
                    ease: 'power3.out'
                },
                '-=0.2'
            );

            // 3. Image parallax reveal
            tl.fromTo(imageRef.current,
                { scale: 1.1, filter: 'blur(10px)' },
                { scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
                '-=0.4'
            );

            // 4. Details slide up staggered
            const detailElements = detailsRef.current?.children;
            if (detailElements) {
                tl.fromTo(detailElements,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.2)' },
                    '-=0.4'
                );
            }

        } else {
            // Close animation
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(modalRef.current, { display: 'none' });
                    // Restore background scroll
                    document.body.style.overflow = '';
                }
            });

            // Content shrinks back
            tl.to(contentRef.current, {
                scale: 0.9,
                opacity: 0,
                y: 50,
                borderRadius: '24px',
                duration: 0.4,
                ease: 'power2.in'
            });

            // Backdrop fade out
            tl.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3
            }, '-=0.2');
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    if (!content) return null;

    return (
        <div ref={modalRef} className="trailer-modal" style={{ display: 'none' }}>
            <div
                ref={backdropRef}
                className="modal-backdrop"
                onClick={handleBackdropClick}
            >
                <div ref={contentRef} className="modal-content-expanded">
                    {/* Close Button */}
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                            <path d="M18 6L6 18M6 6L18 18" />
                        </svg>
                    </button>

                    {/* Hero Image / Video Area */}
                    <div className="modal-hero">
                        <div ref={imageRef} className="modal-hero-bg">
                            {content.backdrop ? (
                                <img src={content.backdrop} alt={content.title} />
                            ) : (
                                <div className="modal-fallback-bg" />
                            )}
                            <div className="modal-hero-overlay" />
                        </div>

                        <div className="modal-play-container">
                            {content.trailerUrl ? (
                                <div className="video-wrapper">
                                    <iframe
                                        src={`${content.trailerUrl}?autoplay=${isOpen ? 1 : 0}&rel=0&modestbranding=1`}
                                        title={`${content.title} Trailer`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="no-video-placeholder">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                                        <circle cx="12" cy="12" r="10" />
                                        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                                    </svg>
                                    <span>Preview Unavailable</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div ref={detailsRef} className="modal-details container">
                        {/* Meta Badges */}
                        <div className="modal-badges">
                            <span className="modal-match">98% Match</span>
                            <span className="modal-year">{content.year}</span>
                            <span className="modal-age">16+</span>
                            <span className="modal-duration">{content.duration || '2h 14m'}</span>
                            <span className="modal-hd">HD</span>
                        </div>

                        {/* Title */}
                        <h2 className="modal-title">{content.title}</h2>

                        {/* Action Buttons */}
                        <div className="modal-actions">
                            <button className="btn-modal-primary">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M8 5V19L19 12L8 5Z" />
                                </svg>
                                Play
                            </button>
                            <button className="btn-modal-secondary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <path d="M12 5V19M5 12H19" />
                                </svg>
                                My List
                            </button>
                            <button className="btn-modal-icon" aria-label="Like">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </button>
                        </div>

                        {/* Description & Info Grid */}
                        <div className="modal-grid">
                            <div className="modal-overview">
                                <p className="modal-description">
                                    {content.description ||
                                        "Experience the ultimate journey in this critically acclaimed masterpiece. With stunning visuals and a gripping storyline, this title has captivated audiences worldwide."}
                                </p>
                            </div>
                            <div className="modal-sidebar">
                                <div className="sidebar-item">
                                    <span className="label">Cast:</span>
                                    <span className="value">Top Talent, Lead Actor, Supporting Star</span>
                                </div>
                                <div className="sidebar-item">
                                    <span className="label">Genres:</span>
                                    <span className="value">{content.genres?.join(', ') || 'Action, Drama'}</span>
                                </div>
                                <div className="sidebar-item">
                                    <span className="label">This is:</span>
                                    <span className="value">Exciting, Suspenseful</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;
