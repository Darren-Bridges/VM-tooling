import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, userEmail, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [darkMode, setDarkMode] = useState(true);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);

    const env = localStorage.getItem('selected-environment');
    setSelectedEnvironment(env || '');
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const getBadgeStyle = () => {
    switch (selectedEnvironment) {
      case 'live':
        return 'bg-red-600 text-white';
      case 'demo':
        return 'bg-blue-600 text-white';
      case 'feature-branch':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''} bg-linear-gray-50 dark:bg-linear-gray-900`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userEmail={userEmail} 
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-linear-gray-800 border-b border-linear-gray-200 dark:border-linear-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-linear-gray-500 hover:text-linear-gray-600 dark:text-linear-gray-400 dark:hover:text-linear-gray-300 mr-4"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {selectedEnvironment && (
                <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getBadgeStyle()}`}>
                  {selectedEnvironment.charAt(0).toUpperCase() + selectedEnvironment.slice(1)}
                </span>
              )}
            </div>
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
