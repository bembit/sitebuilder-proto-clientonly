// src/components/sections/About.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const About = ( { childFlexBasis } ) => {
  const { pageStructure, setPageStructure } = useContext(ThemeContext);

  // Filter elements by type and section
  const aboutHeading = pageStructure.find(el => el.type === 'heading' && el.section === 'about');
  const aboutButtons = pageStructure.filter(el => el.type === 'button' && el.section === 'about');
  const aboutElements = pageStructure.filter(
    elem => elem.section === 'about' && elem.id !== aboutHeading?.id && !aboutButtons.some(btn => btn.id === elem.id)
  );

  // Function to reorder elements within the about section (excluding heading and button)
  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);

    if (
      newStructure[draggedIndex].section === 'about' &&
      newStructure[targetIndex].section === 'about'
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  // const [, drop] = useDrop({
  //   accept: 'ELEMENT',
  //   drop: (item) => {
  //     console.log('Dropped into About:', item.id);
  //   },
  // });

  // const containerStyles = sectionStyles['about'] || {};

  return (
    // <div
    //   ref={drop}
    //   className="about"
    //   style={{
    //     // height: '400px',
    //     width: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     // position: 'relative',
    //   }}
    // >
    <React.Fragment>
        {aboutElements.map((elem, index) => (
          <Element
            key={elem.id}
            id={elem.id}
            type={elem.type}
            index={index}
            moveElement={moveElement}
            style={{ flexBasis: childFlexBasis }} // flexBasis to each child
          />
        ))}
        {aboutButtons.length > 0 && (
          <div className="button-container">
            {aboutButtons.map((btn, index) => (
              <Element
                key={btn.id}
                id={btn.id}
                type={btn.type}
                index={-2 - index}
                moveElement={moveElement}
              />
            ))}
          </div>
        )}
    </React.Fragment>
  );
};

export default About;