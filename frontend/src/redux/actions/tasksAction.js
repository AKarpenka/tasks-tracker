import { UPDATE_COLUMNS, FILTER_TASKS_BY_NUMBER } from './types';

export const updateColumns = (columns) => {
  return {
    type: UPDATE_COLUMNS,
    payload: columns
  };
};

export const filterTasksByNumber = (inputValue) => {
  return {
    type: FILTER_TASKS_BY_NUMBER,
    payload: inputValue
  };
};
