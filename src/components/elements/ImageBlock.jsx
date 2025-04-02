import React from 'react';

const ImageBlock = ({ 
  id, 
  onSelect, 
  onRemove, 
  isSelected, 
  src,
  padding,
  borderWidth,
  borderStyle,
  borderColor,
  borderRadius,
  height,
  width,
}) => {
  return (
    <div className="image-container"
    style={{
      position: "relative",
      display: "flex",
      width,
      height,
      cursor: "pointer",
      padding,
      borderWidth,
      borderStyle,
      borderColor,
      borderRadius,
    }}>
      <img
        src={src}
        alt="Element"
        onClick={onSelect}
        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
      />

      {isSelected && (
        <div
          onClick={onRemove}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            backgroundColor: "red",
            color: "white",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "50%",
            fontSize: "14px",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
