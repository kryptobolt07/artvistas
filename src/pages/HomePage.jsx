import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ArtistsSection from '../components/home/artists/ArtistsSection';
import ExhibitionsSection from '../components/home/exhibitions/ExhibitionsSection';

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

    // Check if we should scroll to exhibitions section
    const scrollToExhibitions = sessionStorage.getItem('scrollToExhibitions');
    if (scrollToExhibitions) {
      // Remove the flag
      sessionStorage.removeItem('scrollToExhibitions');
      
      // Wait for the page to fully load and transition to complete
      setTimeout(() => {
        const exhibitionsSection = document.getElementById('exhibitions');
        if (exhibitionsSection) {
          exhibitionsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <ArtistsSection />
      <ExhibitionsSection />
      {/* Other sections will be added here */}
    </>
  );
}