import { useState } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import CardSlider from '../components/CardSlider/CardSlider';
import VideoPreview from '../components/VideoPreview/VideoPreview';
import TrailerModal from '../components/TrailerModal/TrailerModal';
import {
    featuredContent,
    trendingNow,
    popularAnime,
    newReleases,
    topRatedMovies
} from '../data/mockData';
import './Home.css';

const Home = () => {
    const [trailerContent, setTrailerContent] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const handlePlayTrailer = (content) => {
        setTrailerContent(content);
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <HeroSection
                content={featuredContent}
                onPlayTrailer={handlePlayTrailer}
            />

            {/* Content Sections */}
            <div className="home-content">
                <CardSlider
                    title="🔥 Trending Now"
                    items={trendingNow}
                    link="/movies"
                    linkText="View All"
                />

                <CardSlider
                    title="📺 Popular Anime"
                    items={popularAnime}
                    link="/anime"
                    linkText="Explore Anime"
                />

                {/* Featured Video Section */}
                <VideoPreview />

                <CardSlider
                    title="🆕 New Releases"
                    items={newReleases}
                    link="/movies"
                    linkText="See More"
                />

                <CardSlider
                    title="⭐ Top Rated Movies"
                    items={topRatedMovies}
                    link="/movies"
                    linkText="All Top Rated"
                />
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                content={trailerContent}
                isOpen={isTrailerOpen}
                onClose={handleCloseTrailer}
            />
        </div>
    );
};

export default Home;
