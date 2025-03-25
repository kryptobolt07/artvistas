import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Function to scroll to exhibitions section
  const scrollToExhibitions = () => {
    const exhibitionsSection = document.getElementById('exhibitions');
    if (exhibitionsSection) {
      exhibitionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to artists section
  const scrollToArtists = () => {
    const artistsSection = document.getElementById('artists');
    if (artistsSection) {
      artistsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="https://api-www.louvre.fr/sites/default/files/2024-04/cover-w768-h768-scaled.mp4" type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <motion.h1 
          className="text-5xl font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          Experience Art Without Boundaries
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-xl text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          Immerse yourself in ArtVistas' virtual exhibitions, bringing world-class art directly to you.
        </motion.p>
        
        {/* Buttons */}
        <motion.div 
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <Link to="/virtual-tour">
            <Button className="bg-white text-black hover:bg-gray-200">Begin Your Tour</Button>
          </Link>
          <Link to="/collections">
            <Button className="border border-white text-white hover:bg-white hover:text-black">
              Explore Collections
            </Button>
          </Link>
        </motion.div>

        {/* Quick Navigation Links */}
        <motion.div 
          className="mt-6 flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <button 
            onClick={scrollToArtists}
            className="text-white underline-offset-4 hover:underline"
          >
            Featured Artists
          </button>
          <button 
            onClick={scrollToExhibitions}
            className="text-white underline-offset-4 hover:underline"
          >
            Current Exhibitions
          </button>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </div>
    </section>
  );
}