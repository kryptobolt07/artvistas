import React, { useState } from 'react';
import AtlantisStoryTeller from '../components/storytelling/AtlantisStoryTeller';
import GizaPyramidsStoryTeller from '../components/storytelling/GizaPyramidsStoryTeller';
import { motion } from 'framer-motion';

function StorytellingPage() {
  const [selectedStory, setSelectedStory] = useState('atlantis');

  return (
    <div className="min-h-screen relative">
      {/* Story selector */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-1 shadow-lg flex">
          <button
            onClick={() => setSelectedStory('atlantis')}
            className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 ${
              selectedStory === 'atlantis' 
                ? 'bg-blue-600 shadow-md' 
                : 'hover:bg-white/10'
            }`}
          >
            Atlantis
          </button>
          <button
            onClick={() => setSelectedStory('pyramids')}
            className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 ${
              selectedStory === 'pyramids' 
                ? 'bg-amber-600 shadow-md' 
                : 'hover:bg-white/10'
            }`}
          >
            Pyramids of Giza
          </button>
        </div>
      </div>

      {/* Story content with animation */}
      <motion.div
        key={selectedStory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {selectedStory === 'atlantis' ? (
          <AtlantisStoryTeller />
        ) : (
          <GizaPyramidsStoryTeller />
        )}
      </motion.div>
    </div>
  );
}

export default StorytellingPage; 