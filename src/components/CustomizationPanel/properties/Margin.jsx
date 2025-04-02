// src/components/CustomizationPanel/properties/Margin.js
import React from 'react';

const Margin = ({ top, bottom, left, right, onChangeTop, onChangeBottom, onChangeLeft, onChangeRight }) => (
  <>
    <label>
      Margin-top:
      <input
        type="text"
        value={top || '0px'}
        onChange={e => onChangeTop(e.target.value)}
      />
    </label>
    <label>
      Margin-bottom:
      <input
        type="text"
        value={bottom || '0px'}
        onChange={e => onChangeBottom(e.target.value)}
      />
    </label>
    <label>
      Margin-left:
      <input
        type="text"
        value={left || '0px'}
        onChange={e => onChangeLeft(e.target.value)}
      />
    </label>
    <label>
      Margin-right:
      <input
        type="text"
        value={right || '0px'}
        onChange={e => onChangeRight(e.target.value)}
      />
    </label>
  </>
);

export default Margin;