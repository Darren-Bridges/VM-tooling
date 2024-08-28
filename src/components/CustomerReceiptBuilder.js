import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AvailableFields from './AvailableFields';
import TemplateBuilder from './TemplateBuilder';
import ReceiptPreview from './ReceiptPreview';
import generateXML from './generateXML';
import availableFieldsData from './availableFieldsData';

const CustomerReceiptTemplateBuilder = () => {
  const [availableFields] = useState(availableFieldsData);
  const [template, setTemplate] = useState([]);

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

  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Customer Receipt Builder</h1>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Drag and drop or click fields from the left panel to build your receipt template. The preview on the right will update as you add fields.
      </p>
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
    </div>
  );
};

export default CustomerReceiptTemplateBuilder;