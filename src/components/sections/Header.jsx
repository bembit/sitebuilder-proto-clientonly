// src/components/sections/Header.js
import React, { useContext } from 'react';
// import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const Header = ({ currentSection, childFlexBasis }) => {
  const { pageStructure, setPageStructure, settings } = useContext(ThemeContext);

  // Filter elements for the header section, excluding the heading (now handled in PageContent)
  const headerElements = pageStructure.filter(
    elem => elem.section === currentSection && elem.type !== 'heading'
  );

  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);
    if (
      newStructure[draggedIndex].section === currentSection &&
      newStructure[targetIndex].section === currentSection
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  // const [, drop] = useDrop({
  //   accept: 'ELEMENT',
  //   drop: (item) => console.log('Dropped into Header:', item.id),
  // });

  return (
    <React.Fragment>
    {/* <div ref={drop}> */}
      {headerElements.map((elem, index) => (
        <Element
          key={elem.id}
          id={elem.id}
          type={elem.type}
          index={index}
          moveElement={moveElement}
          {...settings[elem.id]}
          style={{ flexBasis: childFlexBasis }} // Apply flexBasis to each child
        />
      ))}
    </React.Fragment>
  );
};

export default Header;