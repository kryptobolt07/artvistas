import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExhibitionsSection() {
  const featuredExhibitions = [
    {
      title: "Modern Perspectives",
      dates: "May 10 - August 15, 2023",
      location: "East Wing, Floor 2",
      description: "An exploration of contemporary perspectives in modern art, featuring works that challenge conventional artistic narratives.",
      image: "https://images.unsplash.com/photo-1537632083056-f557a4e1e01f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Digital Frontiers", 
      dates: "June 5 - September 20, 2023",
      location: "West Pavilion",
      description: "Discover how technology is reshaping artistic expression through interactive installations and digital innovations.",
      image: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Cultural Confluences",
      dates: "July 12 - October 30, 2023", 
      location: "Central Gallery",
      description: "A celebration of diverse artistic traditions coming together to create new forms of cultural expression.",
      image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="exhibitions" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        {/* Exhibitions Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Exhibitions</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Immerse yourself in our thoughtfully curated exhibitions showcasing diverse artistic expressions and cultural narratives.
          </p>
        </motion.div>

        {/* Featured Exhibition */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-sm">
            <div className="bg-gray-300 h-[500px] rounded-lg overflow-hidden">
              <img 
                src="https://media.istockphoto.com/id/1218961153/photo/art-museum.jpg?s=612x612&w=0&k=20&c=9fK54fu1mjzFjDOSqg_jfrMy4Hkp8vsmImB7rLrbhJs=" 
                alt="Art Museum Exhibition" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm mr-4">
                  Featured Exhibition
                </span>
                <div className="flex space-x-3">
                  <Calendar className="text-gray-700" />
                  <span className="text-gray-700">April 15 - July 30, 2023</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Echoes of the Past: Renaissance Revisited</h2>
              <p className="text-gray-700 mb-4">
                This groundbreaking exhibition brings together masterpieces from the Renaissance period alongside contemporary works inspired by this influential era. Visitors will experience how classical themes and techniques continue to resonate with today's artists.
              </p>
              <p className="text-gray-700 mb-4">
                Featuring rare loans from international collections, this exhibition presents a unique opportunity to witness the dialogue between past and present, tradition and innovation.
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center">
                  <MapPin className="mr-2 text-gray-700" size={18} />
                  <span className="text-gray-700">Main Exhibition Hall, North Wing</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-700" size={18} />
                  <span className="text-gray-700">Open daily 10AM - 6PM</span>
                </div>
              </div>
              
              <div className="mt-4 text-right">
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Featured Exhibitions */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuredExhibitions.map((exhibition, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-gray-300 h-[200px] rounded-lg mb-4 overflow-hidden">
                <img 
                  src={exhibition.image}
                  alt={`${exhibition.title}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{exhibition.title}</h3>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 text-gray-600" size={16} />
                <p className="text-gray-600">{exhibition.dates}</p>
              </div>
              <div className="flex items-center mb-3">
                <MapPin className="mr-2 text-gray-600" size={16} />
                <p className="text-gray-600">{exhibition.location}</p>
              </div>
              <p className="text-gray-700 mb-4">{exhibition.description}</p>
              <a href="#" className="text-black font-semibold hover:underline">
                View Details →
              </a>
            </motion.div>
          ))}
        </div>

        {/* View All Exhibitions Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Explore All Exhibitions
          </button>
        </motion.div>
      </div>
    </section>
  );
} 