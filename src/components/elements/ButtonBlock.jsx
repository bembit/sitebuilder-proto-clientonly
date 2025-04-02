// src/components/elements/ButtonBlock.js
import React from 'react';

// a href is valid.

const ButtonBlock = ({
  id,
  onSelect,
  onRemove,
  isSelected,
  display = 'flex',
  content = 'Click Me',
  fontSize = '16px',
  color = '#000',
  backgroundColor = '#007bff',
  padding = '10px 20px',
  alignSelf = 'center',
  marginTop = '0px',
  marginBottom = '0px',
  fontFamily = 'Arial',
  fontWeight = 'bold',
  fontStyle = 'normal',
  borderRadius = '0px',
  border = 'none',
  boxShadow = 'none',
  minWidth = 'fit-content',
}) => (
  <div style={{ display: 'flex', height: 'fit-content', minWidth: 'fit-content', position: 'relative' }}>
    <button
      style={{
        display,
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        color,
        backgroundColor,
        padding,
        border: isSelected ? '2px solid blue' : 'none',
        cursor: 'pointer',
        alignSelf,
        marginTop,
        marginBottom,
        minWidth,
      }}
      onClick={onSelect}
    >
      {content}
    </button>
    {isSelected && <button onClick={onRemove} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer', position: 'absolute', top: '-15px', right: '-25px' }}>Remove</button>}
  </div>
);

export default ButtonBlock;