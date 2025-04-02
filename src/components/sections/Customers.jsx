// src/components/sections/Customers.js
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const Customers = () => {
  const { pageStructure, setPageStructure, sectionStyles } = useContext(ThemeContext);

  // Filter the first heading for the customers section
  const aboutHeading = pageStructure.find(el => el.type === 'heading' && el.section === 'customers');
  const aboutButton = pageStructure.find(el => el.type === 'button' && el.section === 'customers');

  // Filter other elements for the customers section, excluding the heading
  const aboutElements = pageStructure.filter(
    elem => elem.section === 'customers' && elem.id !== aboutHeading?.id && elem.id !== aboutButton?.id
  );

  // Function to reorder elements within the customers section
  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);

    // Ensure both elements are in the customers section
    if (
      newStructure[draggedIndex].section === 'customers' &&
      newStructure[targetIndex].section === 'customers'
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  // Make the entire section a drop target (optional, for future enhancements)
  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item) => {
      console.log('Dropped into Customers:', item.id);
    },
  });

  // Get container styles from sectionStyles
  const containerStyles = sectionStyles['customers'] || {};

  return (
    <>
    <div
      ref={drop}
      className="customers"
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
        className="customers-container"
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
    
    {aboutButton && (
        <Element
          key={aboutButton.id}
          id={aboutButton.id}
          type={aboutButton.type}
          index={-1}
          moveElement={moveElement}
        />
      )}
    </>
  );
};

export default Customers;