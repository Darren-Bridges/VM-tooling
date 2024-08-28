import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  LanguageIcon, 
  ArrowsPointingInIcon, 
  ArrowsPointingOutIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose }) {
  const [isTranslationsOpen, setIsTranslationsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}
      <nav className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">VM Tooling</h1>
          <button 
            onClick={onClose} 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="py-4">
          <li>
            <Link to="/" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsTranslationsOpen(!isTranslationsOpen)}
              className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-between"
            >
              <span className="flex items-center">
                <LanguageIcon className="h-5 w-5 mr-2" />
                Translations
              </span>
              <ChevronDownIcon className={`h-4 w-4 transform transition-transform ${isTranslationsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTranslationsOpen && (
              <ul className="pl-4">
                <li>
                  <Link to="/translations/flatten" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
                    <ArrowsPointingInIcon className="h-5 w-5 mr-2" />
                    Flatten
                  </Link>
                </li>
                <li>
                  <Link to="/translations/unflatten" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
                    <ArrowsPointingOutIcon className="h-5 w-5 mr-2" />
                    Unflatten
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/customer-receipt-template-builder" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Customer Receipt Template
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

