// src/components/CustomizationPanel/PanelContainer.js
import React from 'react';

const PanelContainer = ({ children, onClose }) => (
  <div className="add-elements-container">
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        background: 'red',
        color: 'white',
        border: 'none',
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      ✖ Close
    </button>
    {children}
  </div>
);

export default PanelContainer;