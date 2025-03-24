import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageLayout component that properly spaces content below the navbar
 * except for the home page where content can overlap with the navbar
 */
export default function PageLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`${isHomePage ? '' : 'pt-[72px]'}`}>
      {children}
    </div>
  );
} 