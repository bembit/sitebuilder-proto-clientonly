// src/components/CustomizationPanel/ElementCustomizationPanel.js
import React from 'react';
import Padding from './properties/Padding';
import Margin from './properties/Margin';
import FontSettings from './properties/FontSettings';
import ColorPicker from './properties/ColorPicker';
import BorderSettings from './properties/BorderSettings';
import Dimensions from './properties/Dimensions';

const ElementCustomizationPanel = ({ elementSettings, updateSetting, removeElement }) => {
  if (!elementSettings) return <p>Item deleted.</p>;

  const RemoveButton = ({ label }) => (
    <div
      onClick={removeElement}
      style={{
        marginTop: 'var(--spacing-l)',
        backgroundColor: 'red',
        color: 'white',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 100,
        borderRadius: '8px',
        padding: '7px',
      }}
    >
      {label}
    </div>
  );

  const commonProps = {
    updateSetting: (key, value) => updateSetting(key, value),
    settings: elementSettings,
  };

  switch (elementSettings.type) {
    case 'image':
      return (
        <div className="customize-elements">
          <h3>Customize Image</h3>
          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => updateSetting('src', reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          <Dimensions
            width={elementSettings.width}
            height={elementSettings.height}
            onChangeWidth={value => updateSetting('width', value)}
            onChangeHeight={value => updateSetting('height', value)}
          />
          <Padding
            value={elementSettings.padding}
            onChange={value => updateSetting('padding', value)}
          />
          <BorderSettings {...commonProps} />
          <RemoveButton label="Remove Image X" />
        </div>
      );

    case 'heading':
      return (
        <div className="customize-elements">
          <h3>Customize Heading</h3>
          <label>
            Content:
            <input
              type="text"
              value={elementSettings.content || ''}
              onChange={e => updateSetting('content', e.target.value)}
            />
          </label>
          <label>
            Heading Level:
            <select
              value={elementSettings.level || 'h1'}
              onChange={e => updateSetting('level', e.target.value)}
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </label>
          <FontSettings {...commonProps} />
          <ColorPicker
            label="Color"
            color={elementSettings.color}
            onChange={color => updateSetting('color', color)}
          />
          <Margin
            top={elementSettings.marginTop}
            bottom={elementSettings.marginBottom}
            left={elementSettings.marginLeft}
            right={elementSettings.marginRight}
            onChangeTop={value => updateSetting('marginTop', value)}
            onChangeBottom={value => updateSetting('marginBottom', value)}
            onChangeLeft={value => updateSetting('marginLeft', value)}
            onChangeRight={value => updateSetting('marginRight', value)}
          />

          <label>
            Text Align:
            <select
              value={elementSettings.textAlign || 'left'}
              onChange={e => updateSetting('textAlign', e.target.value)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>

          </label>

          <RemoveButton label="Remove Heading X" />
        </div>
      );

    case 'button':
      return (
        <div className="customize-elements">
          <h3>Customize Button</h3>
          <label>
            Content:
            <input
              type="text"
              value={elementSettings.content || ''}
              onChange={e => updateSetting('content', e.target.value)}
            />
          </label>
          <FontSettings {...commonProps} />
          <ColorPicker
            label="Text Color"
            color={elementSettings.color}
            onChange={color => updateSetting('color', color)}
          />
          <ColorPicker
            label="Background Color"
            color={elementSettings.backgroundColor}
            onChange={color => updateSetting('backgroundColor', color)}
          />
          <Padding
            value={elementSettings.padding}
            onChange={value => updateSetting('padding', value)}
          />
          <Margin
            top={elementSettings.marginTop}
            bottom={elementSettings.marginBottom}
            onChangeTop={value => updateSetting('marginTop', value)}
            onChangeBottom={value => updateSetting('marginBottom', value)}
          />
          <RemoveButton label="Remove Button X" />
        </div>
      );

    default: // Text
      return (
        <div className="customize-elements">
          <h3>Customize Text</h3>
          <label>
            Content:
            <input
              type="text"
              value={elementSettings.content || ''}
              onChange={e => updateSetting('content', e.target.value)}
            />
          </label>
          <FontSettings {...commonProps} />
          <ColorPicker
            label="Color"
            color={elementSettings.color}
            onChange={color => updateSetting('color', color)}
          />
          <Margin
            top={elementSettings.marginTop}
            bottom={elementSettings.marginBottom}
            onChangeTop={value => updateSetting('marginTop', value)}
            onChangeBottom={value => updateSetting('marginBottom', value)}
          />
          <RemoveButton label="Remove Text X" />
        </div>
      );
  }
};

export default ElementCustomizationPanel;