// src/components/elements/HeadingBlock.js
import React from 'react';

const HeadingBlock = ({
  id,
  onSelect,
  onRemove,
  isSelected,
  content = 'New Heading',
  fontSize = '24px',
  color = '#000',
  fontFamily = 'Arial',
  fontWeight = 'bold',
  fontStyle = 'normal',
  level = 'h1',
  zIndex = '10',
  marginTop = '0',
  marginBottom = '0',
  marginLeft = '0',
  marginRight = '0',
  textAlign = 'left',
  width = '100%',
}) => {
  const Tag = level; // set h1, h2, or h3
  return (
    <div
      style={{
        textAlign,
        width,
      }}
    >
      <Tag
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight,
          fontStyle,
          border: isSelected ? '2px solid blue' : 'none',
          zIndex,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          width,
        }}
        onClick={onSelect}
      >
        {content}
      </Tag>
      {isSelected && <button onClick={onRemove} style={{ display: 'flex', height: 'fit-content', zIndex, backgroundColor: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Remove</button>}
    </div>
  );
};

export default HeadingBlock;