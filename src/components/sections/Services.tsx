// src/components/sections/Services.js
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const Services = () => {
  const { pageStructure, setPageStructure, settings, setSelectedElement, sectionStyles } = useContext(ThemeContext);

  const aboutHeading = pageStructure.find(el => el.type === 'heading' && el.section === 'services');
  const aboutElements = pageStructure.filter(
    elem => elem.section === 'services' && elem.id !== aboutHeading?.id
  );

  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);

    if (
      newStructure[draggedIndex].section === 'services' &&
      newStructure[targetIndex].section === 'services'
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item) => {
      console.log('Dropped into Services:', item.id);
    },
  });

  // Get container styles from sectionStyles
  const containerStyles = sectionStyles['services'] || {};

  return (
    <div
      ref={drop}
      className="services"
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
        className="services-container"
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

export default Services;