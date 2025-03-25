import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArtistsSection() {
  const featuredArtists = [
    {
      name: "David Chen",
      specialty: "Digital Mixed Media",
      description: "Merging traditional techniques with digital innovation, Chen creates multi-layered works that blur the line between physical and virtual.",
      image: "/images/artists/i2.jpg"
    },
    {
      name: "Maya Williams", 
      specialty: "Neo-Impressionism",
      description: "Williams revisits impressionist techniques through a contemporary lens, creating vibrant landscapes that explore themes of climate change.",
      image: "/images/artists/i3.jpeg"
    },
    {
      name: "Hiroshi Tanaka",
      specialty: "Sculptural Installation", 
      description: "Tanaka's immersive installations transform spaces through light, sound, and interactive elements, inviting audiences to become part of the art.",
      image: '/images/artists/i4.png'
    }
  ];

  return (
    <section id="artists" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Artist Spotlight Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Artist Spotlight</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover the brilliant minds behind our featured collections and learn about their unique artistic journeys.
          </p>
        </motion.div>

        {/* Featured Artist Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-8 bg-gray-100 p-8 rounded-lg shadow-sm">
            <div className="bg-gray-300 h-[500px] rounded-lg overflow-hidden">
              <img 
                src="/images/artists/i1.jpg" 
                alt="Clara Renoir Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm mr-4">
                  Artist of the Month
                </span>
                <div className="flex space-x-3">
                  <Twitter className="text-gray-700 hover:text-blue-500 cursor-pointer transition-colors" />
                  <Instagram className="text-gray-700 hover:text-pink-500 cursor-pointer transition-colors" />
                  <Linkedin className="text-gray-700 hover:text-blue-700 cursor-pointer transition-colors" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Redefining Space and Emotion</h2>
              <p className="text-gray-700 mb-4">
                Clara Renoir has established herself as one of the most influential contemporary abstract expressionists of our time. Her work explores the relationship between spatial awareness and emotional resonance, creating immersive experiences that challenge the viewer's perception.
              </p>
              <p className="text-gray-700 mb-4">
                Born in Paris and educated in New York, Renoir brings a unique blend of European tradition and American innovation to her canvas. Her distinctive use of vibrant color fields and dynamic brushwork has earned her international acclaim.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-300 h-[200px] rounded-lg overflow-hidden">
                  <img 
                    src="/images/artists/artwork1.jpg" 
                    alt="Clara Renoir Artwork 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-300 h-[200px] rounded-lg overflow-hidden">
                  <img 
                    src="/images/artists/artwork2.jpg" 
                    alt="Clara Renoir Artwork 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  Explore Artist's Work
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Featured Artists */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuredArtists.map((artist, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-100 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-gray-300 h-[300px] rounded-lg mb-4 overflow-hidden">
                <img 
                  src={artist.image}
                  alt={`${artist.name} Portrait`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{artist.name}</h3>
              <p className="text-gray-600 mb-2">{artist.specialty}</p>
              <p className="text-gray-700 mb-4">{artist.description}</p>
              <a href="#" className="text-black font-semibold hover:underline">
                View Profile →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Meet All Artists Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Meet All Featured Artists
          </button>
        </motion.div>
      </div>
    </section>
  );
} 