import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

// Current Exhibition Component
const CurrentExhibition = () => {
  return (
    <div className="grid grid-cols-2 bg-dark-bg text-primary-text">
      <div className="bg-gray-500 p-8 flex items-center justify-center">
        <span className="text-gray-300">Current Exhibition</span>
      </div>
      <div className="bg-card-bg p-8">
        <span className="text-secondary-text uppercase tracking-wide text-sm">Featured Exhibition</span>
        <h2 className="text-3xl font-bold mt-2">Impressionism Reimagined</h2>
        <p className="text-secondary-text mt-2">January 15 - March 30, 2023</p>
        <p className="mt-4 text-secondary-text">
          Experience impressionist masterpieces like never before with our immersive digital exhibition that brings new perspectives to classic works. Journey through light, color, and beauty.
        </p>
        <div className="flex space-x-4 mt-6">
          <div className="flex items-center bg-white text-black px-4 py-2 rounded cursor-pointer">
            Virtual Tour
          </div>
          <div className="flex items-center border border-secondary-text text-secondary-text px-4 py-2 rounded cursor-pointer">
            Exhibition Details
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          {['Monet', 'Renoir', 'Digital Immersion', 'Interactive'].map((tag) => (
            <span key={tag} className="bg-gray-700 text-secondary-text px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Upcoming Exhibitions Component
const UpcomingExhibitions = () => {
  const exhibitions = [
    {
      title: 'Modern Abstract',
      subtitle: 'Breaking Boundaries',
      date: 'April 10 - June 15, 2023',
      description: 'Explore how contemporary artists are redefining abstract art with innovative techniques and bold perspectives.'
    },
    {
      title: 'Renaissance Masters',
      subtitle: 'Digital Restoration',
      date: 'July 5 - September 25, 2023',
      description: 'Witness Renaissance masterpieces restored to their original glory through cutting-edge digital restoration technology.'
    },
    {
      title: 'Digital Frontiers',
      subtitle: 'Art in the Metaverse',
      date: 'October 10 - December 20, 2023',
      description: 'Discover how artists are pushing boundaries in virtual spaces, creating innovative works native to digital environments.'
    }
  ];

  return (
    <div className="bg-dark-bg text-primary-text p-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Exhibitions</h2>
      <div className="grid grid-cols-3 gap-6">
        {exhibitions.map((exhibition, index) => (
          <div key={index} className="bg-card-bg rounded-lg p-6 hover:bg-gray-800 transition">
            <h3 className="text-xl font-bold">{exhibition.title}</h3>
            <p className="text-secondary-text text-sm mt-1">{exhibition.subtitle}</p>
            <p className="text-secondary-text text-xs mt-2">{exhibition.date}</p>
            <p className="text-secondary-text mt-4">{exhibition.description}</p>
            <div className="flex items-center text-secondary-text mt-4 hover:text-white cursor-pointer">
              Learn more <ChevronRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exhibition Calendar Component
const ExhibitionCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 2, 1)); // March 2023

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Total days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ day: null, events: [] });
    }
    
    // Add days of the month with potential events
    for (let day = 1; day <= daysInMonth; day++) {
      let events = [];
      
      // Predefined events based on the original image
      if (day === 15) events.push('exhibition-opening');
      if (day === 23) events.push('workshop');
      if (day === 29) events.push('guided-tour');
      if (day === 11) events.push('artist-talk');
      
      calendarDays.push({ day, events });
    }
    
    return calendarDays;
  };

  const renderCalendarDay = (dayObj) => {
    if (!dayObj.day) return <div className=""></div>;
    
    const eventClasses = {
      'artist-talk': 'bg-red-600',
      'exhibition-opening': 'bg-blue-600',
      'workshop': 'bg-green-600',
      'guided-tour': 'bg-purple-600'
    };
    
    const dayEvents = dayObj.events.map(event => 
      <div key={event} className={`w-1 h-1 rounded-full ${eventClasses[event]}`}></div>
    );
    
    return (
      <div className={`p-2 text-center relative border border-gray-700 rounded 
        ${dayObj.events.length ? 'bg-gray-700 text-white' : 'text-gray-500'}
        ${dayObj.day === 15 || dayObj.day === 23 || dayObj.day === 29 || dayObj.day === 11 ? 'font-bold' : ''}`}>
        {dayObj.day}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
          {dayEvents}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-dark-bg text-primary-text px-24 py-8"> {/* Increased horizontal padding from px-16 to px-24 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Exhibition Schedule</h2>
        <div className="flex items-center space-x-4">
          <ChevronLeft className="cursor-pointer hover:bg-gray-700 rounded" />
          <span>March 2023</span>
          <ChevronRight className="cursor-pointer hover:bg-gray-700 rounded" />
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center border border-gray-700 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-secondary-text text-sm py-2 border-b border-gray-700 bg-card-bg">
            {day}
          </div>
        ))}
        
        {generateCalendarDays().map((dayObj, index) => (
          <React.Fragment key={index}>
            {renderCalendarDay(dayObj)}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 flex space-x-4 px-2"> {/* Added horizontal padding to legend */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-600 mr-2 rounded"></div>
          <span className="text-secondary-text">Artist Talks</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 mr-2 rounded"></div>
          <span className="text-secondary-text">Exhibition Openings</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 mr-2 rounded"></div>
          <span className="text-secondary-text">Workshops</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-600 mr-2 rounded"></div>
          <span className="text-secondary-text">Guided Tours</span>
        </div>
      </div>
    </div>
  );
};


// export default ExhibitionCalendar;

// Newsletter Signup Component
const NewsletterSignup = () => {
  return (
    <div className="bg-card-bg text-primary-text p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated on Exhibitions & Events</h2>
      <p className="text-secondary-text mb-6">
        Subscribe to our newsletter to receive exhibition announcements, exclusive invitations, and virtual event access.
      </p>
      <div className="flex justify-center">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="bg-dark-bg px-4 py-2 rounded-l-lg w-1/3"
        />
        <button className="bg-white text-black px-6 py-2 rounded-r-lg">
          Subscribe
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div mx-20>
    <div className="bg-dark-bg min-h-screen font-sans">
      <div className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-text flex items-center">
            <Calendar className="mr-2" /> Exhibition Calendar
          </h1>
          <nav className="text-secondary-text space-x-4">
            <a href="#" className="hover:text-white">Exhibitions</a>
            <a href="#" className="hover:text-white">Events</a>
            <a href="#" className="hover:text-white">About</a>
          </nav>
        </header>
        
        <CurrentExhibition />
        <UpcomingExhibitions />
        <ExhibitionCalendar />
        <NewsletterSignup />
      </div>
    </div>
    </div>
  );
};

export default App;