import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MdDashboard as DashboardIcon,
  AiOutlineMenu as MenuIcon,
  BiCollection as CollectionIcon,
  RiAddFill as AddIcon,
  FiCalendar as CalendarIcon,
} from 'react-icons/all';
import { Menu, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import styles from './navBar.module.css';
import taskerTypes from '../../../context/types';
import NewCollectionModal from '../../newCollectionModal/newCollectionModal.view';
import { getUserSession } from '../../../utils/sesion';
import Avatar from '../../../components/avatar';
import SearchBar from '../../../components/searchBar';

const NavBar = (props) => {
  const { openDrawer, openModal, refreshColections, refreshCalendar, cleanContext } = props;
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem('userSession');
    handleCloseMenu();
    cleanContext();
    history.push('/login');
  };
  const handleProfile = () => {
    handleCloseMenu();
  };
  const handleClickDashboardView = () => {
    history.push('/app/dashboard');
  };
  const handleClickColectionView = () => {
    refreshColections();
    history.push('/app/collections');
  };
  const handleClickCalendarView = () => {
    history.push('/app/calendar');
    refreshCalendar(true);
  };
  const userInfo = getUserSession('userSession');
  const name = `${userInfo.user.firstName} ${userInfo.user.lastName}`;

  return (
    <div className={styles.root}>
      <NewCollectionModal />
      <div className={styles.itemsContainer}>
        <div className={styles.left}>
          <span className={styles.button} onClick={openDrawer}>
            <MenuIcon size="24px" />
          </span>
          <div className={styles.button} onClick={handleClickDashboardView}>
            <DashboardIcon size="22px" className={styles.icons} />
            Dashboard
          </div>
          <div className={styles.button} onClick={handleClickColectionView}>
            <CollectionIcon size="22px" className={styles.icons} />
            Collections
          </div>
          <div className={styles.button} onClick={handleClickCalendarView}>
            <CalendarIcon size="22px" className={styles.icons} />
            Calendar
          </div>
        </div>
        <div className={styles.right}>
          <span className={styles.specialButton} onClick={openModal}>
            <AddIcon size="26px" className={styles.specialButtonIcon} />
          </span>
          <div className={styles.serchBar}>
            <SearchBar />
          </div>
          <div className={styles.imgSession} onClick={handleOpenMenu}>
            <Avatar name={name} />
          </div>
          <Menu
            open={openMenu}
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
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    drawer: state.drawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch({ type: taskerTypes.TOGGLE_DRAWER }),
    openModal: () => dispatch({ type: taskerTypes.MODAL_OPEN }),
    refreshColections: () => dispatch({ type: taskerTypes.SET_REFRESH, payload: true }),
    refreshCalendar: () => dispatch({ type: taskerTypes.SET_REFRESH_CALENDAR, payload: true }),
    cleanContext: () => dispatch({ type: taskerTypes.CLEAN_CONTEXT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
