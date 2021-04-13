import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiChevronLeft, FiMoreVertical, FiPlus } from 'react-icons/all';
import { DatePicker } from '@material-ui/pickers';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import { Menu, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import Item from '../../components/accordion/item/item.view';
import styles from './oneColection.module.css';
import fetchResource from '../../utils/fetchResource';
import Input from '../../components/input';
import Button from '../../components/button';
import taskerTypes from '../../context/types';
import { iconsMapDisplay } from '../../utils/icons';

const OneColection = (props) => {
  const { setRefreshContext, openModal, editModal, refreshColection, setRefreshColection } = props;
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [colection, setColection] = useState({});
  const [taskModal, setTaskModal] = useState(false);
  const [data, setData] = useState({
    description: '',
    date: new Date(),
    colection: id,
    done: false,
  });
  const [openOptions, setOpenOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenOptions = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenOptions(true);
  };
  const handleCloseMenu = () => {
    setOpenOptions(false);
    setAnchorEl(null);
  };
  useEffect(() => {
    if (refreshColection) {
      fetchResource('GET', `colection/${id}`, {}, {}).then((res) => {
        setColection(res);
        setRefresh(true);
        setRefreshColection(false);
      });
    }
  }, [refreshColection]);
  useEffect(() => {
    if (refresh) {
      fetchResource('GET', 'task', {}, { colection: id }).then((res) => {
        setTasks(res);
        setRefresh(false);
      });
    }
  }, [refresh]);
  const handleDeleteTask = (taskId) => {
    fetchResource('DELETE', `task/${taskId}`, {}, {}).then(() => {
      setRefresh(true);
    });
  };
  const handleEditTask = (newData, taskId) => {
    fetchResource('PATCH', `task/${taskId}`, { body: newData }, {}).then(() => {
      setRefresh(true);
    });
  };
  const handleBackToColection = () => {
    history.goBack();
  };
  const notCompleteTasks = tasks.filter((task) => !task.done);
  const notCompleteTasksTitle = `Tasks - ${notCompleteTasks.length}`;
  const completeTasks = tasks.filter((task) => task.done);
  const completeTasksTitle = `Completed tasks - ${completeTasks.length}`;

  const doneTask = (done, taskId) => {
    fetchResource('PATCH', `task/${taskId}`, { body: { done } }, {}).then(() => {
      setRefresh(true);
    });
  };
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setTaskModal(false);
        setData({ ...data, description: '', date: new Date() });
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const openTaskModal = () => {
    setTaskModal(true);
  };
  const handleChangeDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const handleChangeDate = (date) => {
    // eslint-disable-next-line no-debugger
    debugger;
    setData({ ...data, date });
  };
  const handleSaveTask = () => {
    fetchResource('POST', 'task', { body: data }, {}).then(() => {
      setRefresh(true);
      setTaskModal(false);
    });
  };
  const handleCloseModalTask = () => {
    setTaskModal(false);
    setData({ ...data, description: '', date: new Date() });
  };
  const handleDeleteColection = () => {
    fetchResource('DELETE', `colection/${id}`, {}, {}).then(() => {
      setRefreshContext(true);
      history.push('/app/collections');
    });
  };
  const openEditModal = () => {
    handleCloseMenu();
    editModal(colection);
    openModal(true);
  };
  let Icon = null;
  if (colection.icon) {
    Icon = iconsMapDisplay[colection.icon].label;
  }
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <div className={styles.backName}>
          <span className={styles.backIcon} onClick={handleBackToColection}>
            <FiChevronLeft size="22" />
          </span>
          <span>{Icon && <Icon color={colection.color} />}</span>
          <div className={styles.colectionName}>{colection.name}</div>
        </div>
        <span className={styles.moreIcon} onClick={handleOpenOptions}>
          <FiMoreVertical size="20" />
        </span>
        <Menu
          open={openOptions}
          onClose={handleCloseMenu}
          elevation={0}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={openEditModal}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteColection}>Delete</MenuItem>
        </Menu>
      </div>
      <div>
        {!taskModal && (
          <div className={styles.add} onClick={openTaskModal}>
            <div className={styles.addMoreTask}>
              <span className={styles.addTaskIcon}>
                <FiPlus size="18px" />
              </span>
              <div>Add a task</div>
            </div>
          </div>
        )}
        {taskModal && (
          <div className={styles.addOpen} ref={ref}>
            <div className={styles.inputsModal}>
              <div className={styles.input}>
                <Input label="Task" value={data.name} onChange={handleChangeDescription} />
              </div>
              <DatePicker value={data.date} onAccept={handleChangeDate} inputVariant="outlined" />
            </div>
            <div className={styles.buttons}>
              <Button label="SAVE" onClick={handleSaveTask} variant="primary" />
              <Button label="CANCEL" onClick={handleCloseModalTask} variant="secondary" />
            </div>
          </div>
        )}
      </div>
      <div className={styles.tasksContainer}>
        {notCompleteTasks.length > 0 && (
          <div>
            <div>{notCompleteTasksTitle}</div>
            <div>
              {notCompleteTasks.map((task) => (
                <div className={styles.task}>
                  <Item
                    task={task}
                    onCheck={doneTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {completeTasks.length > 0 && (
          <div>
            <div>{completeTasksTitle}</div>
            <div>
              {completeTasks.map((task) => (
                <div className={styles.task}>
                  <Item
                    task={task}
                    onCheck={doneTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    refreshColection: state.refreshColection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRefreshContext: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
    editModal: (colection) => dispatch({ type: taskerTypes.EDIT_MODAL_FORM, payload: colection }),
    openModal: (value) => dispatch({ type: taskerTypes.MODAL_OPEN, payload: value }),
    setRefreshColection: (value) =>
      dispatch({ type: taskerTypes.SET_REFRESH_COLECTION, payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneColection);
