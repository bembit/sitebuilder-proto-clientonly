// src/components/CustomizationPanel/properties/ColorPicker.js
import React from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ label, color, onChange }) => (
  <label>
    {label}:
    <HexColorPicker color={color || '#fff'} onChange={onChange} />
  </label>
);

export default ColorPicker;