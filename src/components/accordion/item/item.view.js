import React, { useState } from 'react';
import classNames from 'classnames';
import { FiCheck, FiEdit, FiTrash2 } from 'react-icons/fi';
import format from 'date-fns/format';
import styles from './item.module.css';
import Input from '../../input';
import Button from '../../button';
import DatePickerTask from '../../../utils/datePicker';

const Item = (props) => {
  const { task, onCheck, onDelete, onEdit, ...rest } = props;
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    description: task.description,
    date: new Date(task.date),
  });
  const checkTaskClass = classNames(styles.checkTaskSpan, {
    [styles.checkTaskSpanDone]: task.done,
  });
  const taskClass = classNames(styles.task, {
    [styles.taskDone]: task.done,
  });
  const taskDate = format(new Date(task.date), 'dd-MM-yyyy');
  const handleClick = () => {
    if (onCheck) {
      onCheck(!task.done, task.id);
    }
  };
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };
  const handleChangeDescription = (e) => {
    setEditData({ ...editData, description: e.target.value });
  };
  const handleChangeDate = (date) => {
    setEditData({ ...editData, date });
  };
  const handleCloseEditMode = () => {
    setEditMode(false);
    setEditData({ description: task.description, date: task.date });
  };
  const handleSave = () => {
    if (onEdit) {
      onEdit(editData, task.id);
    }
    handleCloseEditMode();
  };
  return (
    <div className={styles.item} {...rest}>
      <span className={checkTaskClass} onClick={handleClick}>
        {task.done && <FiCheck size="20" />}
      </span>
      {!editMode && (
        <div className={styles.taskCont}>
          <div className={taskClass}>{task.description}</div>
          <div className={styles.taskDate}>{taskDate}</div>
        </div>
      )}
      {editMode && (
        <div className={styles.editModal}>
          <div className={styles.inputsModal}>
            <div className={styles.input}>
              <Input label="Task" value={editData.description} onChange={handleChangeDescription} />
            </div>
            <DatePickerTask
              value={editData.date}
              onChange={handleChangeDate}
              inputVariant="outlined"
            />
          </div>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button label="SAVE" onClick={handleSave} variant="primary" />
            </div>
            <div>
              <Button label="CANCEL" onClick={handleCloseEditMode} variant="secondary" />
            </div>
          </div>
        </div>
      )}
      <div className={styles.optionsContainer}>
        <span className={styles.edit} onClick={handleEdit}>
          <FiEdit size="20" />
        </span>
        <span className={styles.trash} onClick={handleDelete}>
          <FiTrash2 size="20" />
        </span>
      </div>
    </div>
  );
};

export default Item;
