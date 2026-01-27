import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TrailerModal.css';

const TrailerModal = ({ content, isOpen, onClose }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Open animation
            gsap.set(modalRef.current, { display: 'flex' });

            gsap.fromTo(backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            gsap.fromTo(contentRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
            );

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Close animation
            gsap.to(contentRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: 'power2.in'
            });

            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.set(modalRef.current, { display: 'none' });
                }
            });

            // Restore body scroll
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    return (
        <div ref={modalRef} className="trailer-modal" style={{ display: 'none' }}>
            <div
                ref={backdropRef}
                className="modal-backdrop"
                onClick={handleBackdropClick}
            >
                <div ref={contentRef} className="modal-content glass">
                    {/* Close Button */}
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6L18 18" />
                        </svg>
                    </button>

                    {/* Video Container */}
                    <div className="modal-video-container">
                        {content?.trailerUrl ? (
                            <iframe
                                src={`${content.trailerUrl}?autoplay=1&rel=0`}
                                title={`${content.title} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="modal-no-video">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                                    <path d="M23 7L16 12L23 17V7Z" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                                <p>Trailer not available</p>
                            </div>
                        )}
                    </div>

                    {/* Content Info */}
                    <div className="modal-info">
                        <h3 className="modal-title">{content?.title}</h3>
                        <div className="modal-meta">
                            <span className="modal-rating">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                {content?.rating}
                            </span>
                            <span>{content?.year}</span>
                            <span>{content?.type}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;
