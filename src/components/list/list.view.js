import React from 'react';
import styles from './list.module.css';
import ItemList from './itemList';

const List = (props) => {
  const { items } = props;
  return (
    <div className={styles.root}>
      {items.map((el) => (
        <ItemList el={el} />
      ))}
    </div>
  );
};

export default List;
