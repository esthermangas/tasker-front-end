import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './colectionCard.module.css';
import { iconsMapDisplay } from '../../utils/icons';
import taskerTypes from '../../context/types';

const ColectionCard = (props) => {
  const { colection, setRefreshColection } = props;
  const history = useHistory();
  const Icon = iconsMapDisplay[colection.icon].label;
  const handleClickToColection = () => {
    setRefreshColection(true);
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

const mapDispatchToProps = (dispatch) => {
  return {
    setRefreshColection: (value) =>
      dispatch({ type: taskerTypes.SET_REFRESH_COLECTION, payload: value }),
  };
};

export default connect(null, mapDispatchToProps)(ColectionCard);
