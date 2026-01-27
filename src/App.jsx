import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import Anime from './pages/Anime';
import Details from './pages/Details';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const mainRef = useRef(null);

    // Initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Page transition animation
    useEffect(() => {
        if (!isLoading && mainRef.current) {
            // Fade in animation for page content
            gsap.fromTo(mainRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 0.1
                }
            );

            // Scroll to top on route change
            window.scrollTo(0, 0);

            // Refresh ScrollTrigger
            ScrollTrigger.refresh();
        }
    }, [location.pathname, isLoading]);

    return (
        <div className="app">
            {/* Loading Screen */}
            <LoadingScreen isLoading={isLoading} />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main ref={mainRef} key={location.pathname}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/anime" element={<Anime />} />
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
