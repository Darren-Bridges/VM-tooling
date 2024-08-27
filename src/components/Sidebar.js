import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, DocumentIcon, CogIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const [isTranslationsOpen, setIsTranslationsOpen] = useState(false);

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-600">VM Tooling</h1>
      </div>
      <ul className="space-y-2 p-4">
        <li>
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => setIsTranslationsOpen(!isTranslationsOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 w-full"
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
                <Link to="/translations/flatten" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <span>Flatten</span>
                </Link>
              </li>
              <li>
                <Link to="/translations/unflatten" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <span>Unflatten</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/settings" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
            <CogIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

