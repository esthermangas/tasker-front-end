import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import styles from './newTaskModal.module.css';
import Modal from '../../components/modal';
import Input from '../../components/input';
import Button from '../../components/button';
import taskerTypes from '../../context/types';
import fetchResource from '../../utils/fetchResource';
import SelectColection from '../../components/selectColection';

const NewTaskModal = (props) => {
  const { openModal, closeModal, dayForTask, setRefreshCalendar } = props;
  const [data, setData] = useState({
    description: '',
    colection: undefined,
  });
  const handleDescriptionTask = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const handleSelectColection = (value) => {
    setData({ ...data, colection: value });
  };
  const handleSubmit = () => {
    const finalBody = {
      ...data,
      date: format(dayForTask, 'yyyy-MM-dd'),
      colection: data.colection.value,
    };
    fetchResource('POST', `task`, { body: finalBody }, {}).then(() => {
      closeModal();
      setRefreshCalendar(true);
    });
  };
  const handleCloseModal = () => {
    closeModal();
  };
  return (
    <Modal open={openModal} closeModal={handleCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <div className={styles.input}>
              <Input label="New task" value={data.description} onChange={handleDescriptionTask} />
            </div>
            <SelectColection value={data.colection} onChange={handleSelectColection} />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button label="create" variant="primary" onClick={handleSubmit} />
          <Button label="cancel" variant="secondary" onClick={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    openModal: state.calendarModal.open,
    dayForTask: state.calendarModal.day,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: taskerTypes.CLOSE_CALENDAR_MODAL }),
    setRefreshCalendar: (value) =>
      dispatch({ type: taskerTypes.SET_REFRESH_CALENDAR, payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskModal);
