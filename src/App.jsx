import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/CustomCursor/CustomCursor';

// Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import Anime from './pages/Anime';
import Details from './pages/Details';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Set GSAP defaults for performance
gsap.config({
    force3D: true,
    nullTargetWarn: false
});

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const mainRef = useRef(null);

    // Initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Page transition animation
    useEffect(() => {
        if (!isLoading && mainRef.current) {
            // Kill any existing ScrollTriggers before creating new ones
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // Page entrance animation
            const tl = gsap.timeline();

            tl.fromTo(mainRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.98
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    force3D: true
                }
            );

            // Scroll to top on route change
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Refresh ScrollTrigger after route change
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }
    }, [location.pathname, isLoading]);

    return (
        <div className="app">
            {/* Custom Cursor (Desktop Only) */}
            <CustomCursor />

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
