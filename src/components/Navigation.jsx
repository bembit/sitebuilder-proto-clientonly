// src/components/Navigation.jsx
import React, { useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { sections as defaultSections } from '../config/sectionsConfig';
import { ThemeContext } from '../contexts/ThemeContext';
import { IndexedDBStats } from './IndexedDBStats';
import ConfirmationDialog from './ConfirmationDialog';
import SettingsPanel from './SettingsPanel';
import '../styles/UserInterface/Navigation.css';

const ItemTypes = {
  SECTION: 'SECTION',
};

// Subcomponent: SectionItem (Draggable Section)
const SectionItem = ({ section, index, moveSection, handleDeleteSection }) => {
  const isStatic = defaultSections.some(s => s.id === section.id);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SECTION,
    item: { id: section.id, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: item => {
      if (item.id !== section.id) {
        moveSection(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={node => drag(drop(node))}
      className="section-item"
      style={{
        margin: '4px 0',
        backgroundColor: '#151515',
        border: '1px solid #ddd',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px',
      }}
    >
      <span>{section.name}</span>
      {!isStatic && (
        <button
          onClick={() => handleDeleteSection(section.id)}
          style={{ margin: '0', padding: '2px', fontSize: '12px', color: 'red', background: 'transparent', border: 'none' }}
        >
          Delete
        </button>
      )}
      <button
        style={{ margin: '0', padding: '2px', fontSize: '12px', color: 'green', border: '1px solid green', background: 'transparent' }}
      >
        Drag to reorder
      </button>
    </div>
  );
};

// Subcomponent: TemplateDropdown
const TemplateDropdown = ({ templates, onChange, isDefault = false, placeholder }) => (
  <div className="template-dropdown">
    <select onChange={onChange} defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {templates.map((template, index) => (
        <option key={isDefault ? `default-${index}` : template.id} value={isDefault ? `default-${index}` : template.id}>
          {template.name}
        </option>
      ))}
    </select>
  </div>
);

// Subcomponent: SectionList
const SectionList = ({ sections, currentSection, setCurrentSection, moveSection, handleDeleteSection }) => (
  <div className="section-list">
    <h3>Sections</h3>
    <select
      value={currentSection}
      onChange={e => setCurrentSection(e.target.value)}
      style={{ width: '100%' }}
    >
      {sections.map(section => (
        <option key={section.id} value={section.id}>
          {section.name}
        </option>
      ))}
    </select>
    {sections.map((section, index) => (
      <SectionItem
        key={section.id}
        section={section}
        index={index}
        moveSection={moveSection}
        handleDeleteSection={handleDeleteSection}
      />
    ))}
  </div>
);

// Subcomponent: BinList
const BinList = ({ binItems, handleRestoreFromBin }) => (
  <div className="bin-management">
    <h3>Recycle Bin</h3>
    {binItems.length > 0 ? (
      binItems.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span style={{ flex: 1 }}>
            {item.type === 'template' ? item.data.name : item.data.name} ({item.type}) - Deleted: {new Date(item.deletedAt).toLocaleString()}
          </span>
          <button
            onClick={() => handleRestoreFromBin(item.id)}
            style={{ padding: '2px 5px', color: 'green', border: 'none', background: 'transparent' }}
          >
            Restore
          </button>
        </div>
      ))
    ) : (
      <p>No items in bin</p>
    )}
  </div>
);

// Main Navigation Component
const Navigation = ({ currentSection, setCurrentSection }) => {
  const {
    pageStructure, setPageStructure,
    sectionOrder, setSectionOrder,
    settings, setSettings,
    sectionStyles, setSectionStyles,
    highlightSections, setHighlightSections,
    userTemplates, saveTemplate, loadTemplate, resetTemplate, renameTemplate, deleteTemplate,
    defaultTemplates, binItems, deleteSection, restoreFromBin,
    undo, redo, history, historyIndex,
    settingsConfig, handleChange, handleSectionColorChange,
    linkBackgroundColors, toggleLinkBackgroundColors,
    linkFontFamilies, toggleLinkFontFamilies,
  } = useContext(ThemeContext);

  const [newSectionName, setNewSectionName] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [editTemplateId, setEditTemplateId] = useState(null);
  const [editTemplateName, setEditTemplateName] = useState('');
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showTemplatesStatic, setShowTemplatesStatic] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Extract dynamic sections from pageStructure
  const dynamicSections = pageStructure
    .filter(el => el.type === 'section' && !defaultSections.some(ds => ds.id === el.id))
    .map(el => ({ id: el.id, name: el.name }));

  // Combine static and dynamic sections
  const allSections = sectionOrder.map(sectionId => {
    const staticSection = defaultSections.find(s => s.id === sectionId);
    const dynamicSection = dynamicSections.find(s => s.id === sectionId);
    return staticSection || dynamicSection;
  }).filter(Boolean);

  // Navigation buttons for switching sections
  const sectionIds = allSections.map(s => s.id);
  const currentIndex = sectionIds.indexOf(currentSection);

  const handlePrev = () => setCurrentSection(sectionIds[(currentIndex - 1 + sectionIds.length) % sectionIds.length]);
  const handleNext = () => setCurrentSection(sectionIds[(currentIndex + 1) % sectionIds.length]);

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    const newId = `section-${Date.now()}`;
    const newSection = { id: newId, name: newSectionName, type: 'section' };
    setPageStructure(prev => [...prev, newSection]);
    setSectionOrder(prev => [...prev, newId]);
    setSectionStyles(prev => ({
      ...prev,
      [newId]: { backgroundColor: settings.backgroundColor || '#ffffff' },
    }));
    setSettings(prev => ({
      ...prev,
      sectionColors: { ...prev.sectionColors, [newId]: settings.backgroundColor || '#ffffff' },
    }));
    setNewSectionName('');
    setCurrentSection(newId);
  };

  const handleDeleteSection = sectionId => {
    if (defaultSections.some(s => s.id === sectionId)) {
      alert('Cannot delete default sections.');
      return;
    }
    const section = allSections.find(s => s.id === sectionId);
    const sectionName = section ? section.name : sectionId;
    setDialog({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to move "${sectionName}" to the bin? It will be recoverable for 2 days.`,
      onConfirm: async () => {
        await deleteSection(sectionId);
        if (currentSection === sectionId) setCurrentSection(sectionIds[0] || 'hero');
        setDialog({ isOpen: false });
      },
    });
  };

  const moveSection = (fromIndex, toIndex) => {
    const reorderedIds = [...sectionOrder];
    const [movedId] = reorderedIds.splice(fromIndex, 1);
    reorderedIds.splice(toIndex, 0, movedId);
    setSectionOrder(reorderedIds);
  };

  const toggleHighlight = () => setHighlightSections(prev => !prev);
  const toggleTemplates = () => setShowTemplates(prev => !prev);
  const toggleTemplatesStatic = () => setShowTemplatesStatic(prev => !prev);

  const toggleSidebar = () => setShowSidebar(prev => !prev);

  // Template management
  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please enter a template name.');
      return;
    }
    await saveTemplate(templateName);
    setTemplateName('');
  };

  const handleLoadDefaultTemplate = e => {
    const selectedId = e.target.value;
    if (selectedId) loadTemplate(selectedId, true);
  };

  const handleLoadUserTemplate = e => {
    const selectedId = e.target.value;
    if (selectedId) loadTemplate(selectedId, false);
  };

  const handleEditTemplate = template => {
    setEditTemplateId(template.id);
    setEditTemplateName(template.name);
  };

  const handleSaveEdit = async () => {
    if (!editTemplateName.trim()) {
      alert('Template name cannot be empty.');
      return;
    }
    setDialog({
      isOpen: true,
      title: 'Confirm Rename',
      message: `Are you sure you want to rename "${userTemplates.find(t => t.id === editTemplateId).name}" to "${editTemplateName}"?`,
      onConfirm: async () => {
        await renameTemplate(editTemplateId, editTemplateName);
        setEditTemplateId(null);
        setEditTemplateName('');
        setDialog({ isOpen: false });
      },
    });
  };

  const handleDeleteTemplate = id => {
    const template = userTemplates.find(t => t.id === id);
    setDialog({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to move "${template.name}" to the bin? It will be recoverable for 10 days.`,
      onConfirm: async () => {
        await deleteTemplate(id);
        setDialog({ isOpen: false });
      },
    });
  };

  const handleRestoreFromBin = id => {
    setDialog({
      isOpen: true,
      title: 'Confirm Restore',
      message: 'Are you sure you want to restore this item?',
      onConfirm: async () => {
        await restoreFromBin(id);
        setDialog({ isOpen: false });
      },
    });
  };

  const cancelEdit = () => {
    setEditTemplateId(null);
    setEditTemplateName('');
  };

  const closeDialog = () => setDialog({ isOpen: false });

  return (
    <div className="user-nav" style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div
        className="user-header"
        style={{
          position: showTemplatesStatic ? 'fixed' : 'initial',
          width: '100%',
          maxWidth: '1280px',
          top: showTemplatesStatic ? '0' : 'auto',
          zIndex: showTemplatesStatic ? 100000 : 0,
          alignSelf: 'center',
        }}
      >
        <SettingsPanel
          settings={settings}
          settingsConfig={settingsConfig}
          handleChange={handleChange}
          handleSectionColorChange={handleSectionColorChange}
          linkBackgroundColors={linkBackgroundColors}
          toggleLinkBackgroundColors={toggleLinkBackgroundColors}
          linkFontFamilies={linkFontFamilies}
          toggleLinkFontFamilies={toggleLinkFontFamilies}
        />

        <button onClick={toggleSidebar} style={{ marginBottom: '20px' }}>
          {showSidebar ? 'Hide Section ▶️' : 'Show Section ◀️'}
        </button>

        {showSidebar && (
          <div className="sidebar">
            <div className="section-controls">
              <h3>Section Settings</h3>
              <button onClick={toggleHighlight}>
                {highlightSections ? 'Disable Highlight' : 'Enable Highlight'}
              </button>
              <h3>Select Section</h3>
              <button onClick={handlePrev}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>

            <div className="undo-redo">
              <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>
            </div>

            <div className="add-section-container">
              <input
                type="text"
                value={newSectionName}
                onChange={e => setNewSectionName(e.target.value)}
                placeholder="New Section Name"
                style={{ width: '100%', marginBottom: '5px' }}
              />
              <button onClick={handleAddSection} style={{ width: '100%' }}>Add Section</button>
            </div>

            <SectionList
              sections={allSections}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              moveSection={moveSection}
              handleDeleteSection={handleDeleteSection}
            />
          </div>
        )}

        <button
          onClick={toggleTemplates}
          style={{
            marginBottom: '20px',
            boxShadow: showTemplates ? '2px 2px 5px 3px rgba(255, 0, 140, 0.5)' : 'none',
          }}
        >
          {showTemplates ? 'Hide Options 🔼' : 'Show Options 🔽'}
        </button>

        <div className="template-toggle" style={{ maxWidth: '1280px', width: '100%' }}>
          {showTemplates && (
            <div
              className="template-management"
              style={{
                position: showTemplatesStatic ? 'absolute' : 'initial',
                top: '35px',
                maxWidth: '1280px',
                width: '100%',
              }}
            >
              <div className="template-management-section">
                <div className="general-info">
                  <h3>`Alt`: Hide interface</h3>
                  <h3>Most items are drag-and-droppable.</h3>
                  <button onClick={toggleTemplatesStatic}>
                    {showTemplatesStatic ? 'Turn off static nav' : 'Turn on sticky nav'}
                  </button>
                </div>

                <div className="template-save">
                  <h3>Save or Reset Template:</h3>
                  <input
                    type="text"
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    placeholder="Template Name"
                    style={{ marginRight: '10px' }}
                  />
                  <button onClick={handleSaveTemplate}>Save</button>
                  <button onClick={resetTemplate} style={{ marginLeft: '10px' }}>Reset</button>
                </div>
              </div>

              <div className="template-management-section">
                <h3>Load Templates:</h3>
                <TemplateDropdown
                  templates={userTemplates}
                  onChange={handleLoadUserTemplate}
                  placeholder={userTemplates.length > 0 ? 'My saved templates' : 'No templates saved'}
                />
                <TemplateDropdown
                  templates={defaultTemplates}
                  onChange={handleLoadDefaultTemplate}
                  isDefault={true}
                  placeholder="Use a default template"
                />
              </div>

              <div className="template-management-section">
                <div className="template-edit" style={{ marginTop: '15px' }}>
                  <h3>Manage Templates:</h3>
                  {userTemplates.map(template => (
                    <div key={template.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      {editTemplateId === template.id ? (
                        <>
                          <input
                            type="text"
                            value={editTemplateName}
                            onChange={e => setEditTemplateName(e.target.value)}
                            style={{ marginRight: '10px', flex: 1 }}
                          />
                          <button onClick={handleSaveEdit} style={{ marginRight: '5px' }}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <span style={{ flex: 1 }}>{template.name}</span>
                          <button onClick={() => handleEditTemplate(template)} style={{ marginRight: '5px' }}>Edit</button>
                          <button onClick={() => handleDeleteTemplate(template.id)} style={{ color: 'red' }}>Delete</button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <BinList binItems={binItems} handleRestoreFromBin={handleRestoreFromBin} />
                <IndexedDBStats />
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        onConfirm={dialog.onConfirm || closeDialog}
        onCancel={closeDialog}
      />
    </div>
  );
};

export default Navigation;