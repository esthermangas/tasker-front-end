import React from 'react';
import classNames from 'classnames';
import { FiCheck } from 'react-icons/fi';
import styles from './item.module.css';

const Item = (props) => {
  const { task, ...rest } = props;
  const checkTaskClass = classNames(styles.checkTaskSpan, {
    [styles.checkTaskSpanDone]: task.done,
  });
  const taskClass = classNames(styles.task, {
    [styles.taskDone]: task.done,
  });
  return (
    <div className={styles.item} {...rest}>
      <span className={checkTaskClass}>{task.done && <FiCheck size="20" />}</span>
      <div className={styles.taskCont}>
        <div className={taskClass}>{task.description}</div>
        <span className={styles.taskDate}>{task.date}</span>
      </div>
    </div>
  );
};

export default Item;
