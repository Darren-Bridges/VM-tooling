import React, { useState } from 'react';

function Flatten() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFlatten = () => {
    try {
      const inputObj = JSON.parse(input);
      const flattened = flattenObject(inputObj);
      const result = Object.entries(flattened).map(([key, value]) => {
        // Ensure the value is properly formatted, preserving the entire string
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Flatten JSON</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="10"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON to flatten"
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mb-4"
        onClick={handleFlatten}
      >
        Flatten
      </button>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Flattened Key-Value Pairs</h3>
          <div className="space-x-2">
            <button
              onClick={copyTranslations}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Copy translations
            </button>
          </div>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code className="text-sm">{output}</code>
        </pre>
      </div>
    </div>
  );
}

export default Flatten;