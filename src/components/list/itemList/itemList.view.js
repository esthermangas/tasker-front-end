import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './itemList.module.css';
import { iconsMapDisplay } from '../../../utils/icons';

const ItemList = (props) => {
  const { el } = props;
  const Icon = iconsMapDisplay[el.icon].label;
  const history = useHistory();
  const handleClickToColection = () => {
    history.push(`/app/collections/${el.id}`);
  };
  return (
    <div className={styles.root} onClick={handleClickToColection}>
      <span className={styles.icon}>
        <Icon color={el.color} />
      </span>
      {el.name}
    </div>
  );
};

export default ItemList;
