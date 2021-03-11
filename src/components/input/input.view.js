import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './input.module.css';

const Input = (props) => {
  const { label, size, error, value, onChange, ...rest } = props;
  const [active, setActive] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const inputClass = classNames(styles.input, {
    [styles.error]: error,
    [styles.activeInput]: active,
  });
  const labelClass = classNames(styles.label, {
    [styles.activeLabel]: active,
  });
  const handleFocus = () => {
    setActive(true);
  };
  const handleBlur = () => {
    if (!internalValue) {
      setActive(false);
    }
  };

  const handleInternalChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    setInternalValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        id="input"
        className={inputClass}
        onChange={handleInternalChange}
        {...rest}
        value={internalValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <label htmlFor="input" className={labelClass}>
        {label}
      </label>
      {error && <span className={styles.spanError}>{error}</span>}
    </div>
  );
};

export default Input;
