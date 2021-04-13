import React from 'react';
import { connect } from 'react-redux';
import styles from './colections.module.css';
import ColectionCard from '../../components/colectionCard';
import taskerTypes from '../../context/types';

const Colections = (props) => {
  const { colections, openModal } = props;
  const infoSentenceNotColections = "There aren't colections yet";

  return (
    <>
      {colections.length > 0 && (
        <div className={styles.root}>
          {colections.map((colection) => (
            <ColectionCard colection={colection} />
          ))}
          <div className={styles.addColection} onClick={openModal}>
            +
          </div>
        </div>
      )}
      {colections.length === 0 && (
        <div className={styles.infoRoot}>{infoSentenceNotColections}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    colections: state.colections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch({ type: taskerTypes.MODAL_OPEN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Colections);
