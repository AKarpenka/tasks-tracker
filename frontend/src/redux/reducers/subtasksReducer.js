import { ADD_SUBTASK, UPDATE_STATUS_SUBTASK, DELETE_SUBTASK } from '../actions/types';

const initialState = {
  subtasks: []
};

const subtasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBTASK:
      return {
        ...state,
        subtasks: [...state.subtasks, action.payload]
      };
    case UPDATE_STATUS_SUBTASK:
      return {
        ...state,
        subtasks: action.payload
      };
    case DELETE_SUBTASK:
      return {
        ...state,
        subtasks: action.payload
      };
    default:
      return state;
  }
};

export default subtasksReducer;
