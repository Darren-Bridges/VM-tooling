import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''} bg-linear-gray-50 dark:bg-linear-gray-900`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-linear-gray-800 border-b border-linear-gray-200 dark:border-linear-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={toggleSidebar}
              className="text-linear-gray-500 hover:text-linear-gray-600 dark:text-linear-gray-400 dark:hover:text-linear-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-linear-gray-200 dark:bg-linear-gray-700 text-linear-gray-500 dark:text-linear-gray-400"
            >
              {darkMode ? '🌙' : '🌞'}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
