import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const ContextProvider = (props) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

export default ContextProvider;
