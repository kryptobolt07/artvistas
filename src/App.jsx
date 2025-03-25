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
  
  return (
    <>
      {/* Persistent Navbar */}
      <Navbar />
      
      {/* Page Transitions and Routes */}
      <PageLayout>
        <AnimatePresence mode="wait" initial={true} onExitComplete={() => {
          window.scrollTo(0, 0);
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
            <Route path="/artists" element={
              <PageTransition key="artists" clickPosition={clickPosition}>
                <div className="min-h-screen flex items-center justify-center">Artists Page (Coming Soon)</div>
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
