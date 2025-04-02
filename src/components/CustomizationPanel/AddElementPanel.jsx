// src/components/CustomizationPanel/AddElementPanel.js
import React from 'react';

const AddElementPanel = ({ currentSection, addElement }) => (
  <div className="add-elements-container">
    <h3>Add Element to {currentSection}</h3>
    <button onClick={() => addElement('text')}>Add Text</button>
    <button onClick={() => addElement('image')}>Add Image</button>
    <button onClick={() => addElement('heading')}>Add Heading</button>
    <button onClick={() => addElement('button')}>Add Button</button>
  </div>
);

export default AddElementPanel;