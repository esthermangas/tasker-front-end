import React from 'react';
import CalendarComponent from '../../components/calendar';
import styles from './calendar.module.css';

const Calendar = () => {
  return (
    <div className={styles.root}>
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
