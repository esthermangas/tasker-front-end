import taskerTypes from './types';

const initialState = {
  drawer: false,
  modal: false,
  refresh: true,
  colections: [],
  toEditColection: {},
  tasks: [],
  refreshColection: true,
  calendarModal: { open: false, day: new Date() },
  refreshCalendar: true,
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
    case taskerTypes.SET_REFRESH:
      newState.refresh = action.payload;
      return newState;
    case taskerTypes.SET_COLECTIONS:
      newState.colections = action.payload;
      return newState;
    case taskerTypes.EDIT_MODAL_FORM:
      newState.toEditColection = action.payload;
      return newState;
    case taskerTypes.CLEAN_EDIT_MODAL_FORM:
      newState.toEditColection = {};
      return newState;
    case taskerTypes.SET_TASKS:
      newState.tasks = action.payload;
      return newState;
    case taskerTypes.SET_REFRESH_COLECTION:
      newState.refreshColection = action.payload;
      return newState;
    case taskerTypes.OPEN_CALENDAR_MODAL:
      newState.calendarModal = { open: true, day: action.payload };
      return newState;
    case taskerTypes.CLOSE_CALENDAR_MODAL:
      newState.calendarModal = { open: false, day: new Date() };
      return newState;
    case taskerTypes.SET_REFRESH_CALENDAR:
      newState.refreshCalendar = action.payload;
      return newState;
    case taskerTypes.CLEAN_CONTEXT:
      return { ...initialState };
    default:
      return newState;
  }
};

export default reducer;
