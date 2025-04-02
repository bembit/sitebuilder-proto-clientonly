// src/components/CustomizationPanel/properties/Dimensions.js
import React from 'react';

const Dimensions = ({ width, height, onChangeWidth, onChangeHeight }) => (
  <>
    <label>
      Width:
      <input
        type="text"
        value={width || '100%'}
        onChange={e => onChangeWidth(e.target.value)}
      />
    </label>
    <label>
      Height:
      <input
        type="text"
        value={height || '100%'}
        onChange={e => onChangeHeight(e.target.value)}
      />
    </label>
  </>
);

export default Dimensions;