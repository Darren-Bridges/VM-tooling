import React, { useState } from 'react';

function Flatten() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFlatten = () => {
    try {
      const inputObj = JSON.parse(input);
      const flattened = flattenObject(inputObj);
      const result = Object.entries(flattened).map(([key, value]) => {
        const formattedValue = typeof value === 'string' ? value : JSON.stringify(value);
        return `${key}\t${formattedValue}`;
      });
      setOutput(result.join('\n'));
    } catch (error) {
      if (error instanceof SyntaxError) {
        setOutput(`Error: Invalid JSON input - ${error.message}`);
      } else {
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + '|' : '';
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  const copyTranslations = () => {
    const translationsForSheet = output
      .split('\n')
      .map(line => {
        const [key, value] = line.split('\t');
        return `${key}\t${value}`;
      })
      .join('\n');
    navigator.clipboard.writeText(translationsForSheet);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Flatten JSON</h2>
      <textarea
        className="w-full p-2 border rounded mb-4 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        rows="8"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON to flatten"
      />
      <button
        className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mb-4"
        onClick={handleFlatten}
      >
        Flatten
      </button>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 md:mb-0">Flattened Key-Value Pairs</h3>
          <button
            onClick={copyTranslations}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Copy translations
          </button>
        </div>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm">
          <code className="text-gray-800 dark:text-gray-200">{output}</code>
        </pre>
      </div>
    </div>
  );
}

export default Flatten;