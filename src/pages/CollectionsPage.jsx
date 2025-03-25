import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, stories } from "../data/collectionData";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  
  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedStory(null);
  };
  
  const showCategoryStories = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedStory(null);
  };
  
  const showStoryDetails = (story) => {
    setSelectedStory(story);
  };
  
  const navigateStories = (direction) => {
    if (!selectedStory || !selectedCategory) return;
    
    const categoryStories = stories[selectedCategory];
    const currentIndex = categoryStories.findIndex(s => s.id === selectedStory.id);
    const nextIndex = (currentIndex + direction + categoryStories.length) % categoryStories.length;
    setSelectedStory(categoryStories[nextIndex]);
  };
  
  const navigateCategories = (direction) => {
    if (!selectedCategory) return;
    
    const categoryIds = categories.map(cat => cat.id);
    const currentIndex = categoryIds.indexOf(selectedCategory);
    const nextIndex = (currentIndex + direction + categoryIds.length) % categoryIds.length;
    setSelectedCategory(categoryIds[nextIndex]);
    setSelectedStory(null);
  };

  // Render different views based on selection state
  const renderContent = () => {
    // Show story details
    if (selectedStory) {
      return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} 
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <h1 className="text-3xl font-bold text-center p-6">{selectedStory.title}</h1>
          
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img 
              src={selectedStory.image} 
              alt={selectedStory.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8 text-lg leading-relaxed">
            {selectedStory.content}
          </div>
          
          <div className="flex justify-between flex-wrap gap-4 p-6 bg-gray-50">
            <button 
              onClick={() => navigateStories(-1)} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              ← Previous
            </button>
            <button 
              onClick={() => setSelectedStory(null)} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              Back to Collection
            </button>
            <button 
              onClick={() => navigateStories(1)} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              Next →
            </button>
          </div>
        </motion.div>
      );
    }
    
    // Show category stories
    if (selectedCategory) {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      const categoryStories = stories[selectedCategory] || [];
      
      return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} 
          className="w-full"
        >
          <h1 className="text-3xl font-bold text-center mb-6">{categoryName}</h1>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {categoryStories.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-80 bg-white shadow-lg rounded-lg overflow-hidden card-hover cursor-pointer"
                onClick={() => showStoryDetails(story)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110" 
                  />
                </div>
                <div className="p-4 text-center font-semibold text-lg">{story.title}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => navigateCategories(-1)} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              ← Previous
            </button>
            <button 
              onClick={resetSelection} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              Back to Categories
            </button>
            <button 
              onClick={() => navigateCategories(1)} 
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
            >
              Next →
            </button>
          </div>
        </motion.div>
      );
    }
    
    // Show categories (home view)
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }} 
        className="w-full"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Museum Collections</h1>
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-80 bg-white shadow-lg rounded-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => showCategoryStories(category.id)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-110" 
                />
              </div>
              <div className="p-4 text-center font-semibold text-xl">{category.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
} 