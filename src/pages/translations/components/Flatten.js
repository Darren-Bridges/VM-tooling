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
    <div className="bg-white dark:bg-gray-800 min-h-[90vh] flex flex-col p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">Flatten JSON</h1>
        
        <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            This tool flattens nested JSON objects into key-value pairs, using '|' as a separator for nested keys.
          </p>
          <ol className="list-decimal list-inside">
            <li>Paste your nested JSON structure in the input box.</li>
            <li>Click the "Flatten" button to convert it to key-value pairs.</li>
            <li>The flattened result will appear in the preview section.</li>
            <li>Use the "Copy translations" button to copy the result to your clipboard.</li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-grow">
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">Input</h2>
            <button
              className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              onClick={handleFlatten}
            >
              Flatten
            </button>
          </div>
          <textarea
            className="w-full flex-grow p-2 md:p-4 border rounded text-sm md:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter JSON to flatten"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col mt-4 lg:mt-0">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">Preview</h2>
            <button
              onClick={copyTranslations}
              className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base bg-violet-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Copy translations
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

export default Flatten;