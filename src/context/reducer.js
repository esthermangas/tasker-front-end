import taskerTypes from './types';

const initialState = {
  drawer: false,
  modal: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case taskerTypes.DRAWER_OPEN:
      newState.drawer = true;
      return newState;
    case taskerTypes.DRAWER_CLOSE:
      newState.drawer = false;
      return newState;
    case taskerTypes.TOGGLE_DRAWER:
      newState.drawer = !newState.drawer;
      return newState;
    case taskerTypes.MODAL_OPEN:
      newState.modal = true;
      return newState;
    case taskerTypes.MODAL_CLOSE:
      newState.modal = false;
      return newState;
    default:
      return newState;
  }
};

export default reducer;
