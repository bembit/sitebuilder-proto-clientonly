// src/components/PageContent.js
import React, { useContext } from 'react';
import { sections as defaultSections } from '../config/sectionsConfig';
import { ThemeContext } from '../contexts/ThemeContext';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Customers from './sections/Customers';
import Services from './sections/Services';
import Footer from './sections/Footer';
import GenericSection from './sections/GenericSection';
import Element from './Element';

const staticSectionComponents = {
  header: Header,
  hero: Hero,
  about: About,
  customers: Customers,
  services: Services,
  footer: Footer,
};

const PageContent = ({ currentSection }) => {
  const {
    pageStructure,
    sectionOrder,
    setSelectedSection,
    settings,
    sectionStyles,
    highlightSections,
  } = useContext(ThemeContext);

  const sectionColors = settings.sectionColors || {};

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

  return (
    <div
      className="page-content"
      style={{
        width: `${settings.pageContentWidth || '1280'}px`,
        backgroundColor: settings.backgroundColor || '#212121',
      }}
    >
      {allSections.map(section => {
        const containerStyles = {
          flexDirection: sectionStyles[section.id]?.flexDirection || 'row',
          flexWrap: sectionStyles[section.id]?.flexWrap || 'nowrap',
          justifyContent: sectionStyles[section.id]?.justifyContent || 'flex-start',
          alignContent: sectionStyles[section.id]?.alignContent || 'stretch',
          alignItems: sectionStyles[section.id]?.alignItems || 'stretch',
          width: sectionStyles[section.id]?.width || '100%',
          height: sectionStyles[section.id]?.height || 'auto',
          borderWidth: sectionStyles[section.id]?.borderWidth || '0px',
          borderStyle: sectionStyles[section.id]?.borderStyle || 'none',
          borderColor: sectionStyles[section.id]?.borderColor || '#000000',
          borderRadius: sectionStyles[section.id]?.borderRadius || settings.sectionBorderRadius || '0px',
          padding: sectionStyles[section.id]?.padding || `${settings.padding || '0'}px`,
          marginTop: sectionStyles[section.id]?.marginTop || `${settings.marginTop || '20'}px`,
          backgroundColor:
            sectionColors[section.id] ||
            sectionStyles[section.id]?.backgroundColor ||
            '#0b0b0b',
        };

        // Extract flexBasis separately to apply to child elements
        const childFlexBasis = sectionStyles[section.id]?.flexBasis || 'auto';

        const isStatic = defaultSections.some(ds => ds.id === section.id);
        const SectionComponent = isStatic ? staticSectionComponents[section.id] : GenericSection;

        const sectionHeading = pageStructure.find(el => el.type === 'heading' && el.section === section.id);

        return (
          <React.Fragment key={section.id}>
            {sectionHeading && (
              <Element
                id={sectionHeading.id}
                type={sectionHeading.type}
                index={-1}
                {...settings[sectionHeading.id]}
                style={{
                 
                }}
              />
            )}
            <section
              id={section.id}
              className={highlightSections && section.id === currentSection ? 'selected-section' : ''}
              onClick={() => setSelectedSection(section.id)}
              style={{
                display: 'flex',
                ...containerStyles,
              }}
            >
                  <SectionComponent 
                    currentSection={section.id} 
                    childFlexBasis={childFlexBasis}
                  />
            </section>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PageContent;