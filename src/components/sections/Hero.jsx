// src/components/sections/Hero.js
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ThemeContext } from '../../contexts/ThemeContext';
import Element from '../Element';

const Hero = () => {
  const { pageStructure, setPageStructure, settings, setSelectedElement, sectionStyles } = useContext(ThemeContext);

  const heroImage = pageStructure.find(el => el.type === 'image' && el.section === 'hero');
  const heroHeading = pageStructure.find(el => el.type === 'heading' && el.section === 'hero');

  const heroButtons = pageStructure.filter(el => el.type === 'button' && el.section === 'hero');


  const heroElements = pageStructure.filter(
    elem => elem.section === 'hero' && elem.id !== heroImage?.id && elem.id !== heroHeading?.id && !heroButtons.some(btn => btn.id === elem.id)
  );

  const moveElement = (draggedId, targetId) => {
    const newStructure = [...pageStructure];
    const draggedIndex = newStructure.findIndex(elem => elem.id === draggedId);
    const targetIndex = newStructure.findIndex(elem => elem.id === targetId);

    if (
      newStructure[draggedIndex].section === 'hero' &&
      newStructure[targetIndex].section === 'hero'
    ) {
      const [movedElement] = newStructure.splice(draggedIndex, 1);
      newStructure.splice(targetIndex, 0, movedElement);
      setPageStructure(newStructure);
    }
  };

  const [, drop] = useDrop({
    accept: 'ELEMENT',
    drop: (item) => {
      console.log('Dropped into Hero:', item.id);
    },
  });

  const containerStyles = sectionStyles['about'] || {};

  return (
    <div
      ref={drop}
      className="hero"
      style={{
        backgroundImage: heroImage ? `url(${settings[heroImage.id]?.src})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '400px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {heroImage && (
        <div
          onClick={() => setSelectedElement(heroImage.id)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.1)',
          }}
        />
      )}
      {/* {heroHeading && (
        <Element
          key={heroHeading.id}
          id={heroHeading.id}
          type={heroHeading.type}
          index={-1} // Special index to exclude from drag-and-drop
          moveElement={moveElement}
        />
      )} */}

      {/* the blank one */}
      {/* <div
        className="about-container"
        style={{
          display: 'flex',
          ...containerStyles,
        }}
      ></div> */}

      {/* <div className="hero-container"> */}
        {heroElements.map((elem, index) => (
          <Element
            key={elem.id}
            id={elem.id}
            type={elem.type}
            index={index}
            moveElement={moveElement}
          />
        ))}
      {/* </div> */}

        {heroButtons.length > 0 && (
          <div className="button-container" 
            style={{ 
              zIndex: 10,
              display: 'flex',
              width: 'fit-content'
          }}>
            {heroButtons.map((btn, index) => (
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
    </div>
  );
};

export default Hero;