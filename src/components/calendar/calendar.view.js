import React from 'react';
import { format } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/all';
import { getWeeks } from './utils';
import CalendarRow from './calendarRow';
import styles from './calendar.module.css';

const CalendarView = (props) => {
  const { month, onAddMonth, onSubMonth } = props;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weeks = getWeeks(month);

  return (
    <div className={styles.root}>
      <div className={styles.preContainer}>
        <div className={styles.monthName}>
          <div className={styles.icon} onClick={onSubMonth}>
            <span className={styles.span}>
              <FiChevronLeft size="22" />
            </span>
          </div>
          <div className={styles.titleMonth}>
            <div>{format(month, 'MMMM yyyy')}</div>
          </div>
          <div className={styles.icon} onClick={onAddMonth}>
            <span className={styles.span}>
              <FiChevronRight size="22" />
            </span>
          </div>
        </div>
        <div className={styles.container}>
          {days.map((d) => (
            <div className={styles.dayHeader}>{d}</div>
          ))}
        </div>
        <div className={styles.body}>
          {weeks.map((week) => (
            <CalendarRow month={month} week={week} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
