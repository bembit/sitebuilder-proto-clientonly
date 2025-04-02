// src/components/CustomizationPanel/SectionCustomizationPanel.js
import React from 'react';
import BorderSettings from './properties/BorderSettings';
import Dimensions from './properties/Dimensions';
import Padding from './properties/Padding';

const SectionCustomizationPanel = ({ selectedSection, sectionStyles, updateSectionStyle }) => {
  const currentStyles = sectionStyles[selectedSection] || {};

  const updateBorderSetting = (key, value) => {
    updateSectionStyle(key, value);
  };

  return (
    <div>
      <h3>Customize {selectedSection} Container</h3>
      <label>
        Flex Direction:
        <select
          value={currentStyles.flexDirection || 'row'}
          onChange={(e) => updateSectionStyle('flexDirection', e.target.value)}
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </label>
      <label>
        Flex Wrap:
        <select
          value={currentStyles.flexWrap || 'nowrap'}
          onChange={(e) => updateSectionStyle('flexWrap', e.target.value)}
        >
          <option value="nowrap">No Wrap</option>
          <option value="wrap">Wrap</option>
        </select>
      </label>
      <label>
        Justify Content:
        <select
          value={currentStyles.justifyContent || 'flex-start'}
          onChange={(e) => updateSectionStyle('justifyContent', e.target.value)}
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
        </select>
      </label>
      <label>
        Align Items:
        <select
          value={currentStyles.alignItems || 'stretch'}
          onChange={(e) => updateSectionStyle('alignItems', e.target.value)}
        >
          <option value="stretch">Stretch</option>
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
        </select>
      </label>

      <label>
        Align Content:
        <select
          value={currentStyles.alignContent || 'stretch'}
          onChange={(e) => updateSectionStyle('alighContent', e.target.value)}
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
        </select>
      </label>

      <label>
        Flex-basis of child div:
        <input
          type="text"
          value={currentStyles.flexBasis || 'auto'}
          onChange={(e) => updateSectionStyle('flexBasis', e.target.value)}
        />
      </label>


      <Dimensions
        width={currentStyles.width || '100%'}
        height={currentStyles.height || '200px'}
        onChangeWidth={(value) => updateSectionStyle('width', value)}
        onChangeHeight={(value) => updateSectionStyle('height', value)}
      />
      <BorderSettings
        settings={currentStyles}
        updateSetting={updateBorderSetting}
      />

      <Padding 
        value={currentStyles.padding}
        onChange={value => updateSectionStyle('padding', value)}
      />

    </div>
  );
};

export default SectionCustomizationPanel;