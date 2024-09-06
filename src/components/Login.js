import React, { useState } from 'react';

const Login = ({ onLogin, darkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [environment, setEnvironment] = useState('feature-branch');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const baseUrls = {
      'feature-branch': 'https://pos2-next.vmos-qa.com/',
      'demo': 'https://vmos2.vmos-demo.com/',
      'live': 'https://vmos2.vmos.io/'
    };

    const baseUrl = baseUrls[environment];

    try {
      const response = await fetch(`${baseUrl}user/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Save the refresh token and access token to local storage
        localStorage.setItem('refresh-token', data.payload.token.refresh);
        localStorage.setItem('access-token', data.payload.token.value);
        localStorage.setItem('email', data.payload.user.email);
        
        // Save the selected environment to local storage
        localStorage.setItem('selected-environment', environment);
        
        // Call onLogin with the user's email
        onLogin(data.payload.user.email);
      } else {
        console.log('Authentication failed:', data);
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in
          </h2>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            {darkMode ? '🌙' : '🌞'}
          </button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="environment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Environment
              </label>
              <select
                id="environment"
                name="environment"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-linear-blue-500 focus:border-linear-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              >
                <option value="feature-branch">Feature Branch</option>
                <option value="demo">Demo</option>
                <option value="live">Live</option>
              </select>
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-linear-blue-500 focus:border-linear-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-linear-blue-500 focus:border-linear-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-linear-blue-500 hover:bg-linear-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linear-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
