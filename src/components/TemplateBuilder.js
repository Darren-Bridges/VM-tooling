import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const AlignmentButton = ({ alignment, currentAlignment, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 text-xs rounded ${
      currentAlignment === alignment || (!currentAlignment && alignment === 'left')
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
    }`}
  >
    {children}
  </button>
);

const SizeButton = ({ size, currentSize, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-2 py-1 text-xs rounded ${
      currentSize === size
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
    }`}
  >
    {children}
  </button>
);

const TemplateBuilder = ({ template, toggleBold, setAlignment, setSize, removeField }) => (
  <div className="w-2/5 bg-white dark:bg-gray-800 p-4">
    <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Template Builder</h2>
    <Droppable droppableId="template-builder" type="FIELD">
      {(provided) => (
        <div 
          {...provided.droppableProps} 
          ref={provided.innerRef} 
          className="min-h-[500px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 relative"
        >
          {template.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              <span className="absolute px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Drag fields here
              </span>
            </div>
          )}
          {template.map((field, index) => (
            <Draggable key={field.uniqueId} draggableId={field.uniqueId} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 mb-2 rounded ${
                    snapshot.isDragging ? 'opacity-50' : ''
                  } text-gray-800 dark:text-white`}
                >
                  <div className={field.isBold ? 'font-bold' : ''}>
                    {field.name}
                  </div>
                  <div className="flex items-center space-x-2">
                    {field.id !== 'separator-line' && field.id !== 'line-feed' && field.id !== 'store-logo' && (
                      <button
                        onClick={() => toggleBold(field.uniqueId)}
                        className={`px-2 py-1 text-xs rounded ${
                          field.isBold 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
                        }`}
                      >
                        B
                      </button>
                    )}
                    {field.id !== 'separator-line' && field.id !== 'line-feed' && field.id !== 'store-logo' && (
                      <div className="flex space-x-1">
                        <SizeButton
                          size="1:1"
                          currentSize={field.size}
                          onClick={() => setSize(field.uniqueId, '1:1')}
                        >
                          S
                        </SizeButton>
                        <SizeButton
                          size="2:2"
                          currentSize={field.size}
                          onClick={() => setSize(field.uniqueId, '2:2')}
                        >
                          L
                        </SizeButton>
                      </div>
                    )}
                    {field.id !== 'separator-line' && field.id !== 'line-feed' && (
                      <div className="flex space-x-1">
                        <AlignmentButton
                          alignment="left"
                          currentAlignment={field.alignment}
                          onClick={() => setAlignment(field.uniqueId, 'left')}
                        >
                          ←
                        </AlignmentButton>
                        <AlignmentButton
                          alignment="center"
                          currentAlignment={field.alignment}
                          onClick={() => setAlignment(field.uniqueId, 'center')}
                        >
                          ↔
                        </AlignmentButton>
                        <AlignmentButton
                          alignment="right"
                          currentAlignment={field.alignment}
                          onClick={() => setAlignment(field.uniqueId, 'right')}
                        >
                          →
                        </AlignmentButton>
                      </div>
                    )}
                    <div className="text-gray-300 dark:text-gray-600">|</div>
                    <button
                      onClick={() => removeField(field.uniqueId)}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default TemplateBuilder;