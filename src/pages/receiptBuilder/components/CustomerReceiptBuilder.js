import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AvailableFields from './AvailableFields';
import TemplateBuilder from './TemplateBuilder';
import ReceiptPreview from './ReceiptPreview';
import generateXML from '../utils/generateXML';
import availableFieldsData from '../utils/availableFieldsData';
import parseReceiptXML from '../utils/parseReceiptXML';

const CustomerReceiptTemplateBuilder = () => {
  const [availableFields] = useState(availableFieldsData);
  const [template, setTemplate] = useState([]);
  const [xmlInput, setXmlInput] = useState('');
  const dialogRef = useRef(null);
  const [importError, setImportError] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId.startsWith('available-fields-') && destination.droppableId === 'template-builder') {
      const sourceGroupIndex = parseInt(source.droppableId.split('-').pop());
      const fieldToAdd = availableFields[sourceGroupIndex].fields[source.index];
      const newField = { 
        ...fieldToAdd, 
        uniqueId: uuidv4(),
        alignment: 'left',
        size: '1:1' // Set default size to small
      };
      const newTemplate = Array.from(template);
      newTemplate.splice(destination.index, 0, newField);
      setTemplate(newTemplate);
    } else if (source.droppableId === 'template-builder' && destination.droppableId === 'template-builder') {
      const newTemplate = Array.from(template);
      const [reorderedItem] = newTemplate.splice(source.index, 1);
      newTemplate.splice(destination.index, 0, reorderedItem);
      setTemplate(newTemplate);
    } else if (source.droppableId === 'template-builder' && destination.droppableId.startsWith('available-fields-')) {
      const newTemplate = template.filter((_, index) => index !== source.index);
      setTemplate(newTemplate);
    }
  };

  const onFieldClick = (field) => {
    const newField = { 
      ...field, 
      uniqueId: uuidv4(),
      alignment: 'left',
      size: '1:1'
    };
    setTemplate([...template, newField]);
  };

  const toggleBold = (uniqueId) => {
    setTemplate(template.map(field => 
      field.uniqueId === uniqueId 
        ? { ...field, isBold: !field.isBold } 
        : field
    ));
  };

  const copyXML = () => {
    const xmlContent = generateXML(template);
    navigator.clipboard.writeText(xmlContent).then(() => {
      alert('XML template copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy XML: ', err);
    });
  };

  const setAlignment = (uniqueId, alignment) => {
    setTemplate(template.map(field => 
      field.uniqueId === uniqueId 
        ? { ...field, alignment } 
        : field
    ));
  };

  const setSize = (uniqueId, size) => {
    setTemplate(template.map(field => 
      field.uniqueId === uniqueId 
        ? { ...field, size } 
        : field
    ));
  };

  const removeField = (uniqueId) => {
    setTemplate(template.filter(field => field.uniqueId !== uniqueId));
  };

  const openImportDialog = () => {
    dialogRef.current.showModal();
  };

  const closeImportDialog = () => {
    dialogRef.current.close();
    setXmlInput('');
    setImportError('');
  };

  const importTemplate = () => {
    if (xmlInput.trim()) {
      try {
        const importedFields = parseReceiptXML(xmlInput);
        
        // Create a lookup object for field data
        const fieldDataLookup = availableFieldsData.flatMap(group => group.fields)
          .reduce((acc, field) => {
            acc[field.id] = field;
            return acc;
          }, {});

        // Map imported fields to template format, preserving order, alignment, bold, and size
        const newTemplate = importedFields
          .filter(field => fieldDataLookup[field.id]) // Only include fields we have data for
          .map(field => ({
            ...fieldDataLookup[field.id],
            uniqueId: uuidv4(),
            alignment: field.alignment,
            isBold: field.bold,
            size: field.size
          }));

        setTemplate(newTemplate);
        closeImportDialog();
        setImportError('');
      } catch (error) {
        console.error('Error parsing XML:', error);
        setImportError('Invalid XML format. Please check your input and try again.');
      }
    }
  };

  return (
    <div className="p-4 bg-linear-gray-100 dark:bg-linear-gray-900">
      <h1 className="text-2xl font-bold mb-2 text-linear-gray-800 dark:text-linear-gray-200 flex items-center">
        Receipt Builder
        <span className="ml-2 px-2 py-1 text-xs font-semibold text-linear-blue-600 bg-linear-blue-100 rounded-full">Beta</span>
      </h1>
      <p className="mb-4 text-sm text-linear-gray-600 dark:text-linear-gray-400">
        Drag and drop or click fields from the left panel to build your receipt template. The preview on the right will update as you add fields.
      </p>
      <div className="mb-4">
        <button
          onClick={openImportDialog}
          className="px-4 py-2 bg-linear-blue-500 text-white rounded cursor-pointer hover:bg-linear-blue-600"
        >
          Import Template
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          <AvailableFields fields={availableFields} onFieldClick={onFieldClick} />
          <TemplateBuilder 
            template={template} 
            toggleBold={toggleBold} 
            setAlignment={setAlignment}
            setSize={setSize}
            removeField={removeField}
          />
          <ReceiptPreview template={template} onCopyXML={copyXML} />
        </div>
      </DragDropContext>

      <dialog
        ref={dialogRef}
        className="p-6 rounded-lg shadow-xl bg-white dark:bg-linear-gray-800 text-linear-gray-800 dark:text-linear-gray-200 w-full max-w-2xl"
      >
        <h2 className="text-xl font-bold mb-4">Import XML Template</h2>
        <textarea
          value={xmlInput}
          onChange={(e) => setXmlInput(e.target.value)}
          className="w-full h-64 p-2 border border-linear-gray-300 dark:border-linear-gray-600 rounded mb-4 bg-linear-gray-50 dark:bg-linear-gray-700 text-linear-gray-800 dark:text-linear-gray-200"
          placeholder="Paste your XML template here..."
        />
        {importError && (
          <p className="text-red-500 mb-4">{importError}</p>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeImportDialog}
            className="px-4 py-2 bg-linear-gray-200 dark:bg-linear-gray-600 text-linear-gray-800 dark:text-linear-gray-200 rounded hover:bg-linear-gray-300 dark:hover:bg-linear-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={importTemplate}
            className="px-4 py-2 bg-linear-blue-500 text-white rounded hover:bg-linear-blue-600"
          >
            Import
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default CustomerReceiptTemplateBuilder;