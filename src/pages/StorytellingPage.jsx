import React, { useState } from 'react';
import AtlantisStoryTeller from '../components/storytelling/AtlantisStoryTeller';
import GizaPyramidsStoryTeller from '../components/storytelling/GizaPyramidsStoryTeller';
import { motion } from 'framer-motion';

function StorytellingPage() {
  const [selectedStory, setSelectedStory] = useState('atlantis');

  return (
    <div className="min-h-screen relative">
      {/* Story selector */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-1 shadow-lg flex flex-col sm:flex-row w-full max-w-xs sm:max-w-md mx-auto">
          <button
            onClick={() => setSelectedStory('atlantis')}
            className={`px-4 sm:px-6 py-2 rounded-full text-white font-medium transition-all duration-300 text-sm sm:text-base ${
              selectedStory === 'atlantis' 
                ? 'bg-blue-600 shadow-md' 
                : 'hover:bg-white/10'
            } ${selectedStory !== 'atlantis' && 'mb-1 sm:mb-0'}`}
          >
            Atlantis
          </button>
          <button
            onClick={() => setSelectedStory('pyramids')}
            className={`px-4 sm:px-6 py-2 rounded-full text-white font-medium transition-all duration-300 text-sm sm:text-base ${
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
        className="pt-24 sm:pt-16"
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