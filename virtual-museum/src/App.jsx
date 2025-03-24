import React from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle'; // Dark Mode Toggle
import ExhibitWalkthrough from './components/ExhibitWalkthrough'; // 3D Exhibit Walkthrough

const App = () => {
  return (
    <div className="app-container">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* 3D Exhibit Walkthrough */}
      <ExhibitWalkthrough />
    </div>
  );
};

export default App;
