// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { sections as defaultSections } from '../config/sectionsConfig';
import { defaultTemplates } from '../config/defaultTemplates';
import { settingsConfig } from '../config/settingsConfig';
import db from '../db';

export const ThemeContext = createContext();

const defaultState = {
  pageStructure: [],
  sectionOrder: defaultSections.map(s => s.id),
  settings: {
    pageContentWidth: '1280',
    backgroundColor: '#212121',
    padding: '0',
    marginTop: '20',
    sectionBorderRadius: '0',
    imagePadding: '0',
    imageBorderRadius: '0',
    sectionColors: defaultSections.reduce((acc, section) => ({
      ...acc,
      [section.id]: '#0b0b0b',
    }), {}),
    fontFamily: 'Arial',
  },
  sectionStyles: {},
  highlightSections: true,
  linkBackgroundColors: false,
  linkFontFamilies: false,
};

export const ThemeProvider = ({ children, siteSettings: initialSiteSettings, maxHistory = 250 }) => {
  // State declarations
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isUndoingRedoing, setIsUndoingRedoing] = useState(false);

  const [pageStructure, setPageStructureState] = useState(defaultState.pageStructure);
  const [sectionOrder, setSectionOrderState] = useState(defaultState.sectionOrder);
  const [settings, setSettingsState] = useState(defaultState.settings);
  const [sectionStyles, setSectionStylesState] = useState(defaultState.sectionStyles);
  const [highlightSections, setHighlightSectionsState] = useState(defaultState.highlightSections);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [userTemplates, setUserTemplates] = useState([]);
  const [binItems, setBinItems] = useState([]);
  const [linkBackgroundColors, setLinkBackgroundColors] = useState(defaultState.linkBackgroundColors);
  const [linkFontFamilies, setLinkFontFamilies] = useState(defaultState.linkFontFamilies);

  const siteSettings = initialSiteSettings ? { ...defaultState.settings, ...initialSiteSettings.settings } : settings;

  const getCurrentState = () => ({
    pageStructure,
    sectionOrder,
    settings,
    sectionStyles,
    highlightSections,
    linkBackgroundColors,
    linkFontFamilies,
    selectedSection,
  });

  const setStateFromSnapshot = (snapshot) => {
    setPageStructureState(snapshot.pageStructure);
    setSectionOrderState(snapshot.sectionOrder);
    setSettingsState(snapshot.settings);
    setSectionStylesState(snapshot.sectionStyles);
    setHighlightSectionsState(snapshot.highlightSections);
    setLinkBackgroundColors(snapshot.linkBackgroundColors);
    setLinkFontFamilies(snapshot.linkFontFamilies);
    setSelectedSection(snapshot.selectedSection);
  };

  const recordState = (stateToRecord) => {
    const current = stateToRecord || getCurrentState();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(current);
    if (newHistory.length > maxHistory) {
      newHistory.shift();
    }
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const setPageStructureAndSettings = (structureUpdater, settingsUpdater) => {
    const newStructure = typeof structureUpdater === 'function' ? structureUpdater(pageStructure) : structureUpdater;
    const newSettings = typeof settingsUpdater === 'function' ? settingsUpdater(settings) : settingsUpdater;
    setPageStructureState(newStructure);
    setSettingsState(newSettings);
  };

  // Undo and Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      setIsUndoingRedoing(true);
      const newIndex = historyIndex - 1;
      setStateFromSnapshot(history[newIndex]);
      setHistoryIndex(newIndex);
      setTimeout(() => setIsUndoingRedoing(false), 0);
    } else {
      console.log('Undo attempted, but at history start (index 0)');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setIsUndoingRedoing(true);
      const newIndex = historyIndex + 1;
      setStateFromSnapshot(history[newIndex]);
      setHistoryIndex(newIndex);
      setTimeout(() => setIsUndoingRedoing(false), 0);
    } else {
      console.log('Redo attempted, but at history end');
    }
  };

  // History recording effect
  useEffect(() => {
    if (!isLoading && !isUndoingRedoing) {
      const current = getCurrentState();
      const lastState = history[historyIndex];
      if (!lastState || JSON.stringify(current) !== JSON.stringify(lastState)) {
        setHistory(prev => {
          const newHistory = prev.slice(0, historyIndex + 1);
          newHistory.push(current);
          if (newHistory.length > maxHistory) {
            newHistory.shift();
          }
          return newHistory;
        });
        setHistoryIndex(prev => prev + 1);
      }
    }
  }, [pageStructure, settings, sectionOrder, sectionStyles, highlightSections, linkBackgroundColors, linkFontFamilies, selectedSection, isUndoingRedoing]);

  // State setters
  const setPageStructure = (newStructure) => setPageStructureState(newStructure);
  const setSectionOrder = (newOrder) => setSectionOrderState(newOrder);
  const setSettings = (newSettings) => setSettingsState(newSettings);
  const setSectionStyles = (newStyles) => setSectionStylesState(newStyles);
  const setHighlightSections = (newHighlight) => setHighlightSectionsState(newHighlight);

  // Settings handlers
  const handleChange = (property, value) => {
    setSettings(prev => {
      const updated = { ...prev, [property]: value };
      if (property === 'backgroundColor' && linkBackgroundColors) {
        updated.sectionColors = Object.fromEntries(
          Object.keys(prev.sectionColors).map(section => [section, value])
        );
        setSectionStyles(prevStyles => {
          const newStyles = { ...prevStyles };
          Object.keys(prev.sectionColors).forEach(section => {
            newStyles[section] = { ...newStyles[section], backgroundColor: value };
          });
          return newStyles;
        });
      }
      return updated;
    });
  };

  const handleSectionColorChange = (sectionId, color) => {
    if (!linkBackgroundColors) {
      setSettings(prev => ({
        ...prev,
        sectionColors: { ...prev.sectionColors, [sectionId]: color }
      }));
      setSectionStyles(prev => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], backgroundColor: color }
      }));
    }
  };

  const toggleLinkBackgroundColors = () => {
    setLinkBackgroundColors(prev => {
      const newValue = !prev;
      if (newValue) {
        const linkedColor = settings.backgroundColor;
        setSettings(prev => ({
          ...prev,
          sectionColors: Object.fromEntries(
            Object.keys(prev.sectionColors).map(section => [section, linkedColor])
          )
        }));
        setSectionStyles(prev => {
          const newStyles = { ...prev };
          Object.keys(settings.sectionColors).forEach(section => {
            newStyles[section] = { ...newStyles[section], backgroundColor: linkedColor };
          });
          return newStyles;
        });
      }
      return newValue;
    });
  };

  useEffect(() => {
    if (linkFontFamilies) {
      // Sync pageStructure
      setPageStructure(prev => prev.map(el => ({ ...el, fontFamily: settings.fontFamily })));
      // Sync element settings in settings object
      setSettings(prev => {
        const updated = { ...prev };
        pageStructure.forEach(el => {
          if (updated[el.id]) {
            updated[el.id] = { ...updated[el.id], fontFamily: settings.fontFamily };
          }
        });
        return updated;
      });
    }
  }, [settings.fontFamily, linkFontFamilies]);
  
  const toggleLinkFontFamilies = () => {
    setLinkFontFamilies(prev => {
      const newValue = !prev;
      if (newValue) {
        setPageStructure(prevStructure =>
          prevStructure.map(el => ({ ...el, fontFamily: settings.fontFamily }))
        );
        setSettings(prev => {
          const updated = { ...prev };
          pageStructure.forEach(el => {
            if (updated[el.id]) {
              updated[el.id] = { ...updated[el.id], fontFamily: settings.fontFamily };
            }
          });
          return updated;
        });
      }
      return newValue;
    });
  };

  // Initial load from IndexedDB
  useEffect(() => {
    const loadState = async () => {
      try {
        const appState = await db.appState.get('current');
        const initialState = appState ? { ...defaultState, ...appState, settings: { ...defaultState.settings, ...appState.settings } } : defaultState;
        setStateFromSnapshot(initialState);
        setHistory([initialState]);
        setHistoryIndex(0);

        const templates = await db.templates.toArray();
        setUserTemplates(templates);
        const bin = await db.bin.toArray();
        setBinItems(bin);
        await cleanupBin();
      } catch (error) {
        console.error('Error loading from IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  // Save state to IndexedDB
  useEffect(() => {
    if (!isLoading) {
      const saveState = async () => {
        try {
          await db.appState.put({
            key: 'current',
            pageStructure,
            sectionOrder,
            settings,
            sectionStyles,
            highlightSections,
            linkBackgroundColors,
            linkFontFamilies,
          });
        } catch (error) {
          console.error('Error saving to IndexedDB:', error);
        }
      };
      saveState();
    }
  }, [pageStructure, sectionOrder, settings, sectionStyles, highlightSections, linkBackgroundColors, linkFontFamilies, isLoading]);

  // Apply background color and sync section styles
  useEffect(() => {
    document.body.style.backgroundColor = settings.backgroundColor;
  }, [settings.backgroundColor, linkBackgroundColors]);

  // Template management functions
  const saveTemplate = async (templateName) => {
    if (!templateName.trim()) return;
    const currentState = getCurrentState();
    try {
      const newTemplate = { name: templateName, data: currentState, createdAt: Date.now() };
      await db.templates.add(newTemplate);
      setUserTemplates(await db.templates.toArray());
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const loadTemplate = async (id, isDefault = false) => {
    try {
      if (isDefault) {
        const template = defaultTemplates.find((t, index) => `default-${index}` === id);
        if (template) {
          const current = getCurrentState();
          recordState(current);
          setStateFromSnapshot(template.data);
        }
      } else {
        const template = await db.templates.get(parseInt(id, 10));
        if (template) {
          const current = getCurrentState();
          recordState(current);
          setStateFromSnapshot(template.data);
        }
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  const resetTemplate = async () => {
    try {
      const current = getCurrentState();
      recordState(current);
      setStateFromSnapshot(defaultState);
      await db.appState.put({ key: 'current', ...defaultState });
    } catch (error) {
      console.error('Error resetting template:', error);
    }
  };

  const renameTemplate = async (id, newName) => {
    if (!newName.trim()) return;
    try {
      await db.templates.update(id, { name: newName });
      setUserTemplates(await db.templates.toArray());
    } catch (error) {
      console.error('Error renaming template:', error);
    }
  };

  const deleteTemplate = async (id) => {
    try {
      const template = await db.templates.get(id);
      await db.bin.add({ type: 'template', data: template, deletedAt: Date.now() });
      await db.templates.delete(id);
      setUserTemplates(await db.templates.toArray());
      setBinItems(await db.bin.toArray());
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      const section = pageStructure.find(el => el.id === sectionId);
      if (section) {
        await db.bin.add({ type: 'section', data: section, deletedAt: Date.now() });
        setPageStructure(prev => prev.filter(el => el.id !== sectionId));
        setSectionOrder(prev => prev.filter(id => id !== sectionId));
        setBinItems(await db.bin.toArray());
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const restoreFromBin = async (id) => {
    try {
      const item = await db.bin.get(id);
      if (item) {
        if (item.type === 'template') {
          await db.templates.add(item.data);
          setUserTemplates(await db.templates.toArray());
        } else if (item.type === 'section') {
          setPageStructure(prev => [...prev, item.data]);
          setSectionOrder(prev => [...prev, item.data.id]);
        }
        await db.bin.delete(id);
        setBinItems(await db.bin.toArray());
      }
    } catch (error) {
      console.error('Error restoring from bin:', error);
    }
  };

  const cleanupBin = async () => {
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000; // 2 days
    try {
      await db.bin.where('deletedAt').below(twoDaysAgo).delete();
      setBinItems(await db.bin.toArray());
    } catch (error) {
      console.error('Error cleaning up bin:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{
      pageStructure, setPageStructure,
      sectionOrder, setSectionOrder,
      settings, setSettings,
      selectedElement, setSelectedElement,
      selectedSection, setSelectedSection,
      sectionStyles, setSectionStyles,
      siteSettings,
      highlightSections, setHighlightSections,
      userTemplates,
      defaultTemplates,
      saveTemplate,
      loadTemplate,
      resetTemplate,
      renameTemplate,
      deleteTemplate,
      binItems,
      deleteSection,
      restoreFromBin,
      setPageStructureAndSettings,
      undo,
      redo,
      history,
      historyIndex,
      isLoading,
      settingsConfig,
      handleChange,
      handleSectionColorChange,
      linkBackgroundColors,
      toggleLinkBackgroundColors,
      linkFontFamilies,
      toggleLinkFontFamilies,
    }}>
      {isLoading ? <div>Loading...</div> : children}
    </ThemeContext.Provider>
  );
};