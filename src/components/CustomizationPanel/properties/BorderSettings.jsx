// src/components/CustomizationPanel/properties/BorderSettings.js
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const BorderSettings = ({ settings, updateSetting }) => {
  const [showBorderSettings, setShowBorderSettings] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowBorderSettings(prev => !prev)}
        style={{
          marginBottom: '10px',
          padding: '5px 10px',
          cursor: 'pointer',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {showBorderSettings ? 'Hide Border Settings' : 'Show Border Settings'}
      </button>
      {showBorderSettings && (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <label>
            Border Width:
            <input
              type="text"
              value={settings.borderWidth || '0px'}
              onChange={e => updateSetting('borderWidth', e.target.value)}
              placeholder="e.g., 2px"
            />
          </label>
          <label>
            Border Style:
            <select
              value={settings.borderStyle || 'none'}
              onChange={e => updateSetting('borderStyle', e.target.value)}
            >
              <option value="none">None</option>
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
            </select>
          </label>
          <label>
            Border Color:
            <HexColorPicker
              color={settings.borderColor || '#000000'}
              onChange={color => updateSetting('borderColor', color)}
            />
          </label>
          <label>
            Border Radius:
            <input
              type="text"
              value={settings.borderRadius || '0px'}
              onChange={e => updateSetting('borderRadius', e.target.value)}
              placeholder="e.g., 5px"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default BorderSettings;