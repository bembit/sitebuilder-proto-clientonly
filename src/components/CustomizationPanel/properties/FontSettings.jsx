// src/components/CustomizationPanel/properties/FontSettings.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import FontFamilyPicker from './FontFamilyPicker';

const FontSettings = ({ settings, updateSetting }) => {
  const { linkFontFamilies } = useContext(ThemeContext);
  const fontSizeDefault = {
    heading: 32,
    button: 16,
    text: 20,
  }[settings.type] || 16;

  return (
    <>
      <FontFamilyPicker
        value={settings.fontFamily}
        onChange={value => updateSetting('fontFamily', value)}
        disabled={linkFontFamilies}
      />
      <label>
        Font Size:
        <input
          type="number"
          value={parseInt(settings.fontSize) || fontSizeDefault}
          onChange={e => updateSetting('fontSize', `${e.target.value}px`)}
        />
      </label>
      <label>
        Bold:
        <input
          type="checkbox"
          checked={settings.fontWeight === 'bold'}
          onChange={e => updateSetting('fontWeight', e.target.checked ? 'bold' : 'normal')}
        />
      </label>
      <label>
        Italic:
        <input
          type="checkbox"
          checked={settings.fontStyle === 'italic'}
          onChange={e => updateSetting('fontStyle', e.target.checked ? 'italic' : 'normal')}
        />
      </label>
    </>
  );
};

export default FontSettings;