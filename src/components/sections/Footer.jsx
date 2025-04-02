// src/components/sections/Footer.js
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const Footer = () => {
  const { pageStructure, setPageStructure, sectionStyles } = useContext(ThemeContext);

  // Filter the first heading for the footer section
  const aboutHeading = pageStructure.find(el => el.type === 'heading' && el.section === 'footer');
  // Filter other elements for the footer section, excluding the heading
  const aboutElements = pageStructure.filter(
    elem => elem.section === 'footer' && elem.id !== aboutHeading?.id
  );

  // Function to reorder elements within the footer section
  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);

    // Ensure both elements are in the footer section
    if (
      newStructure[draggedIndex].section === 'footer' &&
      newStructure[targetIndex].section === 'footer'
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  // Make the entire section a drop target
  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item) => {
      console.log('Dropped into Footer:', item.id);
    },
  });

  // Get container styles from sectionStyles
  const containerStyles = sectionStyles['footer'] || {};

  return (
    <div
      ref={drop}
      className="footer"
      style={{
        // height: '400px',
        width: '100%',
        position: 'relative',
        displax: 'flex',
        flexDirection: 'column',
      }}
    >
      {aboutHeading && (
        <Element
          key={aboutHeading.id}
          id={aboutHeading.id}
          type={aboutHeading.type}
          index={-1}
          moveElement={moveElement}
        />
      )}
      <div
        className="footer-container"
        style={{
          display: 'flex',
          ...containerStyles,
        }}
      >
        {aboutElements.map((elem, index) => (
          <Element
            key={elem.id}
            id={elem.id}
            type={elem.type}
            index={index}
            moveElement={moveElement}
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;