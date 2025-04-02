// src/components/elements/TextBlock.js
import React from 'react';

const TextBlock = ({
  id,
  onSelect,
  onRemove,
  isSelected,
  content = 'New Text',
  fontSize = '16px',
  color = '#000',
  fontFamily = 'Arial',
  fontWeight = 'normal',
  fontStyle = 'normal',
  marginTop = '0px',
  marginBottom = '0px',
}) => (
  <div style={{ display: 'flex', height: 'fit-content', position: 'relative' }}>
    <p
      style={{
        fontSize,
        color,
        fontFamily,
        fontWeight,
        fontStyle,
        border: isSelected ? '2px solid blue' : 'none',
        marginTop,
        marginBottom,
      }}
      onClick={onSelect}
    >
      {content}
    </p>
    {isSelected && <button onClick={onRemove} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Remove</button>}
  </div>
);

export default TextBlock;