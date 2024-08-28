import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, DocumentIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose }) {
  const [isTranslationsOpen, setIsTranslationsOpen] = useState(false);

  return (
    <nav className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0
    `}>
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">VM Tooling</h1>
        <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 md:hidden">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul className="space-y-2 p-4">
        <li>
          <Link to="/" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={onClose}>
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => setIsTranslationsOpen(!isTranslationsOpen)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 w-full"
          >
            <DocumentIcon className="h-5 w-5" />
            <span>Translations</span>
            <svg
              className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${
                isTranslationsOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isTranslationsOpen && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/translations/flatten" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={onClose}>
                  <span>Flatten</span>
                </Link>
              </li>
              <li>
                <Link to="/translations/unflatten" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={onClose}>
                  <span>Unflatten</span>
                </Link>
              </li>
            </ul>
          )}
        </li> 
      </ul>
    </nav>
  );
}

export default Sidebar;

