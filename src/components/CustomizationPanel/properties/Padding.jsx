// src/components/CustomizationPanel/properties/Padding.js
import React from 'react';

const Padding = ({ value, onChange }) => (
  <label>
    Padding:
    <input
      type="text"
      value={value || '0px 0px'}
      onChange={e => onChange(e.target.value)}
    />
  </label>
);

export default Padding;