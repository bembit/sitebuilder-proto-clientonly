// src/components/SettingsPanel.js
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { sections as defaultSections } from '../config/sectionsConfig';
import '../styles/UserInterface/SettingsPanel.css';
import useDebounce from '../utils/hooks';
import HistoryStepper from './HistoryStepper';

const fontOptions = [
  'Arial',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Playfair Display',
];

const SettingsPanel = () => {
  const {
    pageStructure,
    settings,
    sectionStyles,
    settingsConfig,
    handleChange,
    handleSectionColorChange,
    linkBackgroundColors,
    toggleLinkBackgroundColors,
    linkFontFamilies,
    toggleLinkFontFamilies,
  } = useContext(ThemeContext);

  const [showSettings, setShowSettings] = useState(true);

  // Extract dynamic sections from pageStructure
  const dynamicSections = pageStructure
    .filter(el => el.type === 'section' && !defaultSections.some(ds => ds.id === el.id))
    .map(el => ({ id: el.id, name: el.name }));

  // Combine static and dynamic sections
  const allSections = [...defaultSections, ...dynamicSections];

  const toggleSettings = () => setShowSettings(prev => !prev);

  // Fallback for sectionColors if undefined
  const sectionColors = settings.sectionColors || {};

  // Debounce handleChange with a 100ms delay
  const debouncedHandleChange = useDebounce((property, value) => {
    handleChange(property, value);
  }, 100);

  const debouncedHandleSectionColorChange = useDebounce((sectionId, color) => {
    handleSectionColorChange(sectionId, color);
  }, 100);

  return (
    <>
      <button
        onClick={toggleSettings}
        style={{ marginBottom: '10px', position: 'absolute', right: '0' }}
      >
        {showSettings ? 'Hide Page Settings ◀️' : 'Show Page Settings ▶️'}
      </button>

      <div className="user-settings">
        {showSettings && (
          <div className="settings-panel">
            <h3>Page / Section Settings</h3>

            {settingsConfig.map(setting => (
              <div key={setting.property}>
                <label>{setting.name}:</label>
                {setting.property === 'backgroundColor' ? (
                  <input
                    type="color"
                    value={settings[setting.property] || '#212121'}
                    onChange={e => debouncedHandleChange(setting.property, e.target.value)}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="range"
                      min={setting.min}
                      max={setting.max}
                      value={settings[setting.property] || setting.default || 0}
                      onChange={e => handleChange(setting.property, e.target.value)}
                      step={setting.step}
                    />
                    <span>{settings[setting.property]}{setting.step ? 'px' : ''}</span>
                  </div>
                )}
              </div>
            ))}

            <div>
              <label>
                Link All Background Colors:
                <input
                  type="checkbox"
                  checked={linkBackgroundColors}
                  onChange={toggleLinkBackgroundColors}
                />
              </label>
            </div>

            <h3>Section Colors</h3>
            {allSections.map(section => (
              <div key={section.id}>
                <label>{section.name} Background Color:</label>
                <input
                  type="color"
                  value={
                    sectionColors[section.id] ||
                    sectionStyles[section.id]?.backgroundColor ||
                    settings.backgroundColor ||
                    '#FFFFFF'
                  }
                  onChange={e => debouncedHandleSectionColorChange(section.id, e.target.value)}
                  disabled={linkBackgroundColors}
                />
              </div>
            ))}

            <div className="font-settings">
              <div>
                <label>
                  Link All Font Families:
                  <input
                    type="checkbox"
                    checked={linkFontFamilies}
                    onChange={toggleLinkFontFamilies}
                  />
                </label>
              </div>
              {linkFontFamilies && (
                <div>
                  <label>
                    Global Font Family:
                    <select
                      value={settings.fontFamily || 'Arial'}
                      onChange={e => handleChange('fontFamily', e.target.value)}
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </div>

            <HistoryStepper />
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsPanel;