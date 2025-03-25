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
        <div className="bg-white/30 backdrop-blur-md rounded-full p-1 shadow-xl flex flex-row w-full max-w-xs sm:max-w-md mx-auto border border-white/40">
          <button
            onClick={() => setSelectedStory('atlantis')}
            className={`flex-1 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
              selectedStory === 'atlantis' 
                ? 'bg-sky-400 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-white/20'
            }`}
          >
            Atlantis
          </button>
          <button
            onClick={() => setSelectedStory('pyramids')}
            className={`flex-1 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
              selectedStory === 'pyramids' 
                ? 'bg-amber-400 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-white/20'
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