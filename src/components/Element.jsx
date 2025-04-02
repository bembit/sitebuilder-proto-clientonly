// src/components/Element.js
import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ThemeContext } from '../contexts/ThemeContext';
import TextBlock from './elements/TextBlock';
import ImageBlock from './elements/ImageBlock';
import HeadingBlock from './elements/HeadingBlock';
import ButtonBlock from './elements/ButtonBlock';

const Element = ({ id, type, index, moveElement, style }) => {
  const { settings, setSelectedElement, selectedElement, setPageStructure, setSettings } = useContext(ThemeContext);
  const elementSettings = settings[id] || {};
  const ref = useRef(null);

  const handleSelect = () => setSelectedElement(id);

  const removeElement = () => {
    setPageStructure(prev => prev.filter(el => el.id !== id));
    setSettings(prev => {
      const updatedSettings = { ...prev };
      delete updatedSettings[id];
      return updatedSettings;
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'ELEMENT',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ELEMENT',
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveElement(draggedItem.id, id);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  const isSelected = selectedElement === id;

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        alignItems: 'center',
        cursor: 'grab',
        ...style,
      }}
    >
      {type === 'text' ? (
        <TextBlock
          id={id}
          onSelect={handleSelect}
          onRemove={removeElement}
          isSelected={isSelected}
          {...elementSettings}
        />
      ) : type === 'image' ? (
        <ImageBlock
          id={id}
          onSelect={handleSelect}
          onRemove={removeElement}
          isSelected={isSelected}
          {...elementSettings}
        />
      ) : type === 'heading' ? (
        <HeadingBlock
          id={id}
          onSelect={handleSelect}
          onRemove={removeElement}
          isSelected={isSelected}
          {...elementSettings}
        />
      ) : type === 'button' ? (
        <ButtonBlock
          id={id}
          onSelect={handleSelect}
          onRemove={removeElement}
          isSelected={isSelected}
          {...elementSettings}
        />
      ) : null}
    </div>
  );
};

export default Element;