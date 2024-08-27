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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Unflatten Key-Value Pairs</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="10"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter key-value pairs (tab separated) to unflatten"
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mb-4"
        onClick={handleUnflatten}
      >
        Unflatten
      </button>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Unflattened JSON</h3>
          <button
            onClick={copyJson}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Copy JSON
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <code className="text-sm">{output}</code>
        </pre>
      </div>
    </div>
  );
}

export default Unflatten;