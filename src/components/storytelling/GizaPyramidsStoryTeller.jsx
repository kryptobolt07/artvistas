import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import stories from '../../data/gizaPyramidsStories';

function GizaPyramidsStoryTeller() {
  const { speak, cancel } = useSpeechSynthesis();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text) => {
    speak({ text });
    setIsSpeaking(true);
  };

  const handleNextStory = () => {
    cancel();
    setIsSpeaking(false);
    setCurrentStoryIndex((prevIndex) => 
      (prevIndex + 1) % stories.length
    );
  };

  const handlePrevStory = () => {
    cancel();
    setIsSpeaking(false);
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 
      text-white flex flex-col justify-center items-center p-4 sm:p-8">
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white hover:text-amber-200 
          transition-colors flex items-center gap-2 text-sm sm:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-lg rounded-2xl 
        shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8 md:p-12">
        <div className="relative">
          <img 
            src={currentStory.image} 
            alt={currentStory.title} 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl 
              transform transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-b-xl p-4 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {currentStory.title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col justify-between mt-4 md:mt-0">
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-100">
            {currentStory.text}
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <button
              onClick={handlePrevStory}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-800 
                rounded-full text-white transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg
                flex items-center gap-2 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Prev
            </button>

            <button
              onClick={() => handleSpeak(currentStory.text)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 
                rounded-full text-white transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg
                flex items-center gap-2 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10a7.971 7.971 0 00-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              {isSpeaking ? "Speaking..." : "Listen"}
            </button>
            
            <button
              onClick={handleNextStory}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-800 
                rounded-full text-white transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg
                flex items-center gap-2 text-sm sm:text-base"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <span className="text-sm sm:text-xl font-semibold ml-2">
              {`${currentStoryIndex + 1} / ${stories.length}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GizaPyramidsStoryTeller; 