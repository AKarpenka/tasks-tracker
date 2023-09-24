import {
  FILTER_TASKS_BY_NUMBER,
  FILTER_TASKS_BY_TITLE,
  TASKS_FETCHING,
  TASKS_FETCHED,
  TASKS_FETCHING_ERROR
} from '../actions/types';

const initialState = {
  columns: {},
  numberFilter: '',
  titleFilter: '',
  tasksLoadingStatus: 'idle'
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_TASKS_BY_NUMBER:
      return {
        ...state,
        numberFilter: action.payload
      };
    case FILTER_TASKS_BY_TITLE:
      return {
        ...state,
        titleFilter: action.payload
      };
    case TASKS_FETCHING:
      return {
        ...state,
        tasksLoadingStatus: 'loading'
      };
    case TASKS_FETCHED:
      return {
        ...state,
        columns: action.payload,
        tasksLoadingStatus: 'idle'
      };
    case TASKS_FETCHING_ERROR:
      return {
        ...state,
        tasksLoadingStatus: 'error'
      };
    default:
      return state;
  }
};

export default tasksReducer;
