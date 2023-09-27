import { ADD_SUBTASK, UPDATE_STATUS_SUBTASK, DELETE_SUBTASK } from './types';

export const addSubtask = (subtask) => {
  return {
    type: ADD_SUBTASK,
    payload: subtask
  };
};

export const updateStatusSubtask = (updatedSubtasks) => {
  return {
    type: UPDATE_STATUS_SUBTASK,
    payload: updatedSubtasks
  };
};

export const deleteSubtask = (subtasks) => {
  return {
    type: DELETE_SUBTASK,
    payload: subtasks
  };
};
