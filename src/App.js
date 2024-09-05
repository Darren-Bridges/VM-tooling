import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Flatten from './components/Flatten';
import Unflatten from './components/Unflatten';
import CustomerReceiptTemplateBuilder from './components/CustomerReceiptBuilder';
import NewTenantCreationWizard from './components/NewTenantCreationWizard';
import Login from './components/Login';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Check for both tokens in local storage
    const refreshToken = localStorage.getItem('refresh-token');
    const accessToken = localStorage.getItem('access-token');
    if (refreshToken && accessToken) {
      setIsLoggedIn(true);
      // You might want to fetch the user email here if it's not stored in local storage
      // For now, we'll set a placeholder email
      setUserEmail('user@example.com');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('access-token');
    localStorage.removeItem('selected-environment');
  };

  return (
    <div>
      <Router>
        {isLoggedIn ? (
          <Layout userEmail={userEmail} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/translations/flatten" element={<Flatten />} />
              <Route path="/translations/unflatten" element={<Unflatten />} />
              <Route path="/customer-receipt-template-builder" element={<CustomerReceiptTemplateBuilder />} />
              <Route path="/new-tenant-creation-wizard" element={<NewTenantCreationWizard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          </Routes>
        )}
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
