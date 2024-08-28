import React from 'react';

const ReceiptPreview = ({ template, onCopyXML }) => {
  const fieldsWithoutNames = [
    'store-name',
    'store-address',
    'order-number',
    'order-source',
    'order-items',
    'order-accessories',
    'store-vat-number',
    'order-type',
    'grouped-deals-and-bundles'
  ];

  const getAlignmentClass = (alignment) => {
    switch(alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getSizeClass = (size) => {
    switch(size) {
      case '2:2': return 'text-lg font-semibold';
      default: return 'text-sm';
    }
  };

  return (
    <div className="w-2/5 bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Receipt Preview</h2>
        <button 
          onClick={onCopyXML}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Copy XML
        </button>
      </div>
      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden receipt-preview w-full">
        <div className="p-4 space-y-2" style={{ fontFamily: 'Courier, monospace' }}>
          {template.map((field, index) => {
            const alignmentClass = getAlignmentClass(field.alignment);
            const sizeClass = getSizeClass(field.size);
            switch(field.id) {
              case 'store-logo':
                return <div key={index} className={`text-gray-800 dark:text-white ${alignmentClass} ${sizeClass}`}>[Store Logo]</div>;
              case 'separator-line':
                return <div key={index} className="border-t border-gray-300 dark:border-gray-500 my-2"></div>;
              case 'line-feed':
                return <div key={index} className="h-2"></div>;
              case 'grouped-deals-and-bundles':
                return (
                  <div key={index} className={`text-gray-800 dark:text-gray-200 ${field.isBold ? 'font-bold' : ''} ${sizeClass}`}>
                    {field.placeholder.split('\n').map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{item.split(' + ')[0]}</span>
                        <span>{item.split(' + ')[1]}</span>
                      </div>
                    ))}
                  </div>
                );
              case 'order-accessories':
                return (
                  <div key={index} className={`text-gray-800 dark:text-gray-200 ${field.isBold ? 'font-bold' : ''} ${alignmentClass} ${sizeClass}`}>
                    {field.placeholder.split('\n').map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                );
              default:
                return (
                  <div key={index} className={`flex ${alignmentClass} text-gray-800 dark:text-gray-200 ${field.isBold ? 'font-bold' : ''} ${sizeClass}`}>
                    {fieldsWithoutNames.includes(field.id) ? (
                      <span className="w-full">{field.placeholder}</span>
                    ) : field.id === 'order-note' || field.id === 'table-number' || field.id === 'order-datetime' || field.id === 'customer-name' || field.id === 'delivery-address' || field.id === 'delivery-instructions' ? (
                      <span className="w-full">
                        <span className="font-semibold">{field.name}: </span>
                        <span>{field.placeholder}</span>
                      </span>
                    ) : (
                      <>
                        <span className="flex-1 font-semibold">{field.name}:</span>
                        <span className="flex-1 text-right">{field.placeholder}</span>
                      </>
                    )}
                  </div>
                );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;

