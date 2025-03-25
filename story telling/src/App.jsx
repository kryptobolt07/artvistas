import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AtlantisStoryTeller from './AtlantisStoryTeller';
import GizaPyramidsStoryTeller from './GizaPyramidsStoryTeller';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-extralight tracking-wide text-center mb-16 
            bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200 
            animate-gradient-x">
            Ancient Wonders Story Explorer
          </h1>
          
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto">
                  <Link 
                    to="/atlantis" 
                    className="group relative overflow-hidden rounded-2xl shadow-2xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                  >
                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity"></div>
                    <img 
                      src='/images/991d1444d7502ea0ed2c86fbf1586726.jpg'
                      alt="Atlantis" 
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 
                      bg-gradient-to-t from-black to-transparent">
                      <h2 className="text-3xl font-semibold text-white 
                        group-hover:text-blue-200 transition-colors">
                        Atlantis Stories
                      </h2>
                      <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 
                        transition-opacity">
                        Explore the Legendary Lost City
                      </p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/pyramids" 
                    className="group relative overflow-hidden rounded-2xl shadow-2xl 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                  >
                    <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity"></div>
                    <img 
                      src='/images1/i4.jpg' 
                      alt="Giza Pyramids" 
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 
                      bg-gradient-to-t from-black to-transparent">
                      <h2 className="text-3xl font-semibold text-white 
                        group-hover:text-amber-200 transition-colors">
                        Giza Pyramids Stories
                      </h2>
                      <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 
                        transition-opacity">
                        Discover Ancient Egyptian Wonders
                      </p>
                    </div>
                  </Link>
                </div>
              } 
            />
            
            {/* Story Teller Routes */}
            <Route path="/atlantis" element={<AtlantisStoryTeller />} />
            <Route path="/pyramids" element={<GizaPyramidsStoryTeller />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;