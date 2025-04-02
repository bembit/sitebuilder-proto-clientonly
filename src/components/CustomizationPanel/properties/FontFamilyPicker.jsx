// src/components/CustomizationPanel/properties/FontFamilyPicker.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

const fontOptions = [
  'Arial',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Playfair Display',
];

const FontFamilyPicker = ({ value, onChange, disabled }) => {
  const { settings, linkFontFamilies } = useContext(ThemeContext);
  const fontValue = linkFontFamilies ? settings.fontFamily : value || 'Arial';

  return (
    <label>
      Font Family:
      <select
        value={fontValue}
        onChange={e => onChange(e.target.value)}
        disabled={disabled || linkFontFamilies}
      >
        {fontOptions.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
    </label>
  );
};

export default FontFamilyPicker;