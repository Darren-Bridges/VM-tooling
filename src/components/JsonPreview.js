import React from 'react';

const JsonPreview = ({ json }) => {
  const copyJson = () => {
    navigator.clipboard.writeText(json);
  };

  const copyCsv = () => {
    // Implement CSV conversion and copying logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Unflattened JSON Preview</h2>
        <div className="space-x-2">
          <button
            onClick={copyJson}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Copy JSON
          </button>
          <button
            onClick={copyCsv}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Copy CSV
          </button>
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        <code className="text-sm">{json}</code>
      </pre>
    </div>
  );
};

export default JsonPreview;
