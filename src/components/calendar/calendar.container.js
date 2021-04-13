import React, { useEffect, useState } from 'react';
import { addMonths, subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import { connect } from 'react-redux';
import CalendarView from './calendar.view';
import fetchResource from '../../utils/fetchResource';
import taskerTypes from '../../context/types';

const CalendarContainer = (props) => {
  const { setTasks } = props;
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const handleAddMonth = () => {
    setMonth(addMonths(month, 1));
    setLoading(true);
  };
  const handleSubMonth = () => {
    setMonth(subMonths(month, 1));
    setLoading(true);
  };
  const from = format(startOfMonth(month), 'yyyy-MM-dd');
  const to = format(endOfMonth(month), 'yyyy-MM-dd');
  useEffect(() => {
    fetchResource('GET', 'task', {}, { from, to }).then((res) => {
      setTasks(res);
      setLoading(false);
    });
  }, [month]);
  return (
    !loading && (
      <CalendarView month={month} onAddMonth={handleAddMonth} onSubMonth={handleSubMonth} />
    )
  );
};

const mapStateToProps = (state) => {
  return {
    refresh: state.refresh,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRefresh: (value) => dispatch({ type: taskerTypes.SET_REFRESH, payload: value }),
    setTasks: (res) => dispatch({ type: taskerTypes.SET_TASKS, payload: res }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
