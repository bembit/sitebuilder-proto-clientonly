// src/App.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import CustomizationPanel from './components/CustomizationPanel';
import PageContent from './components/PageContent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/General.css';
import './styles/BuilderContainers.css';
import './styles/ElementStyles/ElementStyles.css';
import './styles/UserInterface/AddElements.css';
import './styles/UserInterface/SectionsPanel.css';

const fontOptions = [
  'Arial',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Playfair Display',
];

// Load Google Fonts dynamically
function loadGoogleFonts(font) {
  if (font === 'Arial') return;
  const formattedFont = font.replace(/ /g, '+');
  const fontStyles = ':ital,wght@0,400;0,700;1,400;1,700';
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}${fontStyles}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [interfaceVisible, setInterfaceVisible] = useState(true);

  // Preload all fonts on app initialization
  useEffect(() => {
    fontOptions.forEach(font => loadGoogleFonts(font));
  }, []);

  // Toggle interface visibility with Alt key
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Alt') {
        setInterfaceVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ isLoading }) => (
            <div className="app">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div className={`interface-container ${interfaceVisible ? '' : 'hidden'}`}>
                  <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
                  <CustomizationPanel currentSection={currentSection} />
                </div>
              )}
              <PageContent currentSection={currentSection} />
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;