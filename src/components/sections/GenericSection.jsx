// src/components/sections/GenericSection.js
import React, { useContext } from 'react';
// import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const GenericSection = ({ currentSection, childFlexBasis }) => {
  const { pageStructure, setPageStructure, settings } = useContext(ThemeContext);
  
  const sectionHeading = pageStructure.find(el => el.type === 'heading' && el.section === currentSection);

  // const sectionElements = pageStructure.filter(
  //   el => el.section === currentSection && el.type !== 'section'
  // );

  const sectionElements = pageStructure.filter(
    el => el.section === currentSection && el.id !== sectionHeading?.id
  );
  // could use default sectionStyles since we are missing them on these in pagestruct.

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
  //   drop: (item) => console.log('Dropped into:', currentSection, item.id),
  // });

  return (
    // <div ref={drop} className={`${currentSection}`} 
    //   style={{ 
    //     minHeight: '200px',
    //     width: '100%',
    //     // backgroundColor: '#000000', // won't let the state update
    //   }}>
      
    <React.Fragment>
      {/* {sectionHeading && (
      <Element
        key={sectionHeading.id}
        id={sectionHeading.id}
        type={sectionHeading.type}
        index={-1} // Special index to exclude from drag-and-drop
        moveElement={moveElement}
      />
    )} */}
      {/* <h2>{currentSection}</h2> */}
      {/* <div className={`${currentSection}-container`} style={{ display: 'flex', width: '100%' }}> */}
        {sectionElements.map((elem, index) => (
          <Element
            key={elem.id}
            id={elem.id}
            type={elem.type}
            index={index}
            moveElement={moveElement}
            {...settings[elem.id]} // Pass element-specific settings
            style={{ flexBasis: childFlexBasis }} // Apply flexBasis to each child
          />
        ))}
      {/* </div> */}
    </React.Fragment>
  );
};

export default GenericSection;