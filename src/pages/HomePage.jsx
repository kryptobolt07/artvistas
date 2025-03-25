import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ArtistsSection from '../components/home/artists/ArtistsSection';

export default function HomePage() {
  useEffect(() => {
    // Check if we should scroll to artists section
    const scrollToArtists = sessionStorage.getItem('scrollToArtists');
    if (scrollToArtists) {
      // Remove the flag
      sessionStorage.removeItem('scrollToArtists');
      
      // Wait for the page to fully load and transition to complete
      setTimeout(() => {
        const artistsSection = document.getElementById('artists');
        if (artistsSection) {
          artistsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <ArtistsSection />
      {/* Other sections will be added here */}
    </>
  );
}