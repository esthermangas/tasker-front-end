import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import styles from './main.module.css';
import NavBar from './navbar';
import Drawer from './drawer/drawer.view';
import Dashboard from '../dashboard';
import Colections from '../colections';
import OneColection from '../oneColection/oneColection.view';
import fetchResource from '../../utils/fetchResource';
import taskerTypes from '../../context/types';
import Calendar from '../calendar';

const Main = (props) => {
  const { openedDrawer, refresh, setColections, setRefresh } = props;
  const location = useLocation();
  const containerClass = classnames(styles.container, {
    [styles.containerMove]: openedDrawer,
  });

  const containerStyle = {};
  if (location.pathname.includes('calendar')) {
    containerStyle.paddingTop = 0;
  }
  useEffect(() => {
    if (refresh) {
      fetchResource('GET', 'colection', {}, {}).then((res) => {
        setColections(res);
        setRefresh(false);
      });
    }
  }, [refresh]);

  return (
    <div className={styles.root}>
      <div>
        <NavBar />
        <Drawer />
      </div>
      <div className={styles.mainContainer}>
        <div className={containerClass} style={containerStyle}>
          <Switch>
            <Route exact path="/app/dashboard" component={Dashboard} />
            <Route exact path="/app/collections" component={Colections} />
            <Route exact path="/app/collections/:id" component={OneColection} />
            <Route exact path="/app/calendar" component={Calendar} />
            <Redirect from="/app" to="/app/dashboard" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedDrawer: state.drawer,
    refresh: state.refresh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setColections: (res) => dispatch({ type: taskerTypes.SET_COLECTIONS, payload: res }),
    setRefresh: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
