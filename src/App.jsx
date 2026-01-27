import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/CustomCursor/CustomCursor';
import HeroSection from './components/HeroSection/HeroSection';
import ContentSection from './components/ContentSection/ContentSection';
import TrailerModal from './components/TrailerModal/TrailerModal';

// Data
import {
    featuredContent,
    trendingNow,
    popularAnime,
    newReleases,
    topRatedMovies,
    allContent
} from './data/mockData';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Set GSAP defaults for performance
gsap.config({
    force3D: true,
    nullTargetWarn: false
});

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [trailerContent, setTrailerContent] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const mainRef = useRef(null);

    // Initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Initialize ScrollTrigger after loading
    useEffect(() => {
        if (!isLoading) {
            ScrollTrigger.refresh();
        }
    }, [isLoading]);

    const handlePlayTrailer = (content) => {
        setTrailerContent(content);
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
    };

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: `#${sectionId}`, offsetY: 80 },
            ease: 'power3.inOut'
        });
    };

    return (
        <div className="app">
            {/* Custom Cursor (Desktop Only) */}
            <CustomCursor />

            {/* Loading Screen */}
            <LoadingScreen isLoading={isLoading} />

            {/* Navigation - Pass scrollToSection for single-page nav */}
            <Navbar scrollToSection={scrollToSection} isSinglePage={true} />

            {/* Main Content - Single Page */}
            <main ref={mainRef} className="main-content">
                {/* Hero Section */}
                <section id="home">
                    <HeroSection
                        content={featuredContent}
                        onPlayTrailer={handlePlayTrailer}
                    />
                </section>

                {/* Trending Section */}
                <ContentSection
                    id="trending"
                    title="🔥 Trending Now"
                    subtitle="The most popular content this week"
                    items={trendingNow}
                    layout="slider"
                />

                {/* Movies Section */}
                <ContentSection
                    id="movies"
                    title="🎬 Movies"
                    subtitle="Blockbuster hits and hidden gems"
                    items={allContent.filter(item => item.type === 'movie')}
                    layout="grid"
                />

                {/* Anime Section */}
                <ContentSection
                    id="anime"
                    title="🎌 Anime"
                    subtitle="Best anime from around the world"
                    items={popularAnime}
                    layout="grid"
                />

                {/* New Releases */}
                <ContentSection
                    id="new"
                    title="🆕 New Releases"
                    subtitle="Fresh content added this week"
                    items={newReleases}
                    layout="slider"
                />

                {/* Top Rated */}
                <ContentSection
                    id="top-rated"
                    title="⭐ Top Rated"
                    subtitle="Critically acclaimed masterpieces"
                    items={topRatedMovies}
                    layout="slider"
                />
            </main>

            {/* Footer */}
            <Footer />

            {/* Trailer Modal */}
            <TrailerModal
                content={trailerContent}
                isOpen={isTrailerOpen}
                onClose={handleCloseTrailer}
            />
        </div>
    );
}

export default App;
