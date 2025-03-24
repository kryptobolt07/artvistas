import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20">
        <Link to="/" className="text-2xl font-bold">ArtVistas</Link>
        <ul className="flex gap-8">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/collections" className="hover:underline">Collections</Link></li>
          <li><Link to="/virtual-tour" className="hover:underline">Virtual Tour</Link></li>
          <li><Link to="/artists" className="hover:underline">Artists</Link></li>
          <li><Link to="/exhibitions" className="hover:underline">Exhibitions</Link></li>
          <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
          <li><Link to="/visit" className="hover:underline">Visit</Link></li>
        </ul>
      </nav>
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
        <h1 className="text-5xl font-bold md:text-7xl">
          Experience Art Without Boundaries
        </h1>
        <p className="mt-4 max-w-xl text-lg">
          Immerse yourself in ArtVistas' virtual exhibitions, bringing world-class art directly to you.
        </p>
        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link to="/virtual-tour">
            <Button className="bg-white text-black hover:bg-gray-200">Begin Your Tour</Button>
          </Link>
          <Link to="/collections">
            <Button className="border border-white text-white hover:bg-white hover:text-black">
              Explore Collections
            </Button>
          </Link>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ArrowDown size={32} />
        </div>
      </div>
    </section>
  );
}