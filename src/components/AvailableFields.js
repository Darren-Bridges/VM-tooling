import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const FieldGroup = ({ group, groupIndex, onFieldClick, isExpanded }) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className="mb-6">
      <button
        className="w-full text-left font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '▼' : '▶'} {group.groupName}
      </button>
      {isOpen && (
        <Droppable droppableId={`available-fields-${groupIndex}`} type="FIELD">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="pl-4 mt-3">
              {group.fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => onFieldClick(field, groupIndex)}
                      className={`bg-white dark:bg-gray-700 p-2 mb-2 rounded shadow ${
                        snapshot.isDragging ? 'opacity-50' : ''
                      } text-gray-800 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                    >
                      {field.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

const AvailableFields = ({ fields, onFieldClick }) => {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <div className="w-1/5 bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Available Fields</h2>
        <button
          onClick={toggleExpandAll}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      {fields.map((group, index) => (
        <FieldGroup 
          key={group.groupName} 
          group={group} 
          groupIndex={index} 
          onFieldClick={onFieldClick}
          isExpanded={expandAll}
        />
      ))}
    </div>
  );
};

export default AvailableFields;
