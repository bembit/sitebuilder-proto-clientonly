// src/components/CustomizationPanel/index.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import PanelContainer from './PanelContainer';
import AddElementPanel from './AddElementPanel';
import SectionCustomizationPanel from './SectionCustomizationPanel';
import ElementCustomizationPanel from './ElementCustomizationPanel';

const CustomizationPanel = ({ currentSection }) => {
  const {
    selectedElement,
    setSelectedElement,
    pageStructure,
    setPageStructureAndSettings,
    settings,
    setSettings,
    selectedSection,
    setSelectedSection,
    sectionStyles,
    setSectionStyles,
  } = useContext(ThemeContext);

  const addElement = (type) => {
    if (currentSection === 'hero' && type === 'image') {
      const existingImage = pageStructure.some(
        el => el.type === 'image' && el.section === 'hero'
      );
      if (existingImage) {
        alert("Hero section can only have one image.");
        return;
      }
    }

    const newId = `elem${Date.now()}`;
    const newElement = { id: newId, type, section: currentSection };
    const elementSettings =
      type === 'text'
        ? { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text' }
        : type === 'heading'
        ? { content: 'New Heading', fontSize: '32px', color: '#fff', type: 'heading', level: 'h1' }
        : type === 'button'
        ? { content: 'Learn more', fontSize: '20px', color: '#000', type: 'button', backgroundColor: '#fff' }
        : { src: 'https://placehold.co/600x400', type: 'image' };

    console.log('Adding element:', { type, id: newId, section: currentSection });
    setPageStructureAndSettings(
      prev => [...prev, newElement],
      prevSettings => ({ ...prevSettings, [newId]: elementSettings })
    );
  };

  const removeElement = () => {
    if (!selectedElement) return;
    setPageStructureAndSettings(
      prev => prev.filter(el => el.id !== selectedElement),
      prevSettings => {
        const updatedSettings = { ...prevSettings };
        delete updatedSettings[selectedElement];
        setSelectedElement(null);
        return updatedSettings;
      }
    );
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [selectedElement]: { ...prev[selectedElement], [key]: value }
    }));
  };

  const updateSectionStyle = (property, value) => {
    setSectionStyles(prev => ({
      ...prev,
      [selectedSection]: { ...prev[selectedSection], [property]: value }
    }));
  };

  const closePanel = () => {
    setSelectedElement(null);
    setSelectedSection(null);
  };

  if (selectedSection && !selectedElement) {
    return (
      <PanelContainer onClose={closePanel}>
        <SectionCustomizationPanel
          selectedSection={selectedSection}
          sectionStyles={sectionStyles}
          updateSectionStyle={updateSectionStyle}
        />
      </PanelContainer>
    );
  }

  if (!selectedElement) {
    return (
      <AddElementPanel
        currentSection={currentSection}
        addElement={addElement}
      />
    );
  }

  return (
    <PanelContainer onClose={closePanel}>
      <ElementCustomizationPanel
        elementSettings={settings[selectedElement]}
        updateSetting={updateSetting}
        removeElement={removeElement}
      />
    </PanelContainer>
  );
};

export default CustomizationPanel;