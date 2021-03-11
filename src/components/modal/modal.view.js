import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  const { children, open, closeModal } = props;
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (closeModal !== undefined) {
          closeModal();
        }
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <>
      {open && (
        <div className={styles.backdrop}>
          <div ref={ref} className={styles.root}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
