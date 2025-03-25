import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Info, Phone, Mail, CreditCard, Users } from 'lucide-react';
import './VisitPage.css';

export default function VisitPage() {
  const [selectedTab, setSelectedTab] = useState('hours');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const tabVariants = {
    inactive: { opacity: 0.7 },
    active: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Tabs
  const tabs = [
    { id: 'hours', label: 'Hours & Admission', icon: <Clock size={20} /> },
    { id: 'directions', label: 'Directions', icon: <MapPin size={20} /> },
    { id: 'tours', label: 'Guided Tours', icon: <Users size={20} /> },
    { id: 'info', label: 'Museum Info', icon: <Info size={20} /> }
  ];
  
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="w-full mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative overflow-hidden rounded-2xl h-[300px] md:h-[400px]">
          <img 
            src="https://www.allplan.com/fileadmin/_processed_/f/6/csm_Museumsarchitektur_Centre_201804_0a944a8126.jpg" 
            alt="Museum building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Plan Your Visit</h1>
          </div>
        </div>
      </motion.div>
      
      {/* Tabs navigation */}
      <div className="mb-10">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar gap-2 md:gap-4 md:justify-center">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 min-w-max whitespace-nowrap transition-all ${
                selectedTab === tab.id 
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              variants={tabVariants}
              animate={selectedTab === tab.id ? "active" : "inactive"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Tab content */}
      <motion.div
        key={selectedTab}
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10"
      >
        {selectedTab === 'hours' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Hours & Admission</motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-indigo-600" />
                  <span>Opening Hours</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Monday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Tuesday - Thursday</span>
                    <span className="text-gray-600">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Friday</span>
                    <span className="text-gray-600">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Saturday - Sunday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <p className="text-indigo-700 flex items-start">
                    <Info size={18} className="mr-2 mt-1 flex-shrink-0" />
                    <span>The museum is closed on major holidays. Last entry is 30 minutes before closing time.</span>
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-purple-600" />
                  <span>Admission Fees</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Adults</span>
                    <span className="text-gray-600">$18.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Seniors (65+)</span>
                    <span className="text-gray-600">$12.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Students (with ID)</span>
                    <span className="text-gray-600">$10.00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Children (under 12)</span>
                    <span className="text-gray-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Members</span>
                    <span className="text-gray-600">Free</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.button
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Tickets Online
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {selectedTab === 'directions' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Directions & Parking</motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-indigo-600" />
                  <span>Location</span>
                </h3>
                <p className="text-gray-700 mb-4">
                  ArtVistas Museum<br />
                  123 Gallery Avenue<br />
                  Art District, CA 90210
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-indigo-600" />
                  <span>Getting Here</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="font-medium block mb-1">By Public Transit:</span>
                    <p className="text-gray-700">
                      Bus lines 12, 45, and 67 stop directly in front of the museum. The Art District subway station is a 5-minute walk away.
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-medium block mb-1">By Car:</span>
                    <p className="text-gray-700">
                      From Highway 101, take exit 24B toward Art District. Continue on Gallery Avenue for 1.5 miles. The museum will be on your right.
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-medium block mb-1">Parking:</span>
                    <p className="text-gray-700">
                      Paid parking is available in the museum garage ($10 flat rate) or at nearby public parking facilities.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="h-[400px] rounded-lg overflow-hidden map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7153713472397!2d-118.25276288526964!3d34.05854398050777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648957fffff%3A0xb146899a5365f267!2sThe%20Broad!5e0!3m2!1sen!2sus!4v1653480267350!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Museum Location Map"
                  className="rounded-lg shadow-md"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {selectedTab === 'tours' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Guided Tours</motion.h2>
            
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users size={20} className="text-indigo-600" />
                  <span>Available Tours</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300">
                    <h4 className="font-medium text-lg mb-2">Highlights Tour</h4>
                    <p className="text-gray-700 mb-2">A 60-minute introduction to our most significant artworks across all collections.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Daily at 11:00 AM & 2:00 PM</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">$5 with admission</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300">
                    <h4 className="font-medium text-lg mb-2">Contemporary Art Tour</h4>
                    <p className="text-gray-700 mb-2">Explore our modern and contemporary art collections with expert guides.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Wed, Fri, Sun at 1:00 PM</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">$5 with admission</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-300">
                    <h4 className="font-medium text-lg mb-2">Family Tour</h4>
                    <p className="text-gray-700 mb-2">An interactive, kid-friendly tour designed for families with children ages 5-12.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Sat & Sun at 10:30 AM</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Free with admission</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-purple-600" />
                  <span>Private Tours</span>
                </h3>
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-medium text-lg mb-3">Custom Group Tours</h4>
                  <p className="text-gray-700 mb-4">
                    Private guided tours are available for groups of 8 or more people. Custom tours can focus on specific collections or themes based on your group's interests.
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span className="text-gray-700">Duration: 60-90 minutes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span className="text-gray-700">Pricing: $150 for up to 10 people + admission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <span className="text-gray-700">Advance booking required (14+ days)</span>
                    </li>
                  </ul>
                  
                  <motion.button
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Private Tour
                  </motion.button>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 flex items-start">
                    <Info size={18} className="mr-2 mt-1 flex-shrink-0" />
                    <span>All guided tours are subject to availability. We recommend checking at the information desk upon arrival or reserving in advance.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {selectedTab === 'info' && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Museum Information</motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Phone size={20} className="text-indigo-600" />
                  <span>Contact Us</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="text-gray-500 mt-1" size={18} />
                    <div>
                      <span className="font-medium block">Main Phone Line</span>
                      <span className="text-gray-700">(555) 123-4567</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-500 mt-1" size={18} />
                    <div>
                      <span className="font-medium block">Email</span>
                      <span className="text-gray-700">info@artvistas.com</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-purple-600" />
                  <span>Accessibility</span>
                </h3>
                
                <p className="text-gray-700 mb-4">
                  The ArtVistas Museum is committed to making our building and collection accessible to all visitors.
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-700">Wheelchair accessible entrances and elevators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-700">Wheelchairs available to borrow free of charge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-700">Assistive listening devices for tours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-700">Sensory-friendly hours on the first Sunday of each month</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info size={20} className="text-indigo-600" />
                  <span>Museum Amenities</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 amenity-card">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 012.5 2.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 15.5v-11z" />
                        <path fillRule="evenodd" d="M10 8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1zm0-3a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Museum Shop</span>
                      <p className="text-gray-700">Browse our selection of art books, prints, jewelry, and gifts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 amenity-card">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Café Vistas</span>
                      <p className="text-gray-700">Our café offers light meals, snacks, and beverages. Open during museum hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 amenity-card">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm10 4a1 1 0 01-1 1H6a1 1 0 110-2h8a1 1 0 011 1zm0 4a1 1 0 01-1 1H6a1 1 0 110-2h8a1 1 0 011 1zm-9 4a1 1 0 012 0v.01a1 1 0 11-2 0V16z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Coat Check</span>
                      <p className="text-gray-700">Complimentary coat and bag check service is available at the main entrance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 amenity-card">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium block">Photography</span>
                      <p className="text-gray-700">Photography for personal use is permitted in permanent collection galleries, without flash. Some special exhibitions may prohibit photography.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Call to action */}
      <motion.div 
        className="membership-gradient p-8 rounded-xl text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Member Today</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join ArtVistas and enjoy unlimited free admission, exclusive member events, previews of new exhibitions, and discounts at our museum shop and café.
        </p>
        <motion.button
          className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 hover-lift"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn About Membership
        </motion.button>
      </motion.div>
    </div>
  );
} 