import { BiSearch as SearchIcon } from 'react-icons/bi';
import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './searchBar.module.css';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const handleFocus = () => {
    setFocused(true);
    if (ref.current !== null && ref.current !== undefined) {
      ref.current.focus();
    }
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const iconClass = classnames(styles.searchIcon, {
    [styles.searchIconFocus]: focused,
  });

  return (
    <div className={styles.searchContainer}>
      <span className={iconClass} onClick={handleFocus}>
        <SearchIcon size="24px" />
      </span>
      <input className={styles.searchInput} onFocus={handleFocus} onBlur={handleBlur} ref={ref} />
    </div>
  );
};

export default SearchBar;
