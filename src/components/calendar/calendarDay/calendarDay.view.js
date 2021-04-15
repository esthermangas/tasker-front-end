import React from 'react';
import { format, isSameDay } from 'date-fns';
import { connect } from 'react-redux';
import styles from './calendarDay.module.css';
import { iconsMapDisplay } from '../../../utils/icons';
import taskerTypes from '../../../context/types';

const CalendarDay = (props) => {
  const { day, month, tasks, colections, openTaskModal } = props;
  const dayStyles = {};
  if (day.getMonth() === month.getMonth()) {
    dayStyles.backgroundColor = '#222831';
  } else {
    dayStyles.backgroundColor = '#434953';
    dayStyles.color = '#212121';
  }
  const actualDay = isSameDay(day, new Date());
  const taskByDay = tasks.filter(
    (task) =>
      new Date(task.date).getDate() === day.getDate() &&
      new Date(task.date).getMonth() === day.getMonth()
  );
  const tasksByColection = {};
  taskByDay.forEach((task) => {
    if (!tasksByColection[task.colection]) {
      tasksByColection[task.colection] = [];
    }

    tasksByColection[task.colection].push(task);
  });
  const handleOpenTaskModal = () => {
    openTaskModal(day);
  };
  return (
    <div className={styles.bodyDay} style={dayStyles} onClick={handleOpenTaskModal}>
      <div className={styles.content}>
        {actualDay && <span className={styles.numberBall}>{format(day, 'dd')}</span>}
        {!actualDay && format(day, 'dd')}
        {taskByDay.length > 0 && colections.length > 0 && (
          <div className={styles.dayChildren}>
            {colections.length > 0 &&
              Object.keys(tasksByColection).map((col) => {
                const c = colections.find((cole) => cole.id === col);
                const colTasks = tasksByColection[c.id];
                const Icon = iconsMapDisplay[c.icon].label;
                return (
                  <div className={styles.taskSpan} style={{ backgroundColor: c.color }}>
                    <Icon color={c.color} padding="0" /> {colTasks.length} task
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    colections: state.colections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTaskModal: (day) => dispatch({ type: taskerTypes.OPEN_CALENDAR_MODAL, payload: day }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
