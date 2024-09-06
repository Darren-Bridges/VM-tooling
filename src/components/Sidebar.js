import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  LanguageIcon, 
  ArrowsPointingInIcon, 
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose, userEmail, onLogout }) {
  const [isTranslationsOpen, setIsTranslationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-linear-gray-800 bg-opacity-75 z-20"
          onClick={onClose}
        ></div>
      )}
      <nav className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-linear-gray-800 border-r border-linear-gray-200 dark:border-linear-gray-700 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex justify-between items-center p-4 border-b border-linear-gray-200 dark:border-linear-gray-700">
          <h1 className="text-2xl font-bold text-linear-blue-500">VM Tooling</h1>
          <button 
            onClick={onClose} 
            className="text-linear-gray-500 hover:text-linear-gray-600 dark:text-linear-gray-400 dark:hover:text-linear-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="py-4 flex-grow">
          <SidebarItem to="/" icon={HomeIcon} text="Home" onClick={onClose} />
          <SidebarItem 
            to="/new-tenant-creation-wizard" 
            icon={UserPlusIcon} 
            text={
              <span className="flex items-center">
                NTCW
                <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-linear-blue-600 bg-linear-blue-100 rounded-full">Beta</span>
              </span>
            } 
            onClick={onClose} 
          />
          <SidebarItem 
            to="/customer-receipt-template-builder" 
            icon={DocumentTextIcon} 
            text={
              <span className="flex items-center">
                Receipt builder
                <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-linear-blue-600 bg-linear-blue-100 rounded-full">Beta</span>
              </span>
            } 
            onClick={onClose} 
          />
          <SidebarItem
            icon={LanguageIcon}
            text="Translations"
            isOpen={isTranslationsOpen}
            onClick={() => setIsTranslationsOpen(!isTranslationsOpen)}
          >
            <SidebarSubItem to="/translations/flatten" icon={ArrowsPointingInIcon} text="Flatten" onClick={onClose} />
            <SidebarSubItem to="/translations/unflatten" icon={ArrowsPointingOutIcon} text="Unflatten" onClick={onClose} />
          </SidebarItem>
        </ul>
        <div className="p-4 border-t border-linear-gray-200 dark:border-linear-gray-700">
          <p className="text-sm text-linear-gray-600 dark:text-linear-gray-400 mb-2">{userEmail}</p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-linear-blue-500 text-white rounded hover:bg-linear-blue-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

const SidebarItem = ({ to, icon: Icon, text, children, isOpen, onClick }) => (
  <li>
    {to ? (
      <Link to={to} className="flex items-center px-4 py-2 text-linear-gray-700 hover:bg-linear-gray-100 dark:text-linear-gray-200 dark:hover:bg-linear-gray-700" onClick={onClick}>
        <Icon className="h-5 w-5 mr-2" />
        {text}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-2 text-linear-gray-700 hover:bg-linear-gray-100 dark:text-linear-gray-200 dark:hover:bg-linear-gray-700 flex items-center justify-between"
      >
        <span className="flex items-center">
          <Icon className="h-5 w-5 mr-2" />
          {text}
        </span>
        <ChevronDownIcon className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    )}
    {isOpen && children && <ul className="pl-4">{children}</ul>}
  </li>
);

const SidebarSubItem = ({ to, icon: Icon, text, onClick }) => (
  <li>
    <Link to={to} className="flex items-center px-4 py-2 text-linear-gray-600 hover:bg-linear-gray-100 dark:text-linear-gray-300 dark:hover:bg-linear-gray-700" onClick={onClick}>
      <Icon className="h-5 w-5 mr-2" />
      {text}
    </Link>
  </li>
);

export default Sidebar;

