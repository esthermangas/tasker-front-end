import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './input.module.css';

const Input = (props) => {
  const { label, error, value, onChange, ...rest } = props;
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (value) {
      setActive(true);
    }
  }, [value]);
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
    if (!value) {
      setActive(false);
    }
  };

  const handleInternalChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={styles.root}>
      <input
        id="input"
        className={inputClass}
        onChange={handleInternalChange}
        {...rest}
        value={value}
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
