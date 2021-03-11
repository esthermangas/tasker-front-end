import React from 'react';
import styles from './itemList.module.css';

const ItemList = (props) => {
  const { el } = props;
  return <div className={styles.root}>{el}</div>;
};

export default ItemList;
