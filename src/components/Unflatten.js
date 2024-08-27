import React, { useState } from 'react';

function Unflatten() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleUnflatten = () => {
    try {
      const pairs = input.split('\n').map(line => {
        const [key, ...valueParts] = line.split('\t');
        const value = valueParts.join('\t').trim();
        return [key.trim(), value];
      });

      const unflattened = unflattenObject(Object.fromEntries(pairs));
      setOutput(JSON.stringify(unflattened, null, 2));
    } catch (error) {
      setOutput('Error: Invalid input format');
    }
  };

  const unflattenObject = (obj, delimiter = '|') => {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      const keys = key.split(delimiter);
      let current = result;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = value;
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      }
    }

    return result;
  };

  const copyJson = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Unflatten Key-Value Pairs</h2>
      <textarea
        className="w-full p-2 border rounded mb-4 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        rows="8"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter key-value pairs (tab separated) to unflatten"
      />
      <button
        className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mb-4"
        onClick={handleUnflatten}
      >
        Unflatten
      </button>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 md:mb-0">Unflattened JSON</h3>
          <button
            onClick={copyJson}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Copy JSON
          </button>
        </div>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 md:p-4 rounded-md overflow-x-auto text-xs md:text-sm">
          <code className="text-gray-800 dark:text-gray-200">{output}</code>
        </pre>
      </div>
    </div>
  );
}

export default Unflatten;