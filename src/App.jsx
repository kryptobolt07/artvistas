import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import VirtualTourPage from './pages/VirtualTourPage';
import CollectionsPage from './pages/CollectionsPage';
import PageTransition from './components/layout/PageTransition';
import PageLayout from './components/layout/PageLayout';
import Navbar from './components/layout/Navbar';
import './index.css';

// Wrapper component to access location from React Router
function AnimatedRoutes() {
  const location = useLocation();
  const [clickPosition, setClickPosition] = useState({ x: 0.5, y: 0.5 });
  
  // Track clicks specifically on navigation links
  useEffect(() => {
    const handleNavClick = (e) => {
      // Only track clicks on nav links (all a tags that are child of nav)
      if (e.target.closest('nav a') || e.target.closest('a')) {
        setClickPosition({ 
          x: e.clientX / window.innerWidth, 
          y: e.clientY / window.innerHeight 
        });
      }
    };
    
    // Use capture phase to ensure we catch the click before navigation
    document.addEventListener('click', handleNavClick, true);
    
    return () => {
      document.removeEventListener('click', handleNavClick, true);
    };
  }, []);

  // Handle hash navigation - scroll to section on hash change
  useEffect(() => {
    // Check if the URL contains a hash
    if (location.hash) {
      // Get the target element by id (remove # from hash)
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for page transition to complete, then scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return (
    <>
      {/* Persistent Navbar */}
      <Navbar />
      
      {/* Page Transitions and Routes */}
      <PageLayout>
        <AnimatePresence mode="wait" initial={true} onExitComplete={() => {
          // Ensure body scroll is properly reset after transitions complete
          document.body.style.overflow = '';
        }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition key="home" clickPosition={clickPosition}>
                <HomePage />
              </PageTransition>
            } />
            <Route path="/gallery" element={
              <PageTransition key="gallery" clickPosition={clickPosition}>
                <GalleryPage />
              </PageTransition>
            } />
            <Route path="/collections" element={
              <PageTransition key="collections" clickPosition={clickPosition}>
                <CollectionsPage />
              </PageTransition>
            } />
            <Route path="/virtual-tour" element={
              <PageTransition key="virtual-tour" clickPosition={clickPosition}>
                <VirtualTourPage />
              </PageTransition>
            } />
            <Route path="/exhibitions" element={
              <PageTransition key="exhibitions" clickPosition={clickPosition}>
                <div className="min-h-screen flex items-center justify-center">Exhibitions Page (Coming Soon)</div>
              </PageTransition>
            } />
            <Route path="/visit" element={
              <PageTransition key="visit" clickPosition={clickPosition}>
                <div className="min-h-screen flex items-center justify-center">Visit Page (Coming Soon)</div>
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </PageLayout>
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
