import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './colectionCard.module.css';
import { iconsMapDisplay } from '../../utils/icons';

const ColectionCard = (props) => {
  const { colection } = props;
  const history = useHistory();
  const Icon = iconsMapDisplay[colection.icon].label;
  const handleClickToColection = () => {
    history.push(`/app/collections/${colection.id}`);
  };
  return (
    <div className={styles.root} onClick={handleClickToColection}>
      <div>
        <span>
          <Icon color={colection.color} />
        </span>
      </div>
      <div className={styles.name}>{colection.name}</div>
    </div>
  );
};

export default ColectionCard;
