import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Welcome to VM Tooling</h1>
      <p className="text-gray-600 dark:text-gray-300">Choose an operation from the navigation menu.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => navigate('/translations/flatten')}
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Flatten</h2>
          <p className="text-gray-600 dark:text-gray-400">Convert nested JSON structures into flat key-value pairs.</p>
        </div>
        <div 
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => navigate('/translations/unflatten')}
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Unflatten</h2>
          <p className="text-gray-600 dark:text-gray-400">Convert flat key-value pairs back into nested JSON structures.</p>
        </div>
        <div 
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => navigate('/customer-receipt-template-builder')}
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Customer Receipt Template Builder</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and customize receipt templates for customer transactions.</p>
        </div>
        <div 
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => navigate('/new-tenant-creation-wizard')}
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">NTCW</h2>
          <p className="text-gray-600 dark:text-gray-400">New Tenant Creation Wizard for streamlined tenant setup.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
