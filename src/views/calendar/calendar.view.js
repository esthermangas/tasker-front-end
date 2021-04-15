import React from 'react';
import CalendarComponent from '../../components/calendar';
import styles from './calendar.module.css';
import NewTaskModal from '../newTaskModal/newTaskModal.view';

const Calendar = () => {
  return (
    <div className={styles.root}>
      <NewTaskModal />
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
