import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './colorPicker.module.css';

const ColorPicker = (props) => {
  const { color, onChange } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleChange = (newColor) => {
    onChange(newColor.hex);
  };
  const colorStyle = {
    background: `${color}`,
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  };
  return (
    <div>
      <div className={styles.swatch} onClick={handleClick}>
        <div style={colorStyle} />
      </div>
      {displayColorPicker && (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} disableAlpha />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
