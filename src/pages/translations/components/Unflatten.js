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
    <div className="bg-white dark:bg-gray-800 min-h-[90vh] flex flex-col p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">Unflatten Key-Value Pairs</h1>
        
        <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            This tool unflattens key-value pairs into a nested JSON object, using '|' as a separator for nested keys.
          </p>
          <ol className="list-decimal list-inside">
            <li>Paste your flattened key-value pairs in the input box (one pair per line, tab-separated).</li>
            <li>Click the "Unflatten" button to convert it back to a nested JSON structure.</li>
            <li>The unflattened result will appear in the preview section.</li>
            <li>Use the "Copy JSON" button to copy the result to your clipboard.</li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-grow">
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">Input</h2>
            <button
              className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              onClick={handleUnflatten}
            >
              Unflatten
            </button>
          </div>
          <textarea
            className="w-full flex-grow p-2 md:p-4 border rounded text-sm md:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter key-value pairs (tab separated) to unflatten"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col mt-4 lg:mt-0">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">Preview</h2>
            <button
              onClick={copyJson}
              className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-violet-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Copy JSON
            </button>
          </div>
          <div className="overflow-x-auto">
            <pre className="bg-gray-100 dark:bg-gray-700 p-2 md:p-4 rounded-md text-xs md:text-sm flex-grow whitespace-pre-wrap">
              <code className="text-gray-800 dark:text-gray-200">{output}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unflatten;